import React from 'react';

function Identity(props){

    return(
        <section id='identity-container'>

            <div id='name' className='identity-inp'>
                <input type='text' placeholder='Name' value={props.data.name}
                    onChange={(e) => props.storeData(e.target.value, 'name')} >
                </input>
            </div>

            <div id='email' className='identity-inp'>
                <input type='email' placeholder='EmailId' value={props.data.email}
                    onChange={(e) => props.storeData(e.target.value, 'email')}>
                </input>
            </div>

            <div id='contact' className='identity-inp'>
                <input type='tel' placeholder='Phone Number' value={props.data.contact}
                    onChange={(e) => props.storeData(e.target.value, 'contact')}>
                </input>
            </div>

        </section>
    )
}


export default Identity