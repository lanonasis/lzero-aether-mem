# Chrome Extension Optimization Checklist

Track your progress as you apply performance fixes to the L0 Memory extension.

---

## 🚀 Phase 1: Quick Wins (30 minutes)

### Critical Fixes - Apply Today

- [ ] **Fix 1: Add Search Debouncing** (2 min)
  - File: `src/sidepanel/SidePanel.tsx`, `src/popup/Popup.tsx`
  - Add `useDebounce` hook
  - Apply to search input
  - Test: Type in search, verify only 1 API call after 300ms
  - Expected: 90% fewer API calls

- [ ] **Fix 2: Memoize MemoryCard Component** (3 min)
  - File: `src/sidepanel/SidePanel.tsx`
  - Wrap with `React.memo()`
  - Add custom comparison function
  - Memoize date formatting and icons
  - Test: Open DevTools Profiler, verify fewer re-renders
  - Expected: 70% fewer re-renders

- [ ] **Fix 3: Fix Memory Leaks** (5 min)
  - File: `src/sidepanel/SidePanel.tsx`
  - Add cleanup in `useEffect` return
  - Remove listeners on unmount
  - Test: Open extension, close, repeat 10x, check memory
  - Expected: Stable memory usage

- [ ] **Fix 4: Lazy Load AI Model** (3 min)
  - File: `src/sidepanel/SidePanel.tsx`
  - Remove auto-initialization
  - Initialize on first search
  - Test: Open extension, verify AI doesn't load until search
  - Expected: 3-5s faster initial load

- [ ] **Fix 5: Batch Database Operations** (5 min)
  - File: `src/background/cache.ts`
  - Use single transaction
  - Parallel operations with `Promise.all()`
  - Test: Sync 100 memories, measure time
  - Expected: 5x faster sync

- [ ] **Fix 6: Remove Console Logs** (1 min)
  - File: `vite.config.ts`
  - Add terser config
  - Set `drop_console: true`
  - Test: Build and check bundle size
  - Expected: Smaller bundle

- [ ] **Fix 7: Optimize Popup Load** (3 min)
  - File: `src/popup/Popup.tsx`
  - Fetch auth first, then data
  - Parallel sync status fetch
  - Test: Open popup, measure load time
  - Expected: 50% faster popup

- [ ] **Fix 8: Add Request Cancellation** (4 min)
  - File: `src/background/cache.ts`
  - Add AbortController
  - Cancel previous requests
  - Test: Type fast in search, verify old requests cancelled
  - Expected: No wasted requests

- [ ] **Fix 9: Offscreen Document Cleanup** (3 min)
  - File: `src/background/offscreenManager.ts`
  - Add 5-minute timeout
  - Auto-close when idle
  - Test: Use extension, wait 5 min, check memory
  - Expected: 40MB memory saved

- [ ] **Fix 10: Parallel Embedding Generation** (4 min)
  - File: `src/hooks/useSemanticSearch.ts`
  - Use `Promise.all()` for embeddings
  - Process in parallel
  - Test: Search with 50 memories, measure time
  - Expected: 10x faster search

---

## 📊 Phase 1 Verification

After completing Phase 1, verify improvements:

### Performance Metrics
- [ ] Initial load time: _____ seconds (target: < 3s)
- [ ] Search latency: _____ ms (target: < 500ms)
- [ ] Memory usage (idle): _____ MB (target: < 50MB)
- [ ] Memory usage (active): _____ MB (target: < 80MB)
- [ ] API calls per search: _____ (target: 1-2)

### User Experience
- [ ] Popup opens instantly (< 500ms)
- [ ] Typing in search is smooth
- [ ] No lag when scrolling memories
- [ ] Sync completes quickly
- [ ] No console errors

### Technical Validation
- [ ] No memory leaks (test 30 min usage)
- [ ] Event listeners cleaned up
- [ ] Offscreen document closes after idle
- [ ] Database operations are fast
- [ ] Bundle builds successfully

---

## 🎯 Phase 2: High Priority Optimizations (Week 2)

### Code Splitting & Bundle Optimization

- [ ] **Split Vendor Bundles**
  - File: `vite.config.ts`
  - Separate React, UI, Query, AI bundles
  - Test: Check bundle sizes
  - Expected: 30% smaller initial load

- [ ] **Implement React Query**
  - Files: `src/popup/Popup.tsx`, `src/sidepanel/SidePanel.tsx`
  - Add `@tanstack/react-query`
  - Cache auth status, memories
  - Test: Verify no duplicate API calls
  - Expected: 95% fewer API calls

- [ ] **Optimize Embedding Cache**
  - File: `src/hooks/useSemanticSearch.ts`
  - Batch embedding generation
  - Prefetch in background
  - Test: Generate 100 embeddings, measure time
  - Expected: 5x faster embedding generation

- [ ] **Optimize Search Algorithm**
  - File: `src/hooks/useSemanticSearch.ts`
  - Early termination for low scores
  - Limit processing to top N
  - Test: Search with 1000 memories
  - Expected: 3x faster search

---

## 🔧 Phase 3: Medium Priority Optimizations (Week 3)

### Database & UI Optimizations

