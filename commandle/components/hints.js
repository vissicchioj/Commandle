import React from "react";


export default function Hints(props) {

    function win() {
      if(props.commander.name === props.answerData.name)
      {
        return true
      }
      else
      {
        return false
      }
    }
    
    function cmcComparison() {
        if (props.commander.cmc === props.answerData.cmc){
          return props.commander.cmc;
        }
        else if (props.commander.cmc > props.answerData.cmc){
          return '⬆️';
        }
        else{
          return '⬇️';
        }
      }

    function powerToughnessComparison(stat) {
        let commanderStat
        let answerStat
        if (stat === 'p'){
            commanderStat = Number(props.commander.power);
            answerStat = Number(props.answerData.power);
        }
        else {
            commanderStat = Number(props.commander.toughness);
            answerStat = Number(props.answerData.toughness);
        }

        if (commanderStat === answerStat){
            return commanderStat;
        }
        else if (commanderStat > answerStat){
            return '⬆️';
        }
        else{
            return '⬇️';
        }
    }

    function colorComparison(color) {
        if(props.commander.colors.includes(color) && props.answerData.colors.includes(color)){
          return color;
        } 
        else if(!props.commander.colors.includes(color) && props.answerData.colors.includes(color)){
          return 'X';
        }
        else {
          return '?';
        }
      }

    return (
        <table className={win() ? "hint-win" : "hint"}>
          <tbody>
          <tr>
            <th>Card</th>
            <th>CMC</th>
            <th>W</th>
            <th>U</th>
            <th>B</th>
            <th>R</th>
            <th>G</th>
            <th>Power</th>
            <th>Toughness</th>
            <th>Set</th>
          </tr>
          <tr>
            <th><img src = {props.answerData.image_uris.normal} className="guess--image"/></th>
            <th>{cmcComparison()}</th>
            <th>{colorComparison('W')}</th>
            <th>{colorComparison('U')}</th>
            <th>{colorComparison('B')}</th>
            <th>{colorComparison('R')}</th>
            <th>{colorComparison('G')}</th>
            <th>{powerToughnessComparison('p')}</th>
            <th>{powerToughnessComparison('t')}</th>
            <th>{props.commander.set === props.answerData.set ? props.commander.set : '?'}</th>
          </tr>
          </tbody>
        </table>
    );
}