import React, {PureComponent} from 'react'
import { Button, TextField } from '@material-ui/core';
import '../styles/registration.css'

import Credential from './credential';
import Identity from './identity';
import Alert from './alert';

class Registration extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            page: 0,
            name: '', email: '', contact: '', password: '', confirmPassword: ''
        }
        this.changePage = this.changePage.bind(this);
        this.sendData = this.sendData.bind(this);
        this.storeData = this.storeData.bind(this);
    }

    // this function is responsible for going back and forth from Identity component to credential component
    changePage(){
        this.setState({
            page: this.state.page === 0 ? 1 : 0,
        }, () => {
            let navSection = document.getElementById('navSection');
            let arrow = navSection.children[0];
            if (this.state.page === 0){
                arrow.style.float = 'right';
                arrow.style.transform = 'rotate(0deg)';

            } else {
                arrow.style.float = 'left';
                arrow.style.transform = 'rotate(180deg)';

            }
        })
    }

    // this is a callback funtion passed to credential and identity components to invoke when there is change in the input
    // field, and when that happens the data is updated in the this.state object
    storeData(value, key){
        this.setState({
            [key]: value
        }, () => {
            // document.getElementById(key).children[0].value = this.state.key
        } )
    }

    // The following function is used to display current status. AlertBox which is located on top right corner of the
    // page takes three arguments, "type" which is used to get custom image, "message" is used to decide what message 
    // should be displayed on messagebox and last "color" is used to decide which color should be displayed on the 
    // Alertbox. Basically three types of messagebox are introduced, 
    // 1) Warning: which you can see by leaving all the fields empty and then try submitting
    // 2) Alert: This messagebox can be seen by putting all values correct only writing different passwords on both 
    //           password fields
    // 3) Success: You will be seeing this messagebox when you have successfully submitted all of your details
    displayMessage(type, message, color){
        let alertBox = document.getElementById('alertBox');
        alertBox.children[0].children[0].src = `./images/${type}.png`;
        alertBox.children[1].children[0].innerText = message;
        alertBox.style.backgroundColor = color;
        alertBox.style.transform = 'translateY(0%)';
        setTimeout( () => {
            alertBox.style.transform = 'translateY(-150%)';
        }, 3000)
    }

    sendData(){
        // Destrcuturing, so that we don't have to do this.state every single time we access properties
        const {name, email, contact, password, confirmPassword} = this.state 

        // Validating all fields
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const contactRegEx = /^\d{10}$/;

        if (name.trim() == "" || email == "" || contact == "" || password == "" || confirmPassword == ""){
            this.displayMessage('warning', "Please don't leave fields empty", '#f57c00');
            return;
        } else if(! email.match(emailRegEx)){
            this.displayMessage('warning', "Please enter valid email Id", '#f57c00');
            return;
        } else if(! contact.match(contactRegEx)){
            this.displayMessage('warning', "Please enter valid phone number", '#f57c00');
            return;
        } else if (password !== confirmPassword){
            this.displayMessage('alert', "Password does not matches with confirmPassword", '#d32f2f');
            return;
        }

        // Sending all data fetched from input fields to server to store it in database
        // If you get success then you can see the output by navigating to Network tab, then clicking on the request done
        // by the server and then clicking on Response tab.
        fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name, email, contact, password, confirmPassword
            })
        }).then(res => {
            this.displayMessage('success', "User Registered successfully", "#388e3c");
        })
        .catch(err => {
            this.displayMessage('alert', "Registration Failed", "#d32f2f");
        });
    }

    render() {
        // Destrcuturing, so that we don't have to do this.state every single time we access properties
        const {name, email, contact, password, confirmPassword} = this.state;

        return(
            
            <>
                <style>{"\
                    :root{\
                        --bgColor:#222222;\
                        --sndBgColor:#2c2c2c;\
                        --fontColor: #FFFFFF;\
                    }\
                "}</style>
                <Alert />    
                <section id='registration'>
                    <div id='cont-header'>
                        <h1>Registration</h1>
                    </div>
    
                    <div id='left-reg' className='reg'>
                        {   //Checking if the page number is 0 that means we have to render Identity Component 
                            // else Credential components
                            this.state.page === 0 ? 
                            <Identity storeData={this.storeData} data={{name, email, contact}}/> :
                            <Credential submit={this.sendData} storeData={this.storeData} data={{password, confirmPassword}}/>
                        }
                        <div id='navSection'>
                            <img src='./images/forwardArrow.png' onClick={this.changePage}></img>
                        </div>
                    </div>
    
    
                    <div id='right-reg' className='reg'>
                        <img src='./images/registration.png'></img>
                    </div>
                </section>
            </>
        ); 
    }

}

export default Registration