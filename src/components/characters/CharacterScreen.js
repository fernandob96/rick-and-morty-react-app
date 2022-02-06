import { gql } from "@apollo/client";
import react from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { comparative } from "../../helpers/comparative";
import { useExchangeRates } from "../../hooks/useExchangeRates";

import characterScreen from "../../styles/characterScreen.css"
import loadingView from "../../styles/loadingView.css"
import { LoadingView } from "../ui/LoadingView";
import Swal from 'sweetalert2'

export const CharacterScreen = () => {

    const params = useParams()
    const navigate = useNavigate()

    const GQL_CHARACTERBYID = gql`
    query GetCharacterById {
        character(id:${params.characterId}){
        id
        name
        status
        species
        type
        gender
        image
        created
        location{
          name
        }
        episode{
          id
          name
        }
      }
    }
    `;

    const {loading, error, data} = useExchangeRates(GQL_CHARACTERBYID)

    if(error){return <Navigate to="/" /> }

    let character
    if(data){
      character = data.character
    }

    const handleComparative = (character) => {
      const resp = comparative(character)
      
      switch (resp.message) {
        case 'OK':
          Swal.fire({icon: 'success', title: 'The character was added successfully', text: 'The character is correctly added to the comparator', footer: '<a href="/comparator">Go to comparator</a>'})
          break
        case 'ERROR_FULL_COMPARATOR':
          Swal.fire({icon: 'error', title: 'Oops...', text: 'The maximum number of characters in the comparator is 3', footer: '<a href="/comparator">Go to comparator</a>'})
          break
        case 'ERROR_CHARACTER_IN_COMPARATOR':
          Swal.fire({icon: 'error', title: 'Oops...', text: 'The character is already in the comparator!', footer: '<a href="/comparator">Go to comparator</a>'})
          break
        default:
          break;
      }

    }

    return(
        <div className="p-5">
          {
            loading ? ( <div className="loading-view__cont"><LoadingView /></div> ) :
            data && (
                <div className="row mw-100 container px-5">
                  <div className="col-12 mb-5 d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={()=>{navigate(-1)}}> Go back </button>
                    <button className="btn btn-primary" onClick={()=>{handleComparative(character)}}>Compare</button>
                  </div>
                  <img className="col-12 character-info__image"  src={character.image} />
                  <div className="col-12 mt-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">{character.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Status</td>
                        <td>{character.status}</td>
                      </tr>
                      <tr>
                        <td>Species</td>
                        <td>{character.species}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{character.gender}</td>
                      </tr>
                      <tr>
                        <td>Location - name</td>
                        <td>{character.location.name}</td>
                      </tr>
                      <tr>
                        <td>Episode names</td>
                        <td>
                          <ul>
                            {
                              character.episode.map((episode)=>{
                                return <li key={episode.id}>{episode.name}</li>
                              })
                            }
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                  <div>
                </div>
              </div>
            )
          }
        </div>
    )
}