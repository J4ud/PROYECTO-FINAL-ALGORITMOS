import { reducer } from "./reducer";
import { Screens } from "../types/navigation";

const emptyState  = {
  screen: Screens.SINGUP,
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
