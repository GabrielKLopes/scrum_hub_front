import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../interface/route";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('tokenSecurity'); 
  
   
    if (!token) {
      return <Navigate to="/" replace />;
    }
  
    return <>{children}</>;
  };
  
  export default ProtectedRoute;