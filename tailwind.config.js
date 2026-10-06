/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
			screens: {
				'2xl': '1320px',
			},
		},
		extend: {
			fontFamily: {
				display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
				sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			colors: {
				// Brand palette: royal emerald + Rajasthani gold on warm ivory
				ivory: { DEFAULT: '#faf6ee', 100: '#f4ede0', 200: '#ece1cc' },
				ink: { DEFAULT: '#14201c', soft: '#4a5a54' },
				emerald: {
					50: '#eef6f2',
					100: '#d6eae0',
					300: '#8cc2a8',
					400: '#6aa98b',
					500: '#5a9b7f',
					600: '#3f7d63',
					700: '#2c5f4b',
					800: '#1b3f33',
					900: '#0c1f1a',
					950: '#07130f',
				},
				gold: {
					100: '#fbf1d6',
					200: '#f3dfa6',
					300: '#e8c873',
					400: '#d9ae4c',
					500: '#c99a35',
					600: '#a67b25',
				},
				rani: { DEFAULT: '#b0305a' },
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'4xl': '2rem',
			},
			letterSpacing: {
				eyebrow: '0.28em',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' },
				},
				shimmer: {
					from: { backgroundPosition: '200% 0' },
					to: { backgroundPosition: '-200% 0' },
				},
				'spin-slow': {
					to: { transform: 'rotate(360deg)' },
				},
				// Marigold petals drifting down with a gentle sway
				'petal-fall': {
					'0%': { transform: 'translate3d(0,-10vh,0) rotate(0deg)', opacity: 0 },
					'10%': { opacity: 1 },
					'50%': { transform: 'translate3d(var(--petal-sway,40px),50vh,0) rotate(220deg)' },
					'90%': { opacity: 1 },
					'100%': { transform: 'translate3d(0,110vh,0) rotate(440deg)', opacity: 0 },
				},
				bob: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
				shimmer: 'shimmer 6s linear infinite',
				'spin-slow': 'spin-slow 18s linear infinite',
				'petal-fall': 'petal-fall var(--petal-duration,12s) linear infinite',
				bob: 'bob 6s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
