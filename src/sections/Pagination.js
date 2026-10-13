import "./Pagination.css";
export default function Pagination({
  pageInfo,
  onPageChange,
  disabled = false
}) {
  const {
    page = 1,
    totalPage = 0
  } = pageInfo;
  if (totalPage <= 1) return null;
  const start = Math.max(1, Math.min(page - 2, totalPage - 4));
  const end = Math.min(totalPage, start + 4);
  return <nav className="pagination" aria-label="프로젝트 페이지">
    <button disabled={disabled || page <= 1} onClick={() => onPageChange(1)} aria-label="첫 페이지">처음</button>
    <button disabled={disabled || page <= 1} onClick={() => onPageChange(page - 1)}>이전</button>
    {start > 1 && <span aria-hidden="true">…</span>}
    {Array.from({
      length: end - start + 1
    }, (_, index) => start + index).map(number => <button key={number} aria-current={page === number ? "page" : undefined} aria-label={number + "페이지"} disabled={disabled} onClick={() => onPageChange(number)}>{number}</button>)}
    {end < totalPage && <span aria-hidden="true">…</span>}
    <button disabled={disabled || page >= totalPage} onClick={() => onPageChange(page + 1)}>다음</button>
    <button disabled={disabled || page >= totalPage} onClick={() => onPageChange(totalPage)} aria-label="마지막 페이지">끝</button>
  </nav>;
}
