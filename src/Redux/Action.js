import { USER } from "./Actiontype"

export const user = (data) => {
    return{
        type:USER,
        payload:data
    }
}