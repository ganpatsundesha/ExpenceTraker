import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddCard } from "./AddExpenseCard.style";
import { useEntryData } from "../../Context/Context";
import { ExpenseType, IncomeType, TypeOfEntry } from "../../Constant/Constant";
import Cookies from "js-cookie";

export const AddExpenseCard = ({ register, handleSubmit, errors, reset }) => {
    const data = useEntryData();

    const submit = (curEntry) => {
        if (data.editId) {
            data.setEntry(data.entry.map((curItem) => {
                if (curItem.id === data.editId) {
                    data.setEditId(null)
                    data.setIsEdit(false)
                    reset({
                        Title: '',
                        Money: '',
                        Category: [],
                        CatogaryType: [],
                    })
                    // data.setOpen(false);
                    return { ...curItem, Title: curEntry.Title, Money: curEntry.Money, Category: curEntry.Category, CatogaryType: curEntry.CatogaryType }
                }
                else {
                    return curItem
                }
            })
            )
        }
        else {
            data.setEntry((prev) => [...prev, { ...curEntry, id: Date.now() }]);
            reset({
                Title: '',
                Money: '',
                Category: [],
                CatogaryType: [],
            })
            // data.setOpen(false);
        }
    };

    useEffect(() => {
        const curIncome = data.entry.reduce((sum, item) => {
            if (item.Category === "Income") {
                return sum + parseInt(item.Money);
            }
            return sum;
        }, 0);

        const curExpense = data.entry.reduce((sum, item) => {
            if (item.Category === "Expense") {
                return sum + parseInt(item.Money);
            }
            return sum;
        }, 0);

        data.setCalculation({
            Income: curIncome,
            Expense: curExpense,
            Total: curIncome - curExpense,
        });

    }, [data.entry, data.editId, data.isEdit]);

    useEffect(() => {
        if (data.editId) {
            const editItem = data.entry.filter((curItem) => {
                return curItem.id === data.editId
            })
            if (editItem) {
                reset({
                    Title: editItem[0].Title,
                    Money: editItem[0].Money,
                    Category: editItem[0].Category,
                    CatogaryType: editItem[0].CatogaryType,
                })
            }
        }
    }, [data.editId, data.isEdit])

    return (
        <AddCard>
            <Typography variant="h6" sx={{ mb: 2, color: "#fb9543" }}>
                Add Your Income/Expense
            </Typography>
            <form onSubmit={handleSubmit(submit)}>
                <Stack spacing={3}>
                    <TextField label="Title" {...register("Title", { required: "Title is Required*" })} />
                    <Typography sx={{ color: "red", mt: "0 !important" }}>{errors.Title?.message}</Typography>
                    <TextField label="Money" type="number" {...register("Money", { required: "Money is Required*" })} />
                    <Typography sx={{ color: "red", mt: "0 !important" }}>{errors.Money?.message}</Typography>
                    <FormControl fullWidth>
                        <InputLabel sx={{ background: "#fff", padding: "0 7px 0 0" }} id="demo-simple-select-label">
                            Income/Expense
                        </InputLabel>
                        <Select
                            defaultValue=""
                            label="Category"
                            {...register("Category", { required: 'Category Is Required*', onChange: (e) => { data.setCategory(e.target.value) } })}>
                            {TypeOfEntry.length > 0 &&
                                TypeOfEntry.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <Typography sx={{ color: "red", mt: "0 !important" }}>{errors.Category?.message}</Typography>
                    <FormControl fullWidth>
                        <InputLabel sx={{ background: "#fff", padding: "0 7px 0 0" }} id="demo-simple-select-label">Choose Type</InputLabel>
                        <Select defaultValue="" label="CatogaryType"
                            {...register("CatogaryType", { required: "Category Type Is Required*" })}>
                            {data.category === 'Income' ? IncomeType.map((item, index) => {
                                return (<MenuItem key={index} value={item}>{item}</MenuItem>)
                            }) :
                                ExpenseType.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <Typography sx={{ color: "red", mt: "0 !important" }}>{errors.CatogaryType?.message}</Typography>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </AddCard>
    );
};
