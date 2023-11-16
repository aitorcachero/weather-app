import { useEffect, useState } from 'react';
import fetchData from '../services/fetchData';

import { toast } from 'react-toastify';
import translate from '../helpers/translate';
import typeCard from '../services/typeCard.js';

import { setItemLS, getItemLS } from '../services/localStorage.js';

export default function useWeather() {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSearchs, setLastSearchs] = useState([]);
  const [bg, setBg] = useState('/src/assets/weatherCard.jpg');
  useEffect(() => {
    const items = getItemLS().split(',');

    if (items) {
      setLastSearchs(items);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetchData(e.target[0].value);
    if (data.cod === 200) {
      setBg(typeCard(data.weather[0].description));
      const trans = translate(data);
      setWeather(trans);
      const items = getItemLS().split(',');
      items.push(e.target[0].value);
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

  return {
    weather,
    error,
    loading,
    handleSubmit,
    lastSearchs,
    handleClick,
    bg,
  };
}
