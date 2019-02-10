import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: cyan['A400'],
    },
  },
  typography: {
    useNextVariants: true,
    h6: {
      fontSize: "1.375rem",
      fontWeight: "400",
    },
  },
  overrides: {
    MuiFormControl: {
      root: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    MuiInputLabel: {
      formControl: {
        left: '8px',
      },
    },
    MuiInput: {
      root: {
        width: '100%',
      },
    },
    MuiCard: {
      root: {
        marginTop: '8px',
        marginBottom: '8px',
      },
    },
    MuiButton: {
      root: {
        marginTop: '16px',
        marginBottom: '16px',
      },
    },
  },
});

export default theme;
