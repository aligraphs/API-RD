import classes from './Button.module.scss';
import React from 'react';

const button = (props) => (
    <button 
    className={[classes.button, classes[props.btnType]].join(' ')} 
    onClick={props.clicked}>{props.children}</button>
);

export default button;