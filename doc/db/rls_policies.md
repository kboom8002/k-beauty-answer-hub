# RLS (Row Level Security) Policies

## 1. 개요
Supabase의 Row Level Security 기능을 활용하여 퍼블릭 사용자, 브랜드 관리자(Brand Admin), 리뷰어 및 사내 애널리스트 간의 데이터 접근 통제 및 물리적인 격리를 PostgreSQL 구동 최하단 단계에서 보장합니다.

## 2. 권한 계층 (Profiles & JWT User Metadata)
- **`public`**: 비인증 익명 사용자.
- **`brand_admin`**: 특정 브랜드(Tenant)에 종속된 워크스페이스 관리자.
- **`reviewer`**: 외부 전문가 파트너. 자신에게 할당된 Asset/Dossier에만 접근 가능.
- **`analyst`**: 벤치마크 및 AI 워크플로우를 주도하는 내부 운영자.
- **`admin`**: 수퍼유저, 모든 권한 제어 허용.

## 3. 핵심 RLS 정책 명세

### 3.1 Public 노출 정책 (Public Read-Only)
- **대상 테이블**: `ingredients`, `concerns`, `products`, `answer_assets`
- **적용 규칙 (SELECT)**:
  `answer_assets` 테이블 접근 시 `status = 'published'` AND `visibility = true` 조건에 부합하는 로우(Row)에 한해서만 Public 조회가 가능합니다.

### 3.2 테넌트(브랜드) 격리 장치 (Tenant Isolation)
- **대상 테이블**: `answer_assets`, `product_dossiers`, `benchmark_scores` 등 B2B 자산
- **적용 규칙 (SELECT, INSERT, UPDATE, DELETE)**: 
  조회하려는 로우의 `brand_id`가 현재 로그인한 유저의 세션에 기록된 JWT 메타데이터 (`auth.jwt() -> 'user_metadata' ->> 'brand_id'`)와 완전히 일치하는 경우에만 권한을 부여합니다. 이를 통해 **경쟁사 워크스페이스 데이터 열람 및 스코어 탈취를 원천 차단**합니다.

### 3.3 리뷰어 할당 기반 접근 제어 (Assigned Review Queue)
- **대상 테이블**: `answer_assets`, `expert_reviews`
- **적용 규칙 (SELECT, UPDATE)**:
  - `status`가 `in_review`로 넘어온 상태의 `answer_assets` 라면, 해당 카드의 `assigned_reviewer_id`가 현재 사용자 ID(`auth.uid()`)와 일치해야만 Read 및 Status Update 권한을 갖습니다.
  - 자신이 검수하는 에셋에만 `expert_reviews` 테이블에 결과(Insert)를 남길 수 있습니다.
