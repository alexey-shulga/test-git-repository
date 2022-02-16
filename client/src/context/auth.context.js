import {createContext} from "react";

function emptyLogin() {}

export const AuthContext = createContext({
    token: null,
    userID: null,
    userNAME: null,
    login: emptyLogin,
    logout: emptyLogin,
    isAuthenticated: false
});