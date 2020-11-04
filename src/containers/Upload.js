import React, { useState } from 'react'
import CacheContext from '../CacheContext'
import Loading from '../components/Loading';
import { uploadFileToServer } from '../services/api';
import { setError, setLoading } from '../services/cache';

const handleSaveFile = async (file, user, cache, setCache) => {
  console.log('file path', {file});
  setLoading(cache, setCache);

  const data = new FormData();
  data.append('file', file);

  try {
    const { data, error } = await uploadFileToServer(file, user);
    if (error) {
      return setError(cache, setCache, error);
    }

    console.log('data', data);

    setLoading(cache, setCache, false);
  }
  catch (ex) {
    console.log('error', ex)
    setError(cache, setCache, JSON.stringify(ex));
  }
}

export default function Upload() {
  const [file, setFile] = useState({});

  return (
    <CacheContext.Consumer>
      {({ cache, setCache }) => {
        const { loading, error, user } = cache;
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <h4 className="mt-4">Cargar documento en <strong>Mi carpeta</strong></h4>
                  <div className="card-body border border-primary m-5">
                    <input type="file" className="file-input" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                  {error && <p className="text-danger m-5">{error}</p>}
                  {loading
                  ? <Loading />
                  : <button onClick={() => handleSaveFile(file, user, cache, setCache)} className="btn btn-lg btn-primary btn-block">Cargar documento</button>}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </CacheContext.Consumer>
  );
}
