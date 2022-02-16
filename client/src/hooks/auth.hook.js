import {useState, useCallback, useEffect} from "react";

const storageName = 'userData';

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [userNAME, setUserNAME] = useState(null);

    const login = useCallback((jwtToken, ID, name) => {
        setToken(jwtToken);
        setUserID(ID);
        setUserNAME(name);

        localStorage.setItem(storageName, JSON.stringify({
            userNAME: name,
            userID: ID,
            token: jwtToken
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        setUserNAME(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userID, data.userNAME);
        }
    }, [ login ]);

    return { login, logout, token, userID, userNAME }

}