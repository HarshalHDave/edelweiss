import { createTheme } from "@mui/material/styles";

// Dark Theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#28032e", // Purple
      light: "#44024f", // Light Purple
      dark: "#1e001f", // Dark Purple
    },
    secondary: {
      main: "#071d33", // Dark Blue
      light: "#032a52", // Light Blue
      dark: "#000a1a", // Darker Blue
    },
    error: {
      main: "#8c0707", // Red
      light: "#b70e0e", // Light Red
      dark: "#5e0000", // Dark Red
    },
    warning: {
      main: "#f0aa0a", // Orange
      light: "#f0c40a", // Light Orange
      dark: "#b78100", // Dark Orange
    },
    info: {
      main: "#0a4ff5", // Blue
      light: "#0a7af5", // Light Blue
      dark: "#073a9f", // Dark Blue
    },
    success: {
      main: "#26f07b", // Light Green
      light: "#2df07b", // Lighter Green
      dark: "#1fa35d", // Dark Green
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#212121", // Dark paper color
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#757575", // Gray
      disabled: "#BDBDBD", // Light Gray      
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
      color: "#F3E5F5", // Light Purple
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      color: "#9C27B0", // Purple
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
      color: "#FFFFFF", // White
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0em",
      color: "#FFFFFF", // White
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
      color: "#FFFFFF", // White
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      color: "#FFFFFF", // White
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
      color: "#FFFFFF", // White
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      color: "#FFFFFF", // White
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
      color: "#FFFFFF", // White
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      color: "#FFFFFF", // White
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      color: "#FFFFFF", // White
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
      color: "#FFFFFF", // White
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
            backgroundColor: "#9C27B0", // Purple
            "&:hover": {
              backgroundColor: "#7B1FA2", // Darker shade of purple
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            color: "#9C27B0", // Purple
            borderColor: "#9C27B0", // Purple
            "&:hover": {
              borderColor: "#7B1FA2", // Darker shade of purple
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: { variant: "text", color: "primary" },
          style: {
            color: "#9C27B0", // Purple
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
