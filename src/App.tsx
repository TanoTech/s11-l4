import GetNews from './components/GetNews';
import { NewsProvider } from './components/NewsProvider';
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NewsProvider>
        <div className='d-flex '>
          <header><Navbar /></header>
          <main><GetNews limit={24}/></main>
        </div>
      </NewsProvider>
      <Footer />
    </div>
  );
}

export default App;