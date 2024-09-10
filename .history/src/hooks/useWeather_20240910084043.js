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
  const [weather, setWeather] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSearchs, setLastSearchs] = useState();
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
    if (value.toLowerCase() === lastSearchs[0].toLowerCase()) return;

    if (!value) {
      toast.error('Debes ingresar una ciudad');
      return;
    }
    setLoading(true);
    const data = await fetchData(value);
    if (data.cod === 200) {
      setBg(typeCard(data.weather[0].description));
      const trans = translate(data);
      setWeather(trans);
      const updateLastSearchs = [...lastSearchs].filter(
        (x) => x.toLowerCase() !== value.toLowerCase()
      );
      updateLastSearchs.unshift(value);
      setLastSearchs(updateLastSearchs);

      setError(false);
      setLoading(false);
    } else {
      setError(true);
      toast.error('Ciudad no encontrada');
      value = '';
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
    // handleClick,
    handleDeleteLS,
    bg,
  };
}
