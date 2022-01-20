import { Theme } from "react-native-elements";
import { Colors } from "react-native-elements";

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

const theme: Theme = {
  colors: {
    primary: '#F06543',
    secondary: '#2F2E41',
    success: '#27AE60',
    error: '#E74C3C',
    warning: '#E67E22'
  },
  Card: {
    containerStyle: {
      borderRadius: 12,
      borderColor: "#C8C8C8"
    },
    wrapperStyle: {
      elevation: 6
    }
  },
  FAB: {
    color: '#F06543'
  }
}

export { navigationTheme }
export default theme