import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "./App.css";
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { VerifyOTP } from './pages/VerifyOTP';
import { ResetOTP } from './pages/ResetOTP';
import { ResetPassword } from './pages/ResetPassword';


// import { PokemonChart } from "../Charts/PokemonChart";


function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <ResetPassword/>
   
    } 


    
  ])

  return <RouterProvider router={router}/>
}

export default App;
