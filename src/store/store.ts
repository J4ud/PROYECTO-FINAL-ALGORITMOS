import { reducer } from "./reducer";
import { Screens } from "../types/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { ChangeScreen, setUserCredentials } from "./actions";

onAuthStateChanged(auth,(user)=>{
  if(user){
    user.uid !==null ? dispatch(setUserCredentials(user.uid)) : '';
    dispatch(ChangeScreen(Screens.DASHBOARD))
  }else{
    console.log('No hay usuario')
    dispatch(ChangeScreen(Screens.LOGIN))
  }
})

const emptyState  = {
  screen: Screens.LOGIN,
  posts: [],
  user: '', 
  postsProfile: []

}
export let appState = emptyState;

  let observers: any[] = [];

console.log(appState)

const notifyObservers = () => observers.forEach((o) => o.render());

export const dispatch = (action: any) => {
  const clone = JSON.parse(JSON.stringify(appState));
  appState = reducer(action, clone);
  observers.forEach((o:any) => o.render());
};

export const addObserver = (ref:any) => {
    observers = [...observers, ref];
};
