import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import AdminPage from "./components/AdminPage";
import ProjectEntry from "./components/ProjectEntry";
import Header from "./components/Header";
import { searchProjects, searchAggregationProject, createProject, deleteProject } from "./apis/search/project/projectApi";
import { searchAuto } from "./apis/search/auto/autoApi";
import { sendMail } from "./apis/mail/mailApi";
jest.mock("./apis/search/project/projectApi");
jest.mock("./apis/search/auto/autoApi");
jest.mock("./apis/mail/mailApi");
const project = { id: "p1", title: "검색 플랫폼", description: "검색 시스템 설계", body: "색인 구축|랭킹 개선", features: "운영 효율 개선", startDate: "202303", endDate: "202312", role: "백엔드 개발", stack: "Java OpenSearch", important: "Y" };
const result = { status: "success", data: { result: [project], page: { page: 1, pageSize: 6, totalPage: 3, totalCount: 18 } } };
beforeEach(() => {
  jest.clearAllMocks();
  window.history.replaceState({}, "", "/");
  searchProjects.mockResolvedValue(result);
  searchAggregationProject.mockResolvedValue({ status: "success", data: { result: [{ key: "OpenSearch", count: 2 }] } });
  searchAuto.mockResolvedValue({ status: "success", data: { result: [] } });
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });
});

test("homepage retains identity, experience and education with one main heading", async () => {
  render(<App />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("검색 경험");
  expect(screen.getByText("(주)클러쉬 (Clush)")).toBeInTheDocument();
  expect(screen.getByText("디지털콘텐츠학과")).toBeInTheDocument();
  await screen.findByRole("heading", { name: "검색 플랫폼" });
});

test("search submission sends text and preserves query and dates during pagination", async () => {
  render(<Projects />);
  await screen.findByRole("heading", { name: "검색 플랫폼" });
  expect(screen.getByLabelText("전체 프로젝트")).toBeChecked();
  expect(searchProjects).toHaveBeenCalledWith(expect.objectContaining({ filter: "" }), expect.any(Object));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "OpenSearch" } });
  fireEvent.change(screen.getByLabelText("시작 월"), { target: { value: "2023-01" } });
  fireEvent.change(screen.getByLabelText("종료 월"), { target: { value: "2023-12" } });
  fireEvent.click(screen.getByRole("button", { name: "프로젝트 검색 실행" }));
  await waitFor(() => expect(searchProjects).toHaveBeenLastCalledWith(expect.objectContaining({ query: "OpenSearch", startDate: "202301", endDate: "202312", page: 1, size: 6 }), expect.any(Object)));
  await waitFor(() => expect(screen.getByRole("button", { name: "2페이지" })).toBeEnabled());
  fireEvent.click(screen.getByRole("button", { name: "2페이지" }));
  await waitFor(() => expect(searchProjects).toHaveBeenLastCalledWith(expect.objectContaining({ query: "OpenSearch", startDate: "202301", endDate: "202312", page: 2, size: 6 }), expect.any(Object)));
});

test("stack selection and pagination keep the selected search query", async () => {
  render(<Projects />);
  await screen.findByRole("heading", { name: "검색 플랫폼" });
  fireEvent.click(await screen.findByRole("button", { name: "OpenSearch 2" }));
  await waitFor(() => expect(searchProjects).toHaveBeenLastCalledWith(expect.objectContaining({ query: "OpenSearch" }), expect.any(Object)));
  await waitFor(() => expect(screen.getByRole("button", { name: "2페이지" })).toBeEnabled());
  fireEvent.click(screen.getByRole("button", { name: "2페이지" }));
  await waitFor(() => expect(searchProjects).toHaveBeenLastCalledWith(expect.objectContaining({ query: "OpenSearch", page: 2 }), expect.any(Object)));
});

test("project details keep full source content and escape untrusted HTML", () => {
  const malicious = '<img src=x onerror=alert(1)>';
  const { container } = render(<ProjectEntry number={1} project={{ ...project, title: "<span class='highLight'>검색</span>" + malicious }} />);
  expect(container.querySelector("mark")).toHaveTextContent("검색");
  expect(container.querySelector("img")).toBeNull();
  expect(screen.getByText(/onerror=alert/)).toBeInTheDocument();
  expect(screen.getByText("프로젝트 개요")).toBeInTheDocument();
  expect(container.querySelector(".project-detail-body")).not.toHaveTextContent("검색 시스템 설계");
  const details = container.querySelector("details");
  fireEvent.click(screen.getByText("프로젝트 읽기"));
  details.open = true;
  expect(within(details).getByText("색인 구축")).toBeInTheDocument();
  expect(within(details).getByText("랭킹 개선")).toBeInTheDocument();
  expect(within(details).getByText("운영 효율 개선")).toBeInTheDocument();
});

