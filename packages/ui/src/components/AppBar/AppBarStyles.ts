import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "transparent !important",
      boxShadow: "none",
      color: theme.palette.common.white,
      width: "100%",
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    logo: {
      backgroundColor: "transparent !important",
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    grow: {
      flexGrow: 1,
    },
    button: {
      textTransform: "none",
      margin: theme.spacing(1),
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        margin: theme.spacing(1),
      },
    },
  }),
);

export default AppHeaderStyles;