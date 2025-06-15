import { useEffect, useState } from 'react';
import fetchData from '../services/fetchData';

import { toast } from 'react-toastify';
import translate from '../helpers/translate';
import typeCard from '../services/typeCard.js';

import {
  setItemLS,
  getItemLS,
  removeItemLS,
} from '../services/localStorage.js';

export default function useWeather() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSearchs, setLastSearchs] = useState([]);
  const [bg, setBg] = useState();

  useEffect(() => {
    const items = getItemLS();
    if (items) {
      setLastSearchs(items.split(','));
    } else {
      setLastSearchs([]);
    }
  }, []);

  useEffect(() => {
    if (weather) {
      setItemLS(lastSearchs);
    }
  }, [weather]);

  const handleSubmit = async (e, value) => {
    e.preventDefault();

    if (!value) {
      toast.error('Debes ingresar una ciudad');
      return;
    }

    // Normalizar el valor de búsqueda
    const normalizedValue = value.toLowerCase().trim();

    // Verificar si la búsqueda es diferente a la última realizada
    const isNewSearch =
      lastSearchs.length === 0 ||
      normalizedValue !== lastSearchs[0].toLowerCase().trim();

    setLoading(true);
    const data = await fetchData(value);

    if (data.cod === 200) {
      setBg(typeCard(data.weather[0].description));
      const trans = translate(data);
      setWeather(trans);

      // Solo actualizar las búsquedas si es una búsqueda nueva
      if (isNewSearch) {
        // Filtrar búsquedas duplicadas (case-insensitive)
        const updateLastSearchs = lastSearchs.filter(
          (search) => search.toLowerCase().trim() !== normalizedValue
        );
        // Agregar la nueva búsqueda al inicio
        updateLastSearchs.unshift(value.trim());
        // Limitar a las últimas 10 búsquedas
        const limitedSearchs = updateLastSearchs.slice(0, 10);
        setLastSearchs(limitedSearchs);
      }

      setError(false);
      setLoading(false);
    } else {
      setError(true);
      toast.error('Ciudad no encontrada');
      setSearch('');
      setWeather();
      setLoading(false);
    }
  };

  const handleDeleteLS = () => {
    setLastSearchs([]);
    removeItemLS();
  };

  return {
    weather,
    error,
    loading,
    handleSubmit,
    lastSearchs,
    search,
    setSearch,
    // handleClick,
    handleDeleteLS,
    bg,
  };
}
