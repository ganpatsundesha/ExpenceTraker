import React from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/Theme'
import { EntryProvider } from './Context/Context'
import { TotalExpenseCard } from './Components/TotalExpanceCard/TotalExpenseCard'

export const App = () => {
    return (
        <EntryProvider>
            <ThemeProvider theme={theme}>
                <TotalExpenseCard />
            </ThemeProvider>
        </EntryProvider>
    )
}