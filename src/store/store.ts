import { reducer } from "./reducer";
import { Screens } from "../types/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

onAuthStateChanged(auth,(user)=>{
  if(user){
    console.log(user);
  }else{
    console.log('No hay usuario')
  }
})

const emptyState  = {
  screen: Screens.LOGIN,
  posts: []

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
