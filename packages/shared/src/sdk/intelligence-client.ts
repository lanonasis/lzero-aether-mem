/**
 * Lazy singleton wrapper around MemoryIntelligenceClient.
 *
 * The import is deferred to avoid bundle-size impact on VS Code and web
 * extensions. The client is created once per config and reused.
 *
 * VS Code VSIX must stay under 250 KB — do NOT change to a static import.
 */

import type { MemoryIntelligenceConfig } from '@lanonasis/mem-intel-sdk';

// Import the class type only — runtime import is dynamic below
type MemoryIntelligenceClientType =
  import('@lanonasis/mem-intel-sdk').MemoryIntelligenceClient;

let _client: MemoryIntelligenceClientType | null = null;
let _clientConfig: MemoryIntelligenceConfig | null = null;

/**
 * Returns the singleton MemoryIntelligenceClient, creating it on first call.
 * If config changes (e.g. new API key), call resetIntelligenceClient() first.
 */
export async function getIntelligenceClient(
  config: MemoryIntelligenceConfig
): Promise<MemoryIntelligenceClientType> {
  if (!_client || _clientConfig?.apiKey !== config.apiKey) {
    const { MemoryIntelligenceClient } = await import('@lanonasis/mem-intel-sdk');
    _client = new MemoryIntelligenceClient(config);
    _clientConfig = config;
  }
  return _client;
}

/**
 * Clears the cached client instance.
 * Call on logout or when config changes.
 */
export function resetIntelligenceClient(): void {
  _client = null;
  _clientConfig = null;
}
