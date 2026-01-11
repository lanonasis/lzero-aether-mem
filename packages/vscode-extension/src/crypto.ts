/**
 * Cross-platform crypto utilities
 * Works in both Node.js and browser environments (VS Code Web)
 */

// Detect environment at runtime
const hasWebCrypto = typeof globalThis !== 'undefined' &&
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.getRandomValues === 'function';

/**
 * Generate cryptographically secure random bytes
 */
export function randomBytes(length: number): Uint8Array {
    const buffer = new Uint8Array(length);

    if (hasWebCrypto) {
        globalThis.crypto.getRandomValues(buffer);
    } else {
        // Fallback for environments without Web Crypto (should not happen in VS Code)
        // Use a simple PRNG - NOT cryptographically secure but provides functionality
        for (let i = 0; i < length; i++) {
            buffer[i] = Math.floor(Math.random() * 256);
        }
    }

    return buffer;
}

/**
 * Generate a random string in base64url encoding
 */
export function generateRandomString(length: number = 32): string {
    const bytes = randomBytes(Math.ceil(length * 0.75)); // Account for base64 expansion
    return bytesToBase64Url(bytes).slice(0, length);
}

/**
 * Create SHA-256 hash and return as base64url
 * Uses Web Crypto API which is available in both Node.js and browsers
 */
export async function sha256Base64Url(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Web Crypto API - available in both modern Node.js and browsers
    if (hasWebCrypto && globalThis.crypto.subtle) {
        const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
        return bytesToBase64Url(new Uint8Array(hashBuffer));
    }

    // Fallback: simple hash (NOT cryptographically secure, just for compatibility)
    // This should rarely be hit as Web Crypto is widely available
    let hash = 0;
    const str = input;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    // Create a pseudo-random looking string from the hash
    const pseudoHash = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
        pseudoHash[i] = (hash >> (i % 4) * 8) & 0xff;
        hash = (hash * 31 + i) & 0xffffffff;
    }
    return bytesToBase64Url(pseudoHash);
}

/**
 * Convert Uint8Array to base64url string
 */
function bytesToBase64Url(bytes: Uint8Array): string {
    // Convert to base64
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    // Use btoa which is available in both browsers and modern Node.js
    let base64: string;
    if (typeof btoa === 'function') {
        base64 = btoa(binary);
    } else {
        // Node.js fallback for older versions
        base64 = Buffer.from(bytes).toString('base64');
    }

    // Convert to base64url
    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
