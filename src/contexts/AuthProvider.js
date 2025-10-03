import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartProvider";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [name, setName] = useState(() => localStorage.getItem("name") || null);
    const [matric, setMatric] = useState(() => localStorage.getItem("matric") || "");
    const [passcode, setPasscode] = useState("");
    const [token, setToken] = useState(() => localStorage.getItem("authToken") || "");
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
        localStorage.setItem("authToken", token);
        } else {
        localStorage.removeItem("authToken");
        }
    }, [token]);

    useEffect(() => {
        if (name) {
        localStorage.setItem("name", name);
        } else {
        localStorage.removeItem("name");
        }
    }, [name]);

    useEffect(() => {
        if (matric) {
        localStorage.setItem("matric", matric);
        } else {
        localStorage.removeItem("matric");
        }
    }, [matric]);

    const loginAction = (responseData) => {
        const data = responseData.info;
        const jwt = responseData.token;
        setName(data.name);
        setMatric(data.matricNumber);
        setPasscode(data.passcode);
        setToken(jwt);
    }

    const logoutAction = (wasExpired=false) => {
        setName(null);
        setMatric("");
        setPasscode("");
        setToken("");
        navigate("/");
        localStorage.removeItem("name");
        localStorage.removeItem("matric");
        localStorage.removeItem("token");
        localStorage.setItem("authStatus", wasExpired ? "expired" : "loggedOut");
        clearCart();
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