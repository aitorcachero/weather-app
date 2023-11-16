import './Card.css';
import useWeather from '../../hooks/useWeather';
import Loader from '../Loader/Loader';

export default function Card() {
  const {
    weather,
    error,
    loading,
    handleSubmit,
    lastSearchs,
    handleClick,
    bg,
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
          <header className="card-header">
            <h1 className="card-city">
              {weather.cod === 200 ? weather.name.toUpperCase() : ''}
            </h1>
            <h1 className="card-celsius">
              {weather.cod === 200 ? `${Math.round(weather.main.temp)}°C` : ''}
            </h1>
          </header>
          <footer className="card-footer">
            <div className="card-footer-container">
              <h2>
                {weather.cod === 200
                  ? `Humedad: ${weather.main.humidity}%`
                  : ''}
              </h2>
            </div>
            <div className="card-footer-container">
              <h2>
                {weather.cod === 200 ? `Viento: ${weather.wind.speed}km/h` : ''}
              </h2>
            </div>
            <div className="card-footer-container">
              <h2>
                {weather.cod === 200
                  ? `Clima: ${weather.weather[0].description}`
                  : ''}
              </h2>
            </div>
          </footer>
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
        </aside>
      </article>
    </div>
  );
}
