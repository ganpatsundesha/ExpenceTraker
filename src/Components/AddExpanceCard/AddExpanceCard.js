import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddCard } from './AddExpanceCard.style'

export const AddExpanceCard = () => {
    const [entry, setEntry] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm()
    const submit = (data) => {
        setEntry((prev) => ([...prev, { ...data }]))
    }
    console.log(entry);
    return (
        <AddCard>
            <Typography variant='h6' sx={{ mb: 2, color: '#fb9543', }}>Add Your Income/Expense</Typography>
            <form onSubmit={handleSubmit(submit)}>
                <Stack spacing={3}>
                    <TextField label='Title' {...register('Title', { required: 'Title is Required*' })} />
                    <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.Title?.message}</Typography>
                    <TextField label='Money' type='number' {...register('Money', { required: 'Money is Required*' })} />
                    <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.Money?.message}</Typography>
                    <FormControl fullWidth>
                        <InputLabel sx={{ background: '#fff', padding: '0 7px 0 0', }} id="demo-simple-select-label">Incomde/Expance</InputLabel>
                        <Select label="Catogary" {...register('Catogary', { required: 'Category Is Required*' })}>
                            <MenuItem value={'Income'}>Income</MenuItem>
                            <MenuItem value={'Expance'}>Expance</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography sx={{ color: "red", mt: '0 !important' }}>{errors.Catogary?.message}</Typography>
                    <Button type='submit'>Submit</Button>
                </Stack>
            </form>
        </AddCard>
    )
}