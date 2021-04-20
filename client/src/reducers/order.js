import { CHECKOUT } from '../actions/types';

const initialState = {
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case CHECKOUT:
            return{
                ...state,
            }

        default:
            return state;
    }
}