import React, { useState } from 'react'
import Required from '../components/Required';
import { validateUser } from '../services/api';

const handleRegister = async (
  name,
  email,
  id,
  password,
  passConfirmation,
  setError,
  setLoading
) => {
  if (!name || !email || !id || !password || !passConfirmation) return setError('Debe completar todos los campos');
  if (password !== passConfirmation) return setError('Las contraseñas deben coincidir');

  setLoading(true);

  try {
    const ok = await validateUser(id);
    setLoading(false);
    setError(`ok. ${JSON.stringify(ok)}`);    
  }
  catch (ex) {
    setError(`not ok. ${JSON.stringify(ex)}`)
    setLoading(false);
  }
}

export default function Register() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
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
          <label for="password">Contraseña <Required /></label>
          <input type="password" name="password" id="password" className="form-control" placeholder="Combinación de letras y números" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group col-12 col-sm-6">
          <label for="confirmPass">Confirme contraseña <Required /></label>
          <input type="password" name="confirmPass" id="confirmPass" className="form-control" placeholder="Debe coincidir con la contraseña" value={passConfirmation} onChange={(e) => setPassConfirmation(e.target.value)} />
        </div>
      </div>
      {loading && <span>Loading...</span>}
      {error &&
        <div className="row m-5">
          <div className="alert alert-danger col-12 p-4" role="alert">
            <strong>{error}</strong>
          </div>
        </div>
      }
      <div className="row m-5">
        <button className="btn btn-lg btn-primary btn-block" onClick={() => handleRegister(
          name, email, id, password, passConfirmation, setError, setLoading
        )}>
          Guardar
        </button>
      </div>
    </div>
  )
}
