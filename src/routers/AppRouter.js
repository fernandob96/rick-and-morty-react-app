import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { CharacterScreen } from "../components/characters/CharacterScreen";
import { CharactersScreen } from "../components/characters/CharactersScreen";
import { ComparatorScreen } from "../components/ComparatorScreen";
import { HomeScreen } from "../components/HomeScreen";
import { SearchScreen } from "../components/SearchScreen";
import { Navbar } from "../components/ui/NavBar";


export const AppRouter = ()=> {
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/characters" element={<CharactersScreen />} />
                <Route path="/comparator" element={<ComparatorScreen />} />
                <Route path="/character/:characterId" element={<CharacterScreen />} />
                <Route path="/search" element={<SearchScreen />} />

            </Routes>
        </BrowserRouter>
    )
}