export const reducer = (currentAction:any, currentState:any) => {

    const {action, payload} = currentAction;

    switch (action) {
            case 'ChangeScreen':
            currentState.screen =payload;
        break;


        case 'signUpCompleted':
                currentState.screen =payload;
            break;

        case 'GETPOSTS':
                currentState.posts =payload;
            break;
    }
    return currentState;
}

