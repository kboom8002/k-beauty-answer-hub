-- Seed Data
INSERT INTO sectors (id, name) VALUES 
('00000000-0000-0000-0000-000000000001', 'Skincare'),
('00000000-0000-0000-0000-000000000002', 'Suncare');

INSERT INTO ingredients (id, name, slug, description, benefits_tags) VALUES 
('11111111-1111-1111-1111-111111111111', '나이아신아마이드', 'niacinamide', '피부 장벽 강화, 미백 특화', ARRAY['미백', '장벽']),
('11111111-1111-1111-1111-111111111112', '세라마이드', 'ceramide', '손상된 표피 보호 및 보습 유지', ARRAY['보습', '장벽']),
('11111111-1111-1111-1111-111111111113', '판테놀', 'panthenol', 'B5 전환 진정 보습제', ARRAY['보습', '진정']);

INSERT INTO concerns (id, name, slug, definition) VALUES 
('22222222-2222-2222-2222-222222222221', '피부 장벽 손상', 'barrier', '홍조, 따가움, 민감성 피부 회복'),
('22222222-2222-2222-2222-222222222222', '여드름/트러블', 'acne', '염증성 트러블, 좁쌀 여드름');

INSERT INTO brands (id, name, positioning_statement) VALUES 
('33333333-3333-3333-3333-333333333331', 'Acme Skin', '더마톨로지 전문 코스메슈티컬 브랜드');

INSERT INTO products (id, brand_id, sector_id, name, claims) VALUES 
('44444444-4444-4444-4444-444444444441', '33333333-3333-3333-3333-333333333331', '00000000-0000-0000-0000-000000000001', '인텐시브 베리어 세라마이드 크림', ARRAY['장벽강화', '논코메도제닉']),
('44444444-4444-4444-4444-444444444442', '33333333-3333-3333-3333-333333333331', '00000000-0000-0000-0000-000000000001', '퓨어 비타민 C 15% 앰플', ARRAY['미백', '항산화']);

-- Published Public Answer Asset (Visible to Public Component)
INSERT INTO answer_assets (id, brand_id, product_id, asset_type, status, visibility, title, question_text, answer_body, evidence_refs) VALUES 
(
  '55555555-5555-5555-5555-555555555551', 
  '33333333-3333-3333-3333-333333333331', 
  '44444444-4444-4444-4444-444444444441', 
  'card', 
  'published', 
  true, 
  '오일성분 논코메도제닉 여부', 
  '세라마이드 크림이 모공을 막아 트러블(면포)을 유발하지 않나요?', 
  '당사 세라마이드는 에멀전 입자를 매우 잘게 쪼갠 나노 공법을 사용하여 입자가 모공 크기보다 작습니다. 물리적으로 모공을 막지 않음을 인체적용 시험으로 검증받았습니다.', 
  '["한국피부과학연구원 논코메도제닉 합격 리포트 (2024)"]'
);
