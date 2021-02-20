import React from 'react';
import classes from './Paginations.module.scss';

const pagination = (props) => {
const pageNum =[];

for(let i = 1; i<= Math.ceil(props.totalPosts/props.postsPerPage); i++){
    pageNum.push(i);
}

return(
        <div className={classes.Container}>
            <button disabled={props.currentPage === pageNum[0] ? true : false} className={classes.Previous}>
                Prev
            </button>

            {pageNum.map(num => (
                <button key={num} className={props.currentPage !== num ? classes.Nums : classes.SelectedNum} onClick={()=> props.paginate(num)}>
                    {num}
                </button>
           
            ))}

            <button className={classes.Next} onClick={props.next} disabled={props.currentPage === pageNum[pageNum.length - 1] ? true : false}>
                Next
            </button>
            
        </div>
);
};

export default pagination;