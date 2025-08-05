import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import plugin from 'tailwindcss/plugin'

export default defineConfig({
  plugins: [
    react(),
    tailwind({
      config: {
        content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [
          plugin(function({ addUtilities }) {
            addUtilities({
              '.container-default': {
                width: '100%',
                'max-width': '80rem', // 1280px (equivalente ao max-w-7xl)
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: '1rem', // px-4
                paddingRight: '1rem',
                '@screen sm': {
                  paddingLeft: '1.5rem', // sm:px-6
                  paddingRight: '1.5rem',
                },
                '@screen lg': {
                  paddingLeft: '3rem', // lg:px-12
                  paddingRight: '3rem',
                },
              },
            })
          }),
        ],
      }
    }),
  ],
})
