import {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
};

export const EditableSpan = ({value, onChange}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode
                ? <TextField
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    variant="standard"
                    size="small"
                    value={title}
                    autoFocus
                />
                : <span>{value}</span>
            }
            <IconButton
                onClick={activateEditModeHandler}
            >
                <CreateIcon/>
            </IconButton>
        </>
    );
};
