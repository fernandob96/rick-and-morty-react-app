import React, { useEffect, useState } from "react";
import { deleteCharacterComparative } from "../helpers/comparative";

export const ComparatorScreen = () => {
    
    const [comparatorCharacters, setcomparatorCharacters] = useState('');

    useEffect(() => {
        if(localStorage.getItem("comparative") === null){
            setcomparatorCharacters(false)
        }else{
            const data = JSON.parse(localStorage.getItem('comparative'))
            setcomparatorCharacters(data)
        }
    }, [])

    const handleDeletedCharacter = (character) => {
        const resp = deleteCharacterComparative(character)
        setcomparatorCharacters(resp.data)
    }

    return(
        <div>
            <h1 className="my-5 text-center">Comparator</h1>
            {
                comparatorCharacters.length==0 ? 
                    <div className="container">
                        <div class="alert alert-danger" role="alert">
                            No characters to compare
                        </div>
                    </div>
                : 
                <div className="row mw-100 overflow-scroll comparative--labels_row">
                    <div className="col-2 d-flex justify-content-end comparative--labels_col">
                        <div className="comparative--labels_cont">
                            <div>Name</div>
                            <div> # episodes</div>
                            <div>Species</div>
                            <div>Gender</div>
                            <div>Status</div>
                            <div>-</div>
                        </div>
                    </div>
                    {
                        comparatorCharacters.map((character)=>{
                            return(
                                <div key={character.id} className="col-3 comparative--character_cont">
                                    <img src={character.image} alt={character.name}  />
                                    <div>{character.name}</div>
                                    <div>{character.episode.length}</div>
                                    <div>{character.species}</div>
                                    <div>{character.gender}</div>
                                    <div>{character.status}</div>
                                    <div onClick={()=>{handleDeletedCharacter(character)}} className="comparative--character_delete-option">Eliminar</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
        
    )
}