//Esta función crea una acción para cambiar la pantalla actual en la aplicación.
export const ChangeScreen = (screen:string) => {
    return{
        action: 'ChangeScreen',
        payload: screen
}}
//Esta función crea una acción que indica que el proceso de registro (sign-up) se ha completado.
export const signUpCompleted = (screen:any) => {
    return{
        action: 'signUpCompleted',
        payload: screen
}}