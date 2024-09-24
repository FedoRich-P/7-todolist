import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid2, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTodolist
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskCallback = (title: string) => {
        addTask(title, props.todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(props.todolistId, title)
    }

    return (
        <>
            <Grid2 container justifyContent="space-between" alignItems="center" style={{marginBottom: 15}}>
                <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
                <Button
                    color="error"
                    variant='contained'
                    startIcon={<DeleteIcon/>}
                    onClick={removeTodolistHandler}>Delete</Button>
            </Grid2>
            <AddItemForm
                value={'Add task'}
                addItem={addTaskCallback}
            />
            <Grid2 container justifyContent={'space-around'} style={{marginBottom: 15}}>
                <Button
                    // className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('all')}
                    variant='contained'
                    color="success"
                >
                    All
                </Button>
                <Button
                    // className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('active')}
                    variant='contained'
                    color="secondary"
                >
                    Active
                </Button>
                <Button
                    // className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('completed')}
                    variant='contained'
                >
                    Completed
                </Button>
            </Grid2>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                updateTask(todolistId, task.id, title)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <Grid2 container justifyContent="space-between" alignItems="center"
                                           style={{marginBottom: 15}}>
                                        <Grid2 alignItems={'center'}>
                                            <Checkbox
                                                checked={task.isDone}
                                                color="success"
                                                onChange={changeTaskStatusHandler}/>
                                            <EditableSpan
                                                value={task.title}
                                                onChange={changeTaskTitleHandler}
                                            />
                                        </Grid2>
                                        <Button
                                            color="error"
                                            variant='contained'
                                            onClick={removeTaskHandler}
                                            startIcon={<DeleteIcon/>}
                                        >
                                            Delete
                                        </Button>
                                    </Grid2>
                                </li>
                            )
                        })}
                    </ul>
            }
        </>
    )
}
