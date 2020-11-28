import React, { Component } from 'react'
import { connect } from 'react-redux';
import { findStudents } from '../actions/locationActions';
import Student from './Student';
import { findStudentClicked } from '../actions/teacherClickedActions';
import ClickedStudent from './ClickedStudent';
import { reset } from '../actions/logInActions';
import Home from './Home';
import Appointment from './Appointment';
 class Teacher extends Component {
  constructor(props){
    super(props);
    this.studentClicked = this.studentClicked.bind(this); 
    this.state={
      gohome: false,
      book: false
    };
    this.gohome = this.gohome.bind(this);
    this.Book = this.Book.bind(this);     
}
gohome(e) {
  this.setState({ gohome: true });
}

Book(e) {
  this.setState({ book: true });
}

studentClicked(e) {
  e.persist();
  this.props.findStudentClicked(e.target.name);
}
  componentDidMount(){
    this.props.findStudents(this.props.user.location);
  }


    render() {
      if(this.state.gohome){
        this.props.reset();
        return(
            <div><Home/></div>
        )
      }

      if(this.state.book){
        return(
            <div><Appointment/></div>
        )
      }

      var t = Object.values(this.props.student);
      var arr = Object.values(this.props.users);
       if(t.length > 0){
          return(<div>
            <ClickedStudent/>
          </div>);
       }
        if(arr.length > 0){
            const postItems = arr.map(post => (
                  <tr key ={post.username}>
                    <th>{post.firstname}</th>
                    <th>{post.lastname}</th>
                    <th><button id ="btnDetails" name = {post.username} onClick ={this.studentClicked}>Details</button></th>
                  </tr>
              ));
              var currentUser = this.props.user;
              const welcome = currentUser.firstname + " " + currentUser.lastname;
              
              return (
                <div>
                <h1 id ='userheader'>Hello {welcome}</h1>
                <div id="btnGoHomeDiv"><button id='Log out'onClick={this.gohome}>Log out</button></div>
                <div id="Book"><button id='Book'onClick={this.Book}>Create Availability</button></div>
                <br></br>
                <h2 id ='usernheader'>Nearby Students</h2>
                <table id ="table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Find Details</th>
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
               <h1>I am a Teacher</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item,
    users: state.locationUsers.items,
    student: state.teacherClicked.item
  });
  

export default connect(mapStateToProps, { findStudents,findStudentClicked,reset })(Teacher);