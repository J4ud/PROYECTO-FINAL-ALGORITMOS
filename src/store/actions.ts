export const ChangeScreen = (screen:string) => {
    return{
        action: 'ChangeScreen',
        payload: screen
}}
export const signUpCompleted = (screen:any) => {
    return{
        action: 'signUpCompleted',
        payload: screen
}}