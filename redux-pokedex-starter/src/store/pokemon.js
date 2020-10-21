import { baseUrl } from "../config";



const LOAD = "pokedex/pokemon/LOAD";

export const load = (pokemon) =>{
    return{
        type: LOAD,
        pokemon
    }
}

export const loadReducer = (state = [], action) =>{
    switch(action.type){
        case LOAD:{
            return [...state, ...action.pokemon]
        }
        default: return state;
    }
}

export const getPokemon = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`${baseUrl}/pokemon`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      if (response.ok) {
        const pokemon = await response.json();
        dispatch(load(pokemon))
      } else{
          console.error("Did get stuff")
      }
    // Handle response
  };