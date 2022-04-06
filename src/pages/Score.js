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

  
const Score = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Grid container xs={4} className={classes.bigBorder}>
          <Grid item xs={3}>
            <Typography></Typography>
          </Grid>
          <Grid item xs={5} className={classes.gridScore} justify="center" alignItems="center">
            <Typography className={classes.score}>49'</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography></Typography>
          </Grid>
          <Grid item container xs={3} className={classes.borderCity} justify="center" alignItems="center">
            <Avatar className={classes.avatar} src="https://upload.wikimedia.org/wikipedia/fr/thumb/b/ba/Logo_Manchester_City_2016.svg/1200px-Logo_Manchester_City_2016.svg.png"></Avatar>
          </Grid>
          <Grid item container xs={6} className={classes.borderCity} >
            <Typography className={classes.teamName}>MCI</Typography>
          </Grid>
          <Grid item container xs={2} className={classes.borderSTop} justify="center" alignItems="center">
            <Typography className={classes.paper}>1</Typography>
          </Grid>
          <Grid item container xs={3} className={classes.borderAway} justify="center" alignItems="center">
            <Avatar className={classes.avatar} src="https://upload.wikimedia.org/wikipedia/fr/archive/5/54/20190512221145%21Logo_FC_Liverpool.svg"></Avatar>
          </Grid>
          <Grid item container xs={6} className={classes.borderAway} >
            <Typography className={classes.teamName}>LIV</Typography>
          </Grid>
          <Grid item container xs={2} className={classes.borderS} justify="center" alignItems="center">
            <Typography className={classes.paper}>2</Typography>
          </Grid>
        </Grid>
      </div>
  )
}

export default Score;