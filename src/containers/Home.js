import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CacheContext from '../CacheContext'
import { getUserFiles } from '../services/api'
import { setError, setLoading } from '../services/cache'

const handleFetchFiles = async (
  userId,
  cache,
  setCache,
  setIsFetching
) => {
  setLoading(cache, setCache);
  const { error, data } = await getUserFiles(userId);
  if (error) {
    return setError(cache, setCache, error);
  }

  console.log('data', data)

  setCache({
    ...cache,
    loading: false,
    userFiles: data.files,
  });
  //setIsFetching(false);
}

function Home(props) {
  const [isFetching, setIsFetching] = useState(false)
  return (
    <CacheContext.Consumer>
      {({ cache, setCache }) => {
        const { loading, error, user, userFiles } = cache;
        console.log('render', user.id, userFiles)
        if (user && user.id && !isFetching) {
          setIsFetching(true);
          handleFetchFiles(user.id, cache, setCache, setIsFetching);
        }
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="mt-5 mx-3">Documentos cargados</h3>
                {userFiles && userFiles.length > 0
                ? userFiles.map(file =>
                  <li className="list-group-item my-4 mx-5">
                    <h5><strong>Nombre </strong> {file.name}</h5>
                    <h5><strong>Link </strong> <a href={file.url} rel="noreferrer" target="_blank">Abrir documento</a></h5>
                    <h5><strong>Fecha de carga </strong> {file.createdAt}</h5>
                  </li>)
                : <h5 className="m-5">Debe Iniciar sesión para ver sus archivos.</h5>
                }
              </div>
            </div>
          </div>
        );
      }}
    </CacheContext.Consumer>
  )
}

Home.propTypes = {

}

export default Home;
