function translate(data) {
  const translate = {
    'overcast clouds': 'Nubes encapotadas',
    'clear sky': 'Cielo despejado',
    'moderate rain': 'Lluvia moderada',
    'few clouds': 'Pocas nubes',
    'light rain': 'Lluvia ligera',
    'scattered clouds': 'Nubes dispersas',
    'broken clouds': 'Nubes rotas',
    'shower rain': 'Chubasco',
    rain: 'Lluvia',
    'heavy intensity rain': 'Lluvia fuerte',
    'heavy intensity shower rain': 'Chubasco fuerte',
    thunderstorm: 'Tormenta eléctrica',
    snow: 'Nieve',
    mist: 'Niebla',
    fog: 'Niebla',
    'light snow': 'Nieve ligera',
  };
  data.weather[0].description = translate[data.weather[0].description];
  return data;
}

export default translate;
