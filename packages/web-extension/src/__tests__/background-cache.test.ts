import { describe, expect, it } from 'vitest';

import {
  buildAuthHeaders,
  buildCreateMemoryEndpoint,
  buildListMemoriesEndpoint,
  buildSearchMemoriesEndpoint,
  inferAuthType,
  looksLikeJwt,
  normalizeApiUrl,
} from '../background/cache';

describe('background cache helpers', () => {
  it('normalizes API URLs to their origin', () => {
    expect(normalizeApiUrl('https://api.lanonasis.com/api/v1')).toBe('https://api.lanonasis.com');
    expect(normalizeApiUrl('https://api.lanonasis.com/api')).toBe('https://api.lanonasis.com');
  });

  it('detects bearer-style JWT tokens', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature123';
    expect(looksLikeJwt(jwt)).toBe(true);
    expect(inferAuthType(jwt)).toBe('oauth');
    expect(inferAuthType('lano_test_123')).toBe('apiKey');
  });

  it('builds auth headers that match token type', () => {
    expect(buildAuthHeaders({ token: 'lano_test_123', authType: 'apiKey' })).toEqual({
      'X-API-Key': 'lano_test_123',
    });
    expect(buildAuthHeaders({
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature123',
      authType: 'oauth',
    })).toEqual({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature123',
    });
  });

  it('uses the SDK-aligned memory route family', () => {
    expect(buildListMemoriesEndpoint()).toBe('/memory?limit=100');
    expect(buildSearchMemoriesEndpoint()).toBe('/memory/search');
    expect(buildCreateMemoryEndpoint()).toBe('/memory');
  });
});
