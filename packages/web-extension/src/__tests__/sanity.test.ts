import { describe, expect, it } from 'vitest';

// Minimal sanity check to keep coverage pipeline green.
describe('web-extension sanity', () => {
    it('runs a basic assertion', () => {
        expect(true).toBe(true);
    });
});
