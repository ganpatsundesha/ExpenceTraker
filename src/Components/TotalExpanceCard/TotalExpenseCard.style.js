import { Box, styled } from "@mui/material";
import theme from "../../Theme/Theme";

export const ExpenseCard = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    position: 'relative',
    zIndex: 9,

    '&:after': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url(/Image/ExpenseImage.jpg)',
        backgroundSize: 'cover',
        opacity: 0.2,
        zIndex: 1,
    },

    '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: theme.palette.primary.main,
        zIndex: 1,
    },

    '& .MuiContainer-root ': {
        position: 'relative',
        padding: '40px 60px',
        zIndex: 9,
        minHeight: '100vh',
    },

    '& h1': {
        textAlign: 'center',
        color: theme.palette.white.main,
    },

    '& h3': {
        textAlign: 'center',
        color: theme.palette.white.main,
        margin: '30px 0',
    },
}))