import React from 'react'
import { TotalExpenseCard } from './Components/TotalExpanceCard/TotalExpanceCard'
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/Theme'

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <TotalExpenseCard />
        </ThemeProvider>
    )
}