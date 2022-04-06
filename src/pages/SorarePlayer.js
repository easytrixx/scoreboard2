import React, { useEffect, useState } from 'react';
import bcrypt from "bcryptjs";
import axios from 'axios';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
mutation SignInMutation($input: signInInput!) {
    signIn(input: $input) {
      currentUser {
        slug
        jwtToken(aud: "<YourAud>") {
          token
          expiredAt
        }
      }
      errors {
        message
      }
    }
  }
  
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

const slug = "soraredata";
const SorarePlayer = () => {

    /*const [hashed,setHashed]=useState();
    useEffect (() => {
        axios.get(`http://localhost:8080/getHashedPassword`)
        .then(res => {
            setHashed(res.data.salt)
        })
    },[])
    const [login] = useMutation(LOGIN_MUTATION, {
        input: {
          email: "clement.massee@gmail.com",
          password: bcrypt.hashSync("ClementEric2811",hashed)
        },
        onCompleted: ({ login }) => {
          console.log(login)
        }})
    //const hashedPassword = bcrypt.hashSync("ClementEric2811", salt);
    return(
        <div>
            <h1>{hashed}</h1>
        </div>
    );*/
      let input;
      const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);
    
      if (loading) return 'Submitting...';
      if (error) return `Submission error! ${error.message}`;
    
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { text: input.value } });
              input.value = '';
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      );
}

export default SorarePlayer;