/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './Views/**/*.cshtml',
    ],
    theme: {
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            center: true,
        },
        colors: {
            primary: 'var(--primary)',
            green: 'var(--green)',
            red: 'var(--red)',
            orange: 'var(--orange)',
            white: 'var(--white)',
            black: 'var(--black)',
            'text-primary': 'var(--text-primary)',
            'text-green': 'var(--text-green)',
            'text-dark': 'var(--text-dark)',
            'text-gray': 'var(--text-gray)',
            'text-muted': 'var(--text-muted)',
            'text-light': 'var(--text-light)',
            'bg-primary': 'var(--bg-primary)',
            'bg-primary-dark': 'var(--bg-primary-dark)',
            'bg-primary-darken': 'var(--bg-primary-darken)',
            'bg-light-gray': 'var(--bg-light-gray)',
            'bg-light': 'var(--bg-light)',
            'bg-red': 'var(--bg-red)',
            'bg-green': 'var(--bg-green)',
            'bg-best-card': 'var(--bg-best-card)',
            'bg-best-card-hover': 'var(--bg-best-card-hover)',
            'bg-card-hover': 'var(--bg-card-hover)',
            transparent: 'transparent'
        },
    },
    plugins: [],
}

