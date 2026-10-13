import api from "./api";
import { searchProjects, searchAggregationProject } from "./search/project/projectApi";
import { searchAuto } from "./search/auto/autoApi";
jest.mock("./api", () => ({ post: jest.fn() }));
test("all read APIs forward cancellation without changing request contracts", async () => {
  api.post.mockResolvedValue({ data: { status: "success" } });
  const options = { signal: new AbortController().signal };
  const params = { query: "검색", page: 1, size: 6 };
  for (const [call, url] of [[searchProjects, "/search/query/project"], [searchAggregationProject, "/search/aggregation/project"], [searchAuto, "/search/auto"]]) {
    await call(params, options);
    expect(api.post).toHaveBeenLastCalledWith(url, params, options);
  }
});
