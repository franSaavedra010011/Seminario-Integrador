import './AuthLayout.css';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <Header conSidebar={false} />
      <div className="layout">
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
