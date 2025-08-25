import React from "react";
import "./Pagination.css";

const Pagination = ({ pageInfo, onPageChange }) => {
  const { page, totalPage } = pageInfo;
  
  if (totalPage <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage, endPage;
  
  // 현재 페이지가 앞쪽에 있을 때 (1~3페이지)
  if (page <= 3) {
    startPage = 1;
    endPage = Math.min(maxVisiblePages, totalPage);
  }
  // 현재 페이지가 뒤쪽에 있을 때
  else if (page >= totalPage - 2) {
    startPage = Math.max(1, totalPage - maxVisiblePages + 1);
    endPage = totalPage;
  }
  // 현재 페이지가 중간에 있을 때
  else {
    startPage = page - 2;
    endPage = page + 2;
  }

  // 맨 처음 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 1일 때)
  pages.push(
    <button
      key="first"
      onClick={() => onPageChange(1)}
      className={`page-btn ${page === 1 ? 'disabled' : ''}`}
      disabled={page === 1}
      title="맨 처음"
    >
      처음
    </button>
  );

  // 이전 페이지 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 1일 때)
  pages.push(
    <button
      key="prev"
      onClick={() => onPageChange(page - 1)}
      className={`page-btn ${page === 1 ? 'disabled' : ''}`}
      disabled={page === 1}
    >
      이전
    </button>
  );

  // 현재 페이지가 4 이상이고 totalPage가 5 이상일 때 앞에 "..." 추가
  if (page >= 4 && totalPage >= 5) {
    pages.push(
      <span key="dots" className="page-dots">
        ...
      </span>
    );
  }

  // 페이지 번호들
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`page-btn ${i === page ? 'active' : ''}`}
      >
        {i}
      </button>
    );
  }

  // 현재 페이지가 totalPage-3 이하이고 totalPage가 5 이상일 때 뒤에 "..." 추가
  if (page <= totalPage - 3 && totalPage >= 5) {
    pages.push(
      <span key="dots" className="page-dots">
        ...
      </span>
    );
  }

  // 다음 페이지 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 마지막 페이지일 때)
  pages.push(
    <button
      key="next"
      onClick={() => onPageChange(page + 1)}
      className={`page-btn ${page === totalPage ? 'disabled' : ''}`}
      disabled={page === totalPage}
    >
      다음
    </button>
  );

  // 맨 끝 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 마지막 페이지일 때)
  pages.push(
    <button
      key="last"
      onClick={() => onPageChange(totalPage)}
      className={`page-btn ${page === totalPage ? 'disabled' : ''}`}
      disabled={page === totalPage}
      title="맨 끝"
    >
      끝
    </button>
  );

  return (
    <div className="pagination">
      {pages}
    </div>
  );
};

export default Pagination;
