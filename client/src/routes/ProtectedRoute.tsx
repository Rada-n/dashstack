import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Loading from "../components/loading/Loading";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUser();


  if (currentUser === null) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
