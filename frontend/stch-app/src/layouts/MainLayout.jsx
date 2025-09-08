import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
