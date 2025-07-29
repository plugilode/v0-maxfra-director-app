-- Create app_settings table for storing application configuration
CREATE TABLE IF NOT EXISTS app_settings (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_app_settings_updated_at ON app_settings(updated_at);

-- Insert default settings
INSERT INTO app_settings (id, settings) 
VALUES ('main', '{
  "primaryColor": "#8B5CF6",
  "secondaryColor": "#EC4899",
  "darkMode": false,
  "compactMode": false,
  "openTime": "09:00",
  "closeTime": "18:00",
  "workDays": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
  "language": "es",
  "timezone": "America/Mexico_City",
  "currency": "MXN",
  "dateFormat": "DD/MM/YYYY",
  "emailNotifications": true,
  "whatsappNotifications": true,
  "reminderTime": "24",
  "autoBackup": true,
  "backupFrequency": "daily",
  "dataRetention": "365"
}')
ON CONFLICT (id) DO NOTHING;
