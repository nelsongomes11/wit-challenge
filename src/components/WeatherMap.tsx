import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface WeatherMapProps {
  lat: number;
  lon: number;
  city: string;
  temp: number;
  units: "metric" | "imperial";
}
export const WeatherMap = ({
  lat,
  lon,
  city,
  temp,
  units,
}: WeatherMapProps) => (
  <MapContainer
    center={[lat, lon]}
    zoom={10}
    scrollWheelZoom={false}
    className="w-full h-100"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lon]}>
      <Popup>
        {city}: {temp}°{units === "metric" ? "C" : "F"}
      </Popup>
    </Marker>
  </MapContainer>
);
