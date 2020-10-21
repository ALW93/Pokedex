import {baseUrl} from "../config"

const TOKEN_KEY = "non-empty-string";
const SET_TOKEN = 'pokedex/authentication/SET_TOKEN';

export const setToken = (token) =>{
    return{
        type: SET_TOKEN,
        tokenProperty: token
    }
}


export const login = (email, password) => async dispatch => {
    const response = await fetch(`${baseUrl}/session`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem(TOKEN_KEY, token)
        dispatch(setToken(token))
      }
  }

  export const loadToken = () => async (dispatch) =>{
      const token = localStorage.getItem(TOKEN_KEY);
      dispatch(setToken(token));
  }



  export default function reducer(state = {}, action){
      switch (action.type){
          case SET_TOKEN:{
              return {...state, token: action.tokenProperty}
          }
          default:{
              return state;
          }
      }
  }


