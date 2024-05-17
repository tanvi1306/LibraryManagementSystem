import { createContext, useState} from "react";
import PropTypes from "prop-types";
import { useEffect} from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isUserLogin,setIsUserLogin] = useState(false);
  const [adminemail, setAdminemail] = useState("");
  const [useremail,setUseremail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ADMIN_EMAIL")!=null) {
      console.log("value is"+localStorage.getItem("ADMIN_EMAIL"));
      setIsLogin(true);
      setIsUserLogin(false);
    }
    else if (localStorage.getItem("USER_EMAIL")!=null) {
      setIsLogin(false);
      setIsUserLogin(true);
    }
    else{
      setIsLogin(false);
      setIsUserLogin(false);
    }
  }, []);

  return (
      <LoginContext.Provider value={{ isLogin, setIsLogin, isUserLogin,setIsUserLogin,adminemail, setAdminemail,useremail,setUseremail }}>
        {children}
      </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// const useLoginContext = () => {
//   return useContext(LoginContext);
// };

export default LoginContext;