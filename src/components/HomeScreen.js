import React from "react";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {

    const navigate = useNavigate()

    return(
        <>
            <h1 className="text-center my-5">Rick and Morty App</h1>

            <div className="row mw-100 justify-content-center">
                <div className="col-12 col-sm-8">
                    <div className="homeScreen__options d-flex align-items-center justify-content-center mt-5">
                        <p className="mb-0" onClick={()=>{navigate('/characters')}}>Go to characters</p>
                    </div>
                </div>
            </div>
        </>
    )
}