// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/todo";
import { RootState } from "../reducers";
import { Todo } from "../model/model";

interface Props {
	open: boolean;
    onClose: () => void;
    todo: Todo;
}

const emptyTodo = {
    id: 0,
    completed: false,
    progress: 0,
    rating: 0,
    text: ''
};

function TodoEditDialog(props: Props) {
    const { open, onClose, todo=emptyTodo } = props;
	const classes = useStyles();
	const todoList = useSelector((state: RootState) => state.todoList);
    const [ completed, setCompleted ] = useState(todo.completed);  
    const [ id, setId ] = useState(todo.id);  
    const [ progress, setProgress ] = useState(todo.progress);
    const [ rating, setRating ] = useState(todo.rating);
    const [ text, setText ] = useState(todo.text);
    const todoActions = useActions(TodoActions);
    
    useEffect(() => {
        if (todo.id !== id) {
            resetState();
        }
      });

	const handleClose = () => {
		onClose();
	};

	const handleSubmit = () => {
		todoActions.editTodo({
			id: id,
            completed: completed, 
            progress: progress,
			rating: rating,
			text: text,
        });
		onClose();
    };
    
    const resetState = () => {
        setCompleted(todo.completed);
        setId(todo.id);
        setProgress(todo.progress);
        setRating(todo.rating);
        setText(todo.text);
    };

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Edit TODO-Nr: {id}</DialogTitle>
			<div>
				<label htmlFor="title">Title</label>
				<TextField
					id="title"
					name="title"
					value={text}
					onChange={(event: any) => setText(event.target.value)}
					className={classes.textField}
				/>
			</div>
			<div>
				<label htmlFor="progress">Progress</label>
				<TextField
					id="progress"
					name="progress"
					value={progress}
					onChange={(event: any) => setProgress(event.target.value)}
					className={classes.textField}
				/>
			</div>
			<div>
				<label htmlFor="rating">Rating</label>
				<Rating
                    name="rating"
                    value={rating}
                    onChange={(event: Object, newValue: number) => setRating(newValue)}
                />
			</div>
			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					CANCLE
				</Button>
				<Button color="primary" onClick={handleSubmit}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});

export default TodoEditDialog;
