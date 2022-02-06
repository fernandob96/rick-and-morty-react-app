import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import navBar from '../../styles/navBar.css'

export const Navbar = () => {

    const navigate = useNavigate()

    const [formValues, handleInputChange] = useForm({searchText:''})

    const {searchText} = formValues

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/search?q=${searchText}`) 
    }   

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Rick and Morty App
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className={({isActive}) => 'nav-item nav-link ' + (isActive ? 'active' : '')} 
                        to="/characters"
                    >
                        Characters
                    </NavLink>

                    <NavLink
                        className={({isActive}) => 'nav-item nav-link ' + (isActive ? 'active' : '')} 
                        to="/comparator"
                    >
                        Comparator
                    </NavLink>
                </div>
                
                <div className='navbar-collapse collapse order-3 dual-collapse2 d-flex justify-content-end'>
                    <form onSubmit={handleSearch}>
                        <div className="input-group nav-bar__search-field__cont">
                            <span className="input-group-text" id="basic-addon1"></span>
                            <input type="text" name="searchText" value={searchText} onChange={handleInputChange} className="form-control" placeholder="Find a character" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </form> 
                </div>
            </div>
        </nav>
    )
}