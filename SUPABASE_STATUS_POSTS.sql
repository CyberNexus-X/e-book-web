-- ============================================================================
-- Status, Posts & Chat Auto-Delete System - Database Setup
-- Run these SQL commands in your Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- 1. Add missing columns to users table (bio)
-- ============================================================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio_updated_at TIMESTAMPTZ;

-- ============================================================================
-- 2. Improve existing statuses table
-- ============================================================================
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS background_color VARCHAR(20) DEFAULT 'white';
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS text_color VARCHAR(20) DEFAULT 'black';
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS font_size VARCHAR(20) DEFAULT 'medium';
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS font_style VARCHAR(20) DEFAULT 'normal';
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS font_family VARCHAR(30) DEFAULT 'default';
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS gradient VARCHAR(50);
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS emoji_overlay TEXT;
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS duration_hours INTEGER DEFAULT 24;
ALTER TABLE statuses ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;

-- Update expires_at based on duration_hours for existing statuses
UPDATE statuses 
SET expires_at = created_at + (duration_hours || ' hours')::interval
WHERE expires_at IS NULL AND duration_hours IS NOT NULL;

-- ============================================================================
-- 3. Create posts table (permanent posts like Instagram/Facebook)
-- ============================================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  background_color VARCHAR(20) DEFAULT 'white',
  text_color VARCHAR(20) DEFAULT 'black',
  font_size VARCHAR(20) DEFAULT 'medium',
  font_style VARCHAR(20) DEFAULT 'normal',
  font_family VARCHAR(30) DEFAULT 'default',
  gradient VARCHAR(50),
  emoji_overlay TEXT,
  visibility VARCHAR(20) DEFAULT 'anyone' CHECK (visibility IN ('contacts', 'anyone')),
  duration_type VARCHAR(20) DEFAULT '7days' CHECK (duration_type IN ('7days', '14days', '30days', 'permanent')),
  expires_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. Add auto-delete columns to messages table
-- ============================================================================
ALTER TABLE messages ADD COLUMN IF NOT EXISTS auto_delete_enabled BOOLEAN DEFAULT false;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS auto_delete_duration VARCHAR(20);
ALTER TABLE messages ADD COLUMN IF NOT EXISTS auto_delete_at TIMESTAMPTZ;

-- ============================================================================
-- 5. Create chat_settings table
-- ============================================================================
CREATE TABLE IF NOT EXISTS chat_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  auto_delete_enabled BOOLEAN DEFAULT false,
  auto_delete_duration VARCHAR(20),
  disappearing_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

-- ============================================================================
-- 6. Create post_views table
-- ============================================================================
CREATE TABLE IF NOT EXISTS post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  viewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, viewer_id)
);

-- ============================================================================
-- 7. Create post_reactions table
-- ============================================================================
CREATE TABLE IF NOT EXISTS post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emoji VARCHAR(10) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- ============================================================================
-- 8. Create post_replies table
-- ============================================================================
CREATE TABLE IF NOT EXISTS post_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. Create status_views table
-- ============================================================================
CREATE TABLE IF NOT EXISTS status_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id UUID NOT NULL REFERENCES statuses(id) ON DELETE CASCADE,
  viewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(status_id, viewer_id)
);

-- ============================================================================
-- 10. Create status_reactions table
-- ============================================================================
CREATE TABLE IF NOT EXISTS status_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id UUID NOT NULL REFERENCES statuses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emoji VARCHAR(10) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(status_id, user_id)
);

-- ============================================================================
-- 11. Create status_replies table
-- ============================================================================
CREATE TABLE IF NOT EXISTS status_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id UUID NOT NULL REFERENCES statuses(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 12. Enable Realtime for new tables
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE post_views;
ALTER PUBLICATION supabase_realtime ADD TABLE post_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE post_replies;
ALTER PUBLICATION supabase_realtime ADD TABLE status_views;
ALTER PUBLICATION supabase_realtime ADD TABLE status_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE status_replies;

-- ============================================================================
-- 13. Enable RLS on all new tables
-- ============================================================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_replies ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 14. RLS Policies for posts
-- ============================================================================
-- Anyone can see posts with visibility = 'anyone'
CREATE POLICY "Anyone can view public posts" ON posts
  FOR SELECT USING (visibility = 'anyone' AND is_deleted = false);

-- Contacts can see posts with visibility = 'contacts'
CREATE POLICY "Contacts can view posts" ON posts
  FOR SELECT USING (
    visibility = 'contacts' AND is_deleted = false
  );

-- Users can insert their own posts
CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update/delete their own posts
CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- 15. RLS Policies for chat_settings
-- ============================================================================
-- Only conversation participants can view their settings
CREATE POLICY "Participants can view chat settings" ON chat_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = conversation_id
      AND (conversations.participant_1 = auth.uid() OR conversations.participant_2 = auth.uid())
    )
  );

