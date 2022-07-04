import makeRequest from './services';

export default function getFeaturedPlaylists(params) {
  const args = { resourceType: 'playlists', path: 'featured-playlists', ...params }
  return makeRequest(args);
}