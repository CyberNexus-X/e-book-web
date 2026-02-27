-- Create app_settings table for storing application settings
CREATE TABLE IF NOT EXISTS app_settings (
  key VARCHAR(50) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Default values insert
INSERT INTO app_settings (key, value) VALUES
('allow_registration', 'true'),
('email_verification', 'false'),
('random_chat_enabled', 'true'),
('status_updates_enabled', 'true'),
('anonymous_reporting', 'true'),
('auto_moderate_spam', 'false')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (everyone can read settings)
CREATE POLICY "Allow public read access to app_settings"
ON app_settings FOR SELECT
TO public
USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Allow authenticated users to update app_settings"
ON app_settings FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to insert settings
CREATE POLICY "Allow authenticated users to insert app_settings"
ON app_settings FOR INSERT
TO authenticated
WITH CHECK (true);
