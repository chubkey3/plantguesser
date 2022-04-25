import React from 'react';

function Plantview(props) {
    const errorimg = () => {
        document.getElementById('plantviewimage').src = require('../assets/chubkeyicon.jpeg');
    }

    return (
        <div className='plantviewcontainer'>  
            <p>{props.plantname}</p>
            <div className='plantviewimgcontainer'>
                <img id='plantviewimage' src={props.plantimg} alt={"You must guess a plant first."} onError={errorimg}></img>
            </div>
            <a href={props.plantsrc} target="_blank" rel='noreferrer'>View Plant</a>
        </div>
    )
}

export default Plantview;