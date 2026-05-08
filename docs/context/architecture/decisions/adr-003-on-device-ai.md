# ADR-003: On-Device AI with Transformers.js + ONNX Runtime

Status: Accepted | Date: 2025-12-19

## Context

The core value proposition of Aether Memory is semantic search over developer memories without requiring cloud API calls. This requires generating text embeddings locally on the user's device. ARM optimization is a key competitive differentiator (hackathon submission focus).

## Decision

Use Hugging Face Transformers.js with ONNX Runtime to run `all-MiniLM-L6-v2` (quantized) directly in the browser/VSCode extension/mobile PWA. Generate 384-dimensional embeddings locally.

## Alternatives Considered

1. **OpenAI Embeddings API** - Rejected: Requires network, adds latency, incurs cost, violates offline-first requirement.
2. **Custom TensorFlow.js model** - Rejected: Higher bundle size, worse ARM performance, no pre-optimized quantized models.
3. **Native MLKit (mobile only)** - Rejected: Not cross-platform; web/VSCode extension would need separate implementation.
4. **Transformers.js + ONNX** - Accepted: Runs in any JavaScript environment, uses WebGPU/WebAssembly backends, quantized model is small (~22M params, ~89MB memory), proven cross-platform compatibility.

## Consequences

**Positive:**
- Embeddings generated in ~28-52ms on ARM devices (iPhone 15 Pro, Pixel 8, M3 Mac)
- Zero network calls for semantic search = works offline
- Privacy: raw text never leaves device for embedding generation
- Cost: no per-request API fees

**Negative:**
- First model load takes 1.2-2.4s depending on device
- ~85-110MB memory usage while model is loaded
- Requires SharedArrayBuffer / COOP/COEP headers in some deployments
- Model download on first use (cached afterward)

## Model Details

| Property | Value |
|----------|-------|
| Model | `Xenova/all-MiniLM-L6-v2` |
| Format | ONNX quantized |
| Params | 22M |
| Dimensions | 384 |
| Backend | WebGPU (preferred) -> WASM fallback |

## Key Files

- `packages/shared/src/ai/embeddings.ts` - Embedding engine wrapper
- `client/src/services/` - Web app AI service consumption
- `packages/mobile-pwa/src/hooks/` - Mobile-optimized AI hooks
