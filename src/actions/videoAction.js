import { SETREF } from "./type";

export const setVideoRef = (data) => {
    console.log('data -->',data)
    try{
        return { type: SETREF, payload: data }
    }
    catch(err){
        console.log('err -->',err.message)
    }
}