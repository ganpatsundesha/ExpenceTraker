import { createContext, useContext, useState } from "react";

export const EntryContext = createContext(null)

export const useEntryData = () => {
    const entryData = useContext(EntryContext)
    return entryData
}

export const EntryProvider = (props) => {
    const [entry, setEntry] = useState([])
    const [category, setCategory] = useState('')
    const [open, setOpen] = useState(false)
    const [isedit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [calculation, setCalculation] = useState({
        income: 0,
        expance: 0,
        total: 0,
    })

    return (
        <EntryContext.Provider value={{
            entry, setEntry, setCategory, category, calculation,
            setCalculation, setOpen, open, isedit, setIsEdit, editId, setEditId
        }}>
            {
                props.children
            }
        </EntryContext.Provider>
    )
}