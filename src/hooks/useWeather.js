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
  const [bg, setBg] = useState('/src/assets/weatherCard.jpg');

  useEffect(() => {
    const items = getItemLS();
    console.log('aaaa', items);
    if (items) {
      setLastSearchs(items.split(','));
    } else {
      setLastSearchs([]);
    }
    console.log('bbbb', items);
  }, []);

  useEffect(() => {
    if (weather) {
      setItemLS(lastSearchs);
    }
  }, [weather]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetchData(e.target[0].value);
    if (data.cod === 200) {
      setBg(typeCard(data.weather[0].description));
      const trans = translate(data);
      setWeather(trans);
      setLastSearchs((prev) => {
        return [...prev, e.target[0].value];
      });
      setError(false);
      setLoading(false);
    } else {
      setError(true);

      toast.error('Ciudad no encontrada');
      setLoading(false);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetchData(e.target.textContent);
    if (data.cod === 200) {
      setBg(typeCard(data.weather[0].description));
      const trans = translate(data);
      setWeather(trans);
      const items = getItemLS().split(',');
      items.push(e.target.textContent);
      setLastSearchs(items);
      setItemLS(items);
      setError(false);
      setLoading(false);
    } else {
      setError(true);

      toast.error('Ciudad no encontrada');
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
    handleClick,
    handleDeleteLS,
    bg,
  };
}
