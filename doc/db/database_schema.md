# Database Schema Specification

## 1. 개요
본 시스템은 Supabase(PostgreSQL) 기반의 관계형 데이터베이스를 사용하며, 모든 주요 테이블은 외래키(Foreign Key) 참조를 통해 무결성을 확보합니다. 모든 공통 테이블은 `id` (UUID), `created_at` (timestamptz), `updated_at` (timestamptz) 쌍을 기본으로 갖추고 있습니다.

## 2. 주요 테이블 스키마 정의

### 2.1 기초 도메인/메타 (Core Entity)
- **`sectors`**: 화장품 산업군 카테고리 분류 (ex. Skincare, Suncare)
- **`ingredients`**: K-뷰티 핵심 성분 사전. (`id`, `name`, `description`, `benefits_tags`)
- **`concerns`**: 사용자 피부 고민 및 문제점. (`id`, `name`, `definition`)
- **`brands`**: K-뷰티 브랜드 프로필. (`id`, `name`, `positioning_statement`)
- **`products`**: 개별 화장품 프로필 및 클레임 저장소. (`id`, `brand_id`(FK), `sector_id`(FK), `name`, `claims`)

### 2.2 비공개 워크스페이스 에셋 (B2B Workspace)
브랜드 담당자와 AI, 리뷰어가 공동 작업하는 영역의 자산들입니다.
- **`product_dossiers`**: 제품별 검수를 위해 AI/사람이 정리한 패킷 명세. (`id`, `product_id`(FK), `summary`, `claims`, `prior_issues`)
- **`answer_assets`**: 질문-답변 카드의 통합 저장소. 
  - 생성 칼럼: `id`, `asset_type` (enum: card, compare, boundary, faq 등), `title`, `question_text`, `answer_body`, `evidence_refs` (JSONB 배열 형태의 논문/URL 목록), `boundary_text`, `status` (enum: draft, in_review, approved, published), `visibility` (boolean), `brand_id` (FK), `product_id` (FK).
- **`expert_reviews`**: 제출된 전문가 리뷰 내역 폼. (`id`, `asset_id`(FK), `reviewer_id`(FK), `scores`(jsonb), `reason_codes`(text[]), `decision`)
- **`debrief_logs`**: 패치/오류에 대한 워크스페이스 피드백 로깅. (`id`, `run_id`, `repeated_issue_pattern`)

### 2.3 벤치마크 및 측정 (Analytics)
- **`benchmark_runs`**: 벤치마크 평가 단위. (`id`, `sector_id`, `run_date`)
- **`benchmark_scores`**: Run에 종속된 개별 제품 스코어 카드. (`id`, `run_id`(FK), `product_id`(FK), `final_score`, `trust_flag`)
