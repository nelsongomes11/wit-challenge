import { useEffect, useState } from "react";
import { getCurrentWeather, get5DayForecast } from "../api/weather";
import type { Units } from "../api/weather";

export interface WeatherData {
  current: any | null;
  forecast: any | null;
  loading: boolean;
  error: string | null;
  city: string;
  units: Units;
  setCity: (c: string) => void;
  toggleUnits: () => void;
  refetch: () => void;
}

export const useWeather = () => {
  const [city, setCity] = useState<string>("Lisbon");
  const [units, setUnits] = useState<Units>("metric");
  const [current, setCurrent] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setCurrent(null); // reset current weather
    setForecast(null); // reset forecast weather
    try {
      const currentData = await getCurrentWeather(city, units);
      const forecastData = await get5DayForecast(city, units);

      setCurrent(currentData);
      setForecast(forecastData);
      setError(null);
    } catch (error: any) {
      setError(error.message || "Failed to fetch weather");
      console.error(error);
      setCurrent(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the weather
  useEffect(() => {
    fetchWeather();
  }, [city, units]);

  // Toggle between units
  const toggleUnits = () => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return {
    current,
    forecast,
    loading,
    error,
    city,
    units,
    setCity,
    toggleUnits,
    refetch: fetchWeather,
  };
};
