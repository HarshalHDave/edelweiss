import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9C27B0", // Pruple
    },
    secondary: {
      main: "#1C3E60", // Dark Blue
    },
    error: {
      main: "#FF5757", // Red
    },
    warning: {
      main: "#FFC02E", // Orange
    },
    info: {
      main: "#366EF3", // Blue
    },
    success: {
      main: "#27AE60", // Light Green
    },
    background: {
      default: "#F7F9FB", // Light Gray
      paper: "#FFFFFF", // White
    },
    text: {
      primary: "#212121", // Dark Gray
      secondary: "#757575", // Gray
    },
    divider: "#E0E0E0", // Light Gray
  },
  typography: {
    fontFamily: "Mulish, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
      color: "#5F186C", // Darker shade of purple
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      color: "#9C27B0", // Default purple color
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0em",
      color: "#C767C3", // Lighter shade of purple
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "#FFFFFF",
            backgroundColor: "#02A04E",
            "&:hover": {
              backgroundColor: "#02863F",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            color: "#02A04E",
            borderColor: "#02A04E",
            "&:hover": {
              borderColor: "#02863F",
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: { variant: "text", color: "primary" },
          style: {
            color: "#02A04E",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "collapse",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E0E0E0",
          "&:first-child": {
            paddingLeft: "16px",
          },
          "&:last-child": {
            paddingRight: "16px",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#F5F5F5",
          },
        },
      },
    },
  },
});

export default theme;
