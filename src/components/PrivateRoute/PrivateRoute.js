import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const PrivateRoute = ({children, loginPageTitle, loginRedirect}) => {
    const auth = useAuth();
    if (!auth.token) return <Navigate to="/login" state={{name:loginPageTitle, to:loginRedirect}}/>;
    return children;
  };

export default PrivateRoute;