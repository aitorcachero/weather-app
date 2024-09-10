import nubes from '../assets/nubes.wepb';
import nubarrones from '../assets/nubarrones.wepb';
import soleado from '../assets/soleado.wepb';
import lluvias from '../assets/lluvias.wepb';
import lluviasalt from '../assets/lluviasalt.wepb';
import tormentas from '../assets/tormentas.wepb';
import niebla from '../assets/niebla.wepb';
import nieve from '../assets/nieve.wepb';
import nieveligera from '../assets/nieveligera.wepb';

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
