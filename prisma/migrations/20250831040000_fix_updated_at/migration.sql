-- Step 1: Ensure updated_at has a default value
ALTER TABLE profiles
ALTER COLUMN updated_at SET DEFAULT now();

-- Step 2: Backfill null values
UPDATE profiles
SET updated_at = now()
WHERE updated_at IS NULL;

-- Step 3: Add trigger function to auto-update
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Drop old trigger if exists
DROP TRIGGER IF EXISTS set_updated_at_trigger ON profiles;

-- Step 5: Create new trigger
CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
