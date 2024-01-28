import GetNews from './components/GetNews';
import { ApiProvider } from './components/NewsProvider';
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <ApiProvider>
          <header><Navbar /></header>
          <HomePage />
      </ApiProvider>
      <Footer />
    </div>
  );
}

export default App;