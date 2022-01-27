import { Theme } from "react-native-elements";

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
  Text: {
    h1Style: {
      fontFamily: "NotoSans-Bold",
      fontSize: 25,
      flex: 1,
    },
    h2Style: {
      fontFamily: "NotoSans-Bold",
      fontSize: 15,
      flex: 1
    },
    h3Style: {
      fontFamily: "NotoSans-Regular",
      fontSize: 12,
      flex: 1
    },
    h4Style: {
      fontFamily: "OpenSans-Regular",
      fontSize: 10,
      flex: 1
    }
  },
  Button: {
    containerStyle: {
      backgroundColor: '#F06543',
      borderRadius: 10
    },
    titleStyle: {
      color: 'white'
    },
    iconContainerStyle: {
      marginRight: 10
    }
  },
  Card: {
    containerStyle: {
      borderRadius: 12,
      borderColor: "#C8C8C8",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 6
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