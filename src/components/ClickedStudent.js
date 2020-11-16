import React, { Component } from 'react'
import { connect } from 'react-redux';
import Teacher from './Teacher';
import { resetClickedTeacher } from '../actions/teacherClickedActions';
 class ClickedStudent extends Component {
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
                <div><Teacher/></div>
            )
        }
        else{
            var arr = Object.values(this.props.user);
            return (
                <div>
                    <div id="btnGoHomeDiv"><button id='btnGoHome'onClick={this.gohome}>Go home</button></div>
                    <div id='details'>
                    <h1 id='header'>Student details</h1>
                        <p>First Name: {arr[0].firstname}</p>
                        <p>Last Name: {arr[0].lastname}</p>
                        <p>Location: {arr[0].location}</p>
                    </div>
                </div>
                
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.teacherClicked.item
  });

export default connect(mapStateToProps, {resetClickedTeacher})(ClickedStudent);