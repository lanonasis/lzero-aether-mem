"use strict";
/**
 * Stub for @xenova/transformers in VS Code webview context
 * The AI embedding functionality is not available in the extension sidebar.
 * Embeddings should be computed server-side or in the main extension host.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.pipeline = void 0;
const pipeline = async () => {
    console.warn('[VSCode Webview] Transformers.js not available in webview context');
    throw new Error('AI embeddings not available in VS Code sidebar');
};
exports.pipeline = pipeline;
exports.env = {
    allowLocalModels: false,
    useBrowserCache: false,
};
exports.default = { pipeline: exports.pipeline, env: exports.env };
//# sourceMappingURL=transformers.js.map