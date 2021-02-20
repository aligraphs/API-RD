import classes from './TableHeader.module.scss';

const tableHeader = (props) => (
    <div className={classes.Row}>
    <div className={classes.Id}>#</div>
    <div className={classes.Title}>Title</div>
    <div className={classes.Assignee}>Assignee</div>
    <div className={classes.Status} onClick={props.clicked}>Status<div className={props.sorted ? classes.arrowUp : classes.arrowDown}></div></div>
    <div className={classes.Buttons}>Actions</div>
    </div>
);

export default tableHeader;