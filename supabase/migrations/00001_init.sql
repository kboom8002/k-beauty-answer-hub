-- Enums
CREATE TYPE asset_type AS ENUM ('card', 'compare', 'boundary', 'faq');
CREATE TYPE asset_status AS ENUM ('draft', 'in_review', 'approved', 'published');

-- 1. 기초 도메인/메타
CREATE TABLE sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  benefits_tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE concerns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  definition text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  positioning_statement text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  sector_id uuid REFERENCES sectors(id) ON DELETE SET NULL,
  name text NOT NULL,
  claims text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. 비공개 워크스페이스 에셋
CREATE TABLE product_dossiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  summary text,
  claims text[],
  prior_issues text,
  questions_ladder jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE answer_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  asset_type asset_type DEFAULT 'card',
  status asset_status DEFAULT 'draft',
  visibility boolean DEFAULT false,
  title text NOT NULL,
  question_text text NOT NULL,
  answer_body text,
  boundary_text text,
  evidence_refs jsonb DEFAULT '[]',
  assigned_reviewer_id uuid, -- Reference to auth.users theoretically
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE expert_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid REFERENCES answer_assets(id) ON DELETE CASCADE,
  reviewer_id uuid,
  scores jsonb,
  reason_codes text[],
  decision text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE benchmark_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sector_id uuid REFERENCES sectors(id) ON DELETE CASCADE,
  run_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE benchmark_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid REFERENCES benchmark_runs(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  final_score numeric,
  trust_flag boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_scores ENABLE ROW LEVEL SECURITY;

-- Public Read-Only Policies
CREATE POLICY "Public can view sectors" ON sectors FOR SELECT USING (true);
CREATE POLICY "Public can view ingredients" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Public can view concerns" ON concerns FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can view published assets" ON answer_assets FOR SELECT 
  USING (status = 'published' AND visibility = true);

-- Tenant Isolation Policies (Assuming JWT contains brand_id)
CREATE POLICY "Brand Admin can access own brand assets" ON answer_assets 
  FOR ALL USING (auth.jwt() -> 'user_metadata' ->> 'brand_id' = brand_id::text);

CREATE POLICY "Brand Admin can access own dossiers" ON product_dossiers 
  FOR ALL USING (
    product_id IN (
      SELECT id FROM products WHERE brand_id::text = auth.jwt() -> 'user_metadata' ->> 'brand_id'
    )
  );

-- Reviewer Policies
CREATE POLICY "Reviewer can access assigned assets" ON answer_assets
  FOR SELECT USING (assigned_reviewer_id = auth.uid() AND status = 'in_review');

CREATE POLICY "Reviewer can update assigned assets" ON answer_assets
  FOR UPDATE USING (assigned_reviewer_id = auth.uid() AND status = 'in_review');

CREATE POLICY "Reviewer can create reviews" ON expert_reviews
  FOR INSERT WITH CHECK (reviewer_id = auth.uid());
