import './Card.css';
import useWeather from '../../hooks/useWeather';
import Loader from '../Loader/Loader';
import { removeItemLS } from '../../services/localStorage';
import backgroundimg from '../../assets/weatherCard.jpg';

export default function Card() {
  const {
    weather,
    error,
    loading,
    handleSubmit,
    lastSearchs,
    handleClick,
    handleDeleteLS,
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
          {/* {loading && (
            <div className="loader">
              <Loader />
            </div>
          )} */}
          {weather && weather.cod === 200 && (
            <header className="card-header">
              <h1 className="card-city">
                {weather && weather.cod === 200
                  ? weather.name.toUpperCase()
                  : ''}
              </h1>
              <h1 className="card-celsius">
                {weather && weather.cod === 200
                  ? `${Math.round(weather.main.temp)}°C`
                  : ''}
              </h1>
            </header>
          )}
          {weather && weather.cod === 200 && (
            <footer className="card-footer">
              <div className="card-footer-container">
                <h2>
                  {weather && weather.cod === 200
                    ? `Humedad: ${weather.main.humidity}%`
                    : ''}
                </h2>
              </div>
              <div className="card-footer-container">
                <h2>
                  {weather && weather.cod === 200
                    ? `Viento: ${weather.wind.speed}km/h`
                    : ''}
                </h2>
              </div>
              <div className="card-footer-container">
                <h2 style={{ color: 'green' }}>
                  {weather && weather.cod === 200
                    ? `${weather.weather[0].description}`
                    : ''}
                </h2>
              </div>
            </footer>
          )}
        </main>
        <aside className="aside">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input-search"
              type="text"
              placeholder="Ciudad..."
            />
          </form>
          <div className="last-searchs">
            <div className="last-searchs-title-container">
              <h2 className="last-searchs-title">Ultimas busquedas</h2>
            </div>
            {lastSearchs && lastSearchs.length > 0 && (
              <ul className="ul">
                {lastSearchs
                  .reverse()
                  .slice(0, 10)
                  .map((search, index) => (
                    <li key={index} className="li" onClick={handleClick}>
                      {search.toUpperCase()}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {lastSearchs && lastSearchs.length > 0 && (
            <button className="button-clean" onClick={handleDeleteLS}>
              Limpiar
            </button>
          )}
        </aside>
      </article>
    </div>
  );
}
