import './App.css';
import Faculty from './components/Faculty';
import FacultyDetails from './components/FacultyDetails';
import FacultyIqacDetails from './components/FacultyIqacDetails';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

const AppRoutes = () => {
  // Define your routes here
  return useRoutes([
      { path: '/', element: <Faculty /> },
      { path: '/faculties/:id', element: <FacultyDetails /> },
      { path: '/faculties/iqac/:id', element: <FacultyIqacDetails/> },
  ]);
};


function App() {
  return (
    <div className="App">
        <AppRoutes />
    </div>
  );
}

export default App;
