import { baseUrl } from "../config";



const LOAD = "pokedex/pokemon/LOAD";
const SET_CURRENT = "I WANT TO LOAD SOME DETAILS ON A POKEMON";

export const load = (list) =>{
    return{
        type: LOAD,
        list
    }
}

const setCurrent = (current) =>{
    return {
        type: SET_CURRENT,
        current
    }
}

export const findPokemon = (id) => async (dispatch, getState) =>{
    const {authentication: {token}} = getState();
    const response = await fetch(`${baseUrl}/pokemon/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
    if (response.ok) {
        const pokemonDetail = await response.json();
        dispatch(setCurrent(pokemonDetail))
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


export default (state = {}, action) =>{
    switch(action.type){
        case LOAD:{
            return {...state, list: action.list}
        }
        case SET_CURRENT:{
            return {...state, current: action.current}
        }
        default: return state;
    }
}







