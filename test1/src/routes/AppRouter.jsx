import { BrowserRouter, Route, Routes } from 'react-router';
scrollY;
import App from '../App';
import MainPage from '../components/MainPage/MainPage';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Detail from '../components/Detail/Detail';
import { RecipesContext } from '../context/RecipesContext';

export default function AppRouter() {
  const [recipes, setRecipes] = useState(null);
  const [darkLight, setDarkLight] = useState('light');
  const [count, setCount] = useState(0);

  // carica i dati
  useEffect(() => {
    fetch('https://daniepa.github.io/fake-api-recipes/recipes.json')
      .then((res) => res.json())
      .then((data) => {
        const lsFavIds =
          JSON.parse(localStorage.getItem('fav-recipes-ids')) || [];

        const newRecipes = data.map((r) => ({
          ...r,
          isFavorite: lsFavIds.includes(r.id),
        }));
        setRecipes(newRecipes);
      });
  }, []);

  // carica il tema
  useEffect(() => {
    const lsDarkLight =
      JSON.parse(localStorage.getItem('dark-light')) || 'light';
    if (lsDarkLight === 'light') {
      setDarkLight('light');
    } else {
      setDarkLight('dark');
    }
  }, []);

  // cambia il tema
  useEffect(() => {
    localStorage.setItem('dark-light', JSON.stringify(darkLight));
  }, [darkLight]);

  // tiene traccia dei preferiti
  useEffect(() => {
    if (recipes != null) {
      const favRecIsd = recipes.filter((r) => r.isFavorite).map((r) => r.id);

      localStorage.setItem('fav-recipes-ids', JSON.stringify(favRecIsd));
      setCount(favRecIsd.length);
    }
  }, [recipes]);

  function toggleHeart(id) {
    const newRecipes = recipes.map((r) =>
      id.toString() === r.id.toString()
        ? { ...r, isFavorite: !r.isFavorite }
        : r
    );
    setRecipes(newRecipes);
  }

  function toggleLigthDark() {
    setDarkLight((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <>
      <ThemeContext.Provider value={{ darkLight, toggleLigthDark }}>
        <RecipesContext.Provider value={{ recipes, count }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <App>
                    <MainPage
                      recipes={recipes}
                      toggleHeart={toggleHeart}
                    ></MainPage>
                  </App>
                }
              />
              <Route
                path="favorite"
                element={
                  <App>
                    <MainPage
                      recipes={
                        recipes != null
                          ? recipes.filter((r) => r.isFavorite)
                          : recipes
                      }
                      toggleHeart={toggleHeart}
                    ></MainPage>
                  </App>
                }
              />
              <Route
                path="detail"
                element={
                  <App>
                    <Detail toggleHeart={toggleHeart} />
                  </App>
                }
              >
                <Route path=":id" element={<App></App>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RecipesContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
