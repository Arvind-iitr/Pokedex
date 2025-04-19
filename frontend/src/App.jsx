import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "./App.css";
import { Login } from './pages/Login';


// import { PokemonChart } from "../Charts/PokemonChart";


function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Login/>
   
    } 


    
  ])

  return <RouterProvider router={router}/>
}

export default App;
