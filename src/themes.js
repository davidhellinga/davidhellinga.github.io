import { createMuiTheme } from "@material-ui/core/styles";
import { blue, grey, yellow } from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue,
    secondary: {
      main: grey[50],
      light: grey[50],
      dark: grey[50]
    }
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: yellow,
    secondary: {
      main: grey[50],
      light: grey[50],
      dark: grey[50]
    }
  }
});