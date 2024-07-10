import React from 'react'
import { TotalExpenseCard } from './Components/TotalExpanceCard/TotalExpanceCard'
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/Theme'
import { EntryProvider } from './Context/Context'

export const App = () => {
    return (
        <EntryProvider>
            <ThemeProvider theme={theme}>
                <TotalExpenseCard />
            </ThemeProvider>
        </EntryProvider>
    )
}