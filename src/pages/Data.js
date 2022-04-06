import React from 'react'
import {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import {Howl,Howler} from "howler"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    score:{
    padding: theme.spacing(1),
      textAlign: 'center',
      color: "red",
      fontFamily: "Lucida Console",
      fontSize: "15px",

    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: "white",
    
      fontSize: "30px",
      fontFamily: "Lucida Console",
      backgroundColor: "#B0B0B0"
    },
    teamName: {
        padding: theme.spacing(1),
        color: "white",
        fontSize: "30px",
        fontFamily: "Lucida Console",
        marginLeft: "15px"
      },
    borderCity:{
        backgroundColor: "#3ACAF0"
    },
    borderAway:{
        backgroundColor: "#EB0705",
    },
    borderS:{
        backgroundColor: "#B0B0B0",
        fontFamily: "Lucida Console",
    },
    bigBorder:{
        marginLeft: "10px",
        marginTop: "10px",
        boxShadow: "0px 35px 30px -15px #111"
    },
    avatar:{
      height: "53px",
      width: "53px"
    },
    borderSTop:{
        backgroundColor: "#B0B0B0",
        fontFamily: "Lucida Console",

    },
    gridScore:{
        backgroundColor: "#EDF792",
        height: "30px"
    },
  }));
  
const Data = () => {
    const { id } = useParams()
    const MINUTE_MS = 20000;
    const classes = useStyles();
    const [nameHomeTeam, setHomeTeam] = useState("TEST");
    const [nameAwayTeam, setAwayTeam] = useState("TEST");
    const [scoreHome, setScoreHome] = useState(0);
    const [scoreAway, setScoreAway] = useState(0);
    let goal = new Audio("/sound.mp3")
    let red = new Audio("/sound.mp3")
    const [logoHomeTeam, setLogoHomeTeam] = useState();
    const [logoAwayTeam, setLogoAwayTeam] = useState();
    let table=[]
    const [homeTeamColor,setHomeTeamColor]=useState("yellow");
    const [awayTeamColor, setAwayTeamColor]=useState("yellow")
    const [timer, setTimer]=useState(0);
    const start = () => {
      fetch("https://api.sofascore.com/api/v1/event/"+id+"/incidents")
        .then(response=> {
             return response.json();
        })
        .then(users => {
            let lastElement=table[table.length-1]
            console.log(lastElement)
            console.log(table)
            if(lastElement!=null){
              if(table.length==0 || lastElement.time!=users.incidents[1].time){
                table.push(users.incidents[1])
                console.log("HELLO")
                if(users.incidents[1].incidentType=="goal"){
                  goal.play()
                  console.log("ET LE BUT")
               }
               else if (users.incidents[1].incidentType=="card" && users.incidents.incidentClass=="red"){
                 red.play()
                 console.log("ET LA ROUGE")
                }
            }
          }
            else{
              console.log("LOOL")
              table.push(users.incidents[1])
              if(users.incidents[1].incidentType=="goal"){
                goal.play()
                console.log("ET LE BUT")
             }
             else if (users.incidents[1].incidentType=="card" && users.incidents.incidentClass=="red"){
              red.play()
              console.log("ET LA ROUGE")
             }
            }
          
        })
    }  
    const setMinuts =(value) => {
        var start=value.currentPeriodStartTimestamp;
        var now=Math.floor(Date.now() / 1000)
        var time=now-start;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 3600 % 60);
        var realtime=""
        if(value.status.type=="notstarted"){
            realtime=45
        }
        else{
            if(value.lastPeriod=="period1"){
                realtime=m;
            }
            else if(value.lastPeriod==null){
                //realtime="HT";
                realtime=89
            }
            else{
                realtime=45+m;
            }
        }
        setTimer(realtime)
    }
    const getData = () => {

        fetch("https://api.sofascore.com/api/v1/event/"+id)
        .then(response=> {
             return response.json();
        })
        .then(users => {
            if(users.event.homeScore.current==null){
                setScoreHome(0)
                setScoreAway(0)
            }
            else{
                setScoreHome(users.event.homeScore.current);
                setScoreAway(users.event.awayScore.current);
            }
            setHomeTeam(users.event.homeTeam.name);
            setAwayTeam(users.event.awayTeam.name);
            getLogoHomeTeam(users.event.homeTeam.id);
            getLogoAwayTeam(users.event.awayTeam.id);
            setMinuts(users.event)
            if(users.event.homeTeam.teamColors.primary=="#ffffff"){
                setHomeTeamColor(users.event.homeTeam.teamColors.secondary)
            }
            else{
                setHomeTeamColor(users.event.homeTeam.teamColors.primary)
            }
            if(users.event.awayTeam.teamColors.primary=="#ffffff"){
                setAwayTeamColor(users.event.awayTeam.teamColors.secondary)
            }
            else{
                setAwayTeamColor(users.event.awayTeam.teamColors.primary)
            }
        })
    }
    const getLogoHomeTeam = (id) =>{
        const url="https://api.sofascore.app/api/v1/team/"+id+"/image"
        fetch(url)
        .then(response=> {
             return response.blob();
        })
        .then(users => {
            const imageObjectURL = URL.createObjectURL(users);
            setLogoHomeTeam(imageObjectURL);
            
        })
    }
    const getLogoAwayTeam = (id) =>{
        const url="https://api.sofascore.app/api/v1/team/"+id+"/image"
        fetch(url)
        .then(response=> {
             return response.blob();
        })
        .then(users => {
            const imageObjectURL = URL.createObjectURL(users);
            setLogoAwayTeam(imageObjectURL);
        })
    }
    useEffect(() => {
        getData()
        start()
        const interval = setInterval(() => {
            getData()
            start()
        }, MINUTE_MS);
        return () => clearInterval(interval);
    },[])
    return (
        <div className={classes.root}>
        <Grid container xs={4} className={classes.bigBorder}>
          <Grid item container xs={4} style={{backgroundColor: homeTeamColor}} justify="center" alignItems="center" backgroundColor="#0310a7">
            <Avatar className={classes.avatar} src={logoHomeTeam}></Avatar>
          </Grid>
          <Grid item container xs={6} style={{backgroundColor: homeTeamColor}} >
            <Typography className={classes.teamName}>{nameHomeTeam.substring(0,3).toUpperCase()}</Typography>
          </Grid>
          <Grid item container xs={2} className={classes.borderSTop} justify="center" alignItems="center">
            <Typography className={classes.paper}>{scoreHome}</Typography>
          </Grid>
          <Grid item container xs={4} style={{backgroundColor: awayTeamColor}} justify="center" alignItems="center">
            <Avatar className={classes.avatar} src={logoAwayTeam}></Avatar>
          </Grid>
          <Grid item container xs={6} style={{backgroundColor: awayTeamColor}} >
            <Typography className={classes.teamName}>{nameAwayTeam.substring(0,3).toUpperCase()}</Typography>
          </Grid>
          <Grid item container xs={2} className={classes.borderS} justify="center" alignItems="center">
            <Typography className={classes.paper}>{scoreAway}</Typography>
          </Grid>
         
        </Grid>
      </div>
    )
}

export default Data;