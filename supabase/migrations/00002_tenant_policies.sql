-- 00002_tenant_policies.sql
-- Allow public to insert a new brand during signup flow
CREATE POLICY "Public can insert brands" ON brands FOR INSERT WITH CHECK (true);

-- Allow Brand Admins to update their own brand info
CREATE POLICY "Brand Admin can update own brand" ON brands 
  FOR UPDATE USING (id::text = auth.jwt() -> 'user_metadata' ->> 'brand_id');

-- Ensure profiles or users can fetch brands they belong to
CREATE POLICY "Public can view brands" ON brands FOR SELECT USING (true);
