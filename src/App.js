// import logo from './logo.svg';
import './App.css';
import Index from './layout';
import AllRoutes from './routes';

const App = () => {

  return (
    <div className="App">
      <Index>
        <AllRoutes />
      </Index>
    </div>
  );
}

export default App;
