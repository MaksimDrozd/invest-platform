import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    include: /\.(jsx|js|ts|tsx)$/,
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-transform-class-properties', { loose: true }],
        'babel-plugin-transform-typescript-metadata',
      ],
      presets: [
        ['@babel/preset-typescript', { 
          allowDeclareFields: true,
          onlyRemoveTypeImports: true 
        }]
      ]
    },
  })],
  esbuild: false,
  define: {
    'process.env.NODE_ENV': '"development"'
  }
})
