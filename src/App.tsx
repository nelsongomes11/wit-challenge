import { ForecastCard } from "./components/ForecastCard";
//import { WeatherCard } from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WeatherMap } from "./components/WeatherMap";

function App() {
  const {
    current,
    forecast,
    city,
    setCity,
    units,
    toggleUnits,
    loading,
    error,
  } = useWeather();

  // Yup schema for the city input

  const citySchema = Yup.object({
    city: Yup.string()
      .min(2, "City name must be at least 2 characters")
      .required("City name is required"),
  });

  // Temperature chart data
  const chartData = forecast?.map((day: any) => ({
    date: new Date(day.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    temp: day.main.temp,
  }));

  return (
    <>
      <div className="min-h-screen bg-zinc-700">
        <div className="flex items-center justify-center p-3">
          <p className="text-xl sm:text-3xl font-bold text-white">
            WIT'S CHALLENGE
          </p>
        </div>
        <div className="flex items-center justify-center mt-5">
          <span className="text-white mr-3">°C</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={units === "imperial"}
              onChange={toggleUnits}
            />
            <div
              className="w-14 h-7 bg-gray-400 rounded-full peer peer-focus:ring-2 peer-focus:ring-slate-700 
                    peer-checked:bg-slate-800 transition-colors duration-300"
            ></div>
            <div
              className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md
                    transform transition-transform duration-300 peer-checked:translate-x-7"
            ></div>
          </label>
          <span className="text-white ml-3">°F</span>
        </div>
        {/* Formik form for the city name */}
        <div>
          <Formik
            initialValues={{ city: "" }}
            validationSchema={citySchema}
            onSubmit={(values) => {
              setCity(values.city);
            }}
          >
            {() => (
              <Form className="flex items-center flex-col justify-center mt-5">
                <div className="flex flex-row">
                  <Field
                    name="city"
                    placeholder="Enter city name"
                    className="p-2 bg-slate-200 rounded mr-2"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-slate-600 text-white rounded"
                  >
                    Search
                  </button>
                </div>

                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-300 mt-2"
                />
              </Form>
            )}
          </Formik>
        </div>

        {/* City Name */}
        <div className="flex items-center justify-center mt-5">
          <p className="text-white">
            Showing the weather for <span className="font-bold">{city}</span>
          </p>
        </div>

        {/* Weather Cards */}
        <div className="flex items-center justify-center mt-10">
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-300">{error}</p>}
          {forecast && (
            <div className="flex flex-col w-full">
              <div className="flex gap-4 px-4 overflow-x-auto flex-nowrap snap-x sm:overflow-visible sm:flex-wrap sm:justify-center">
                {forecast.map((day: any, index: number) => (
                  <ForecastCard key={index} day={day} units={units} />
                ))}
              </div>
              {/* Temperature chart */}
              <div className="mt-15 flex items-center justify-center w-full sm:w-3/4  mx-auto">
                <ResponsiveContainer width="70%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#ffffff" />
                    <YAxis
                      unit={units === "metric" ? "°C" : "°F"}
                      stroke="#ffffff"
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Weather map */}
              {current?.coord?.lat && current?.coord?.lon && (
                <div className="flex items-center justify-center mt-15">
                  <WeatherMap
                    lat={current.coord.lat}
                    lon={current.coord.lon}
                    temp={current.main.temp}
                    units={units}
                    city={city}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
