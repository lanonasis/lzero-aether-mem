import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    root: __dirname,
    test: {
        include: ['src/**/*.{test,spec}.ts?(x)'],
        coverage: {
            provider: 'v8',
            reportsDirectory: path.resolve(__dirname, 'coverage'),
        },
    },
});
