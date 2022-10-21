import { CHANGE_HIGHSCORE, USER } from "../appTypes/appTypes";

const initialState = {
    user: "",
    highscores: 0,
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_HIGHSCORE:
            return {
                ...state,
                highscores: state.highscores + action.payload,
            };
        case USER:
            console.log("asdf", action)
            return {
                ...state,
                user: action.payload.userName,
            };
        default:
            return state;
    }
};

export default AppReducer