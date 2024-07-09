import { Box, Button, Container, Grid, Modal, Stack, Typography, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ExpenseCard } from './TotalExpenseCard.style'
import theme from '../../Theme/Theme'
import { useForm } from 'react-hook-form'
import { AddCard } from './TotalExpenseCard.style'
import { AddExpanceCard } from '../AddExpanceCard/AddExpanceCard'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '50%',
    width: '100%',
    minWidth: '500px',
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
};

export const TotalExpenseCard = () => {
    const [entry, setEntry] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const [calculation, setCalculation] = useState({
        income: 0,
        expance: 0,
        total: 0,
    })


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            Title: '',
            Catogary: ''
        }
    })
    const submit = (data) => {
        setEntry((prev) => ([...prev, { ...data }]))
        reset()
    }

    useEffect(() => {
        const curIncome = entry.reduce((sum, item) => {
            if (item.Catogary === 'Income') {
                return sum + parseInt(item.Money)
            }
            return calculation.income
        }, 0)

        const curExpance = entry.reduce((sun, item) => {
            if (item.Catogary === 'Expance') {
                return sun + parseInt(item.Money)
            }
            return calculation.expance
        }, 0)

        setCalculation({
            income: curIncome,
            expance: curExpance,
            total: curIncome - curExpance,
        })

    }, [entry])

    console.log(entry);
    return (
        <ExpenseCard component='section'>
            <Container>
                <Box sx={{ position: 'relative', zIndex: 9, }}>
                    <Typography variant='h1'>Expense Tracker</Typography>
                    <Typography sx={{ color: '#fff', textAlign: 'center', mb: 1, mt: 2 }} variant='h6'>Total Income: ₹ {calculation.income}</Typography>
                    <Typography sx={{ color: '#fff', textAlign: 'center', mb: 1 }} variant='h6'>Total Expance: ₹ {calculation.expance}</Typography>
                    <Typography sx={{ color: '#fff', textAlign: 'center', mb: 3 }} variant='h6'>Total Balance: ₹ {calculation.total}</Typography>
                    <Box sx={{ textAlign: 'center', }}>
                        <Button onClick={handleOpen}>Add Income/Expense</Button>
                    </Box>
                    <Typography variant='body1' sx={{ color: theme.palette.white.main, my: 2, fontSize: '20px', fontWeight: 600, }}>{entry.length > 0 ? 'Transactions' : 'Pls Add Your Transactions'}</Typography>
                    <Stack spacing={3}>
                        {
                            entry.length > 0 && entry.map((item, index) => {
                                return (
                                    <Grid key={index} container sx={{ border: '2px solid #fff', p: 2, color: theme.palette.white.main, fontSize: '16px', fontWeight: 600, borderRadius: 2, background: item.Catogary === 'Income' ? 'green' : 'red' }}>
                                        <Grid item xs={6}>{item.CatogaryType}</Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'end', }}>₹ {item.Money}</Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Stack>
                    <Modal open={open} onClose={handleOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            {/* <AddExpanceCard /> */}
                            <AddCard>
                                <Typography variant='h6' sx={{ mb: 2, color: '#fb9543', }}>Add Your Income/Expense</Typography>
                                <form onSubmit={handleSubmit(submit)}>
                                    <Stack spacing={3}>
                                        <TextField label='Title' {...register('Title', { required: 'Title is Required*' })} />
                                        <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.Title?.message}</Typography>
                                        <TextField label='Money' type='number' {...register('Money', { required: 'Money is Required*' })} />
                                        <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.Money?.message}</Typography>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{ background: '#fff', padding: '0 7px 0 0', }} id="demo-simple-select-label">Income/Expance</InputLabel>
                                            <Select defaultValue="" label="Catogary" {...register('Catogary', { required: 'Category Is Required*' })}>
                                                <MenuItem value={'Income'}>Income</MenuItem>
                                                <MenuItem value={'Expance'}>Expense</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.Catogary?.message}</Typography>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{ background: '#fff', padding: '0 7px 0 0', }} id="demo-simple-select-label">Choose Type</InputLabel>
                                            <Select defaultValue="" label="CatogaryType" {...register('CatogaryType', { required: 'Category Is Required*' })}>
                                                <MenuItem value={'Salary'}>Salary</MenuItem>
                                                <MenuItem value={'Food'}>Food</MenuItem>
                                                <MenuItem value={'Travel'}>Travel</MenuItem>
                                                <MenuItem value={'Bills'}>Bills</MenuItem>
                                                <MenuItem value={'Rent'}>Rent</MenuItem>
                                                <MenuItem value={'Home Expance'}>Home Expance</MenuItem>
                                                <MenuItem value={'Personal care'}>Personal care</MenuItem>
                                                <MenuItem value={'Gift'}>Gift</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.CatogaryType?.message}</Typography>
                                        <Button type='submit'>Submit</Button>
                                    </Stack>
                                </form>
                            </AddCard>
                        </Box>
                    </Modal>
                </Box>
            </Container>
        </ExpenseCard>
    )
}