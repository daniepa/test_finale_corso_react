import { useContext } from 'react';
import './Counter.css';
import { RecipesContext } from '../../context/RecipesContext';

export default function Counter() {
  const { count } = useContext(RecipesContext);

  return (
    <>
      <h1>{count}</h1>
    </>
  );
}
