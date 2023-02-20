import { createMuiTheme } from '@material-ui/core/styles'
import { red, brown } from '@material-ui/core/colors'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        light: '#ffffff',
        main: '#ffffff',
        dark: '#fffffff',
        contrastText: '#fff',
      },
      secondary: {
        light: '#000000',
        main: '#000000',
        dark: '#000000',
        contrastText: '#0000000',
      },
      info: {
        light: '#ffffff',
        main: '#ffffff',
        dark: '#fffffff'
      },
        openTitle: red['500'],
        protectedTitle: brown['300'],
        type: 'light'
      },
    })

  export default theme