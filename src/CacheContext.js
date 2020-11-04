import React from 'react';

const CacheContext = React.createContext();

export default CacheContext;

export const defaultCache = {
  user: {},
  loading: false,
  error: '',
  test: 'initial',
  userFiles: []
};
