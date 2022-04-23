import React from 'react';
import {useState } from "react";
import data from '../data/flowers2.json';

var seen = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomInt(max) {
    if (seen.length === 0){
        for (let i = 0; i<Object.keys(data).length; i++){
            seen.push(i);
        }
    }

    let p = getRandomInt(Object.keys(seen).length);

    seen = seen.filter(function(item) {
        return item !== p;
    })

    return p;
}

function Imgdisplay(){
    const [imagename, setImagename] = useState(0);
    const [imagesrc, setImagesrc] = useState(0);

    const load = () => {
        let m = Object.keys(data).length;
        let k = randomInt();
        setImagename(Object.keys(data)[k]);
        setImagesrc(data[Object.keys(data)[k]]);
        let b = Math.floor(Math.random() * 3)+1;
        document.getElementById(b).innerHTML = Object.keys(data)[k];
        for (let i = 1; i<4; i++){
            if (i !== b){
                let temp = ""
                temp = Object.keys(data)[getRandomInt(m)]
                while (temp === Object.keys(data)[k]){
                    temp = Object.keys(data)[getRandomInt(m)];
                }
                document.getElementById(i).innerHTML = temp;
            }
        }

        for (let i = 1; i<4; i++){
            document.getElementById(i).style.backgroundColor = 'var(--accent)';
            document.getElementById(i).style.transform = 'scale(1)';

        }



    }

    const guess = (e) => {
        if (e.target.style.backgroundColor === 'var(--accent)'){
            if (e.target.innerHTML === imagename){
                console.log('right!');
            } else {
                console.log('wrong!');
            }

            e.target.style.transform = 'scale(1.1)';

            for (let i = 1; i<4; i++){
                let j = document.getElementById(i);
                if (j.innerHTML === imagename) {
                    j.style.backgroundColor = "var(--right)";
                } else {
                    j.style.backgroundColor = "var(--wrong)";
                }
            }

            setTimeout(load, 2000);
        }
    } 

    window.addEventListener('load', load);

    return (
        <>  
            <div className='imagecontainer'>
                <img src={imagesrc} alt='flower'></img>
            </div>
            <div className='buttons'>
                <button id='1' onClick={(e) => guess(e)}></button>
                <button id='2' onClick={(e) => guess(e)}></button>
                <button id='3' onClick={(e) => guess(e)}></button>
            </div>
        </>
    )
}

export default Imgdisplay;