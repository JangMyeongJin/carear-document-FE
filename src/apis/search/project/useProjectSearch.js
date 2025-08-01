import { useState, useEffect } from 'react';
import { searchProjects } from './projectApi';

export const useProjectSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (searchQuery = query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchProjects(searchQuery);
      setResults(data);
    } catch (err) {
      setError(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      search();
    } else {
      setResults([]);
    }
  }, [query]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search
  };
}; 