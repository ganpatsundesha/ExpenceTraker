import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddCard } from "./AddExpanceCard.style";
import { useEntryData } from "../../Context/Context";
import { ExpanceType, IncomeType, TypeOfEntry } from "../../Constant/Constant";
import Cookies from "js-cookie";

export const AddExpanceCard = ({ register, handleSubmit, errors, reset }) => {
    const data = useEntryData();
    // const { register, handleSubmit, formState: { errors }, reset } = useForm({
    //     defaultValues: {
    //         Title: "",
    //         Catogary: "",
    //     },
    // });

    const submit = (curEntry) => {
        console.log(curEntry);
        if (data.editId) {
            data.setEntry(data.entry.map((curItem) => {
                if (curItem.id === data.editId) {
                    data.setEditId(null)
                    data.setIsEdit(false)
                    return {
                        ...data.entry, Title: curItem.Title, Money: curItem.Money, Catogary: curItem.Catogary, CatogaryType: curItem.CatogaryType,
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
            reset();
        }
    };

    useEffect(() => {
        const curIncome = data.entry.reduce((sum, item) => {
            if (item.Catogary === "Income") {
                return sum + parseInt(item.Money);
            }
            return data.calculation.income;
        }, 0);

        const curExpance = data.entry.reduce((sun, item) => {
            if (item.Catogary === "Expense") {
                return sun + parseInt(item.Money);
            }
            return data.calculation.expance;
        }, 0);

        data.setCalculation({
            income: curIncome,
            expance: curExpance,
            total: curIncome - curExpance,
        });

    }, [data.entry]);
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
                                {
                                    onChange: (e) => {
                                        data.setCategory(e.target.value);
                                    },
                                },
                                { required: "Category Is Required*" }
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
                    {data.category === "Income" ? (
                        <>
                            <FormControl fullWidth>
                                <InputLabel sx={{ background: "#fff", padding: "0 7px 0 0" }} id="demo-simple-select-label">
                                    Choose Type
                                </InputLabel>
                                <Select
                                    defaultValue=""
                                    label="CatogaryType"
                                    {...register("CatogaryType", {
                                        required: "Category Is Required*",
                                    })}
                                >
                                    {IncomeType.length > 0 &&
                                        IncomeType.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </>
                    ) : (
                        <>
                            <FormControl fullWidth>
                                <InputLabel sx={{ background: "#fff", padding: "0 7px 0 0" }} id="demo-simple-select-label">
                                    Choose Type
                                </InputLabel>
                                <Select
                                    defaultValue=""
                                    label="CatogaryType"
                                    {...register("CatogaryType", {
                                        required: "Category Is Required*",
                                    })}
                                >
                                    {ExpanceType.length > 0 &&
                                        ExpanceType.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </>
                    )}
                    <Typography sx={{ color: "red", mt: "0 !important" }}>{errors.CatogaryType?.message}</Typography>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </AddCard>
    );
};
