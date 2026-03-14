/* eslint-env node */
import test from 'node:test';
import assert from 'node:assert/strict';

import { getFragmentFetchCandidates } from '../../scripts/fragment-utils.js';

test('getFragmentFetchCandidates returns mounted content first and repo fallback second', () => {
  const candidates = getFragmentFetchCandidates('/nav', {
    rootPath: '/root-path/',
    codeBasePath: '/code-base/',
  });

  assert.deepEqual(candidates, [
    '/root-path/nav.plain.html',
    '/code-base/fallback-content/nav.html',
  ]);
});

test('getFragmentFetchCandidates preserves nested fragment paths', () => {
  const candidates = getFragmentFetchCandidates('/customer/sidebar-fragment', {
    rootPath: '',
    codeBasePath: '',
  });

  assert.deepEqual(candidates, [
    '/customer/sidebar-fragment.plain.html',
    '/fallback-content/customer/sidebar-fragment.html',
  ]);
});

test('getFragmentFetchCandidates ignores invalid paths', () => {
  assert.deepEqual(getFragmentFetchCandidates('customer/sidebar-fragment'), []);
});
