import { useContext } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import { ThemeContext } from './context/ThemeContext';

function App({ children }) {
  const { darkLight } = useContext(ThemeContext);
  const isDark = darkLight === 'light' ? false : true;

  function clear() {
    localStorage.clear();
    location.reload();
  }

  return (
    <>
      <div id="main" className={isDark ? 'main-dark' : 'main-light'}>
        <Menu />
        {children}
      </div>
      <button style={{ fontSize: '12px' }} onClick={clear}>
        cancella tutti dati da local storage
      </button>
    </>
  );
}

export default App;
