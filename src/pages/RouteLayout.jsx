import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import NavigationBar from '../components/Navbar.jsx';
import { Spinner } from 'react-bootstrap';

const Routelayout = () => {
  return (
    <div>
      <NavigationBar />
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p style={{ marginTop: '15px' }}>Loading...</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Routelayout;