import { useContext } from 'react';
import Recipe from '../Recipe/Recipe';
import './MainPage.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function MainPage({ recipes, toggleHeart }) {
  const { darkLight } = useContext(ThemeContext);
  const isDark = darkLight === 'light' ? false : true;

  if (recipes === null) return <h1>dati in caricamento..</h1>;

  return (
    <>
      {recipes.length > 0 ? (
        recipes.map((r) => (
          <Recipe key={r.id} recipe={r} toggleHeart={toggleHeart} />
        ))
      ) : (
        <h2 style={{ color: isDark ? 'white' : 'black' }}>nessuna ricetta..</h2>
      )}
    </>
  );
}
