import React from 'react';
import Aux from '../../hoc/Aux';
import Checkbox from '../UI/Checkbox/Checkbox';
import Button from '../UI/Button/Button';
import classes from './ModalSummary.module.scss';

const modalSummary = (props) => {

    return(
        <Aux>
            <h3>Title</h3>
            <p>{props.title}</p>
            <Checkbox clicked={props.checked} />
            <div className={classes.Buttons}>
            <Button btnType="blue" clicked={props.modalSaved}>Save</Button>
            <Button btnType="red" clicked={props.modalCancelled}>Cancel</Button>
            </div>
        </Aux>
    )
}
export default modalSummary;