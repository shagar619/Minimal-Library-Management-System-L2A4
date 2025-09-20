
import { Outlet } from 'react-router';
import './App.css';
import Footer from './elements/Footer';
import Navbar from './elements/Navbar';

function App() {


  return (
    <>

    <Navbar></Navbar>

    <Outlet></Outlet>

    <Footer></Footer>

    </>
  )
}

export default App;
