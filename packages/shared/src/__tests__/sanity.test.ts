import { describe, expect, it } from 'vitest';

// Minimal sanity check to ensure test runner is wired.
describe('shared package sanity', () => {
    it('runs a basic assertion', () => {
        expect(1 + 1).toBe(2);
    });
});
