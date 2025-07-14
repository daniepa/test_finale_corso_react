import { useContext } from 'react';
import './DarkLight.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function DarkLight() {
  const { darkLight, toggleLigthDark } = useContext(ThemeContext);

  return (
    <>
      <div>
        <button style={{ fontSize: '20px' }} onClick={toggleLigthDark}>
          {darkLight === 'light' ? '🌛' : '🌞'}
        </button>
      </div>
    </>
  );
}
