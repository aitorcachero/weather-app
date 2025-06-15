import './Card.css';
import useWeather from '../../hooks/useWeather';
import Loader from '../Loader/Loader';
import backgroundimg from '../../assets/weatherCard.webp';

export default function Card() {
  const {
    weather,
    loading,
    handleSubmit,
    lastSearchs,
    handleDeleteLS,
    search,
    setSearch,
    bg = backgroundimg,
  } = useWeather();

  // Función para formatear la hora
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Función para obtener la dirección del viento
  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="card-container">
      <article
        className="card"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <main className="card-body">
          {loading && (
            <div className="loader">
              <Loader />
            </div>
          )}

          {weather && weather.cod === 200 && (
            <>
              {/* Header principal */}
              <header className="card-header">
                <div className="location-info">
                  <h1 className="card-city">📍 {weather.name}</h1>
                  <p className="country-info">
                    {weather.sys.country} • {weather.weather[0].description}
                  </p>
                </div>
                <div className="temperature-info">
                  <h1 className="card-celsius">
                    {Math.round(weather.main.temp)}°C
                  </h1>
                  <p className="feels-like">
                    Sensación térmica: {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </header>

              {/* Información detallada */}
              <section className="weather-details">
                <div className="detail-grid">
                  <div className="detail-card">
                    <div className="detail-icon">🌡️</div>
                    <div className="detail-content">
                      <h3>Temperatura</h3>
                      <p className="detail-value">
                        {Math.round(weather.main.temp)}°C
                      </p>
                      <p className="detail-range">
                        {Math.round(weather.main.temp_min)}° /{' '}
                        {Math.round(weather.main.temp_max)}°
                      </p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <div className="detail-icon">💧</div>
                    <div className="detail-content">
                      <h3>Humedad</h3>
                      <p className="detail-value">{weather.main.humidity}%</p>
                      <p className="detail-subtitle">Nivel de humedad</p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <div className="detail-icon">🌪️</div>
                    <div className="detail-content">
                      <h3>Viento</h3>
                      <p className="detail-value">{weather.wind.speed} m/s</p>
                      <p className="detail-subtitle">
                        Dirección: {getWindDirection(weather.wind.deg)} (
                        {weather.wind.deg}°)
                      </p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <div className="detail-icon">🔽</div>
                    <div className="detail-content">
                      <h3>Presión</h3>
                      <p className="detail-value">
                        {weather.main.pressure} hPa
                      </p>
                      <p className="detail-subtitle">Presión atmosférica</p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <div className="detail-icon">👁️</div>
                    <div className="detail-content">
                      <h3>Visibilidad</h3>
                      <p className="detail-value">
                        {(weather.visibility / 1000).toFixed(1)} km
                      </p>
                      <p className="detail-subtitle">Alcance visual</p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <div className="detail-icon">☁️</div>
                    <div className="detail-content">
                      <h3>Nubosidad</h3>
                      <p className="detail-value">{weather.clouds.all}%</p>
                      <p className="detail-subtitle">Cobertura de nubes</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Información del sol */}
              <footer className="sun-info">
                <div className="sun-card">
                  <div className="sun-icon">🌅</div>
                  <div>
                    <h4>Amanecer</h4>
                    <p>{formatTime(weather.sys.sunrise)}</p>
                  </div>
                </div>
                <div className="sun-card">
                  <div className="sun-icon">🌇</div>
                  <div>
                    <h4>Atardecer</h4>
                    <p>{formatTime(weather.sys.sunset)}</p>
                  </div>
                </div>
              </footer>
            </>
          )}
        </main>

        <aside className="aside">
          <form className="form" onSubmit={(e) => handleSubmit(e, search)}>
            <div className="search-container">
              <input
                className="input-search"
                type="text"
                placeholder="🔍 Buscar ciudad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="button-search" type="submit">
                ⚡ Buscar
              </button>
            </div>
          </form>

          <div className="last-searchs">
            <div className="last-searchs-title-container">
              <h2 className="last-searchs-title">🕒 Búsquedas recientes</h2>
            </div>
            {lastSearchs && lastSearchs.length > 0 && (
              <>
                <ul className="ul">
                  {lastSearchs
                    .reverse()
                    .slice(0, 8)
                    .map((search, index) => (
                      <li
                        key={index}
                        className="li"
                        onClick={(e) =>
                          handleSubmit(
                            e,
                            e.target.textContent.replace('🌍 ', '')
                          )
                        }
                      >
                        🌍 {search.toUpperCase()}
                      </li>
                    ))}
                </ul>
                <button className="button-clean" onClick={handleDeleteLS}>
                  🗑️ Limpiar historial
                </button>
              </>
            )}
          </div>
        </aside>
      </article>
    </div>
  );
}
