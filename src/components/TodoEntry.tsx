// prettier-ignore
import { Checkbox, IconButton, TableCell, TableRow, CircularProgress } from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { useActions } from "../actions";
import * as TodoActions from "../actions/todo";
import { Todo } from "../model/model";

interface Props {
    action: Function;
    todo: Todo;
}

function TodoEntry(props: Props) {
    const { action, todo } = props;
    const { completed, id, progress, rating, text } = todo;
    const progressIntr = parseInt(progress, 10);
	const todoActions = useActions(TodoActions);

	const toggleComplete = () => {
		if (todo.completed) {
			todoActions.uncompleteTodo(todo.id);
		} else {
			todoActions.completeTodo(todo.id);
		}
	};

    return (
        <TableRow
            key={id}
            hover
        >
            <TableCell padding="none" style={{ position: 'relative' }}>
                <CircularProgress variant="static" value={progressIntr} color="primary" style={{ margin: '5px 0 0 20px', width: '28px', height: '28px' }} />
                <span style={{ position: 'absolute', top: '14px', left: '26px' }}>{progressIntr}</span>
            </TableCell>
            <TableCell padding="none">{text} ({id})</TableCell>
            <TableCell padding="none">
                <Rating
                    name="simple-controlled"
                    value={rating}
                    readOnly
                />
            </TableCell>
            <TableCell padding="none">
                <IconButton
                    aria-label="Delete"
                    color="default"
                    onClick={() => action(todo) }
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
            <TableCell padding="none">
                <IconButton
                    aria-label="Delete"
                    color="default"
                    onClick={() => todoActions.deleteTodo(id) }
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default TodoEntry;
