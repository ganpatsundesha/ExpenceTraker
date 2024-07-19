import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Chip, Container, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import { ExpenseCard } from "./TotalExpenseCard.style";
import theme from "../../Theme/Theme";
import { useEntryData } from "../../Context/Context";
import { useForm } from "react-hook-form";
import { AddExpenseCard } from "../AddExpanceCard/AddExpenseCard";
import Cookies from "js-cookie";
import { Delete } from "@mui/icons-material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "50%",
    width: "100%",
    minWidth: "500px",
    bgcolor: "#fff",
    boxShadow: 24,
    p: 4,

    xs: {
        minWidth: '320px',
    }
};

export const TotalExpenseCard = () => {
    const [search, setSearch] = useState("");
    const data = useEntryData();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            Title: "",
            Money: "",
            Category: [],
            CatogaryType: [],
        },
    });

    const handleOpen = () => data.setOpen(true);
    const handleClose = () => {
        data.setOpen(false);
        data.setEditId(null);
        data.setIsEdit(false);
        reset({
            Title: "",
            Money: "",
            Category: [],
            CatogaryType: [],
        });
    };

    const handleEdit = (newItem) => () => {
        data.setOpen(true);
        data.setIsEdit(true);
        data.setEditId(newItem);
    };

    const handleChange = (event) => {
        setSearch(event);
    };

    const handleDelete = (id) => {
        const newData = data.entry.filter((item) => item.id !== id)
        data.setEntry(newData)
        console.log(data);
    }

    const oldEntery = useMemo(() => JSON.parse(Cookies.get('data')), [])

    useEffect(() => {
        const searedData = data.entry.filter((elem) => {
            if (elem.Title.includes(search)) {
                return elem
            }
        })

        if (search === "") {
            data.setEntry(oldEntery)
        }
        if (searedData.length > 0) {
            data.setEntry(searedData)
        }
        if (searedData.length === 0 && search.length > 0) {
            data.setEntry([])
        }
    }, [search])

    return (
        <ExpenseCard component="section">
            <Container>
                <Box sx={{ position: "relative", zIndex: 9 }}>
                    <Typography variant="h1">Expense Tracker</Typography>
                    <Stack direction="row" sx={{ mt: 2, justifyContent: "space-between" }}>
                        <Typography sx={{ color: "#fff", textAlign: "center", mb: 1, p: "10px 30px", background: "red", borderRadius: "50px" }} variant="h6">
                            Spending: ₹ {data.calculation.Expense}
                        </Typography>
                        <Typography sx={{ color: "#fff", textAlign: "center", mb: 1, p: "10px 30px", background: "green", borderRadius: "50px" }} variant="h6">
                            Income: ₹ {data.calculation.Income}
                        </Typography>
                    </Stack>
                    <Typography sx={{ color: "#fff", textAlign: "center", m: "0 auto 24px auto", p: "10px 30px", background: "#605d5d", borderRadius: "50px", width: "max-content" }} variant="h6">
                        Total Balance: ₹ {data.calculation.Total}
                    </Typography>
                    <Box sx={{ textAlign: "center" }}>
                        <Button onClick={handleOpen}>Add Income/Expense</Button>
                    </Box>
                    <Stack direction="row" sx={{ my: 2, justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ color: theme.palette.white.main, my: 2, fontSize: "20px", fontWeight: 600 }}>
                            {data.entry.length > 0 ? "Transactions" : "Pls Add Your Transactions"}
                        </Typography>
                        {oldEntery.length > 0 && (
                            <form>
                                <TextField onChange={(e) => handleChange(e.target.value)} sx={{ color: "#fff", borderColor: "#fff" }} label="Search" />
                            </form>
                        )}
                    </Stack>
                    {
                        data.entry.length <= 0 && search.length > 0 ? <><Typography variant="h3">Result Not Found!</Typography></> : <></>
                    }
                    <Stack spacing={3}>
                        {data.entry.length > 0 &&
                            data.entry.map((item, index) => {
                                return (
                                    <Grid className="exCard" key={index} onClick={handleEdit(item.id)} container
                                        sx={{
                                            cursor: "pointer", position: "relative", border: "2px solid #fff", p: 2, color: theme.palette.white.main,
                                            fontSize: "16px", fontWeight: 600, borderRadius: 2,
                                            background: item.Category === "Income" ? "green" : "red",
                                        }}>
                                        <Grid item xs={6}>
                                            {item.CatogaryType}{" "}
                                            <Typography variant="body2" sx={{ display: "inline-block" }}>
                                                ({item.Title})
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: "end" }}>
                                            ₹ {item.Money}
                                        </Grid>
                                        <Delete onClick={() => handleDelete(item.id)} />
                                    </Grid>
                                );
                            })}
                    </Stack>
                    <Modal open={data.open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <AddExpenseCard register={register} handleSubmit={handleSubmit} errors={errors} reset={reset} setValue={setValue} handleEdit={handleEdit} />
                        </Box>
                    </Modal>
                </Box>
            </Container>
        </ExpenseCard>
    );
};
