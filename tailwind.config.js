module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    order: {
      normal: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
    },
    extend: {
      colors: {
        'ap-green': '#4ad425',
        'ap-purple': '#9449fb',
        'ap-red': '#fd475d',
        'ap-blue': '#2d8dfa'
      }
    },
  },
  variants: {
    opacity: ['group-hover'],
    height: ['group-hover'],
    display: ['group-hover'],
    visibility: ['group-hover']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
