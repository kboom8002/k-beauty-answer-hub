-- 00004_tenant_asset_policies.sql

-- 1. Products Table RLS
-- Allow Brand Admin to insert products for their own brand only
CREATE POLICY "Brand Admin can insert own products" ON products
  FOR INSERT WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'brand_id' = brand_id::text);

-- Allow Brand Admin to update own products
CREATE POLICY "Brand Admin can update own products" ON products
  FOR UPDATE USING (auth.jwt() -> 'user_metadata' ->> 'brand_id' = brand_id::text);

-- Allow Brand Admin to delete own products
CREATE POLICY "Brand Admin can delete own products" ON products
  FOR DELETE USING (auth.jwt() -> 'user_metadata' ->> 'brand_id' = brand_id::text);

-- 2. Brands Table RLS
-- Allow Brand Admin to update their own brand (Already exists in 00002, but repeated for completeness if missing)
-- We use unique names to avoid conflicts if 00002 already ran it, or we can just ensure it exists.
-- The 00002 script had "Brand Admin can update own brand". We don't need to recreate it if it exists.

-- 3. Product Dossiers Table RLS
-- Allow Brand Admin to insert their own product dossiers (must reference an owned product)
CREATE POLICY "Brand Admin can insert own dossiers" ON product_dossiers
  FOR INSERT WITH CHECK (
    product_id IN (
      SELECT id FROM products WHERE brand_id::text = auth.jwt() -> 'user_metadata' ->> 'brand_id'
    )
  );

-- Allow Brand Admin to update their own product dossiers
CREATE POLICY "Brand Admin can update own dossiers" ON product_dossiers
  FOR UPDATE USING (
    product_id IN (
      SELECT id FROM products WHERE brand_id::text = auth.jwt() -> 'user_metadata' ->> 'brand_id'
    )
  );
