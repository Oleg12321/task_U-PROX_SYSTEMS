import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Create } from './components/Create/Create';
import { Update } from './components/Update/Update';


const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/create', element: <Create/>},
    {path: '/edit/:id', element: <Update />}
]);

function App() {

    return <RouterProvider router={router}></RouterProvider>
}


export default App;
