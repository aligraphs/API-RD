import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../../components/TableRow/TableRow';
import classes from './Main.module.scss';
import Aux from '../../hoc/Aux';
import Modal from '../../components/Modal/Modal';
import ModalSummary from '../../components/ModalSummary/ModalSummary';
import TableHeader from '../../components/TableHeader/TableHeader';
import Pagination from '../../components/Paginations/Paginations';


class Main extends Component {

    state={
        todos: [],
        users: [],
        showModal: false,
        modalTodoId: null,
        modalTitle: '',
        checked: false,
        ascending: false,
        currentPage: 1,
        postPerPage: 10,
        lastVisitedPage: null,
        displayedTodos: []
        
    }

    componentDidMount() {
        const todolink = "/todos";
        const userLink = "/users";

        const requestOne = axios.get(todolink);
        const requestTwo = axios.get(userLink);

        axios.all([requestOne, requestTwo])
        .then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            this.setState({todos: responseOne.data, users: responseTwo.data, displayedTodos: responseOne.data.slice(0,10)})
        })).catch(err => {
            console.log(err)
        })
    }

    findUserName = (userid) => {

        const user = this.state.users.filter(el => {

           return el.id === userid

        });
        return user[0].name;
    }

    editHandler(id, title) {
        this.setState({showModal: true, modalTodoId: id, modalTitle: title});

    }
    async deleteHandler(id){
        try {
            const response = await axios.delete(`/todos/${id}`);
            const newState = this.state.todos.filter(todo => {return todo.id !== id})
            const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
            const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
            this.setState({todos: newState, displayedTodos: newState.slice(indexOfFirstPost,indexOfLastPost)})
            
          } catch (err) {
            console.log(`😱 Axios request failed: ${err}`);
          }
    }

    cancelModalHandler = () => {
        this.setState({showModal: false})
    }

    async saveModalHandler(id, checked){

            try {
            const response = await axios.patch(`/todos/${id}`, { completed: checked ? true : false });
            const newState = this.state.todos.map(todo => {
                if(todo.id===id){
                    todo = response.data;
                    return todo
                }else{

                    return todo
                }
            });
            const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
            const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
            this.setState({todos: newState, displayedTodos: newState.slice(indexOfFirstPost,indexOfLastPost)});
            this.cancelModalHandler();
          } catch (err) {
            console.log(`Axios request failed: ${err}`);
          }
        
    }

    checkboxHandler = () => {
        this.setState(prevState => {
            return{
            checked: !prevState.checked
            }
        })
    }

    handleSorting = ()=> {
        const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;

        this.setState(prevState=> {
            return{
                ascending: !prevState.ascending
            };
        })
        const newState = this.state.todos.sort(this.handleAscSorting);
        this.setState({todos: newState, displayedTodos: newState.slice(indexOfFirstPost,indexOfLastPost)});
    }

    handleAscSorting = (x,y) => {
        const statusX = x.completed ? "A" : "B";
        const statusY = y.completed ? "A" : "B";
        let comparison = 0;
        if (statusX>statusY){
            comparison=1;

        }else if (statusX<statusY){
            comparison=-1;
        }
        if(this.state.ascending){
        return comparison;
        }else{
        return comparison * (-1); 
        }
    }

    changePageHandler = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    nextPageHandler = () => {
        this.setState(prevState=> {
            return{
                currentPage: prevState.currentPage + 1
            };
        })
    }

    componentDidUpdate(){
    const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
    if(this.state.currentPage !== this.state.lastVisitedPage){
    this.setState(prevState => {
      return{
          displayedTodos: prevState.todos.slice(indexOfFirstPost, indexOfLastPost),
          lastVisitedPage: prevState.currentPage
      };
      })
    }
    }


  render() {
      const rows = this.state.displayedTodos.map(todo => {
          return <TableRow 
           title={todo.title}
           id={todo.id} 
           username = {this.findUserName(todo.userId)}
           status={todo.completed} 
           key={todo.id}
           editHandler={()=>this.editHandler(todo.id, todo.title)}
           deleteHandler={()=>this.deleteHandler(todo.id)} />
      });


    return (
        <Aux>
        <Modal show={this.state.showModal} modalClosed={this.cancelModalHandler} >
            <ModalSummary 
            modalCancelled={this.cancelModalHandler}
            modalSaved={()=>this.saveModalHandler(this.state.modalTodoId, this.state.checked)}
            title={this.state.modalTitle}
            checked={this.checkboxHandler}
            />
        </Modal>
        <div className={classes.Table}>
        <TableHeader clicked={this.handleSorting} sorted={this.state.ascending} />
        {rows}
        <Pagination 
        totalPosts={this.state.todos.length} 
        postsPerPage={this.state.postPerPage}
        paginate={this.changePageHandler}
        currentPage={this.state.currentPage}
        next={this.nextPageHandler} />
        </div>
        </Aux>
      
    );
  }
}

export default Main;
