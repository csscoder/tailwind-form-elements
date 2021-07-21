module.exports = {
  mode: 'jit',
  purge: {
    content: ['./components/**/*'],
  },
  theme: {
    extend: {
      spacing: {
        e1: '0.25em',
        e2: '0.5em',
        e3: '0.75em',
        e4: '1em',
        e5: '1.25em',
        e6: '1.5em',
        e7: '1.75em',
        e8: '2em',
        e9: '2.25em',
        e10: '2.5em',
      },
    },
    container: {},
  },
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
