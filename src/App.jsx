import { useState, useEffect } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const [value, setValue] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [error, setError] = useState("");
  const apiKey = "877faf5b26015cff10f8724df4a3a62a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric&lang=es`;

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError("");
      } else {
        setError("Ciudad no encontrada");
        setWeatherData("");
      }
    } catch (error) {
      setError("Error al obtener los datos");
      setWeatherData("");
    }
  };

  useEffect(() => {
    if (value) {
      getWeather();
    }
  }, []);

  const onClick = () => {
    if (!value) {
      alert("Ingrese una ciudad");
      return;
    }
    getWeather();
    setValue("");
  };

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-center items-center flex-col mt-6 box-border">
            <div>
              <h1 className="mb-4 font-bold text-3xl">WeatherToday</h1>
            </div>
            <div className="flex gap-x-4 items-center justify-center">
              <Input
                className="w-[250px] border border-gray-300 rounded p-2 focus:border-none focus:border-blue-500"
                placeholder="Ingrese una ciudad"
                value={value}
                onInputChange={onInputChange}
              />
              <Button
                title="Consultar"
                className="bg-blue-700 text-white rounded p-2 hover:bg-blue-800"
                onClick={onClick}
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col mt-8">
            {weatherData && weatherData.sys && (
              <div className=" w-[300px] bg-white shadow-lg rounded-lg p-6 text-center lg:w-[500px]">
                <div className="flex justify-center items-center gap-x-2">
                  <img
                    src="/iconos/location.png"
                    alt="icono-ubicación"
                    className="w-8 h-8"
                  />
                  <h2 className="text-4xl font-bold">
                    {weatherData.name}, {weatherData.sys.country}
                  </h2>
                </div>
                {weatherData.main && (
                  <p className="text-6xl font-bold">
                    {weatherData.main.temp}°C
                  </p>
                )}
                <img
                  src="/iconos/nube.png"
                  alt="icono-clima"
                  className="w-20 h-20 mx-auto"
                />
                {weatherData.weather && weatherData.weather[0] && (
                  <p className="text-xl font-semibold mb-4">
                    {weatherData.weather[0].description}
                  </p>
                )}
              </div>
            )}
          </div>
          {error && (
            <p className="text-black font-bold text-center mt-4">{error}</p>
          )}

          <div className="flex justify-center items-center mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {weatherData && weatherData.main && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/humedad.png"
                    alt="icono-humedad"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Humedad: {weatherData.main.humidity}%
                  </h2>
                </div>
              )}
              {weatherData && weatherData.main && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/temperatura.png"
                    alt="icono-sensacion-termica"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Sensación Térmica: {weatherData.main.feels_like}°C
                  </h2>
                </div>
              )}
              {weatherData && weatherData.main && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/maxTemp.png"
                    alt="icono-temp-max"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Temp. Máxima: {weatherData.main.temp_max}°C
                  </h2>
                </div>
              )}
              {weatherData && weatherData.main && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/minTemp.png"
                    alt="icono-temp-min"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Temp. Mínima: {weatherData.main.temp_min}°C
                  </h2>
                </div>
              )}
              {weatherData && weatherData.wind && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="s/iconos/viento.png"
                    alt="icono-viento"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Viento: {weatherData.wind.speed} m/s
                  </h2>
                </div>
              )}
              {weatherData && weatherData.sys && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/sol.png"
                    alt="icono-amanecer"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Amanece:{" "}
                    {new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString("es-ES")}
                  </h2>
                </div>
              )}
              {weatherData && weatherData.sys && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/noche.png"
                    alt="icono-anochecer"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Anochece:{" "}
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                      "es-ES"
                    )}
                  </h2>
                </div>
              )}
              {weatherData && weatherData.clouds && (
                <div className="bg-white shadow-md rounded-lg p-4 flex gap-x-3 items-center justify-center w-[300px]">
                  <img
                    src="/iconos/nube.png"
                    alt="icono-nubes"
                    className="w-12 h-12"
                  />
                  <h2 className="text-2xl font-bold">
                    Nubes: {weatherData.clouds.all}%
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
        <footer className="flex justify-center items-center mt-12 bg-gray-100 py-2">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">
              Desarrollado por{" "}
              <a
                href="https://cristianencarnacion.netlify.app/"
                className="cursor-pointer hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-blue-600">Cristian Encarnacion</span>
              </a>
            </h2>
            <p className="text-sm font-semibold">
              &copy; {new Date().getFullYear()} Todos los derechos reservados
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
