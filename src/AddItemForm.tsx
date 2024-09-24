import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Grid2, TextField} from "@mui/material";


type PropsType = {
	addItem: (title:string) => void
	value: string;
}

export const AddItemForm = ({addItem, value}: PropsType) => {

	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}
	return (
		<Grid2 justifyContent="center" alignItems="center" style={{ marginBottom: 30 }} >
			<TextField
				variant="outlined"
				value={title}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
				label={value}
				size={'small'}
				helperText={error}
				error={!!error}
				style={{ marginRight: 30 }}
			/>
			<Button
				variant='contained'
				color="success"
				onClick={addItemHandler}
			>
				{value}
			</Button>
		</Grid2>
	)
}


