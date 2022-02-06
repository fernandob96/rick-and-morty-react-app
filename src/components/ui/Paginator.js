import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'

import navBar from "../../styles/navBar.css"

export const Paginator = ({page, paginationData}) => {
    
    const navigate = useNavigate()

    const location = useLocation()

    const {q=''} = queryString.parse(location.search)

    const handlePageChange = (page) => {
        q ? navigate(`?q=${q}&page=${page}`) : navigate(`?page=${page}`)
    }

    return(
        <nav className="my-5" aria-label="Page navigation example">
            
        <ul className="pagination d-flex justify-content-center">
            {
            page>1 &&
            <li className="page-item">
            <a className="page-link" onClick={()=>handlePageChange(parseInt(page)-1)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            }
    
            {paginationData.prev && <li className="page-item"><a className="page-link" onClick={()=> handlePageChange(paginationData.prev)}>{paginationData.prev }</a></li>}
            <li className="page-item active"><a className="page-link" onClick={()=> handlePageChange(paginationData.next - 1)}>{ page }</a></li>
            {paginationData.next && <li className="page-item"><a className="page-link" onClick={()=> handlePageChange(paginationData.next)}>{paginationData.next }</a></li>}
            
            {
                paginationData.next &&
                <li className="page-item">
                <a className="page-link" onClick={()=>handlePageChange(parseInt(page)+1)} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            }
        </ul>
        </nav>
    )
}