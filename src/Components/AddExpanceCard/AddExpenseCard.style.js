import { Box, styled } from "@mui/material";

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