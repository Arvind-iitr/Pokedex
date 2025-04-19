import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "./App.css";
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { VerifyOTP } from './pages/VerifyOTP';
import { ResetOTP } from './pages/ResetOTP';
import { ResetPassword } from './pages/ResetPassword';
import { Home } from './pages/Home';


// import { PokemonChart } from "../Charts/PokemonChart";


function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home/>
   
    } 
    ,
    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/signup",
      element: <Signup/>
    },

    { 
      path: "/verify-otp",
      element: <VerifyOTP/>
    }
    ,
    {
      path: "/reset-otp",
      element: <ResetOTP/>
    }
    ,
    {
      path: "/reset-password",
      element: <ResetPassword/>
    }


    
  ])

  return <RouterProvider router={router}/>
}

export default App;
