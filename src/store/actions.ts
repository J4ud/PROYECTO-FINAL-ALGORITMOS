import { getPosts, getPostsProfile } from "../services/firebase"
import { Screens } from "../types/navigation"

export const ChangeScreen = (screen:Screens) => {
    return{
        action: 'ChangeScreen',
        payload: screen
}}
export const signUpCompleted = (screen:Screens) => {
    return{
        action: 'signUpCompleted',
        payload: screen
}}

export const getPostsAction = async () => {
    const posts = await getPosts();
    return{
        action: 'GETPOSTS',
        payload: posts
    }
}

export const getPostsProfileAction = async (idUser: string) => {
    const postsProfile = await getPostsProfile(idUser);
    return{
        action: 'GETPOSTSPROFILE',
        payload: postsProfile
    };
};


export const setUserCredentials = (user:string) =>{
    return{
        action: 'SETUSER',
        payload: user,
    }
}
export const logout = (state:any) =>{
    return{
        action: 'LOGOUT',
        payload: state,
    }
}
