import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";
import PageLoader from "@/components/ui/loading/PageLoader";

// Private route component have "children" prop by default.
const PrivateRoute = ({ children }) => {
  // import user information and from context to check if user is logged in or not
  const { user, loading } = useAuth();

  // use react router location hook to get current location of the user
  const location = useLocation();

  // show loader when user information is loading
  if (loading) {
    return <PageLoader />;
  }

  // if user is logged in, then show the private route component, else redirect to login page.
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
