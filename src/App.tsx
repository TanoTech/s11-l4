import GetNews from './components/GetNews';
import { NewsProvider } from './components/NewsProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <NewsProvider>
        <GetNews limit={1}/>
      </NewsProvider>
    </div>
  );
}

export default App;