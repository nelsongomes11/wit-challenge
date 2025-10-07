interface WeatherCardProps {
  data: any;
  units: "metric" | "imperial";
}
export const WeatherCard = ({ data, units }: WeatherCardProps) => {
  if (!data) return null;

  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="bg-blue-100 backdrop-blur-md rounded-2xl shadow-lg px-15 py-10 text-center text-white w-auto">
      <p className="text-3xl font-bold text-white mt-2">Today</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.description}
        className="mx-auto w-24 h-24"
      />

      <p className="text-5xl font-bold text-white">
        {Math.round(data.main.temp)}
        {tempUnit}
      </p>

      <p className="text-3xl font-bold text-white mt-2">{data.name}</p>

      <p className="capitalize text-lg text-gray-200">{data.description}</p>

      <div className="mt-4 text-sm space-y-1">
        <p>
          Feels like: {Math.round(data.main.feels_like)}
          {tempUnit}
        </p>
        <p>Humidity: {data.main.humidity}%</p>
      </div>
    </div>
  );
};
