import React from 'react';
import {useState, useEffect } from "react";
import data from '../data/flowers3.json';
import Plantview from './plantview';

var seen = [];
var timer;
var delay = 2000;
var highscore = loadhighscore();
var timeractive = false;

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

function loadrightanswers(){
    let right = localStorage.getItem('rightanswers');
    

    if (right === null){
        localStorage.setItem('rightanswers', '0')
        
        right = '0';
        
    }
    return Number(right);
}

function loadanswers(){
    let answers = localStorage.getItem('answers');

    if (answers === null){
        localStorage.setItem('answers', '0.0000000000001');
        answers = '0.0000000000001';
    }

    return Number(answers);
}

function loadhighscore(){
    let highscore = localStorage.getItem('highscore');

    if (highscore === null){
        localStorage.setItem('highscore', '0');
        highscore = 0;
    }

    return Number(highscore);
}

function Imgdisplay(){
    const [imagename, setImagename] = useState(0);
    const [imagesrc, setImagesrc] = useState();
    const [imagelink, setImagelink] = useState(0);
    const [rightanswers, setRightanswer] = useState(loadrightanswers());
    const [answers, setAnswers] = useState(loadanswers());
    const [previousimgname, Setpreviousimgname] = useState("");
    const [previousimgsrc, Setpreviousimgsrc] = useState("");
    const [previousimglink, Setpreviousimglink] = useState("");
    const [timerscore, Settimerscore] = useState(0);

    const load = () => {
        let m = Object.keys(data).length;
        let k = randomInt();
        setImagename(Object.keys(data)[k]);
        setImagesrc(data[Object.keys(data)[k]]);
        setImagelink(data[Object.keys(data)[k]]["ref"]);
        let b = Math.floor(Math.random() * 3)+1;
        console.log("Answer: "+b);
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
                localStorage.setItem('rightanswers', String(rightanswers + 1));
                setRightanswer(rightanswers + 1);
                if (timeractive === true){
                    Settimerscore(timerscore + 1);
                }
            }

            localStorage.setItem('answers', answers + 1);
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
            Setpreviousimgsrc(imagesrc);
            Setpreviousimglink(imagelink);
            setTimeout(load, delay);
            document.getElementById('togglepopup').style.display = "initial";
        }
    }

    

    const loadfirstdot = () => {
        setTimeout(function(){document.getElementById('dot0').style.backgroundColor = "var(--accent)";}, 500);
    }

    const resetscore = () => {
        localStorage.setItem('rightanswers', '0');
        localStorage.setItem('answers', '0.0000000000001');

        document.getElementById('scoredisplay').style.opacity = 0;
    
        setTimeout(function(){
            document.getElementById('scoredisplay').style.opacity = 1;
            setRightanswer(0);
            setAnswers(0.0000000000001);
        }, 500);
    }

    const starttimer = () => {
        clearInterval(timer);
        var time = 0;
        delay = 500;
        Settimerscore(Number(0));
        timeractive = true;
        timer = setInterval(function(){
            document.documentElement.style.setProperty('--spin', time+'%');
            time = time + (100/(5*20));
            if (document.documentElement.style.getPropertyValue('--spin') === '100%'){
                clearInterval(timer);
                if (timerscore > highscore){
                    localStorage.setItem('highscore', String(timerscore));
                    highscore = loadhighscore();
                }
                delay = 2000;
                timeractive = false;
                
            }
        }, 50);
    }

    useEffect(() => {
        load();
        loadfirstdot();
    }, []);

    return (
        <>  
            <div className='imagecontainer'>
                <img src={imagesrc} alt='Plant'></img>
            </div>
            
            
            
            <div className='buttons'>
                <button className='guessbuttons' id='1' onClick={(e) => guess(e)}></button>
                <button className='guessbuttons' id='2' onClick={(e) => guess(e)}></button>
                <button className='guessbuttons' id='3' onClick={(e) => guess(e)}></button>
            </div>
            <div id='scoredisplay' className='score'>
                <h2>{((rightanswers/answers)*100).toFixed(2) + "%"}</h2>
            </div>
            <button className='resetbutton' onClick={resetscore}><img src={require('../assets/restart-icon-18-256.png')} alt='Reset'></img></button>
            <div className='scoredisplay'>
            <div className='timerouter'>
                <button onClick={starttimer} className='timerinner'>
                    <div className='timerinnerinner'>{timerscore}</div>
                </button>
            </div>
            <p>{"Best:" + highscore}</p>
            </div>
            <Plantview plantname={previousimgname} plantimg={previousimgsrc} plantsrc={previousimglink}></Plantview>
        </>
    )
}

export default Imgdisplay;