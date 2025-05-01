import Dashboard from "./Pages/Dashboard";
import Overview from "./Pages/Overviews";
import HomePage from "./Components/HomePage";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Chain from "./Pages/Chain";
import AddressInfo from "./cart/AddressInfo";
import BarGraph from "./Graphs/BarGraph";
import Profile from "./Pages/Profile";


function App() {
 
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/dashboard/overview',
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: 'chain',
          element: <Chain />
        },
        {
          path: 'transactioninfo',
          element: <AddressInfo />
        },
        {
          path: 'chart',
          element: <BarGraph />
        },
        {
          path: 'profile',
          element: <Profile />
        }

      ],
    },
  ]);
  
    return <RouterProvider router={router} />;
}

export default App;
