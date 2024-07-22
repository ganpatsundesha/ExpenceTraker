import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3d5afe'
        },
        secondary: {
            main: '#fb9543'
        },
        black: {
            main: '#000'
        },
        white: {
            main: '#fff'
        },
    },
    typography: {
        fontFamily: '',
        h1: {
            fontWeight: 700,
            fontSize: '48px',
            fontFamily: "Outfit",
        },
        h2: {
            fontWeight: 700,
            fontSize: '40px',
            ontFamily: "Outfit",
        },
        h3: {
            fontWeight: 700,
            fontSize: '26px',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: 'capitalize',
                    padding: '14px 28px',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#fff',
                    background: '#fb9543',
                    transition: 'all 0.4s',

                    '&:hover': {
                        color: '#3d5afe',
                        background: '#fff',
                    }
                }
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            mxs: 600,
            sm: 767,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default theme