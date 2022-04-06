import React from 'react'
import {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    avatar: {
      height: 75,
      width: 75,
    },

    control: {
      padding: theme.spacing(2),
    }
  }));

const Notes = props => {
    const location = useLocation();
    var liste = location.state.state;
    const classes = useStyles();
    const items = []
    const [score, setScore] = useState([]);
    const MINUTE_MS = 30000;
    const [logoHomeTeam, setLogoHomeTeam] = useState([]);
    const [logoAwayTeam, setLogoAwayTeam] = useState([]);
    
    const getData = () => {
        fetch("https://api.sofascore.com/api/v1/sport/football/events/live")
        .then(response=> {
             return response.json();
        })
        .then(users => {
            setScore(users.events)
            for(let i = 0; i< users.events.length;i++){
                
                getLogoHomeTeam(users.events[i].homeTeam.id)
                getLogoAwayTeam(users.events[i].awayTeam.id)
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
            if(!logoHomeTeam.includes(imageObjectURL)){
                setLogoHomeTeam(oldArray => [...oldArray, imageObjectURL]);
            }
            
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
            if(!logoAwayTeam.includes(imageObjectURL)){
                setLogoAwayTeam(oldArray => [...oldArray, imageObjectURL]);
            }
        })
    }
    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            getData()
        }, MINUTE_MS);
        return () => clearInterval(interval);
    },[])
    for (const [index, value] of score.entries()) {
        var matches=value.homeTeam.name+" - "+value.awayTeam.name
        for (const [index2, value2] of liste.entries()) {
            if(value2==matches){
        var start=value.time.currentPeriodStartTimestamp;
        var now=Math.floor(Date.now() / 1000)
        var time=now-start;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 3600 % 60);
        var realtime=""
        console.log(logoHomeTeam)
        console.log(logoAwayTeam)
        if(value.lastPeriod=="period1"){
            realtime=m;
        }
        else if(value.lastPeriod==null){
            realtime="HT";
        }
        else{
            realtime=45+m;
        }
        
        items.push(
            <Grid container spacing={2}>
                <Grid item xs={5} justify="center" align="center" style={{backgroundColor:value.homeTeam.teamColors.primary}}>
                    <Avatar src={logoHomeTeam[index]} className={classes.avatar}/>
                </Grid>
                <Grid align="center" item xs={6} style={{backgroundColor:value.homeTeam.teamColors.secondary}}>
                    <Typography variant="h2">{value.homeScore.current}</Typography>
                </Grid>
                <Grid item xs={5} justify="center" align="center" style={{backgroundColor:value.awayTeam.teamColors.primary}}>
                    <Avatar src={logoAwayTeam[index]} className={classes.avatar}/>
                </Grid>
                <Grid align="center" item xs={6} style={{backgroundColor:value.awayTeam.teamColors.secondary}}>
                    <Typography variant="h2">{value.awayScore.current}</Typography>
                </Grid>
                <Grid align="center" item xs={12}>
                    <Typography>{realtime}</Typography>
                </Grid>
                <Grid style={{height: "50px"}} xs={12}>

                </Grid>
            </Grid>
            )
        }
    }
}
    return (
        <Grid container spacing={4} xs={3} style={{marginTop: "20px", marginLeft: "30px"}}>
        </Grid>
        
      
  )
}

export default Notes;