import nubes from '../assets/nubes.jpg';
import nubarrones from '../assets/nubarrones.jpg';
import soleado from '../assets/soleado.jpg';
import lluvias from '../assets/lluvias.jpg';
import lluviasalt from '../assets/lluviasalt.jpg';
import tormentas from '../assets/tormentas.jpg';
import niebla from '../assets/niebla.jpg';
import nieve from '../assets/nieve.jpg';
import nieveligera from '../assets/nieveligera.jpg';

export default function typeCard(data) {
  const bg = {
    'overcast clouds': nubarrones,
    'clear sky': soleado,
    'few clouds': nubes,
    'light rain': lluvias,
    'scattered clouds': nubes,
    'broken clouds': nubarrones,
    'shower rain': lluvias,
    rain: lluvias,
    'heavy intensity rain': lluviasalt,
    'heavy intensity shower rain': lluviasalt,
    thunderstorm: tormentas,
    snow: nieve,
    'light snow': nieveligera,
    mist: niebla,
    fog: niebla,
  };
  return bg[data];
}
