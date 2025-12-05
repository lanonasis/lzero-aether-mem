/**
 * Stub for @xenova/transformers in VS Code webview context
 * The AI embedding functionality is not available in the extension sidebar.
 * Embeddings should be computed server-side or in the main extension host.
 */

export const pipeline = async () => {
    console.warn('[VSCode Webview] Transformers.js not available in webview context');
    throw new Error('AI embeddings not available in VS Code sidebar');
};

export const env = {
    allowLocalModels: false,
    useBrowserCache: false,
};

export default { pipeline, env };
