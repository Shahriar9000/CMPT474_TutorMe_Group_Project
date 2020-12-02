import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logIn,reset } from '../actions/logInActions';
import Student from './Student';
import Teacher from './Teacher';
import {Link} from 'react-router-dom';
import { findStudents } from '../actions/locationActions';
import '../Css/Home.css';
import {Nav, Row, Col, Container, Form, Button } from 'react-bootstrap';
 class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            type:'0',
            type_string:''
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
    else{alert("Please choose the type");}
    this.state.type = type;
    if(type == 1){this.state.type_string = 'student'}
    else{this.state.type_string = 'tutor'}
    console.log(type);

    if(this.state.username == "" || this.state.password == ""){
        alert("Please enter valid username or password");
    }
    else if(type == 1 || type == 2){
        const user = {
            username: this.state.username,
            password: this.state.password,
            type: this.state.type_string
        };
        this.props.logIn(user);
    }

    }

    render(){

        var arr = Object.values(this.props.user);
        if(arr.length>3){
            if(arr[0] === true){
                if(arr[5] === 'student'){
                    
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

            else if(arr[0] === false){
                this.props.reset();
                alert("Please enter a valid username or password");
            }
           
        }
        if(arr.length === 1){
            this.props.reset();
            alert("Please enter a valid username or password");
        }
        return (
            <div className="Login">
            <Container id ='mainbody'>
                <h1 id = 'header' >TutorME</h1> <br></br><br></br>

            
                <Form onSubmit = {this.onSubmit}>
                    <Form.Group controlId="formBasicUsername">
                         <Form.Label>Username:</Form.Label>
                         <Form.Control type="text" name="username" onChange = {this.onChange} placeholder="Enter username" />
                         {/* <input type="text" name="username" onChange = {this.onChange}></input><br></br><br></br> */}
                         <Form.Text className="text-muted">We'll never share your email with anyone else</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                         <Form.Label>Password:</Form.Label>
                         <Form.Control type="password" name="password" onChange = {this.onChange} placeholder="Enter password" />
                    </Form.Group>

                        <label>User type:</label><br></br>
                        <input className = "myradio" type="radio" name="type" value = "1" /><label>Student</label><br></br>
                        <input className = "myradio" type="radio" name="type" value = "2"/><label>Teacher</label><br></br><br></br>
                    
                    <Button type="submit" value="Sign in" id ='SignIn'>LOG IN</Button><br></br><br></br>
                    <Link to ="/signUp" id='signUp'><Button>REGISTER</Button></Link>
                    {/* <input ></input><br></br> */}
                </Form> 
               
            </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item
  });


export default connect(mapStateToProps, { logIn,findStudents,reset })(Home);
