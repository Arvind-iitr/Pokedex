import { createContext, useContext, useState , useEffect } from 'react';
import { getUser } from '../api/api';
import { toast } from 'react-toastify';
import { isAuth } from '../api/authServices';

// 1. Create the context
const AppContext = createContext();

// 2. Create the provider component
export const AppProvider = ({ children }) => {
const[isLogin, setIsLogin] = useState(false);
const [userData , setUserData] = useState(null);
const [search , setSearch] = useState("");

const getUserData = async() => {
   try {
     const response  = await getUser();
     console.log(response.data.userdata);
     if(response.data.success === true){
       setUserData(response.data.userdata);
     }
   } catch (error) {
    setUserData(null);
    setIsLogin(false); // <-- This might prevent looping
   }
}

const getAuthStatus = async() => {
   try {
     const response = await isAuth();
     if(response.data.success === true){
      setIsLogin(true);
      getUserData();
     }else{
      setIsLogin(false);
      // toast.error(response.data.message);
     }
   } catch (error) {
      // toast.error(error.message);
      setIsLogin(false); // <-- This might prevent looping
   }
}

useEffect(() => {
   getAuthStatus();
   getUserData();
}, []);

  return (
    <AppContext.Provider value={{isLogin , setIsLogin , userData , setUserData , getUserData , search , setSearch }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAppContext = () => useContext(AppContext);
