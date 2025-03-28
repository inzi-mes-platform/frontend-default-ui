import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root : 'src/framework',
    build: {
        lib: {
            entry : resolve(__dirname, 'src/framework/index.js'),
            name : "index",
            fileName: "index",
            formats: ['cjs', 'es']
        },
        outDir: "../../dist",
        rollupOptions: {
            external: [ 'react', 'react-dom', '@emotion/react', 'redux', 'redux-thunk' ]
        },
        emptyOutDir : true,
        sourcemap: true
    } 
});