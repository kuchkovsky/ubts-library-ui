export const formStyles = (width = 500, otherProps = () => {}) =>
  theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    infoMessageWrapper: {
      marginTop: theme.spacing.unit,
      height: 48,
    },
    ...otherProps(theme),
  });

export default formStyles;
