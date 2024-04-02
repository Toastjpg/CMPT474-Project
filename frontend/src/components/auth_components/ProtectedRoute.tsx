import { Navigate } from 'react-router';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

// https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4
export default function ProtectedRoute({authenticationPath, outlet}: ProtectedRouteProps) {
  const { currentUser } = useFirebaseAuth();
  // let navigate = useNavigate();
  if(currentUser) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} replace={true} />;
  }
};