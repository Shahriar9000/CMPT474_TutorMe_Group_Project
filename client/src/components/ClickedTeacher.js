import React, { Component } from 'react'
import { connect } from 'react-redux';
import Student from './Student';
import Home from './Home';
import Teacher from './Teacher';
import SignUp from './SignUp';
import { Link } from 'react-router-dom';
import { resetClickedTeacher } from '../actions/teacherClickedActions';
 class ClickedTeacher extends Component {
    constructor(props){
        super(props);
        this.state={
            gohome: false
        };
        this.gohome = this.gohome.bind(this);  
    }
    gohome(e) {
        this.setState({ gohome: true });
    }
    render() {
        if(this.state.gohome){
            this.props.resetClickedTeacher();
            return(
                <div><Student/></div>
            )
        }
        else{
            var arr = Object.values(this.props.user);
            return (
                <div>
                    <div id="btnGoHomeDiv"><button id='btnGoHome'onClick={this.gohome}>Go home</button></div>
                    <div id='details'>
                    <h1 id='header'>Teacher details</h1>
                        <p>First Name: {arr[0].fname}</p>
                        <p>Last Name: {arr[0].lname}</p>
                        <p>Location: {arr[0].address}</p>
                    </div>
                </div>
                
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.teacherClicked.item
  });

export default connect(mapStateToProps, {resetClickedTeacher})(ClickedTeacher);