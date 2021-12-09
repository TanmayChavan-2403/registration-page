import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

// styles for MUI components
const useStyles = makeStyles({

    root: {
        background: 'white',
        border: '0px',
        borderRadius: '50px',
        color: 'black',
        padding: '0 30px',
        width:  '50%',
        height: "14%",
        borderRadius: '50px',
        fontSize: '1.3em',
        fontWeight: 'bold',
    },
    
    textField: {
        color: 'white',
    }
        
    });


function Credential(props){
    // const classes = useStyles();

    return(
        <section id='identity-container'>

            <div id='password' className='identity-inp'>
                <input type='password' placeholder='Password' value={props.data.password}
                    onChange={(e) => props.storeData(e.target.value, 'password')}>
                </input>
            </div>

            <div id='confirmPassword' className='identity-inp'>
                <input type='password' placeholder='Confirm Password' value={props.data.confirmPassword}
                    onChange={(e) => props.storeData(e.target.value, 'confirmPassword')}>
                </input>
            </div>

            <button className='identity-inp' id='submitButton' onClick={props.submit}>
                Submit
            </button>

        </section>
    )
}

export default Credential