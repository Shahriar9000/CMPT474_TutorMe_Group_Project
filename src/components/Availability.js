import React, { Component } from 'react'
import { connect } from 'react-redux';
import Student from './Student';
import { reset } from '../actions/availabilityActions';

class Availability extends Component {
  constructor(props){
    super(props);
    this.state={
      gohome: false
    };
    this.gohome = this.gohome.bind(this);
    this.bookClicked = this.bookClicked.bind(this);
}
gohome(e) {
  e.persist();
  this.setState({ gohome: true });
}
bookClicked(e){
    e.persist();
    console.log("please book");
}
render() {
    if(this.state.gohome){
        this.props.reset();
        return(
            <div><Student/></div>
        )
    }

    var arr = Object.values(this.props.availabilityList.data);
    if(arr.length > 0){
        const postItems = arr.map(post => (
                <tr key ={post.id}>
                <th>{post.year}</th>
                <th>{post.month}</th>
                <th>{post.date}</th>
                <th>{post.date_word}</th>
                <th>{post.from_hour}</th>
                <th>{post.from_minute}</th>
                <th>{post.to_hour}</th>
                <th>{post.to_minute}</th>
                <th><button id ="Book" name = {this.props.user.username} onClick ={this.bookClicked}>Book</button></th>
                </tr>
            ));
            
            return (
            <div>
            <div id="btnGoHomeDiv"><button id='Log out'onClick={this.gohome}>Go home</button></div>
            <br></br>
            <h2 id ='usernheader'>Availability</h2>
            <table id ="table">
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>From Hour</th>
                    <th>From Minute</th>
                    <th>To Hour</th>
                    <th>To Minute</th>
                    <th>Click to Book</th>
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
            <h1>This teacher is not available at this moment</h1>
            <div id="btnGoHomeDiv"><button id='Log out'onClick={this.gohome}>Go home</button></div>
        </div>
    )
 }
}

const mapStateToProps = state => ({
    user: state.user.item,
    availabilityList: state.availabilityList.item
  });
  

export default connect(mapStateToProps,{reset})(Availability);