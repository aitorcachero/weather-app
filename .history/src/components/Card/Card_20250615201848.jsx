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
    <div className="flex w-screen h-screen justify-center items-center p-4">
      <article
        className="flex w-full max-w-7xl h-full max-h-[900px] rounded-3xl bg-dark-secondary border border-white/10 shadow-2xl shadow-black/80 relative overflow-hidden backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-accent-cyan/40 hover:shadow-2xl hover:border-accent-cyan/30"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Borde superior gradiente */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple opacity-80"></div>

        <main className="flex flex-col w-3/4 h-full bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 backdrop-blur-3xl relative">
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 rounded-full p-8 backdrop-blur-xl border border-white/10">
              <Loader />
            </div>
          )}

          {/* Header principal - siempre presente */}
          <header className="flex justify-between items-center p-12 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-3xl border-b border-white/10 relative min-h-[180px]">
            {weather && weather.cod === 200 ? (
              <>
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-6xl font-black mb-2 text-white drop-shadow-lg tracking-tight gradient-text">
                    📍 {weather.name}
                  </h1>
                  <p className="text-lg lg:text-xl font-medium text-white/70 capitalize">
                    {weather.sys.country} • {weather.weather[0].description}
                  </p>
                </div>
                <div className="text-right">
                  <h1 className="text-5xl lg:text-8xl font-mono font-semibold text-accent-mint drop-shadow-2xl leading-none">
                    {Math.round(weather.main.temp)}°C
                  </h1>
                  <p className="text-base lg:text-lg font-normal text-white/70 mt-2">
                    Sensación térmica: {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-6xl font-black mb-2 text-white/50 drop-shadow-lg tracking-tight">
                    🌍 Busca una ciudad
                  </h1>
                  <p className="text-lg lg:text-xl font-medium text-white/40">
                    Ingresa el nombre de una ciudad para ver el clima
                  </p>
                </div>
                <div className="text-right">
                  <h1 className="text-5xl lg:text-8xl font-mono font-semibold text-white/30 drop-shadow-2xl leading-none">
                    --°C
                  </h1>
                  <p className="text-base lg:text-lg font-normal text-white/30 mt-2">
                    Sensación térmica: --°C
                  </p>
                </div>
              </>
            )}
          </header>

          {/* Información detallada - siempre presente */}
          <section className="flex-1 p-8 overflow-y-auto min-h-[400px]">
            {weather && weather.cod === 200 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 h-full">
                {/* Aquí va todo el contenido existente de las tarjetas */}
                {/* Temperatura */}
                <div className="flex items-center gap-6 p-8 glass-effect rounded-2xl transition-all duration-300 glass-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden min-h-[120px]">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="text-4xl w-15 h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                    🌡️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Temperatura
                    </h3>
                    <p className="text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {Math.round(weather.main.temp)}°C
                    </p>
                    <p className="text-sm font-normal text-white/70">
                      {Math.round(weather.main.temp_min)}° /{' '}
                      {Math.round(weather.main.temp_max)}°
                    </p>
                  </div>
                </div>

                {/* Humedad */}
                <div className="flex items-center gap-6 p-8 glass-effect rounded-2xl transition-all duration-300 glass-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden min-h-[120px]">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="text-4xl w-15 h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                    💧
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Humedad
                    </h3>
                    <p className="text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.main.humidity}%
                    </p>
                    <p className="text-sm font-normal text-white/70">
                      Nivel de humedad
                    </p>
                  </div>
                </div>

                {/* Viento */}
                <div className="flex items-center gap-6 p-8 glass-effect rounded-2xl transition-all duration-300 glass-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden min-h-[120px]">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="text-4xl w-15 h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                    🌪️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Viento
                    </h3>
                    <p className="text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.wind.speed} m/s
                    </p>
                    <p className="text-sm font-normal text-white/70">
                      Dirección: {getWindDirection(weather.wind.deg)} (
                      {weather.wind.deg}°)
                    </p>
                  </div>
                </div>

                {/* Presión */}
                <div className="flex items-center gap-6 p-8 glass-effect rounded-2xl transition-all duration-300 glass-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden min-h-[120px]">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="text-4xl w-15 h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                    🔽
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Presión
                    </h3>
                    <p className="text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.main.pressure} hPa
                    </p>
                    <p className="text-sm font-normal text-white/70">
                      Presión atmosférica
                    </p>
                  </div>
                </div>

                {/* Visibilidad */}
                <div className="flex items-center gap-6 p-8 glass-effect rounded-2xl transition-all duration-300 glass-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden min-h-[120px]">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="text-4xl w-15 h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                    👁️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Visibilidad
                    </h3>
                    <p className="text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {(weather.visibility / 1000).toFixed(1)} km
                    </p>
                    <p className="text-sm font-normal text-white/70">
                      Alcance visual
                    </p>
                  </div>
                </div>

                {/* Nubosidad */}
                <div className="flex items-center gap-6 p-8 glass-effect rounded-2xl transition-all duration-300 glass-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden min-h-[120px]">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="text-4xl w-15 h-15 flex items-center justify-center gradient-bg rounded-full flex-shrink-0">
                    ☁️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Nubosidad
                    </h3>
                    <p className="text-3xl font-mono font-semibold text-white drop-shadow-md mb-1">
                      {weather.clouds.all}%
                    </p>
                    <p className="text-sm font-normal text-white/70">
                      Cobertura de nubes
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Información del sol */}
            <footer className="flex justify-around p-8 bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-3xl border-t border-white/10">
              <div className="flex items-center gap-6 p-6 glass-effect rounded-xl transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-yellow-500/50 min-w-[200px]">
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0">
                  🌅
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Amanecer
                  </h4>
                  <p className="text-xl font-mono font-medium text-white">
                    {formatTime(weather.sys.sunrise)}
                  </p>
                </div>
                <div className="flex items-center gap-6 p-6 glass-effect rounded-xl transition-all duration-300 hover:bg-glass-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-yellow-500/50 min-w-[200px]">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0">
                    🌇
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">
                      Atardecer
                    </h4>
                    <p className="text-xl font-mono font-medium text-white">
                      {formatTime(weather.sys.sunset)}
                    </p>
                  </div>
                </div>
              </footer>
            </>
          )}
        </main>

        <aside className="flex flex-col w-1/4 h-full bg-gradient-to-br from-dark-primary to-dark-tertiary border-l border-white/10 relative">
          {/* Borde izquierdo gradiente */}
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-accent-cyan to-accent-purple opacity-50"></div>

          <form
            className="p-8 border-b border-white/10 bg-black/20"
            onSubmit={(e) => handleSubmit(e, search)}
          >
            <div className="flex flex-col gap-6">
              <input
                className="w-full h-15 rounded-xl border border-white/20 outline-none px-6 font-medium bg-glass-light text-white backdrop-blur-xl transition-all duration-300 placeholder:text-white/60 placeholder:font-normal focus:bg-glass-medium focus:border-accent-cyan focus:shadow-lg focus:shadow-accent-cyan/20 focus:-translate-y-1"
                type="text"
                placeholder="🔍 Buscar ciudad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="h-15 rounded-xl border-none outline-none font-bold cursor-pointer text-white gradient-bg transition-all duration-300 uppercase tracking-wider relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/40 hover:brightness-110 active:translate-y-0 shimmer-effect"
                type="submit"
              >
                ⚡ Buscar
              </button>
            </div>
          </form>

          <div className="flex-1 flex flex-col p-8 overflow-y-auto">
            <div className="mb-8 pb-4 border-b border-white/20 relative">
              <div className="absolute bottom-0 left-0 w-15 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple"></div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                🕒 Recientes
              </h2>
            </div>
            {lastSearchs && lastSearchs.length > 0 && (
              <>
                <ul className="flex flex-col gap-4 list-none m-0 p-0">
                  {lastSearchs
                    .reverse()
                    .slice(0, 8)
                    .map((search, index) => (
                      <li
                        key={index}
                        className="glass-effect rounded-xl p-4 font-semibold text-white cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-glass-medium hover:translate-x-2 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-black/30 hover:text-accent-mint group"
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
                  className="mt-8 h-12 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider hover:bg-red-500/20 hover:border-red-500/50 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30"
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
