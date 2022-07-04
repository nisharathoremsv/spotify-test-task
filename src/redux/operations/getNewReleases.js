import makeRequest from './services';

export default function getNewReleases(params) {
  const args = { resourceType: 'albums', path: 'new-releases', ...params }
  return makeRequest(args);
}
