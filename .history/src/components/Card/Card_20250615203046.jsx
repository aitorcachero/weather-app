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
    <div className="flex w-screen h-screen justify-center items-center p-2 sm:p-4">
      <article
        className="flex flex-col lg:flex-row w-full max-w-7xl h-full max-h-[900px] rounded-2xl sm:rounded-3xl bg-dark-secondary border border-white/10 shadow-2xl shadow-black/80 relative overflow-hidden backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-accent-cyan/40 hover:shadow-2xl hover:border-accent-cyan/30"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Borde superior gradiente */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple opacity-80"></div>

        <main className="flex flex-col w-full lg:w-3/4 h-2/3 lg:h-full bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 backdrop-blur-3xl relative">
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 rounded-full p-4 sm:p-8 backdrop-blur-xl border border-white/10">
              <Loader />
            </div>
          )}

          {/* Header - siempre presente */}
          <header className="flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-3xl border-b border-white/10 min-h-[140px] sm:min-h-[180px]">
            {weather && weather.cod === 200 ? (
              <>
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 text-center drop-shadow-2xl">
                  {weather.name}, {weather.sys.country}
                </h1>
                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                  <span className="text-4xl sm:text-6xl lg:text-8xl font-mono font-black text-white drop-shadow-2xl">
                    {Math.round(weather.main.temp)}°
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/90 capitalize drop-shadow-md">
                      {weather.weather[0].description}
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg text-white/70">
                      Sensación: {Math.round(weather.main.feels_like)}°
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white/30 mb-2 sm:mb-4 text-center drop-shadow-2xl">
                  Ciudad, País
                </h1>
                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                  <span className="text-4xl sm:text-6xl lg:text-8xl font-mono font-black text-white/30 drop-shadow-2xl">
                    --°
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/30 capitalize drop-shadow-md">
                      Descripción del clima
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg text-white/30">
                      Sensación: --°
                    </span>
                  </div>
                </div>
              </>
            )}
          </header>

          {/* Información detallada - siempre presente */}
          <section className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[300px] sm:min-h-[400px]">
            {weather && weather.cod === 200 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 h-full">
                {/* Humedad */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-blue-500/50">
                  <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0">
                    💧
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1 sm:mb-2">
                      Humedad
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.main.humidity}%
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-white/70">
                      Humedad relativa
                    </p>
                  </div>
                </div>

                {/* Viento */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-green-500/50">
                  <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-full flex-shrink-0">
                    💨
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1 sm:mb-2">
                      Viento
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {Math.round(weather.wind.speed * 3.6)} km/h
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-white/70">
                      {getWindDirection(weather.wind.deg)} • {weather.wind.deg}°
                    </p>
                  </div>
                </div>

                {/* Presión */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-purple-500/50">
                  <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex-shrink-0">
                    🌡️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1 sm:mb-2">
                      Presión
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.main.pressure} hPa
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-white/70">
                      Presión atmosférica
                    </p>
                  </div>
                </div>

                {/* Visibilidad */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-yellow-500/50">
                  <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex-shrink-0">
                    👁️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1 sm:mb-2">
                      Visibilidad
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.visibility
                        ? Math.round(weather.visibility / 1000)
                        : 'N/A'}{' '}
                      km
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-white/70">
                      Distancia visible
                    </p>
                  </div>
                </div>

                {/* Índice UV */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-orange-500/50">
                  <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex-shrink-0">
                    ☀️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1 sm:mb-2">
                      Temperatura
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {Math.round(weather.main.temp_min)}° /{' '}
                      {Math.round(weather.main.temp_max)}°
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-white/70">
                      Mín / Máx
                    </p>
                  </div>
                </div>

                {/* Nubosidad */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-gray-500/50">
                  <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex-shrink-0">
                    ☁️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1 sm:mb-2">
                      Nubosidad
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.clouds.all}%
                    </p>
                    <p className="text-xs sm:text-sm font-normal text-white/70">
                      Cobertura de nubes
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 h-full">
                {/* Tarjetas placeholder */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 glass-effect rounded-xl sm:rounded-2xl min-h-[100px] sm:min-h-[120px] opacity-30"
                  >
                    <div className="text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 lg:w-15 h-10 sm:h-12 lg:h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                      ❓
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-wider mb-1 sm:mb-2">
                        Información
                      </h3>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-white/30 drop-shadow-md mb-1">
                        --
                      </p>
                      <p className="text-xs sm:text-sm font-normal text-white/30">
                        Esperando datos...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer - siempre presente */}
          <footer className="flex flex-col sm:flex-row justify-around p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-3xl border-t border-white/10 min-h-[100px] sm:min-h-[120px] gap-4 sm:gap-0">
            {weather && weather.cod === 200 ? (
              <>
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 glass-effect rounded-xl transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-yellow-500/50 min-w-[150px] sm:min-w-[200px]">
                  <div className="text-2xl sm:text-3xl w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0">
                    🌅
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">
                      Amanecer
                    </h4>
                    <p className="text-lg sm:text-xl font-mono font-medium text-white">
                      {formatTime(weather.sys.sunrise)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 glass-effect rounded-xl transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-yellow-500/50 min-w-[150px] sm:min-w-[200px]">
                  <div className="text-2xl sm:text-3xl w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0">
                    🌇
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">
                      Atardecer
                    </h4>
                    <p className="text-lg sm:text-xl font-mono font-medium text-white">
                      {formatTime(weather.sys.sunset)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 glass-effect rounded-xl min-w-[150px] sm:min-w-[200px] opacity-30">
                  <div className="text-2xl sm:text-3xl w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0">
                    🌅
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-wider mb-1">
                      Amanecer
                    </h4>
                    <p className="text-lg sm:text-xl font-mono font-medium text-white/30">
                      --:--
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 glass-effect rounded-xl min-w-[150px] sm:min-w-[200px] opacity-30">
                  <div className="text-2xl sm:text-3xl w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0">
                    🌇
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-wider mb-1">
                      Atardecer
                    </h4>
                    <p className="text-lg sm:text-xl font-mono font-medium text-white/30">
                      --:--
                    </p>
                  </div>
                </div>
              </>
            )}
          </footer>
        </main>

        <aside className="flex flex-col w-full lg:w-1/4 h-1/3 lg:h-full bg-gradient-to-br from-dark-primary to-dark-tertiary border-t lg:border-t-0 lg:border-l border-white/10 relative">
          {/* Borde superior/izquierdo gradiente */}
          <div className="absolute top-0 lg:top-0 left-0 lg:left-0 w-full lg:w-0.5 h-0.5 lg:h-full bg-gradient-to-r lg:bg-gradient-to-b from-accent-cyan to-accent-purple opacity-50"></div>

          <form
            className="p-4 sm:p-6 lg:p-8 border-b border-white/10 bg-black/20"
            onSubmit={(e) => handleSubmit(e, search)}
          >
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
              <input
                className="w-full h-12 sm:h-14 lg:h-15 rounded-xl border border-white/20 outline-none px-4 sm:px-6 py-3 sm:py-4 font-medium bg-glass-light text-white backdrop-blur-xl transition-all duration-300 placeholder:text-white/60 placeholder:font-normal focus:bg-glass-medium focus:border-accent-cyan focus:shadow-lg focus:shadow-accent-cyan/20 focus:-translate-y-1 text-sm sm:text-base"
                type="text"
                placeholder="🔍 Buscar ciudad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="h-12 sm:h-14 lg:h-15 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-none outline-none font-bold cursor-pointer text-white gradient-bg transition-all duration-300 uppercase tracking-wider relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/40 hover:brightness-110 active:translate-y-0 shimmer-effect text-sm sm:text-base"
                type="submit"
              >
                ⚡ Buscar
              </button>
            </div>
          </form>

          <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="mb-4 sm:mb-6 lg:mb-8 pb-2 sm:pb-3 lg:pb-4 border-b border-white/20 relative">
              <div className="absolute bottom-0 left-0 w-10 sm:w-12 lg:w-15 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple"></div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                🕒 Recientes
              </h2>
            </div>
            {lastSearchs && lastSearchs.length > 0 && (
              <>
                <ul className="flex flex-col gap-2 sm:gap-3 lg:gap-4 list-none m-0 p-0">
                  {lastSearchs
                    .reverse()
                    .slice(0, 8)
                    .map((search, index) => (
                      <li
                        key={index}
                        className="glass-effect rounded-xl p-3 sm:p-4 font-semibold text-white cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-glass-medium hover:translate-x-1 sm:hover:translate-x-2 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-black/30 hover:text-accent-mint group text-sm sm:text-base"
                        onClick={(e) =>
                          handleSubmit(
                            e,
                            e.target.textContent.replace('🌍 ', '')
                          )
                        }
                      >
                        <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-accent-cyan to-accent-purple transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                        🌍 {search.toUpperCase()}
                      </li>
                    ))}
                </ul>
                <button
                  className="mt-4 sm:mt-6 lg:mt-8 h-10 sm:h-12 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider hover:bg-red-500/20 hover:border-red-500/50 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 text-sm sm:text-base"
                  onClick={handleDeleteLS}
                >
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
