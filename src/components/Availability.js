import React, { Component } from 'react'
import { connect } from 'react-redux';
import Student from './Student';
import { reset, findAvailability } from '../actions/availabilityActions';

class Availability extends Component {
  constructor(props){
    super(props);
    this.state={
      gohome: false
    };
    this.gohome = this.gohome.bind(this);
    this.bookClicked = this.bookClicked.bind(this);
    this.int_to_time = this.int_to_time.bind(this);
}
int_to_time(x){
        var start = x;
        var end = start+1;
        var start_string = "";
        var end_string = "";
        if (start == 0){start_string = "12 am - ";}
        else if (start == 12){start_string = "12 pm - ";}
        else if (start < 12){start_string = (start%12).toString() + " am - ";}
        else{start_string = (start%12).toString() + " pm - ";}
            
        if (end == 12){end_string = "12 pm";}
        else if (end == 24){end_string = "12 am";}
        else if (end < 12){end_string = (end%12).toString() + " am";}
        else{end_string = (end%12).toString() + " pm";}

        return (start_string+end_string) ;
}
gohome(e) {
  e.persist();
  this.setState({ gohome: true });
}
async bookClicked(e){
    e.preventDefault();
    var user = {
        tutorid: this.props.availabilityList.tutorid,
        studentid: this.props.user.username,
        day: e.target.id,
        hours: [parseInt(e.target.name)]
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    let req;
    await fetch('https://ksc2toqk8k.execute-api.us-east-1.amazonaws.com/dev/appointment/bookAvailability',requestOptions)
        .then(response => response.json())
        .then(data => req = data);
    console.log(req);
        user = {
                username: this.props.availabilityList.tutorid,
                type: 'tutor'
                };
    this.props.findAvailability(user);
    alert("Succesfully booked");
}

render() {
    if(this.state.gohome){
        this.props.reset();
        return(
            <div><Student/></div>
        )
    }
    console.log(this.int_to_time(3));
    var mon = Object.values(this.props.availabilityList.data.mon);
    const monday = mon.map(day => {
            var time = this.int_to_time(day);
            var result = (<ul>
            <li>{time}</li>
            <li><button id ="mon" name = {day} onClick ={this.bookClicked}>Book</button></li>
            </ul>)
            return result;
    });

    var tue = Object.values(this.props.availabilityList.data.tue);
    const tuesday = tue.map(day =>{
        var time = this.int_to_time(day);
        var result = (<ul>
        <li>{time}</li>
        <li><button id ="tue" name = {day} onClick ={this.bookClicked}>Book</button></li>
        </ul>)
        return result;
    });

    var wed = Object.values(this.props.availabilityList.data.wed);
    const wednesday = wed.map(day => {
        var time = this.int_to_time(day);
        var result = (<ul>
        <li>{time}</li>
        <li><button id ="wed" name = {day} onClick ={this.bookClicked}>Book</button></li>
        </ul>)
        return result;
    });

    var thu = Object.values(this.props.availabilityList.data.thu);
    const thursday = thu.map(day => {
        var time = this.int_to_time(day);
        var result = (<ul>
        <li>{time}</li>
        <li><button id ="thu" name = {day} onClick ={this.bookClicked}>Book</button></li>
        </ul>)
        return result;
   });

    var fri = Object.values(this.props.availabilityList.data.fri);
    const friday = fri.map(day => {
        var time = this.int_to_time(day);
        var result = (<ul>
        <li>{time}</li>
        <li><button id ="fri" name = {day} onClick ={this.bookClicked}>Book</button></li>
        </ul>)
        return result;
    });

    var sat = Object.values(this.props.availabilityList.data.sat);
    const saturday = sat.map(day => {
        var time = this.int_to_time(day);
        var result = (<ul>
        <li>{time}</li>
        <li><button id ="sat" name = {day} onClick ={this.bookClicked}>Book</button></li>
        </ul>)
        return result;
    });
    var sun = Object.values(this.props.availabilityList.data.sun);
    const sunday = sun.map(day => {
        var time = this.int_to_time(day);
        var result = (<ul>
        <li>{time}</li>
        <li><button id ="sun" name = {day} onClick ={this.bookClicked}>Book</button></li>
        </ul>)
        return result;
    });
    return (
        <div>
        <div id="btnGoHomeDiv"><button id='Log out'onClick={this.gohome}>Go home</button></div>
        <br></br>
        <h2 id ='usernheader'>Availability</h2>
        <h3 id ='usernheader'>Monday</h3>
        {monday}

        <h3 id ='usernheader'>Tuesday</h3>
        {tuesday}

        <h3 id ='usernheader'>Wednesday</h3>
        {wednesday}

        <h3 id ='usernheader'>Thursday</h3>
        {thursday}

        <h3 id ='usernheader'>Friday</h3>
        {friday}

        <h3 id ='usernheader'>Saturday</h3>
        {saturday}

        <h3 id ='usernheader'>Sunday</h3>
        {sunday}
        </div>
    )
 }
}

const mapStateToProps = state => ({
    user: state.user.item,
    availabilityList: state.availabilityList.item
  });
  

export default connect(mapStateToProps,{reset,findAvailability})(Availability);