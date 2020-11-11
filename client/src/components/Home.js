import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logIn,reset } from '../actions/logInActions';
import Student from './Student';
import Teacher from './Teacher';
import {Link} from 'react-router-dom';
import { findStudents } from '../actions/locationActions';
import '../Css/Home.css';

 class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            type:'0'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
    onSubmit(e) {
    e.preventDefault();
    var type = document.getElementsByClassName("myradio");
    if(type[0].checked == true){type = type[0].value;}
    else if (type[1].checked == true){type = type[1].value;}
    else{type = 0;}
    this.state.type = type;
    const user = {
        username: this.state.username,
        password: this.state.password,
        type: this.state.type
    };
     this.props.logIn(user);

    }

    render() {

        var arr = Object.values(this.props.user);
        console.log(arr);
        if(arr.length>0){
            if(arr[0].auth == 'true'){
                if(arr[0].type == '1'){
                    
                    return(
                        <div><Student/></div>
                    )
                }
                else{
                    return(
                        <div><Teacher/></div>
                    )
                }

            }
            else{
                this.props.reset();
                  alert("Please enter a valid username or password");
            }
           
        }
        return (
            <div id ='mainbody'>
                <h1 id = 'header' >Welcome To Tutor ME</h1>
                <nav id="nav">
                    <Link to="/signUp" id = "signUp">Register</Link>
                </nav>
                <form  onSubmit = {this.onSubmit}>
                    <label>Username: </label>
                    <input type="text" name="username" onChange = {this.onChange}></input><br></br><br></br>
                    <label>Password: </label>
                    <input type="password" name="password" onChange = {this.onChange}></input><br></br><br></br>
                    <div>
                        <label>User type:</label><br></br>
                        <input className = "myradio" type="radio" name="type" value = "1" /><label>Student</label><br></br>
                        <input className = "myradio" type="radio" name="type" value = "2"/><label>Teacher</label><br></br><br></br>
                    </div>
                    <input type="submit" value="Sign in" id ='SignIn'></input><br></br>
                </form> 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item
  });


export default connect(mapStateToProps, { logIn,findStudents,reset })(Home);
