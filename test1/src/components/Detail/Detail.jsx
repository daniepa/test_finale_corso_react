import { useNavigate, useParams } from 'react-router';
import './Detail.css';
import { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import { ThemeContext } from '../../context/ThemeContext';
import Favorite from '../Favorite/Favorite';

export default function Detail({ toggleHeart }) {
  const { id } = useParams();
  const { recipes } = useContext(RecipesContext);
  const recipe = recipes.find((r) => r.id === id);
  const { darkLight } = useContext(ThemeContext);
  const isDark = darkLight === 'light' ? false : true;

  const navigate = useNavigate();

  return (
    <>
      <h2 style={{ color: isDark ? 'white' : 'black' }}>
        dettagli ricetta {id}:
      </h2>
      <div
        className={
          isDark ? 'card-recipe detail dark' : 'card-recipe detail light'
        }
      >
        {recipe !== null ? (
          <>
            <h2>{recipe.title}</h2>
            <p>di</p>
            <h3>{recipe.author}</h3>
            <img src={recipe.photo} alt={recipe.title} />
            <hr />
            <p>{recipe.description}</p>
            <hr />
            <p>⏳ {recipe.prep_time}</p>
            <p>🍝 {recipe.cuisine_type}</p>
            <Favorite
              id={recipe.id}
              isFavorite={recipe.isFavorite}
              toggleHeart={toggleHeart}
              isDetail={true}
            />
          </>
        ) : (
          <h2 style={{ color: isDark ? 'white' : 'black' }}>
            ricetta non esistente :(
          </h2>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')} style={{ fontSize: '30px' }}>
          🔙
        </button>
      </div>
    </>
  );
}
