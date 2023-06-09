import React, { useState, useRef, useCallback } from 'react';
import Canvas from "../molecule/Canvas";
import Console from "../organizm/Console"
const Main = () => {
    let [points, setPoints] = useState(0);
    // let [score, setScore] = useState([2])
       let [option, setOption ] = useState("easy")

    let easy = useRef("easy");

const handleClick=useCallback(()=>{
    setOption(easy.current.value)
    return option
   
    
},[option])

    return ( 

        <>
        <Canvas  easy = { option } points={ points } setPoints={ setPoints }/>
        <Console  easy = { easy } click = { handleClick }  points={ points }/>
        </>
     );
}
 
export default Main;
