export const setError = (cache, setCache, error) => {
  return setCache({
    ...cache,
    error,
    loading: false
  });
};

export const setLoading = (cache, setCache, loading = true) => {
  return setCache({
    ...cache,
    loading
  });
}
