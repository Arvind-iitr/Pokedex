import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "./App.css";
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { VerifyOTP } from './pages/VerifyOTP';
import { ResetOTP } from './pages/ResetOTP';
import { ResetPassword } from './pages/ResetPassword';
import { Home } from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainSite } from './pages/MainSite';
import { PokemonDetail } from './pages/PokemonDetail';
import { TrainerProfile } from './pages/TrainerProfile';


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
    } ,
    {
      path: 'pokepage',
      element: <MainSite/>
    },

    {
      path: "/poke-details/:pokename",
      element: <PokemonDetail/>

    }
    ,
    {
      path :"/profile",
      element: <TrainerProfile/>
    }

    
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
