# carear-document-FE

장명진의 검색·백엔드 개발자 포트폴리오. React와 기존 CSS 구조를 사용하는 Editorial & Typography 디자인이다.

## 실행 및 검증

Node.js 20 이상과 npm을 사용한다. 의존성은 `npm ci`, 개발 서버는 `npm start`, 프로덕션 빌드는 `npm run build`로 실행한다.

테스트는 `npm test -- --watchAll=false --runInBand`로 실행한다. CRA의 Jest에서 React Router의 export 경로를 찾을 수 있도록 package.json에 테스트 전용 moduleNameMapper를 설정했다. 기능 테스트는 API mock을 사용하며 실제 메일이나 운영 데이터를 변경하지 않는다.

API 주소는 로컬 `.env`의 `REACT_APP_API_URL`로 설정한다. 이 값은 브라우저 번들에 포함되므로 비밀 정보를 넣지 않는다.

## 디자인 규칙

- 배경 `#F6F3EC`, 텍스트 `#20201D`, 보조 텍스트 `#626159`, 강조 `#963E2C`, 구분선 `#D8D3C8`, 보조 면 `#EDE8DE`.
- 토큰과 기본 접근성 규칙은 `src/index.css`, 공통 레이아웃은 `src/App.css`에서 관리한다.
- Pretendard Variable 1.3.9 동적 서브셋을 CDN에서 로딩하고 시스템 글꼴을 fallback으로 사용한다. 짧은 영문 편집 제목은 시스템 Georgia를 사용한다.
- 최대 본문 폭 1280px. 좌우 여백은 64/32/20px, 반응형 기준은 1024/768px이다.
- 공통 SectionHeading, ProjectEntry, Pagination을 재사용한다. 모든 콘텐츠를 카드로 만들지 않고 제목·구분선·여백으로 구분한다.
- 프로젝트 상세는 기본 HTML details/summary로 펼친다. 조회한 원본 개요·업무·성과·기술을 보존한다.
- 검색 하이라이트는 백엔드의 정확한 highLight span 마커만 mark로 변환한다. 원문과 다른 HTML은 React 텍스트로 처리하며 dangerouslySetInnerHTML을 사용하지 않는다.
- 스크롤 등장은 IntersectionObserver로 한 번만 적용하고 콘텐츠를 숨기지 않는다. prefers-reduced-motion에서는 이동·전환·smooth scroll을 제거한다.

## 기능 계약

`/`는 공개 포트폴리오, `/admin`은 기존 관리 화면이다. 검색·자동완성·집계·저장·삭제·메일 API 경로와 응답 계약을 유지한다.

- 프로젝트 검색은 적용한 검색어·기간·중요도·페이지 크기를 페이지 이동에도 유지한다.
- 기술 스택 선택은 기존 API처럼 기술명을 검색어로 사용한다.
- 자동완성은 지연 호출·AbortController·오래된 응답 무시를 적용한다.
- API 실패를 빈 검색 결과 또는 샘플 프로젝트로 표시하지 않는다. 재시도 상태를 별도로 보여준다.
- 문의·저장 실패 시 작성 내용을 유지하고, 삭제는 success 응답을 확인한 뒤 목록을 다시 조회한다.
- 날짜는 month input의 YYYY-MM과 API의 YYYYMM 사이에서 변환한다. stack은 공백, body/features는 파이프 구분 문자열 계약을 유지한다.

## 남은 범위

관리자 인증, 백엔드 집계의 날짜 조건 처리, OpenSearch 인덱스 운영 설정은 이번 UI 작업에서 변경하지 않았다. 프로젝트 상세는 독립 URL이 아니므로 프로젝트별 검색 노출을 위한 서버 렌더링·사전 렌더링은 후속 검토 대상이다. 운영 도메인이 확인되지 않아 canonical과 공유 이미지 URL은 임의로 추가하지 않았다.
