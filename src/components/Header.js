import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getObj, Keys } from '../services/localStorage';


function Header(props) {
  const user = getObj(Keys.USER);
  console.log('user', user)
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">| Mi Carpeta |</Link>
      <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registro</Link>
          </li>
        </ul>
        {!user || !user.id
        ? <div className="form-inline">
            <input type="text" className="form-control-sm mx-1" placeholder="E-mail" />
            <input type="password" className="form-control-sm mx-1" placeholder="Contraseña" />
            <button className="btn btn-primary border mx-1">Ingresar</button>
          </div>
        : <ul>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">Subir documento</Link>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}

Header.propTypes = {

}

export default Header

