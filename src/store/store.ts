import { reducer } from "./reducer";

export let appState = {
    screen: 'dashboard',
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
