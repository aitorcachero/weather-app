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
            <header className="card-header">
              <h1 className="card-city">📍 {weather.name.toUpperCase()}</h1>
              <h1 className="card-celsius">
                {Math.round(weather.main.temp)}°C
              </h1>
            </header>
          )}
          {weather && weather.cod === 200 && (
            <footer className="card-footer">
              <div className="card-footer-container">
                <h2>💧 Humedad</h2>
                <h2>{weather.main.humidity}%</h2>
              </div>
              <div className="card-footer-container">
                <h2>🌪️ Viento</h2>
                <h2>{weather.wind.speed} km/h</h2>
              </div>
              <div className="card-footer-container">
                <h2>🌤️ Clima</h2>
                <h2>{weather.weather[0].description}</h2>
              </div>
            </footer>
          )}
        </main>
        <aside className="aside">
          <form className="form" onSubmit={(e) => handleSubmit(e, search)}>
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
          </form>
          <div className="last-searchs">
            <div className="last-searchs-title-container">
              <h2 className="last-searchs-title">🕒 Recientes</h2>
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
                        onClick={(e) => handleSubmit(e, e.target.textContent)}
                      >
                        🌍 {search.toUpperCase()}
                      </li>
                    ))}
                </ul>
                <button className="button-clean" onClick={handleDeleteLS}>
                  🗑️ Limpiar
                </button>
              </>
            )}
          </div>
        </aside>
      </article>
    </div>
  );
}
