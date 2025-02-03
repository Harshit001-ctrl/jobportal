import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRedirect from '../components/AuthRedirect';

const MainLayout = () => {
  return (
    <>
      <Navbar /> 
      <Outlet /> 
      <AuthRedirect />
      <ToastContainer /> 
    </>
  );
};

export default MainLayout;
