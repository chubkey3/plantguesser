import React from 'react';
import {useState, useEffect } from "react";
import data from '../data/flowers3.json';
import Plantview from './plantview';

var seen = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomInt() {
    if (seen.length === 0){
        for (let i = 0; i<Object.keys(data).length; i++){
            seen.push(i);
        }
    }

    let p = seen[getRandomInt(Object.keys(seen).length)];

    seen = seen.filter(function(item) {
        return item !== p;
    })

    return p;
}

function Imgdisplay(){
    const [imagename, setImagename] = useState(0);
    const [imagesrc, setImagesrc] = useState([]);
    const [imagelink, setImagelink] = useState(0);
    const [rightanswers, setRightanswer] = useState(0);
    const [answers, setAnswers] = useState(0.00000000001);
    const [previousimgname, Setpreviousimgname] = useState("");
    const [previousimgsrc, Setpreviousimgsrc] = useState("");
    const [previousimglink, Setpreviousimglink] = useState("");
    const [imageindex, Setimageindex] = useState(0);
    const load = () => {
        Setimageindex(0);
        let m = Object.keys(data).length;
        let k = randomInt();
        setImagename(Object.keys(data)[k]);
        setImagesrc(data[Object.keys(data)[k]]["imgs"]);
        setImagelink(data[Object.keys(data)[k]]["ref"]);
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

        for (let i = 0; i<imagesrc.length; i++){
            if (i === 0) {
                document.getElementById("dot"+i).style.backgroundColor = "var(--accent)";    
            } else {
                document.getElementById("dot"+i).style.backgroundColor = "var(--main)";
            }
            
        }



    }

    const guess = (e) => {
        if (e.target.style.backgroundColor === 'var(--accent)'){
            if (e.target.innerHTML === imagename){
                console.log('right!');
                setRightanswer(rightanswers + 1);
            } else {
                console.log('wrong!');
            }

            setAnswers(answers + 1);

            e.target.style.transform = 'scale(1.1)';

            for (let i = 1; i<4; i++){
                let j = document.getElementById(i);
                if (j.innerHTML === imagename) {
                    j.style.backgroundColor = "var(--right)";
                } else {
                    j.style.backgroundColor = "var(--wrong)";
                }
            }

            Setpreviousimgname(imagename);
            Setpreviousimgsrc(imagesrc[imageindex]);
            Setpreviousimglink(imagelink);
            setTimeout(load, 2000);
            document.getElementById('togglepopup').style.display = "initial";
        }
    } 

    const increment = (e) => {
        if (e.target.innerHTML === '&gt;'){
            if (imageindex < (imagesrc.length - 1)){
                for (let i = 0; i<imagesrc.length; i++){
                    if (i === imageindex + 1) {
                        document.getElementById("dot"+i).style.backgroundColor = "var(--accent)";    
                    } else {
                        document.getElementById("dot"+i).style.backgroundColor = "var(--main)";
                    }
                    
                }
                Setimageindex(imageindex + 1);
            }
        } else {
            if (imageindex > 0) {
                for (let i = 0; i<imagesrc.length; i++){
                    if (i === imageindex - 1) {
                        document.getElementById("dot"+i).style.backgroundColor = "var(--accent)";    
                    } else {
                        document.getElementById("dot"+i).style.backgroundColor = "var(--main)";
                    }
                    
                }
                Setimageindex(imageindex - 1);
            }
        }
    }

    const loadfirstdot = () => {
        setTimeout(function(){document.getElementById('dot0').style.backgroundColor = "var(--accent)";}, 500);
    }

    //window.addEventListener('DOMContentLoaded', load);
    //load();
    useEffect(() => {
        load();
        loadfirstdot();
    }, []);

    return (
        <>  
            <div className='imagecontainer'>
                <img src={imagesrc[imageindex]} alt='Plant'></img>
            </div>
            <div className='imagedots'>
                {imagesrc.map((x, i) => (
                    <div id={"dot"+i} className='dot'></div>
                ))}
            </div>
            <div className='incrementcontainer'>
                <button className='incrementbuttons' onClick={increment}>&lt;</button>
                <button className='incrementbuttons' onClick={increment}>&gt;</button>
            </div>
            <div className='buttons'>
                <button className='guessbuttons' id='1' onClick={(e) => guess(e)}></button>
                <button className='guessbuttons' id='2' onClick={(e) => guess(e)}></button>
                <button className='guessbuttons' id='3' onClick={(e) => guess(e)}></button>
            </div>
            <div className='score'>
                <h2>{((rightanswers/answers)*100).toFixed(2) + "%"}</h2>
            </div>
            <Plantview plantname={previousimgname} plantimg={previousimgsrc} plantsrc={previousimglink}></Plantview>
        </>
    )
}

export default Imgdisplay;