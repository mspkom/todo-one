// prettier-ignore
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Todo } from "../model/model";
import { RootState } from "../reducers";
import TodoEditDialog from "../components/TodoEditDialog";

import TodoEntry from './TodoEntry';

interface Props {}

function TodoTable(props: Props) {
	const classes = useStyles();
	const todoList = useSelector((state: RootState) => state.todoList);
	const [ activeTodo, setActiveTodo ] = React.useState(todoList[0]);
	
	const [ open, setOpen ] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddTodo = (todo: Todo) => {
		setActiveTodo(todo);
		setOpen(true);
	};

	return (
		<Paper className={classes.paper}>
			<TodoEditDialog open={open} onClose={handleClose} todo={activeTodo} />
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Completed</TableCell>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Rate</TableCell>
						<TableCell padding="default">Edit</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ todoList.map((todo: Todo) => <TodoEntry key={todo.id} todo={todo} action={handleAddTodo} />) }
				</TableBody>
			</Table>
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});

export default TodoTable;


// 04630 - 975578