import react from "react";

import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import { gql } from "@apollo/client";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { LoadingView } from "./ui/LoadingView";
import { Paginator } from "./ui/Paginator";
import { CharacterCard } from "./characters/CharacterCard";

export const SearchScreen = () => {

    const location = useLocation()

    const {q='', page=1} = queryString.parse(location.search)

    const GQL_SEARCHCHARACTER = gql`
    query {
        characters(page:${page}, filter: {name:"${q}"}){
        info{
            pages
            count
            next
            prev
        }
        results{
            id
            name
            image
            species
        }
        }
    }
    `;

    const {loading, error, data} = useExchangeRates(GQL_SEARCHCHARACTER)
    
    let characters
    let paginationData
    let currentPage
    if(data){
        characters = data.characters.results
        paginationData = data.characters.info
        currentPage = paginationData.next - 1
    }
    
    return(
        <div>
            {
                error ?
                    <div className="container mt-5">
                        <div class="alert alert-danger" role="alert">
                            No search results found
                        </div>
                    </div>
                :
                loading ? <LoadingView />
                : data && (
                    <div>
                        {q && <h1 className="text-center mt-5">Search: '{q}'</h1>}

                        <Paginator page={page} paginationData={paginationData} />
                    
                        <div className="row mw-100">
                            {
                                characters.map(character =>{
                                    return (
                                        <div key={character.id} className="col-12 col-md-6 p-5">
                                            <CharacterCard {...character} />
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                )
            }
        </div>
        
    )
}