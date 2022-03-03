
import { extendTheme } from "native-base";

const navigationTheme = {
  dark: false,
  colors: {
    primary: '#F06543',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#2F2E41',
    border: '#C8C8C8',
    notification: '#F06543'
  },
};

const theme = extendTheme({
  colors: {
    primary: {
      50: '#ffe9e1',
      100: '#fdc4b6',
      200: '#f79e88',
      300: '#f2785a',
      400: '#ed522b',
      500: '#F06543',
      600: '#a52b0d',
      700: '#771e08',
      800: '#491003',
      900: '#1f0200',
    },
    secondary: {
      50: '#efeffc',
      100: '#d3d2e1',
      200: '#b5b4ca',
      300: '#9896b4',
      400: '#7b799e',
      500: '#615f84',
      600: '#4c4a68',
      700: '#36354b',
      800: '#20202f',
      900: '#0a0a16',
    },
    tertiary: {
      50: '#e0edff',
      100: '#b1c9ff',
      200: '#7fa5ff',
      300: '#4d81ff',
      400: '#1e5dfe',
      500: '#0744e5',
      600: '#0035b3',
      700: '#002681',
      800: '#001750',
      900: '#000820',
    }
  },
  fontConfig: {
    NotoSans: {
      100: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic'
      },
      200: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic'
      },
      300: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic'
      },
      400: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic'
      },
      500: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic'
      },
      600: {
        normal: 'NotoSans-Regular',
        italic: 'NotoSans-Italic'
      },
      700: {
        normal: 'NotoSans-Bold',
        italic: 'NotoSans-BoldItalic'
      },
      800: {
        normal: 'NotoSans-Bold',
        italic: 'NotoSans-BoldItalic'
      },
      900: {
        normal: 'NotoSans-Bold',
        italic: 'NotoSans-BoldItalic'
      },
    },
    OpenSans: {
      100: {
        normal: 'OpenSans-Light',
        italic: 'OpenSans-LightItalic'
      },
      200: {
        normal: 'OpenSans-Light',
        italic: 'OpenSans-LightItalic'
      },
      300: {
        normal: 'OpenSans-Light',
        italic: 'OpenSans-LightItalic'
      },
      400: {
        normal: 'OpenSans-Regular',
        italic: 'OpenSans-Italic'
      },
      500: {
        normal: 'OpenSans-Medium',
        italic: 'OpenSans-MediumItalic'
      },
      600: {
        normal: 'OpenSans-SemiBold',
        italic: 'OpenSans-SemiBoldItalic'
      },
      700: {
        normal: 'OpenSans-Bold',
        italic: 'OpenSans-BoldItalic'
      },
      800: {
        normal: 'OpenSans-Bold',
        italic: 'OpenSans-BoldItalic'
      },
      900: {
        normal: 'OpenSans-ExtraBold',
        italic: 'OpenSans-ExtraBoldItalic'
      },
    }
  },
  fonts: {
    heading: 'NotoSans',
    body: 'OpenSans',
    mono: 'OpenSans'
  },
  components: {
    Box: {
      variants: {
        card: () => {
          return {
            shadow: 6,
            rounded: "lg",
            overflow: "hidden",
            borderWidth: 1,
            _dark: {
              borderColor: "coolGray.600",
              backgroundColor: "gray.800"
            },
            _light: {
              borderColor: "coolGray.200",
              backgroundColor: "gray.50"
            }
          }
        }
      }
    },
    Button: {
      defaultProps: {
        _loading: {
          bg: "primary.300",
          _text: {
            color: "white"
          },
          _spinner: {
            color: "white"
          }
        }
      }
    }
  }
})

export { navigationTheme }
export default theme