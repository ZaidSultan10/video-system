import {createStore, combineReducers} from 'redux'
import videoReducer from '../reducers/videoReducer.js'

export const ConfigureStore = () => {
     const store = createStore(
        combineReducers({
            videoReducer
        }),
    )  
    return store
}