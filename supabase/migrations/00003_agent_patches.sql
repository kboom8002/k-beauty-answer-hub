-- 00003_agent_patches.sql
CREATE TABLE agent_patches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  patch_type text NOT NULL, -- 'tone', 'prohibited_words', 'evidence_required'
  content text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agent_patches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand Admin can access own patches" ON agent_patches 
  FOR ALL USING (auth.jwt() -> 'user_metadata' ->> 'brand_id' = brand_id::text);