-- Only conversation participants can update settings
CREATE POLICY "Participants can update chat settings" ON chat_settings
  FOR ALL USING (
    user_id = auth.uid()
  );

-- ============================================================================
-- 16. RLS Policies for post_views, post_reactions, post_replies
-- ============================================================================
CREATE POLICY "Authenticated users can view post_views" ON post_views
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can track post views" ON post_views
  FOR INSERT WITH CHECK (viewer_id = auth.uid());

CREATE POLICY "Authenticated users can view post_reactions" ON post_reactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can react to posts" ON post_reactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own post_reactions" ON post_reactions
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can view post_replies" ON post_replies
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can reply to posts" ON post_replies
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- ============================================================================
-- 17. RLS Policies for status_views, status_reactions, status_replies
-- ============================================================================
CREATE POLICY "Authenticated users can view status_views" ON status_views
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can track status views" ON status_views
  FOR INSERT WITH CHECK (viewer_id = auth.uid());

CREATE POLICY "Authenticated users can view status_reactions" ON status_reactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can react to statuses" ON status_reactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own status_reactions" ON status_reactions
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can view status_replies" ON status_replies
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can reply to statuses" ON status_replies
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- ============================================================================
-- 18. Create indexes for better performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_is_deleted ON posts(is_deleted);

CREATE INDEX IF NOT EXISTS idx_statuses_user_id ON statuses(user_id);
CREATE INDEX IF NOT EXISTS idx_statuses_expires_at ON statuses(expires_at);
CREATE INDEX IF NOT EXISTS idx_statuses_is_deleted ON statuses(is_deleted);

CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_status_views_status_id ON status_views(status_id);
CREATE INDEX IF NOT EXISTS idx_status_reactions_status_id ON status_reactions(status_id);

-- ============================================================================
-- 19. Auto-expire functions (for pg_cron)
-- ============================================================================
-- Note: These functions can be scheduled with pg_cron for automatic cleanup

-- Function to expire statuses
CREATE OR REPLACE FUNCTION expire_statuses()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE statuses
  SET is_deleted = true
  WHERE expires_at < NOW()
  AND is_deleted = false;
END;
$$;

-- Function to expire posts
CREATE OR REPLACE FUNCTION expire_posts()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE posts
  SET is_deleted = true
  WHERE expires_at < NOW()
  AND expires_at IS NOT NULL
  AND is_deleted = false;
END;
$$;

-- Function to auto-delete messages
CREATE OR REPLACE FUNCTION auto_delete_messages()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete messages where auto_delete_at has passed
  DELETE FROM messages
  WHERE auto_delete_enabled = true
  AND auto_delete_at < NOW();
  
  -- Delete messages in disappearing mode conversations
  DELETE FROM messages m
  WHERE EXISTS (
    SELECT 1 FROM chat_settings cs
    WHERE cs.conversation_id = m.conversation_id
    AND cs.disappearing_mode = true
    AND cs.auto_delete_enabled = true
    AND m.created_at + (cs.auto_delete_duration || ' hours')::interval < NOW()
  );
END;
$$;

-- ============================================================================
-- 20. Helper functions
-- ============================================================================

-- Function to calculate post expires_at based on duration_type
CREATE OR REPLACE FUNCTION calculate_post_expiry(duration_type VARCHAR)
RETURNS TIMESTAMPTZ AS $$
DECLARE
  expiry TIMESTAMPTZ;
BEGIN
  CASE duration_type
    WHEN '7days' THEN
      expiry := NOW() + INTERVAL '7 days';
    WHEN '14days' THEN
      expiry := NOW() + INTERVAL '14 days';
    WHEN '30days' THEN
      expiry := NOW() + INTERVAL '30 days';
    WHEN 'permanent' THEN
      expiry := NULL;
    ELSE
      expiry := NOW() + INTERVAL '7 days';
  END CASE;
  RETURN expiry;
END;
$$ LANGUAGE plpgsql;

-- Function to get post engagement stats
CREATE OR REPLACE FUNCTION get_post_stats(post_uuid UUID)
RETURNS TABLE (
  view_count BIGINT,
  reaction_count BIGINT,
  reply_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM post_views WHERE post_id = post_uuid)::BIGINT,
    (SELECT COUNT(*) FROM post_reactions WHERE post_id = post_uuid)::BIGINT,
    (SELECT COUNT(*) FROM post_replies WHERE post_id = post_uuid)::BIGINT;
END;
$$ LANGUAGE plpgsql;

-- Function to get status engagement stats
CREATE OR REPLACE FUNCTION get_status_stats(status_uuid UUID)
RETURNS TABLE (
  view_count BIGINT,
  reaction_count BIGINT,
  reply_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM status_views WHERE status_id = status_uuid)::BIGINT,
    (SELECT COUNT(*) FROM status_reactions WHERE status_id = status_uuid)::BIGINT,
    (SELECT COUNT(*) FROM status_replies WHERE status_id = status_uuid)::BIGINT;
END;
$$ LANGUAGE plpgsql;
