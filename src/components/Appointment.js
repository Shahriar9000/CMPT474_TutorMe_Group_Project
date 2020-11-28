import React, { Component } from 'react'
import { connect } from 'react-redux';
import Teacher from './Teacher';
import { addAvailability,reset } from '../actions/addAvailabilityActions';
 class Appointment extends Component {
    constructor(props){
        super(props);
        this.state = {
            year:'',
            month:'',
            date:'',
            from_hour:'',
            from_minute:'',
            to_hour:'',
            to_minute:'',
            gohome:false
        };
        this.onChange = this.onChange.bind(this);
        this.onBook = this.onBook.bind(this);
        this.gohome = this.gohome.bind(this);
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onBook(e) {
    e.preventDefault();
    var from = new Date(Date.UTC(this.state.year,this.state.month - 1,this.state.date,this.state.from_hour,this.state.from_minute));
    from = from.getTime()/1000;

    var to = new Date(Date.UTC(this.state.year,this.state.month - 1,this.state.date,this.state.to_hour,this.state.to_minute));
    to = to.getTime()/1000;

    var now = new Date();
    now = now.getTime()/1000;

    if(from < now){alert("You tried to enter a date which is already passed");}
    else if(from <= to){alert("To feild must be greater than from field");}
    else{
        const user = {
            username: e.target.name,
            type: 'tutor',
            from_timestamp: from,
            to_timestamp: to
        };
        this.props.addAvailability(user);
    }
}
    gohome(e) {
        this.setState({ gohome: true });
    }
    render() {
        if(this.state.gohome){
            return(
                <div><Teacher/></div>
            )
        }
        if(this.props.add_response.error){
            alert("Error "+this.props.add_response.data+" status "+this.props.add_response.status);
        }
        if(!(this.props.add_response.error == undefined || this.props.add_response.error == true)){
            alert("Successfully created appointment "+this.props.add_response.data+" status "+this.props.add_response.status);
        }
        return (
            <div id ='mainbody'>
                <h1 id = 'header' >Welcome To Tutor ME</h1>
                <nav id="nav">
                    <div id="btnGoHomeDiv"><button id='gohome'onClick={this.gohome}>Go home</button></div>
                </nav>
                <form  onSubmit = {this.onSubmit}>
                    <label>Year: </label>
                    <input type="text" name="year" onChange = {this.onChange}></input><br></br><br></br>

                    <label>Month: </label>
                    <input type="text" name="month" onChange = {this.onChange}></input><br></br><br></br>

                    <label>Date: </label>
                    <input type="text" name="date" onChange = {this.onChange}></input><br></br><br></br>

                    <label>From Hour: </label>
                    <input type="text" name="from_hour" onChange = {this.onChange}></input><br></br><br></br>

                    <label>From Minute: </label>
                    <input type="text" name="from_minute" onChange = {this.onChange}></input><br></br><br></br>

                    <label>To Hour: </label>
                    <input type="text" name="to_hour" onChange = {this.onChange}></input><br></br><br></br>

                    <label>To Minute: </label>
                    <input type="text" name="to_minute" onChange = {this.onChange}></input><br></br><br></br>

                    <button onClick={this.onBook} name = {this.props.user.username}>Confirm Availability</button>
                </form> 
            </div>
          
        )
    }
}

const mapStateToProps = state => ({
    add_response: state.addAvailability.item,
    user: state.user.item
  });
  

export default connect(mapStateToProps, { addAvailability,reset})(Appointment);