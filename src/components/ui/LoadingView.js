import react from "react";

import loadingView from "../../styles/loadingView.css"

export const LoadingView = () => {
    return(
        <div className="loading-view__cont">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}