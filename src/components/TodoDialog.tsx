// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/todo";
import { RootState } from "../reducers";

interface Props {
	open: boolean;
	onClose: () => void;
}

function TodoDialog(props: Props) {
	const { open, onClose } = props;
	const classes = useStyles();
	const todoList = useSelector((state: RootState) => state.todoList);
	console.log('TodoDialog > todoList.length', todoList.length);

	const [ newTodoText, setNewTodoText ] = React.useState("");
	const [ rating, setRating ] = React.useState(0);
	const todoActions = useActions(TodoActions);

	const handleClose = () => {
		todoActions.addTodo({
			id: todoList.length + 1,
			completed: false,
			progress: 0,
			rating: rating,
			text: newTodoText,
		});
		onClose();

		// reset todo text if user reopens the dialog
		setNewTodoText("");
	};

	const handleChange = (event: any) => {
		setNewTodoText(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add a new TODO</DialogTitle>
			<div>
				<label htmlFor="title">Title</label>
				<TextField
					id="multiline-flexible"
					name="title"
					multiline
					value={newTodoText}
					onChange={handleChange}
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

export default TodoDialog;
