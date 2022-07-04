import makeRequest from "./services";

export default function getCategories(params) {
  const args = { resourceType: 'categories', path: 'categories', ...params }
  return makeRequest(args);
}