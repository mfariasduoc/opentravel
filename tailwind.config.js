/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
    ],
    theme: {
        extend: {
            colors: {
                opentravel: {
                    azul: '#17365D',
                    celeste: '#DCEAF7',
                    fondo: '#F5F7FA',
                    verde: '#16865B'
                }
            }
        }
    },
    plugins: []
}