
const checkbox = props => (
    <div>
    <label>
    <input type="checkbox" onClick={props.clicked}></input>
    <span> Completed</span>
    </label>
        
    </div>
    
);

export default checkbox;