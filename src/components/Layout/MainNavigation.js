import { Link} from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";

const MainNavigation = () => {
  
  const authCtx = useContext(AuthContext);
  const logoutHandler = () =>{
    authCtx.logout();
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
