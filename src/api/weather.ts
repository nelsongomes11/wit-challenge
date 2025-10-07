import axios from "axios";

export type Units = "metric" | "imperial";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 8000,
});

export const getCurrentWeather = async (city: string, units: Units) => {
  try {
    const res = await api.get("/weather", {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
      },
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // <-- throw the API message
    }
    throw new Error("Failed to fetch current weather");
  }
};

export const get4DayForecast = async (city: string, units: Units) => {
  try {
    const res = await api.get("/forecast", {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
      },
    });
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

    // Include the first forecast for today even if past 12:00
    const todayForecast = res.data.list.find((item: any) =>
      item.dt_txt.startsWith(todayStr)
    );

    // Filter next 4 days at 12:00
    const nextDays = res.data.list.filter(
      (item: any) =>
        item.dt_txt.includes("12:00:00") && !item.dt_txt.startsWith(todayStr) // exclude today if already included
    );

    const dailyForecast = todayForecast
      ? [todayForecast, ...nextDays]
      : nextDays;

    return dailyForecast.slice(0, 5);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // <-- throw the API message
    }
    throw new Error("Failed to fetch forecast");
  }
};
