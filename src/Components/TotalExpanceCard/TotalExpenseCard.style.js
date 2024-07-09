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
        opacity: 0.4,
        zIndex: 1,
    },

    '& .MuiContainer-root ': {
        position: 'relative',
        padding: '40px 60px',
        zIndex: 9,
        minHeight: '100vh',
        '&:after': {
            content: "''",
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: theme.palette.primary.main,
            opacity: 0.8,
            boxShadow: 'inset 0 0 0 0 rgba(255, 255, 255, 0.2)',
            filter: 'blur(10px)',
            zIndex: 1,
        }
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

export const AddCard = styled(Box)(({ theme }) => ({
    '& .MuiOutlinedInput-input ': {

    },

    '& button': {
        '&:hover': {
            background: '#3d5afe',
            color: '#fff',
        }
    },
}))