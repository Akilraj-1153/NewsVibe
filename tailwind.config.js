module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '0px',    // No minimum width
      'sm': '640px',  // Minimum width: 640px
      'md': '768px',  // Minimum width: 768px
      'lg': '1024px', // Minimum width: 1024px
      'xl': '1280px', // Minimum width: 1280px
      '2xl': '1536px' // Minimum width: 1536px
    },
    extend: {
      fontFamily: {
        mateSc: ["Mate SC, serif"],
        mate: ["Mate, serif"],
        Merriweather: ['Merriweather, sans-serif'],
        Simonetta: ['Simonetta, serif'],
        Playwrite: ["Playwrite NG Modern, cursive"],
        Playwrite2: ["Playwrite FR Modern, cursive"]
      },
      colors: {
        primary: '#1D4ED8',    // Custom blue color
        secondary: '#9333EA',  // Custom purple color
        accent: '#F97316',     // Custom orange accent color
        muted: '#6B7280',      // Muted gray for secondary text
        lightBg: '#F3F4F6',    // Light background color
        darkBg: '#111827',     // Dark background color
      },
      backgroundImage: {
        'Background': "url('../src/Assets/Bg_Im.png')",
        'hero-pattern': "url('../src/Assets/hero-pattern.png')", // Custom hero pattern
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '108': '27rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'lg': '0.5rem',
        'xl': '1rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      boxShadow: {
        'custom-light': '0 2px 4px rgba(255, 255, 255, 0.1)',
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.5)',
      },
      zIndex: {
        'max': '9999',
      },
      opacity: {
        '85': '0.85',
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        spinSlow: 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
  ],
}
