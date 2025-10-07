interface ForecastCardProps {
  day: any;
  units: "metric" | "imperial";
}
export const ForecastCard = ({ day, units }: ForecastCardProps) => {
  // Convert date to weekday
  const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });

  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="bg-zinc-500 backdrop-blur-md rounded-2xl shadow-lg px-15 py-5 text-center text-white w-auto snap-center">
      <p className="text-3xl font-bold text-white mt-2">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.description}
        className="mx-auto w-auto h-auto"
      />

      <p className="text-3xl font-bold text-white">
        {Math.round(day.main.temp)}
        {tempUnit}
      </p>

      <p className="text-3xl font-bold text-white mt-2">{day.name}</p>

      <p className="capitalize text-lg text-gray-200">{day.description}</p>

      <div className="mt-4 text-sm space-y-1">
        <p>
          Feels like: {Math.round(day.main.feels_like)}
          {tempUnit}
        </p>
        <p>Humidity: {day.main.humidity}%</p>
      </div>
    </div>
  );
};
