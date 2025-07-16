import { useContext } from 'react';
import Recipe from '../Recipe/Recipe';
import './MainPage.css';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router';

export default function MainPage({ recipes, toggleHeart }) {
  const { darkLight } = useContext(ThemeContext);
  const isDark = darkLight === 'light' ? false : true;

  const navigate = useNavigate();

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
      <button onClick={()=> navigate('add-recipe')} style={{fontSize: '25px', marginTop: '40px'}}>➕</button>
    </>
  );
}
