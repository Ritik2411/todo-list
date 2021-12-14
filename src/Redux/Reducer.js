import { USER } from "./Actiontype"

const initialState = {
    data:[]
}

export const userReducer = (state=initialState,action) => {
    switch(action.type){
        case USER:return{
            data:action.payload
        }

        default:return{
            data:state
        }
    }
}