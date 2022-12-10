import { createContext } from "react";
import { useOpenWeather } from "react-open-weather";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: "acf0f517d76844a6ac7c40b3e64dcae3",
        lat: 32.8473,
        lon: -117.2742,
        lang: "en",
        unit: "imperial",
    });

    return (
        <WeatherContext.Provider value={{ data, isLoading, errorMessage }}>
            {children}
        </WeatherContext.Provider>
    );
}

export default WeatherContext;
