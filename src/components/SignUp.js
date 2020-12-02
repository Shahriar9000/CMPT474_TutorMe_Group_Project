import React, { Component } from 'react'
import { connect } from 'react-redux';
import {registerStudent,registerTeacher} from '../actions/registerActions';
import { Link } from 'react-router-dom';
import '../Css/Home.css';



 class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            fname:'',
            lname:'',
            address:'',
            type:''
        };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
    onSubmit(e) {
    e.preventDefault();
    var location = document.getElementsByClassName("location");
    var index = 0;
    while(index<location.length){
         if(location[index].checked == true){break;}
         index = index + 1;
    }
    var address = location[index].value;
    this.state.address = address;
    var type = document.getElementsByClassName("type");
    var index = 0;
    while(index<type.length){
         if(type[index].checked == true){break;}
         index = index + 1;
    }
    var type = type[index].value;

    if(type == '1'){ this.state.type = 'student';}
    if(type == '2'){this.state.type = 'tutor';}
    const user = {
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.fname,
        lastname: this.state.lname,
        location: this.state.address,
        type: this.state.type
    };
    this.props.registerStudent(user);
    alert("Succesfully Registered");
    }
    render() {
        return (
            <div>
                <h1 >Registering User</h1>
                <nav id="nav">
                    <Link to ="/" id='signUp'>Go Home Page</Link>
                </nav>
                <form onSubmit = {this.onSubmit}>
                    <label>Username: </label>
                    <input type="text" name="username" onChange = {this.onChange}></input><br></br>
                    <label>Password: </label>
                    <input type="password" name="password" onChange = {this.onChange}></input><br></br>
                    <label>First Name: </label>
                    <input type="text" name="fname" onChange = {this.onChange}></input><br></br>
                    <label>Last name: </label>
                    <input type="text" name="lname" onChange = {this.onChange}></input><br></br><br></br>
                    <div>
                        <label>Location: </label><br></br>
                        <input className = "location" type="radio" name="location" value = "Burnaby" /><label>Burnaby</label><br></br>
                        <input className = "location" type="radio" name="location" value = "Vancouver"/><label>Vancouver</label><br></br><br></br>
                    </div>
                    <div>
                        <label>Registering as: </label><br></br>
                        <input className = "type" type="radio" name="type" value = "1" /><label>Student</label><br></br>
                        <input className = "type" type="radio" name="type" value = "2"/><label>Teacher</label><br></br><br></br>
                    </div>
                    <input type="submit" value="Click to Register"></input>
                </form> 
                <br></br>
            </div>
        )
    }
}

export default connect(null,{registerStudent,registerTeacher})(SignUp);