test("failed query presents retry rather than sample projects", async () => {
  searchProjects.mockRejectedValueOnce(new Error("offline"));
  render(<Projects />);
  expect(await screen.findByRole("alert")).toHaveTextContent("불러오지 못했습니다");
  expect(screen.queryByText("대용량 검색 플랫폼")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "다시 시도" }));
  await screen.findByRole("heading", { name: "검색 플랫폼" });
});

test("older autocomplete response cannot replace newer suggestions", async () => {
  let resolveOld;
  searchAuto.mockImplementation(({ query }) => query === "old" ? new Promise(resolve => { resolveOld = resolve; }) : Promise.resolve({ status: "success", data: { result: [{ word: "new result" }] } }));
  render(<Projects />);
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "old" } });
  await waitFor(() => expect(searchAuto).toHaveBeenCalledWith(expect.objectContaining({ query: "old" }), expect.any(Object)));
  fireEvent.change(input, { target: { value: "new" } });
  await screen.findByRole("option", { name: "new result" });
  resolveOld({ status: "success", data: { result: [{ word: "old result" }] } });
  await waitFor(() => expect(screen.queryByRole("option", { name: "old result" })).not.toBeInTheDocument());
});

const fillContact = () => {
  for (const [label, value] of [["이름", "방문자"], ["이메일", "visitor@example.com"], ["제목", "협업 문의"], ["내용", "검색 프로젝트 문의입니다."]]) fireEvent.change(screen.getByLabelText(label), { target: { value } });
};
test("failed mail keeps the message and allows retry; success clears only then", async () => {
  sendMail.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ status: "success" });
  render(<Contact />); fillContact();
  fireEvent.click(screen.getByRole("button", { name: /메시지 보내기/ }));
  expect(await screen.findByRole("alert")).toHaveTextContent("작성 내용은 보관");
  expect(screen.getByLabelText("내용")).toHaveValue("검색 프로젝트 문의입니다.");
  fireEvent.click(screen.getByRole("button", { name: /메시지 보내기/ }));
  await waitFor(() => expect(screen.getByLabelText("내용")).toHaveValue(""));
  expect(sendMail).toHaveBeenCalledTimes(2);
});

test("mobile menu exposes its state and Escape restores toggle focus", () => {
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "메뉴 +" });
  fireEvent.click(toggle); expect(toggle).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(toggle, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});

test("application-level failed deletion leaves project in list", async () => {
  jest.spyOn(window, "confirm").mockReturnValue(true);
  deleteProject.mockResolvedValue({ status: "fail" });
  render(<MemoryRouter><AdminPage /></MemoryRouter>);
  await screen.findByRole("heading", { name: "검색 플랫폼" });
  fireEvent.click(screen.getByRole("button", { name: "검색 플랫폼 삭제" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("목록에 유지");
  expect(screen.getByRole("heading", { name: "검색 플랫폼" })).toBeInTheDocument();
  window.confirm.mockRestore();
});

test("failed save preserves month inputs and API contract", async () => {
  createProject.mockResolvedValue({ status: "fail" });
  render(<MemoryRouter><AdminPage /></MemoryRouter>);
  fireEvent.click(await screen.findByRole("button", { name: "검색 플랫폼 수정" }));
  fireEvent.click(screen.getByRole("button", { name: /프로젝트 저장/ }));
  expect(await screen.findByRole("alert")).toHaveTextContent("입력 내용을 유지");
  expect(screen.getByLabelText("시작 월")).toHaveValue("2023-03");
  expect(createProject).toHaveBeenCalledWith(expect.objectContaining({ id: "p1", startDate: "202303", endDate: "202312", stack: "Java OpenSearch", body: "색인 구축 | 랭킹 개선" }));
});

test("project roles and stacks use pipes and overwritten fields retain safe highlights", () => {
  const { container } = render(<ProjectEntry number={1} project={{ ...project, role: "설계|개발", stack: "Java <span class='highLight'>OpenSearch</span>", body: "<span class='highLight'>색인</span> 구축|랭킹 개선" }} />);
  expect(container.querySelector(".project-meta")).toHaveTextContent("설계 | 개발");
  expect(container.querySelector(".detail-section p")).toHaveTextContent("Java | OpenSearch");
  expect(container.querySelectorAll("mark")).toHaveLength(2);
  expect(screen.queryByText(/검색 일치/)).not.toBeInTheDocument();
});
