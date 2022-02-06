import React from "react";

import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";

import queryString from 'query-string'
import { Paginator } from "../ui/Paginator";
import { useExchangeRates } from "../../hooks/useExchangeRates";
import { CharacterCard } from "./CharacterCard";
import { LoadingView } from "../ui/LoadingView";

export const CharactersScreen = () => {

    const location = useLocation()

    const {page=1} = queryString.parse(location.search)

    const GQL_CHARACTERS = gql`
    query GetCharacters {
        characters(page:${page}){
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
            created
            species
        }
        }
    }
    `;

    const {loading, error, data} = useExchangeRates(GQL_CHARACTERS)
    
    let paginationData
    let currentPage
    let characters
    if(data){
        characters = data.characters.results
        paginationData = data.characters.info
        currentPage = paginationData.next - 1
    }



  return (
    <div className="App">
    { 
    loading ? ( <LoadingView /> ) : data && (
    <div>
    <h1 className="mt-5 text-center">Characters list</h1>
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
  );
}