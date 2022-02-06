import react from "react";
import { Link, useNavigate } from "react-router-dom";


export const CharacterCard = ({id, image, name, species}) => {

    const navigate = useNavigate()

    return(
    <div className="card">
        <div className="row character-card__cont">
            <div className="col-4 p-0">
                <img src={image} className="card-img" alt={name} />
            </div>

            <div className="col-8 p-0 d-flex flex-column">
                <div className="card-body">
                    <h3>{name}</h3>
                    <p className="card-text"> <small>{species}</small> </p>
                </div>
                <div className="character-card__link" onClick={()=>{navigate(`/character/${id}`)}}>
                    Ver más
                </div>
            </div>
        </div>
    </div>
    )
}