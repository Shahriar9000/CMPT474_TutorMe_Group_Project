import React, { Component } from 'react'
import {Link} from 'react-router-dom';
//import { connect } from 'react-redux';
//import Teacher from './Teacher';
//import { resetClickedTeacher } from '../actions/teacherClickedActions';
 class Appointment extends Component {
    constructor(props){
        super(props);
        this.state = {
            year:'',
            month:'',
            date:'',
            hour:'',
            minute:''
        };
        this.onChange = this.onChange.bind(this);
        this.onBook = this.onBook.bind(this);
        
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
    onBook(e) {
        e.preventDefault();
        var datum = new Date(Date.UTC(this.state.year,this.state.month - 1,this.state.date,this.state.hour,this.state.minute));
        console.log(datum.getTime()/1000);
        console.log(datum);

    }
    render() {
        return (
            <div id ='mainbody'>
                <h1 id = 'header' >Welcome To Tutor ME</h1>
                <nav id="nav">
                    <Link to="/Teacher" id = "Teacher">Go home</Link>
                </nav>
                <form  onSubmit = {this.onSubmit}>
                    <label>Year: </label>
                    <input type="text" name="year" onChange = {this.onChange}></input><br></br><br></br>

                    <label>Month: </label>
                    <input type="text" name="month" onChange = {this.onChange}></input><br></br><br></br>

                    <label>Date: </label>
                    <input type="text" name="date" onChange = {this.onChange}></input><br></br><br></br>

                    <label>Hour: </label>
                    <input type="text" name="hour" onChange = {this.onChange}></input><br></br><br></br>

                    <label>Minute: </label>
                    <input type="text" name="minute" onChange = {this.onChange}></input><br></br><br></br>

                    <button onClick={this.onBook}>Confirm Availability</button>
                </form> 
            </div>
          
        )
    }
}



export default Appointment;