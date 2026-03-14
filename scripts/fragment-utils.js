function trimTrailingSlash(value = '') {
  return `${value}`.replace(/\/+$/, '');
}

export function getFragmentFetchCandidates(path, options = {}) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return [];
  }

  const rootPath = trimTrailingSlash(options.rootPath || '');
  const codeBasePath = trimTrailingSlash(options.codeBasePath || '');
  const primary = `${rootPath}${path}.plain.html`;
  const fallback = `${codeBasePath}/fallback-content${path}.html`;

  return primary === fallback ? [primary] : [primary, fallback];
}
