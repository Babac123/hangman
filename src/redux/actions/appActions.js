import { CHANGE_HIGHSCORE, USER } from "../appTypes/appTypes";

const changeHighscore = (number) => {
    return {
        type: CHANGE_HIGHSCORE,
        payload: number
    };
};

const saveUser = (userName) => {
    return {
        type: USER,
        payload: {
            userName: userName
        }
    };
};


export { changeHighscore, saveUser };