import React, { Component } from 'react'
import { connect } from 'react-redux';
import Teacher from './Teacher';
import { addAvailability,reset } from '../actions/addAvailabilityActions';
import '../Css/Appoinment.css';
 class Appointment extends Component {
    constructor(props){
        super(props);
        this.state = {
            gohome:false,
            mon:[],
            tue:[],
            wed:[],
            thu:[],
            fri:[],
            sat:[],
            sun:[]
        };
        this.onBook = this.onBook.bind(this);
        this.gohome = this.gohome.bind(this);
        this.handleMonday = this.handleMonday.bind(this);
        this.handleTuesday = this.handleTuesday.bind(this);
        this.handleWednesday = this.handleWednesday.bind(this);
        this.handleThursday = this.handleThursday.bind(this);
        this.handleFriday = this.handleFriday.bind(this);
        this.handleSaturday = this.handleSaturday.bind(this);
        this.handleSunday = this.handleSunday.bind(this);
    }
    
    onBook(e) {
        e.preventDefault();
        const user = {
            username: e.target.name,
            type: 'tutor',
            days:{
                mon:this.state.mon,
                tue:this.state.tue,
                wed:this.state.wed,
                thu:this.state.thu,
                fri:this.state.fri,
                sat:this.state.sat,
                sun:this.state.sun,
            }
        };
        console.log(user);
        this.props.addAvailability(user);
    }
    gohome(e) {
        this.setState({ gohome: true });
    }

    handleMonday(e){
        const target = e.target;
        var value = target.value;
        if(target.checked){
            console.log("checked");
            this.state.mon.push(parseInt(value));   
        }

        if(this.state.mon.includes(parseInt(value)) && !target.checked){
            var index = this.state.mon.indexOf(parseInt(value));
            this.state.mon.splice(index, 1);
        }
    }

    handleTuesday(e){
        const target = e.target;
        var value = target.value;
        
        if(target.checked){
            this.state.tue.push(parseInt(value));   
        }

        if(this.state.tue.includes(parseInt(value)) && !target.checked){
            var index = this.state.tue.indexOf(parseInt(value));
            this.state.tue.splice(index, 1);
        }
    }

    handleWednesday(e){
        const target = e.target;
        var value = target.value;
        
        if(target.checked){
            this.state.wed.push(parseInt(value));   
        }

        if(this.state.wed.includes(parseInt(value)) && !target.checked){
            var index = this.state.wed.indexOf(parseInt(value));
            this.state.wed.splice(index, 1);
        }
    }

    handleThursday(e){
        const target = e.target;
        var value = target.value;
        
        if(target.checked){
            this.state.thu.push(parseInt(value));   
        }

        if(this.state.thu.includes(parseInt(value)) && !target.checked){
            var index = this.state.thu.indexOf(parseInt(value));
            this.state.thu.splice(index, 1);
        }
    }

    handleFriday(e){
        const target = e.target;
        var value = target.value;
        
        if(target.checked){
            this.state.fri.push(parseInt(value));   
        }

        if(this.state.fri.includes(parseInt(value)) && !target.checked){
            var index = this.state.fri.indexOf(parseInt(value));
            this.state.fri.splice(index, 1);
        }
    }

    handleSaturday(e){
        const target = e.target;
        var value = target.value;
        
        if(target.checked){
            this.state.sat.push(parseInt(value));   
        }

        if(this.state.sat.includes(parseInt(value)) && !target.checked){
            var index = this.state.sat.indexOf(parseInt(value));
            this.state.sat.splice(index, 1);
        }
    }

    handleSunday(e){
        const target = e.target;
        var value = target.value;
        
        if(target.checked){
            this.state.sun.push(parseInt(value));   
        }

        if(this.state.sun.includes(parseInt(value)) && !target.checked){
            var index = this.state.sun.indexOf(parseInt(value));
            this.state.sun.splice(index, 1);
        }
    }
    render() {
        
        if(this.state.gohome){
            return(
                <div><Teacher/></div>
            )
        }
        return (
            
            <div id ='mainbody'>
                <div id="btnGoHomeDiv"><button id='Log out'onClick={this.gohome}>Go home</button></div>
                <div id="list1" class="dropdown-check-list" tabindex="100">
                    <span class="anchor">Monday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleMonday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleMonday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleMonday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleMonday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleMonday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleMonday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleMonday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleMonday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleMonday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleMonday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleMonday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleMonday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleMonday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleMonday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleMonday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleMonday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleMonday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleMonday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleMonday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleMonday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleMonday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleMonday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleMonday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleMonday}/>11 pm </li>
                    </ul>


                    <span class="anchor">Tuesday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleTuesday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleTuesday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleTuesday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleTuesday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleTuesday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleTuesday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleTuesday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleTuesday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleTuesday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleTuesday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleTuesday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleTuesday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleTuesday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleTuesday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleTuesday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleTuesday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleTuesday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleTuesday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleTuesday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleTuesday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleTuesday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleTuesday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleTuesday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleTuesday}/>11 pm </li>
                    </ul>

                    <span class="anchor">Wednesday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleWednesday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleWednesday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleWednesday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleWednesday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleWednesday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleWednesday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleWednesday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleWednesday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleWednesday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleWednesday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleWednesday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleWednesday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleWednesday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleWednesday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleWednesday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleWednesday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleWednesday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleWednesday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleWednesday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleWednesday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleWednesday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleWednesday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleWednesday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleWednesday}/>11 pm </li>
                    </ul>

                    <span class="anchor">Thursday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleThursday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleThursday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleThursday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleThursday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleThursday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleThursday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleThursday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleThursday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleThursday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleThursday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleThursday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleThursday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleThursday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleThursday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleThursday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleThursday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleThursday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleThursday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleThursday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleThursday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleThursday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleThursday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleThursday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleThursday}/>11 pm </li>
                    </ul>

                    <span class="anchor">Friday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleFriday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleFriday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleFriday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleFriday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleFriday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleFriday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleFriday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleFriday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleFriday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleFriday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleFriday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleFriday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleFriday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleFriday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleFriday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleFriday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleFriday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleFriday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleFriday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleFriday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleFriday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleFriday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleFriday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleFriday}/>11 pm </li>
                    </ul>

                    <span class="anchor">Saturday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleSaturday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleSaturday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleSaturday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleSaturday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleSaturday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleSaturday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleSaturday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleSaturday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleSaturday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleSaturday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleSaturday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleSaturday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleSaturday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleSaturday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleSaturday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleSaturday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleSaturday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleSaturday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleSaturday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleSaturday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleSaturday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleSaturday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleSaturday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleSaturday}/>11 pm </li>
                    </ul>

                    <span class="anchor">Sunday</span>
                    <ul class="items">
                        <li><input type="checkbox" value = "0"  onChange={this.handleSunday}/>12 am</li>
                        <li><input type="checkbox" value = "1"  onChange={this.handleSunday}/>1 am</li>
                        <li><input type="checkbox" value = "2"  onChange={this.handleSunday}/>2 am </li>
                        <li><input type="checkbox" value = "3"  onChange={this.handleSunday}/>3 am </li>
                        <li><input type="checkbox" value = "4"  onChange={this.handleSunday}/>4 am </li>
                        <li><input type="checkbox" value = "5"  onChange={this.handleSunday}/>5 am </li>
                        <li><input type="checkbox" value = "6"  onChange={this.handleSunday}/>6 am </li>
                        <li><input type="checkbox" value = "7"  onChange={this.handleSunday}/>7 am </li>
                        <li><input type="checkbox" value = "8"  onChange={this.handleSunday}/>8 am </li>
                        <li><input type="checkbox" value = "9" onChange={this.handleSunday}/>9 am </li>
                        <li><input type="checkbox" value = "10" onChange={this.handleSunday}/>10 am </li>
                        <li><input type="checkbox" value = "11" onChange={this.handleSunday}/>11 am </li>
                        <li><input type="checkbox" value = "12" onChange={this.handleSunday}/>12 pm </li>
                        <li><input type="checkbox" value = "13" onChange={this.handleSunday}/>1 pm </li>
                        <li><input type="checkbox" value = "14" onChange={this.handleSunday}/>2 pm </li>
                        <li><input type="checkbox" value = "15" onChange={this.handleSunday}/>3 pm </li>
                        <li><input type="checkbox" value = "16" onChange={this.handleSunday}/>4 pm </li>
                        <li><input type="checkbox" value = "17" onChange={this.handleSunday}/>5 pm </li>
                        <li><input type="checkbox" value = "18" onChange={this.handleSunday}/>6 pm </li>
                        <li><input type="checkbox" value = "19" onChange={this.handleSunday}/>7 pm </li>
                        <li><input type="checkbox" value = "20" onChange={this.handleSunday}/>8 pm </li>
                        <li><input type="checkbox" value = "21" onChange={this.handleSunday}/>9 pm </li>
                        <li><input type="checkbox" value = "22" onChange={this.handleSunday}/>10 pm </li>
                        <li><input type="checkbox" value = "23" onChange={this.handleSunday}/>11 pm </li>
                    </ul>
                </div>
                <button onClick={this.onBook} name = {this.props.user.username}>Confirm Availability</button>
            </div>
          
        )
    }
}

const mapStateToProps = state => ({
    add_response: state.addAvailability.item,
    user: state.user.item
  });
  

export default connect(mapStateToProps, { addAvailability,reset})(Appointment);