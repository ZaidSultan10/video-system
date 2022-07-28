import { SETREF } from "../actions/type";

let initialValue = {
    ref:null
}

const videoReducer = (state = initialValue, action) => {
    switch(action.type){
        case SETREF:
           return {
               ...state,
               ref:action.payload
               }

        default: 
           return state
    }
}

export default videoReducer