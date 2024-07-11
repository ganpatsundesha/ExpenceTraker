import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddCard } from "./AddExpanceCard.style";
import { useEntryData } from "../../Context/Context";
import { ExpanceType, IncomeType, TypeOfEntry } from "../../Constant/Constant";
import Cookies from "js-cookie";

export const AddExpanceCard = ({ register, handleSubmit, errors, reset, setValue }) => {
    const data = useEntryData();

    const submit = (curEntry) => {
        if (data.editId) {
            data.setEntry(data.entry.map((curItem) => {
                if (curItem.id === data.editId) {
                    data.setEditId(null)
                    data.setIsEdit(false)
                    return {
                        ...curItem, Title: curEntry.Title, Money: curEntry.Money, Catogary: curEntry.Catogary, CatogaryType: curEntry.CatogaryType
                    }
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
                Catogary: [],
                CatogaryType: [],
            })
        }
    };

    useEffect(() => {
        const curIncome = data.entry.reduce((sum, item) => {
            if (item.Catogary === "Income") {
                return sum + parseInt(item.Money);
            }
            return sum;
        }, 0);

        const curExpance = data.entry.reduce((sum, item) => {
            if (item.Catogary === "Expense") {
                return sum + parseInt(item.Money);
            }
            return sum;
        }, 0);

        data.setCalculation({
            income: curIncome,
            expance: curExpance,
            total: curIncome - curExpance,
        });

    }, [data.entry, data.editId, data.isedit]);

    useEffect(() => {
        if (data.editId) {
            const editItem = data.entry.filter((curItem) => {
                return curItem.id === data.editId
            })
            if (editItem) {
                reset({
                    Title: editItem[0].Title,
                    Money: editItem[0].Money,
                    Catogary: editItem[0].Catogary,
                    CatogaryType: editItem[0].CatogaryType,
                })
            }
        }
    }, [data.editId, data.isedit])

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
                            Income/Expance
                        </InputLabel>
                        <Select
                            defaultValue=""
                            label="Catogary"
                            {...register(
                                "Catogary",
                                { required: "Category Is Required*" },
                                {
                                    onChange: (e) => {
                                        data.setCategory(e.target.value);
                                    },
                                },
                            )}
                        >
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
                    <Typography sx={{ color: "red", mt: "0 !important" }}>{errors.Catogary?.message}</Typography>
                    <FormControl fullWidth>
                        <InputLabel sx={{ background: "#fff", padding: "0 7px 0 0" }} id="demo-simple-select-label">Choose Type</InputLabel>
                        <Select defaultValue="" label="CatogaryType"
                            {...register("CatogaryType", { required: "Category Type Is Required*" })}>
                            {data.category === 'Expense' ? ExpanceType.map((item, index) => {
                                return (<MenuItem key={index} value={item}>{item}</MenuItem>)
                            }) :
                                IncomeType.map((item, index) => {
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
