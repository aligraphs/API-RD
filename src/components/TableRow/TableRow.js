import React from 'react';
import classes from './TableRow.module.scss';
import Button from "../../components/UI/Button/Button";

const tableRow = (props) => (
    <div className={classes.Row}>
    <div className={classes.RowItemId}>{props.id}</div>
    <div className={classes.RowItemTitle}>{props.title}</div>
    <div className={classes.RowItemAssignee}>{props.username}</div>
    <div className={classes.RowItemStatus}>{props.status ? 'Done' : 'In Progress'}</div>
    <div className={classes.Actions}><Button btnType="blue" clicked={props.editHandler}>Edit</Button><Button btnType="red" clicked={props.deleteHandler}>Delete</Button></div>
    </div>

);

export default tableRow;