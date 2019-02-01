import { createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';
import deepOrange from '@material-ui/core/colors/deepOrange';

export default createMuiTheme({
  palette: {
    primary: brown,
    secondary: deepOrange,
  },
  typography: {
    useNextVariants: true,
  },
});
