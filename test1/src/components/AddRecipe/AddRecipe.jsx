import { useState } from 'react';
import './AddRecipe.css';
import { useNavigate } from 'react-router';

export default function AddRecipe({refreshPage}) {

    const [formData, setFormData] = useState({
        // id: crypto.randomUUID(),
        id: Date.now(),
        photo: '',
        title: '',
        author: '',
        prep_time: '',
        cuisine_type: '',
        description: ''
    });

    const navigate = useNavigate();

    // Function to handle input changes
    function handleChangeField(e) {
        // console.log([e.target.name]);
        // console.log(e.target.value);
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // save the recipe to local storage
    // update recipes state
    // and redirect to the main page
    function saveRecipe() {
        const lsMyRecipes = JSON.parse(localStorage.getItem('my-recipes')) || [];
        localStorage.setItem('my-recipes', 
            JSON.stringify(lsMyRecipes.concat(formData))
        );
        refreshPage();
        navigate('/');
    }

    return(
        <>
            <div className="card-form-add-recipe">
                <h2>Aggiungi una nuova ricetta personale</h2>
                <h3>(sarà visibile solo a te)</h3>
                <hr style={{marginBottom: '30px'}} />
                <label>
                    <p>url immagine: </p>
                    <input type="url" name='photo' placeholder='incolla url immagine'
                    onChange={handleChangeField} />
                </label>
                <label>
                    <p>titolo ricetta: </p>
                    <input type="text" name='title' placeholder='Nome del piatto' 
                    onChange={handleChangeField}/>
                </label>
                <label>
                    <p>autore: </p>
                    <input type="text" name='author' placeholder='Walter Bianco' 
                    onChange={handleChangeField}/>
                </label>
                <label>
                    <p>tempo: </p>
                    <input type="text" name='prep_time' placeholder='0h 00m' 
                    onChange={handleChangeField}/>
                </label>
                <label>
                    <p>tipo cucina: </p>
                    <input type="text" name='cuisine_type' placeholder='italiano, cinese, ...'
                    onChange={handleChangeField} />
                </label>
                <label>
                    <p>descrizione: </p>
                    <input style={{height: '60px'}} type="text" name='description' placeholder='lorem ipsum ...' 
                    onChange={handleChangeField}/>
                </label>
                <button onClick={saveRecipe} style={{fontSize: '25px'}}>💾</button>
            </div>
        </>
    );
}