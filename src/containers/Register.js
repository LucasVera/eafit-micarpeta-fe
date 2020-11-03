import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import CacheContext from '../CacheContext';
import Loading from '../components/Loading';
import Required from '../components/Required';
import { registerUser } from '../services/api';
import { setError, setLoading } from '../services/cache';

const handleRegister = async (
  name,
  email,
  id,
  password,
  passConfirmation,
  address,
  cache,
  setCache,
  setRedirect
) => {
  if (!name || !email || !id || !password || !passConfirmation || !address) {
    return setError(cache, setCache, 'Debe completar todos los campos');
  }
    
  if (password !== passConfirmation) {
    return setError(cache, setCache, 'Las contraseñas deben coincidir');
  }

  setLoading(cache, setCache);

  try {
    const { data, error } = await registerUser(name, id, email, password, address);
    if (error) {
      throw error;
    }
    setCache({
      ...cache,
      loading: false,
      user: data.user
    });

    setRedirect('/');
  }
  catch (ex) {
    setCache({
      ...cache,
      error: JSON.stringify(ex),
      loading: false
    });
  }
}

export default function Register() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const [address, setAddress] = useState('');
  const [redirect, setRedirect] = useState('');

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <CacheContext.Consumer>
      {({ cache, setCache }) =>
      <div className="container-fluid">
        <div className="row my-5">
          <h3 className="col-12">Registrarse</h3>
        </div>
        <div className="row m-5">
          <div className="form-group col-12 col-sm-6">
            <label for="name">Nombre completo <Required /></label>
            <input type="text" name="name" id="name" className="form-control" placeholder="Nombre Apellidos" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label for="id">Identificiación (Cédula) <Required /></label>
            <input type="text" name="id" id="id" className="form-control" placeholder="Solo números" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label for="email">Correo electrónico <Required /></label>
            <input type="email" name="email" id="email" className="form-control" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label for="address">Dirección <Required /></label>
            <textarea type="text" name="address" id="address" className="form-control" placeholder="Dirección de residencia" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label for="password">Contraseña <Required /></label>
            <input type="password" name="password" id="password" className="form-control" placeholder="Combinación de letras y números" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label for="confirmPass">Confirme contraseña <Required /></label>
            <input type="password" name="confirmPass" id="confirmPass" className="form-control" placeholder="Debe coincidir con la contraseña" value={passConfirmation} onChange={(e) => setPassConfirmation(e.target.value)} />
          </div>
        </div>
        {cache.loading && <Loading />}
        {cache.error &&
          <div className="row m-5">
            <div className="alert alert-danger col-12 p-4" role="alert">
              <strong>{cache.error}</strong>
            </div>
          </div>
        }
        <div className="row m-5">
          <button className="btn btn-lg btn-primary btn-block" onClick={() => handleRegister(
            name, email, id, password, passConfirmation, address, cache, setCache, setRedirect
          )}>
            Guardar
          </button>
        </div>
      </div>}
    </CacheContext.Consumer>
  )
}
