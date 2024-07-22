import { Box, styled } from "@mui/material";
import theme from "../../Theme/Theme";
import { Block } from "@mui/icons-material";

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
        backgroundPosition: 'center center',
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
        [theme.breakpoints.down('mxs')]: {
            padding: '20px 16px',
        }
    },

    '& h1': {
        textAlign: 'center',
        color: theme.palette.white.main,
        [theme.breakpoints.down('sm')]: {
            fontSize: '40px',
            marginBottom: '30px',
        },
        [theme.breakpoints.down('mxs')]: {
            fontSize: '35px',
        },
    },

    '& h3': {
        textAlign: 'center',
        color: theme.palette.white.main,
        margin: '30px 0',
    },

    '& .filterBox': {
        border: 'none',
        padding: '5px 12px',
        fontSize: '18px',
        outline: 'none',
    },
    '& .MuiInputBase-input ': {
        color: theme.palette.white.main,
        borderColor: theme.palette.white.main,
    },
    '& fieldset': {
        borderColor: theme.palette.white.main
    },
    '& .MuiInputLabel-formControl ': {
        color: theme.palette.white.main
    },
    '& .css-55wkek-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.white.main
    },
    '& .css-13izd6v-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: theme.palette.white.main
    },
    '& svg': {
        position: 'absolute',
        // background: '#000',
        // padding: '3px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.down('mxs')]: {
            position: 'unset',
            transform: 'none'
        },
    },
    '& .exCard:hover svg': {
        display: 'block',
    }
}))