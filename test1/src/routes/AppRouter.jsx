import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';
scrollY;
import App from '../App';
import MainPage from '../components/MainPage/MainPage';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Detail from '../components/Detail/Detail';
import { RecipesContext } from '../context/RecipesContext';
import AddRecipe from '../components/AddRecipe/AddRecipe';

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

          const lsMyRecipes =
          JSON.parse(localStorage.getItem('my-recipes')) || [];

          const allRecipes = data.concat(lsMyRecipes);

        const newRecipes = allRecipes.map((r) => ({
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

  // quando utente clicca sul cuore
  // tiene traccia dei preferiti
  // li aggionra sul local storage
  useEffect(() => {
    if (recipes != null) {
      const favRecIsd = recipes.filter((r) => r.isFavorite).map((r) => r.id);

      localStorage.setItem('fav-recipes-ids', JSON.stringify(favRecIsd));
      setCount(favRecIsd.length);
    }
  }, [recipes]);

  // permette il refresh della pagina quando vine creato una nuova Recipe
  function refreshPage() {
    fetch('https://daniepa.github.io/fake-api-recipes/recipes.json')
      .then((res) => res.json())
      .then((data) => {
        const lsFavIds =
          JSON.parse(localStorage.getItem('fav-recipes-ids')) || [];

          const lsMyRecipes =
          JSON.parse(localStorage.getItem('my-recipes')) || [];

          const allRecipes = data.concat(lsMyRecipes);

        const newRecipes = allRecipes.map((r) => ({
          ...r,
          isFavorite: lsFavIds.includes(r.id),
        }));
        setRecipes(newRecipes);
      });
  }

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
              <Route 
              path="add-recipe"
              element={<App>
                <AddRecipe refreshPage={refreshPage} />
              </App>} />
            </Routes>
          </BrowserRouter>
        </RecipesContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
