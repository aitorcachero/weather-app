import { toast } from 'react-toastify';

async function fetchData(city) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_URL;
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const dataJson = await response.json();
    return dataJson;
  } catch (error) {
    toast.error('Se ha producido un error', error);
  }
}

export default fetchData;
