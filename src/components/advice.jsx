import React, { useState, useEffect } from 'react';
import styles from "./advice.module.css";
import dividerImg from "./pattern-divider-desktop.svg";
import mobileDividerImg from "./pattern-divider-mobile.svg"
import diceImg from "./icon-dice.svg";
function Advice(){

    const [data, setData]= useState({
        id: "",
        advice: "",
    });

    const [isFetching, setIsFetching]= useState(false);

    const [buttonClick, setButtonClick]= useState(0);


    useEffect(()=>{
        setIsFetching(true);
        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then((data)=> setData({
            id: data.slip.id, advice: data.slip.advice})).catch(error=>console.log("error is: "+error)).finally(setIsFetching(false))
    },[buttonClick]); //we link the useEffect to the buttonClick state var to trigger rerender when the button is clicked
                    // and therefore changes the value of the state var

    function generateAdvice(){
        setIsFetching(true);
        setButtonClick(buttonClick+1);
    }

    return(
        <div id="outside-wrapper" className={styles.container}>
            <section id="advice-card">
                <p id="advice-id">ADVICE #{data.id}</p>
                <p id="advice-quote">“{data.advice}”</p>
                
                <img id="desktop-divider" className="divider" src={dividerImg} alt="divider line" />
                <img id="mobile-divider" src={mobileDividerImg} alt="divider line but mobile" />
            </section>
            <button id="advice-bt" onClick={generateAdvice}>
                <img id="dice" src={diceImg} alt="a dice" />
            </button>
            {isFetching ? (
                <p id="loading-msg">...Advice is loading</p>
            ): <p></p>}
        </div>
    );
}

export default Advice;