import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setObj, getObj, Keys } from '../services/localStorage';
import { login } from '../services/api';
import Loading from './Loading';
import CacheContext from '../CacheContext';
import { setError } from '../services/cache';

const handleLogin = async (
  nationalId,
  password,
  cache,
  setCache,
) => {
  setCache({
    ...cache,
    loading: true,
    error: ''
  });
  const { data, error } = await login(nationalId, password);
  if (error) {
    return setError(cache, setCache, error);
  }

  setCache({
    ...cache,
    loading: false,
    user: data.user
  });
}

function Header(props) {

  // - Notice the "useEffect" has no other param. this means it will act as a
  // "componentDidUpdate".
  // - If you pass an empty array as second arg, it will act as a "componentDidMount"
  // - If you pass an empty array AND return a function at the end, the first function
  // will act as a "componentDidMount". The return will act as a "componentWillUnmount"
  useEffect(() => {
    console.log('RENDER');
  });
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <CacheContext.Consumer>
      {({ cache, setCache }) => {
        const { user } = cache;
        const isLoggedIn = user && user.id;
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
                  {isLoggedIn
                  ? <Link className="nav-link" to="/upload">Cargar documento</Link>
                  : <Link className="nav-link" to="/register">Registro</Link>
                  }
                </li>
              </ul>
              {!isLoggedIn
              ? <div className="form-inline">
                  <input value={nationalId} type="text" className="form-control-sm mx-1" placeholder="Cédula" onChange={(e) => setNationalId(e.target.value)} />
                  <input value={password} type="password" className="form-control-sm mx-1" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                  {cache.loading
                  ? <Loading className="text-light" />
                  : <button className="btn btn-primary border mx-1" onClick={() => handleLogin(nationalId, password, cache, setCache)}>Ingresar</button>
                  }
                </div>
              : <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item mt-1 mx-3">
                    <h5 className="text-light">Hola {user.name}</h5>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link btn-secondary btn-sm" onClick={() => setCache({ ...cache, user: {} })}>Salir</button>
                  </li>
                </ul>
              }
            </div>
          </nav>
        );
      }}
    </CacheContext.Consumer>
  )
}

Header.propTypes = {

}

export default Header

