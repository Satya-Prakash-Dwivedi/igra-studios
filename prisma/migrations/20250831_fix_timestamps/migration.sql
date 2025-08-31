-- Ensure created_at has default
ALTER TABLE profiles
ALTER COLUMN created_at SET DEFAULT now();

-- Ensure updated_at has default
ALTER TABLE profiles
ALTER COLUMN updated_at SET DEFAULT now();

-- Create or replace function for auto-updating updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS set_updated_at_trigger ON profiles;

-- Create trigger to update updated_at automatically
CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
