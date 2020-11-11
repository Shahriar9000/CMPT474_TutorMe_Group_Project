import React, { Component } from 'react'
import { connect } from 'react-redux';
import { findStudents } from '../actions/locationActions';
import { findStudentClicked } from '../actions/teacherClickedActions';
import ClickedStudent from './ClickedStudent';
 class Teacher extends Component {
  constructor(props){
    super(props);
    this.studentClicked = this.studentClicked.bind(this);  
}
studentClicked(e) {
  e.persist();
  this.props.findStudentClicked(e.target.name);
}
  componentDidMount(){
    var arr = Object.values(this.props.user);
    this.props.findStudents(arr[0].address);
  }


    render() {
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
                    <th>{post.fname}</th>
                    <th>{post.lname}</th>
                    <th><button id ="btnDetails" name = {post.username} onClick ={this.studentClicked}>Details</button></th>
                  </tr>
              ));
              var currentUser = Object.values(this.props.user);
              const welcome = currentUser[0].fname + " " + currentUser[0].lname;
              
              return (
                <div>
                <h1 id ='userheader'>Hello {welcome}</h1>
                <br></br>
                <h2 id ='usernheader'>Nearby Teachers</h2>
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
  

export default connect(mapStateToProps, { findStudents,findStudentClicked })(Teacher);