- [ ] **Add IndexedDB Indexes**
  - File: `src/background/cache.ts`
  - Add indexes for type, updated_at
  - Use indexes in queries
  - Test: Query by type, measure time
  - Expected: 10x faster filtered queries

- [ ] **Implement Virtual Scrolling**
  - File: `src/sidepanel/SidePanel.tsx`
  - Add `react-window`
  - Render only visible items
  - Test: Scroll through 1000 memories
  - Expected: Smooth 60fps scrolling

- [ ] **Optimize Images**
  - Files: `public/icons/*`
  - Convert to WebP
  - Add lazy loading
  - Test: Check bundle size
  - Expected: 50% smaller images

- [ ] **Add Service Worker Caching**
  - File: New `sw.js`
  - Cache static assets
  - Implement Workbox
  - Test: Offline mode
  - Expected: Instant offline load

---

## 🧪 Testing Checklist

### Before Each Fix
- [ ] Record baseline metrics
- [ ] Take Chrome DevTools Performance snapshot
- [ ] Note current memory usage
- [ ] Document current behavior

### After Each Fix
- [ ] Verify fix works as expected
- [ ] Measure improvement
- [ ] Check for regressions
- [ ] Update metrics
- [ ] Commit changes

### Final Testing
- [ ] Load extension in Chrome DevTools
- [ ] Profile CPU usage
- [ ] Profile memory usage
- [ ] Test with 1000+ memories
- [ ] Test offline mode
- [ ] Test AI search
- [ ] Test sync
- [ ] Test on low-end device

---

## 📈 Metrics Tracking

### Baseline (Before Fixes)
```
Date: ___________
Initial Load: _____ s
Search Latency: _____ ms
Memory (idle): _____ MB
Memory (active): _____ MB
Bundle Size: _____ MB
API Calls/Search: _____
```

### After Phase 1 (Quick Wins)
```
Date: ___________
Initial Load: _____ s (___% improvement)
Search Latency: _____ ms (___% improvement)
Memory (idle): _____ MB (___% improvement)
Memory (active): _____ MB (___% improvement)
Bundle Size: _____ MB (___% improvement)
API Calls/Search: _____ (___% improvement)
```

### After Phase 2 (High Priority)
```
Date: ___________
Initial Load: _____ s (___% improvement)
Search Latency: _____ ms (___% improvement)
Memory (idle): _____ MB (___% improvement)
Memory (active): _____ MB (___% improvement)
Bundle Size: _____ MB (___% improvement)
API Calls/Search: _____ (___% improvement)
```

### After Phase 3 (Medium Priority)
```
Date: ___________
Initial Load: _____ s (___% improvement)
Search Latency: _____ ms (___% improvement)
Memory (idle): _____ MB (___% improvement)
Memory (active): _____ MB (___% improvement)
Bundle Size: _____ MB (___% improvement)
API Calls/Search: _____ (___% improvement)
```

---

## 🎯 Success Criteria

Mark complete when ALL criteria are met:

### Performance
- [ ] Initial load < 1 second
- [ ] Search latency < 300ms
- [ ] Memory usage < 50MB idle
- [ ] Memory usage < 80MB active
- [ ] Bundle size < 2MB
- [ ] API calls = 1 per search

### Quality
- [ ] Zero console errors
- [ ] Zero memory leaks
- [ ] 60fps scrolling
- [ ] No UI freezes
- [ ] Smooth animations

### User Experience
- [ ] Instant popup opening
- [ ] Real-time search
- [ ] Fast sync
- [ ] Offline support works
- [ ] AI search works

---

## 🐛 Known Issues & Workarounds

Track any issues discovered during optimization:

| Issue | Severity | Workaround | Status |
|-------|----------|------------|--------|
| | | | |
| | | | |
| | | | |

---

## 📝 Notes & Observations

Document learnings and insights:

```
Date: ___________
Fix Applied: ___________
Observation: ___________
Impact: ___________
Next Steps: ___________
```

---

## ✅ Final Checklist

Before marking optimization complete:

- [ ] All Phase 1 fixes applied
- [ ] All Phase 2 fixes applied
- [ ] All Phase 3 fixes applied
- [ ] All tests passing
- [ ] Metrics meet targets
- [ ] No regressions
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Beta tested
- [ ] User feedback positive
- [ ] Ready for production

---

## 🚀 Deployment Checklist

Before deploying optimized extension:

- [ ] Build production bundle
- [ ] Test in Chrome
- [ ] Test in Edge
- [ ] Test in Firefox (if applicable)
- [ ] Verify manifest.json
- [ ] Check permissions
- [ ] Test update flow
- [ ] Prepare release notes
- [ ] Tag version in git
- [ ] Submit to Chrome Web Store
- [ ] Monitor error reports
- [ ] Track performance metrics

---

**Start Date:** ___________  
**Target Completion:** ___________  
**Actual Completion:** ___________  
**Overall Improvement:** ___________%

---

## 💡 Tips for Success

1. **Apply fixes incrementally** - Don't change everything at once
2. **Test after each fix** - Catch regressions early
3. **Measure everything** - Data drives decisions
4. **Document learnings** - Help future you
5. **Get feedback** - Users notice improvements
6. **Celebrate wins** - Performance work is hard!

---

**Good luck with your optimization journey! 🚀**
