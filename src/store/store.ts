import { reducer } from "./reducer";
import { Screens } from "../types/navigation";

const emptyState  = {

  
}
export let appState = {
    screen: Screens.SINGUP,
    posts: []
  };

  let observers: any[] = [];



const notifyObservers = () => observers.forEach((o) => o.render());

export const dispatch = (action: any) => {
  const clone = JSON.parse(JSON.stringify(appState));
  appState = reducer(action, clone);
  observers.forEach((o:any) => o.render());
};

export const addObserver = (ref:any) => {
    observers = [...observers, ref];
};
