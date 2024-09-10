import nubes from '../assets/nubes.webp';
import nubarrones from '../assets/nubarrones.webp';
import soleado from '../assets/soleado.webp';
import lluvias from '../assets/lluvias.webp';
import lluviasalt from '../assets/lluviasalt.webp';
import tormentas from '../assets/tormentas.webp';
import niebla from '../assets/niebla.webp';
import nieve from '../assets/nieve.webp';
import nieveligera from '../assets/nieveligera.webp';

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
