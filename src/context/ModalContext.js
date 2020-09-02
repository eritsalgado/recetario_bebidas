import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const ModalContext = createContext()

const ModalProvider = (props) => {

    const [id_receta, guardarIdReceta] = useState(null)
    const [informacion, guardarReceta] = useState({})

    //una vez que tenemos una receta, llamar a la api
    useEffect(()=> {
        const obtenerReceta = async () => {
            if(!id_receta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id_receta}`
            const resultado = await axios.get(url)
            guardarReceta(resultado.data.drinks[0])
        }
        obtenerReceta()
    },[id_receta])
    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider