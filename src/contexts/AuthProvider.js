import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [name, setName] = useState(null);
    const [matric, setMatric] = useState("");
    const [passcode, setPasscode] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const loginAction = (responseData) => {
        const data = responseData.info;
        const jwt = responseData.token;
        setName(data.name);
        setMatric(data.matricNumber);
        setPasscode(data.passcode);
        setToken(jwt);
    }

    const logoutAction = () => {
        setName(null);
        setMatric("");
        setPasscode("");
        setToken("");
        navigate("/");
        window.location.reload();
    }

    return (
    <AuthContext.Provider value = {{ matric, passcode, name, token, loginAction, logoutAction }}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}