import { useContext } from 'react';
import './Recipe.css';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router';
import Favorite from '../Favorite/Favorite';

export default function Recipe({ recipe, toggleHeart }) {
  const { darkLight } = useContext(ThemeContext);
  const isDark = darkLight === 'light' ? false : true;

  return (
    <>
      <div
        className={
          isDark ? 'card-recipe hover dark' : 'card-recipe hover light'
        }
      >
        <Link to={`/detail/${recipe.id}`}>
          <p>{recipe.title}</p>
        </Link>

        <Favorite
          id={recipe.id}
          isFavorite={recipe.isFavorite}
          toggleHeart={toggleHeart}
        />
      </div>
    </>
  );
}
