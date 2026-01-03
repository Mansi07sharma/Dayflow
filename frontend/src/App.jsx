
import './App.css';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Attendance from './components/Attendance';
import TimeOff from './components/TimeOff';
import ProfilePage from './components/ProfilePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/employees",
    element: <Employees />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
  },
  {
    path: "/time-off",
    element: <TimeOff />,
  },
  {path:"/profile",
    element: <ProfilePage />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
