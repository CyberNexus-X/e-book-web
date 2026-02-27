-- ============================================================================
-- Admin Message System - Database Setup Script
-- Run these SQL commands in your Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- 0. Add missing columns to users table (for ban system)
-- ============================================================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_reason TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_by UUID;

-- Enable realtime for users table (if not already)
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- ============================================================================
-- RLS Policies to block banned users
-- ============================================================================

-- Block banned users from inserting messages
CREATE POLICY "block_banned_users_messages" ON messages
FOR INSERT WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_banned = true
  )
);

-- Block banned users from updating conversations
CREATE POLICY "block_banned_users_conversations" ON conversations
FOR ALL USING (
  NOT EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_banned = true
  )
);

-- Block banned users from inserting statuses
CREATE POLICY "block_banned_users_status" ON status
FOR INSERT WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_banned = true
  )
);

-- ============================================================================
-- 1. Create admin_messages table
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_type VARCHAR(20) DEFAULT 'admin' NOT NULL,
  message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('text', 'announcement', 'warning', 'update')),
  title TEXT,
  content TEXT NOT NULL,
  is_broadcast BOOLEAN DEFAULT false NOT NULL,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'scheduled', 'sent')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for admin_messages
CREATE INDEX IF NOT EXISTS idx_admin_messages_status ON admin_messages(status);
CREATE INDEX IF NOT EXISTS idx_admin_messages_scheduled_at ON admin_messages(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_admin_messages_created_at ON admin_messages(created_at);

-- ============================================================================
-- 2. Create admin_message_recipients table
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_message_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES admin_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_delivered BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);

-- Create indexes for admin_message_recipients
CREATE INDEX IF NOT EXISTS idx_admin_message_recipients_message_id ON(message_id);
CREATE INDEX IF NOT EXISTS admin_message_recipients idx_admin_message_recipients_user_id ON admin_message_recipients(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_message_recipients_is_read ON admin_message_recipients(is_read);

-- ============================================================================
-- 3. Create admin_message_templates table
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('text', 'announcement', 'warning', 'update')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for templates
CREATE INDEX IF NOT EXISTS idx_admin_message_templates_message_type ON admin_message_templates(message_type);

-- ============================================================================
-- 4. Insert default templates
-- ============================================================================
INSERT INTO admin_message_templates (title, content, message_type) VALUES
  ('Welcome Message', 'Welcome to Test Chat! 🎉 We are excited to have you here. Feel free to explore and connect with new people.', 'announcement'),
  ('Community Guidelines', 'Please follow our community guidelines. Be respectful to others and enjoy your time here!', 'text'),
  ('Account Reviewed', 'Your account has been reviewed and approved. You now have full access to all features.', 'update'),
  ('New Updates', 'We have released new updates! Check out the latest features and improvements.', 'update')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. Enable Realtime for new tables
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE admin_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE admin_message_recipients;
ALTER PUBLICATION supabase_realtime ADD TABLE admin_message_templates;

-- ============================================================================
-- 6. Enable RLS on all tables
-- ============================================================================
ALTER TABLE admin_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_message_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_message_templates ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 7. RLS Policies for admin_messages
-- ============================================================================

-- Allow service role full access to admin_messages
CREATE POLICY "Service role full access to admin_messages" ON admin_messages
  FOR ALL USING (true) WITH CHECK (true);

-- Allow authenticated users to read messages (for viewing)
CREATE POLICY "Users can read admin messages" ON admin_messages
  FOR SELECT USING (true);

-- ============================================================================
-- 8. RLS Policies for admin_message_recipients
-- ============================================================================

-- Allow service role full access
CREATE POLICY "Service role full access to admin_message_recipients" ON admin_message_recipients
  FOR ALL USING (true) WITH CHECK (true);

-- Allow users to read their own messages (where user_id = auth.uid())
CREATE POLICY "Users can read their own message recipients" ON admin_message_recipients
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- 9. RLS Policies for admin_message_templates
-- ============================================================================

-- Allow service role full access to templates
CREATE POLICY "Service role full access to templates" ON admin_message_templates
  FOR ALL USING (true) WITH CHECK (true);

-- Allow authenticated users to read templates
CREATE POLICY "Users can read templates" ON admin_message_templates
  FOR SELECT USING (true);

-- ============================================================================
-- 10. Create function to update read status
-- ============================================================================
CREATE OR REPLACE FUNCTION mark_message_as_read(p_message_id UUID, p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE admin_message_recipients
  SET is_read = true, read_at = NOW()
  WHERE message_id = p_message_id 
    AND user_id = p_user_id 
    AND is_read = false;
END;
$$;

-- ============================================================================
-- 11. Create function to get user admin messages
-- ============================================================================
CREATE OR REPLACE FUNCTION get_user_admin_messages(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  message_type VARCHAR(20),
  title TEXT,
  content TEXT,
  is_broadcast BOOLEAN,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status VARCHAR(20),
  created_at TIMESTAMPTZ,
  is_delivered BOOLEAN,
  is_read BOOLEAN,
  read_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    am.id,
    am.message_type,
    am.title,
    am.content,
    am.is_broadcast,
    am.scheduled_at,
    am.sent_at,
    am.status,
    am.created_at,
    amr.is_delivered,
    amr.is_read,
    amr.read_at,
    amr.delivered_at
  FROM admin_messages am
  JOIN admin_message_recipients amr ON am.id = amr.message_id
  WHERE amr.user_id = p_user_id
    AND am.status = 'sent'
  ORDER BY am.created_at DESC;
END;
$$;

-- ============================================================================
-- 12. Create function to get message analytics
-- ============================================================================
CREATE OR REPLACE FUNCTION get_message_analytics(p_message_id UUID)
RETURNS TABLE (
  total_recipients BIGINT,
  delivered_count BIGINT,
  read_count BIGINT,
  sent_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT AS total_recipients,
    COUNT(*) FILTER (WHERE is_delivered = true)::BIGINT AS delivered_count,
    COUNT(*) FILTER (WHERE is_read = true)::BIGINT AS read_count,
    COUNT(*) FILTER (WHERE is_delivered = true)::BIGINT AS sent_count
  FROM admin_message_recipients
  WHERE message_id = p_message_id;
END;
$$;

-- ============================================================================
-- 13. Enable pg_cron extension (run in Supabase dashboard or via API)
-- ============================================================================
-- Note: pg_cron must be enabled in Supabase. Run this in SQL Editor:
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- ============================================================================
-- 14. pg_cron job for scheduled messages (optional - for production)
-- ============================================================================
-- Uncomment after enabling pg_cron:
-- SELECT cron.schedule(
--   'send-scheduled-messages',
--   '* * * * *',
--   $$
--   UPDATE admin_messages
--   SET status = 'sent', sent_at = NOW()
--   WHERE status = 'scheduled'
--   AND scheduled_at <= NOW();
--   $$
-- );

-- ============================================================================
-- 15. Add sender_type to messages table if not exists (already done in previous setup)
-- ============================================================================
-- This ensures admin messages work with the existing messages table

-- ============================================================================
-- Verify setup - Check all tables exist
-- ============================================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admin_messages', 'admin_message_recipients', 'admin_message_templates');

-- ============================================================================
-- Check table columns
-- ============================================================================
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('admin_messages', 'admin_message_recipients', 'admin_message_templates')
ORDER BY table_name, ordinal_position;
