import React, { Component,Button } from 'react'
import { connect } from 'react-redux';
import { findTeachers } from '../actions/locationActions';
import { findTeacherClicked } from '../actions/teacherClickedActions';
import {findAvailability } from '../actions/availabilityActions';
import ClickedTeacher from './ClickedTeacher';
import { reset } from '../actions/logInActions';
import Home from './Home';
import Availability from './Availability';
class Student extends Component {
  constructor(props){
    super(props);
    this.state={
      gohome: false,
  };
  this.gohome = this.gohome.bind(this);
  this.teacherClicked = this.teacherClicked.bind(this);
  this.findAvailability = this.findAvailability.bind(this);    
}
gohome(e) {
  this.setState({ gohome: true });
}
teacherClicked(e) {
  e.persist();
  this.props.findTeacherClicked(e.target.name);
}

findAvailability(e) {
  e.persist();
  const user = {
    username: e.target.name,
    type: 'tutor'
  };
  console.log(user);
  this.props.findAvailability(user);
}

componentDidMount(){
    this.props.findTeachers(this.props.user.location);
  }


    render() {
      if(this.state.gohome){
        this.state.gohome = false;
        this.props.reset();
        return(
            <div><Home/></div>
        )
      }
      var arr = Object.values(this.props.availabilityList);
      if(arr.length > 0){
        if(this.props.availabilityList.error){
          alert("Error "+this.props.availabilityList.data+" status "+this.props.availabilityList.status);
        }
        else{return(<div><Availability/></div>)}
      }

      var t = Object.values(this.props.teacher);
      var arr = Object.values(this.props.users);
      var currentUser = this.props.user;
      const welcome = currentUser.firstname + " " + currentUser.lastname;
       if(t.length > 0){
          return(<div>
            <ClickedTeacher/>
          </div>);
       }
        if(arr.length > 0){
            const postItems = arr.map(post => (
                  <tr key ={post.username}>
                    <th>{post.firstname}</th>
                    <th>{post.lastname}</th>
                    <th><button id ="btnDetails" name = {post.username} onClick ={this.teacherClicked}>Details</button></th>
                    <th><button id ="btnDetails" name = {post.username} onClick ={this.findAvailability}>Find Availability</button></th>
                  </tr>
              ));
              
            return (
                <div>
                <h1 id ='userheader'>Hello {welcome}</h1>
                <div id="btnGoHomeDiv"><button id='Log out'onClick={this.gohome}>Log out</button></div>
                <br></br>
                <h2 id ='usernheader'>Nearby Teachers</h2>
                <table id ="table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Find Details</th>
                      <th>See Availability</th>
                    </tr>
                  </thead>
                  <tbody >
                      {postItems}
                  </tbody>
                </table>
              </div>
            )
        }

        return (
            <div>
              <h1 id ='userheader'>Hello {welcome}</h1>
               <h1>I am a student</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item,
    users: state.locationUsers.items,
    teacher: state.teacherClicked.item,
    availabilityList: state.availabilityList.item
  });
  

export default connect(mapStateToProps, { findTeachers,findTeacherClicked,findAvailability,reset})(Student);