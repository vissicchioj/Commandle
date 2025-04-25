'use client';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Hints from "../components/hints";
import {
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";

export default function Home() {

  const [commander, setCommander] = useState(null);
  const [faceCommander, setFaceCommander] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [auto, setAuto] = useState('');
  const [answerData, setAnswerData] = useState(null);
  const [faceAnswer, setFaceAnswer] = useState(null);
  const [blur, setBlur] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);

  const [hints, setHints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          await axios.get('https://api.scryfall.com/cards/random?q=is%3Acommander'),

          await axios.get('https://api.scryfall.com/cards/search?&q=%28game%3Apaper%29+is%3Acommander'),
        ]);
        
        if (response1.data.layout !== "normal") {
          setCommander(response1.data.card_faces[0]);
          setFaceCommander(response1.data);
        }
        else {
          setCommander(response1.data);
        }
        setSuggestions(response2.data);
        
      } catch (error){
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    //if(auto !== ''){
    setIsLoading(true);
    setTimeout(() => {}, 5000)
    const fetchData = async () => {
      try {
        setTimeout(() => {
          console.log('axios request')
       }, 5000)
        const response = await axios.get('https://api.scryfall.com/cards/search?as=grid&order=name&q='+auto+'+%28game%3Apaper%29+is%3Acommander');

        setSuggestions(response.data);
        
        setIsLoading(false);
      } catch (error){
        console.log(error);
      }
    };
    fetchData();
    //}
  }, [auto]);

  

  function handleSubmit(e) {
    e.preventDefault();
    if (submitCount < 5 && answer){
      setSubmitCount(prevSubmitCount => prevSubmitCount + 1);
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api.scryfall.com/cards/named?exact=' + answer);

          if (response.data.layout !== "normal") {
            setAnswerData(response.data.card_faces[0]);
            setFaceAnswer(response.data);
            setAnswer('');
            setAuto('');
            setIsLoading(false);
            
          }
          else {
            setAnswerData(response.data);
            setAnswer('');
            setAuto('');
            setIsLoading(false);
          }
          await setCount(prevCount => prevCount + 1);
        
        } catch (error){
          console.log(error);
        }
      };
      fetchData();
      
    }
  }

  useEffect(()=> {
    if (count != 0)
    {
      newTable();
      if (answerData.name === commander.name){
        setBlur(false);
        setSubmitCount(6);
      }
    }
    }, [count]);

  function newTable() {
    setHints(prevHints => 
    [...prevHints,
      <Hints 
        answerData = {answerData}
        commander = {commander}
      />
    ]
    )
  }

  function faceColorIdentity(){
    // change color to color id
  }

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <div className="App">
        <h1>COMMANDLE</h1>
        {commander ? (
        <div>
            {answerData ? (
            <div className = "div--hint">
              {hints.map(item => (
                <div key = {item.id}>{item}</div>
              ))}
            </div>
            ) :
            <h3>Enter a commander!</h3>
            }
        <form onSubmit = {handleSubmit}>
          <Autocomplete 
            placeholder="Target Commander"
            required
            selectedKey={answer}
            onSelectionChange={setAnswer}
            onInputChange={setAuto}
            size="md"
            variant="bordered"
            allowsCustomValue = "false"
            isLoading={isLoading}
            isReadOnly={submitCount >= 5}
          >
          {
            suggestions.data.map(item =>
              <AutocompleteItem 
                  key={item.name}
                >{item.name}
              </AutocompleteItem>
            )
          }
          </Autocomplete>
          <button type="submit" disabled={submitCount >= 5}>
            Submit
          </button>
        </form>
          <h3>Target Commander:</h3>
          <img src = {commander.image_uris.normal} className={blur ? "blur" : "unblur"}/>
          
          </div>
        ) : 
        (<p>loading...</p>)}
      </div>
    </main>
  );
}

/*
<p>cheats:</p>
          <p>{commander.cmc}</p>
          {commander.colors.map(item => (
            <p key = {item.id}>{item}</p>
          ))}
          <p>{commander.name}</p>
          <p>{commander.power}</p>
          <p>{commander.toughness}</p>
          <p>{commander.set}</p>
          {answerData ? (
            <p>{answerData.name} {answerData.cmc}  
            {answerData.colors.map(item => (
            <span key = {item.id}> {item} </span>
            ))}
            {answerData.power} {answerData.toughness} {answerData.set}</p>)
            :
            (<p></p>)
          }
          <p>{submitCount}</p>
*/
