import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Create = () => {
  const history = useHistory();
  const classes = useStyles();
  const [matches, setMatches] = React.useState([]);
  const [live, setLive] = React.useState([]);
  const items = []
  const[id, setId]=React.useState(0)
  
  const [state, setState] = React.useState({
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  function getLive(){
    fetch("https://api.sofascore.com/api/v1/sport/football/events/live")
        .then(response=> {
            return response.json();
        })
        .then(users => {
            setLive(users.events)
        })
  }
  function onClickButton(){
    var id=0
    for (var key in state) {
      if (state[key]==true){
        id=key
      }
    }
    window.open("/data/"+id)
  }
  function getMatches(){
    let newDate = new Date()
    let date = newDate.getDate();
    let month_raw = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let month="0"
    if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}
    if(date<10){date="0"+date.toString()}
    var day=year+"-"+month+"-"+date
    console.log(day)
    fetch("https://api.sofascore.com/api/v1/sport/football/scheduled-events/"+day)
        .then(response=> {
            return response.json();
        })
        .then(users => {
            setMatches(users.events)
        })
  }
  React.useEffect (() => {
    getLive()
    getMatches()
  },[])

  /*for (const [index, value] of live.entries()) {
    if(value.status.description!="Ended" && value.tournament.name=="Int. Friendly Games"){
    items.push(
      <FormControlLabel
      control={<Checkbox unchecked={value.homeTeam.name+" - "+value.awayTeam.name} onChange={handleChange} name={value.homeTeam.name+" - "+value.awayTeam.name} />}
      label={value.homeTeam.name+" - "+value.awayTeam.name}
    />
        )}
}*/
const list=["UEFA Champions League", "UEFA Europa League", "UEFA Europa Conference League, Knockout stage", "UEFA Conference League","Eredivisie","Süper Lig", "Primeira Liga", "Premier League", "Bundesliga", "LaLiga", "Serie A", "Ligue 1", "Pro League", "UEFA Nations League", "World Cup", "World Cup Qual. UEFA", "World Cup Qual. CONMEBOL", "World Cup Qual. CAF", "World Cup Qual. AFC", "World Cup Qual. CONCACAF", "European Championship", "European Championship, Qualification","J.League","MLS"]
for (const [index, value] of matches.entries()) {
  console.log(value.tournament.name)
  if(value.status.description!="Ended" && list.includes(value.tournament.name)){
    items.push(
      <FormControlLabel
      control={<Checkbox unchecked={value.homeTeam.name+" - "+value.awayTeam.name} onChange={handleChange} name={value.id} />}
      label={value.homeTeam.name+" - "+value.awayTeam.name}
    />)
    
  }
}

  return (
    <div>
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Choisis les matches que tu souhaites</FormLabel>
        <FormGroup>
          {items}
        </FormGroup>
      </FormControl>
      
    </div>
    <div>
        <Button onClick={() => onClickButton()}>Je clique</Button>
        
    </div>
    </div>
    
  );
}

export default Create