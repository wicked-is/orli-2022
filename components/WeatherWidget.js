import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import WeatherContext from "../context/WeatherContext";

const WidgetContainer = styled.div`
	position: relative;
	top: 2rem;
	left: 4rem;
	p {
		margin: 0;
		padding: 0;
	}

	@media only screen and (max-width: 600px) {
		& {
			left: 12rem;
		}
	}

	@media only screen and (max-width: 437px) {
		& {
			top: 6rem;
			left: 7rem;
		}
	}
`;
const Title = styled.div``;

export default function WeatherWidget(props) {
	const time = new Date().toLocaleTimeString([], {
		timeZone: "America/Los_Angeles",
		hour: "2-digit",
		minute: "2-digit",
	});

	const weather = useContext(WeatherContext);

	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		// write a fetch call to https://api.openweathermap.org/data/2.5/weather?lat=32.8473&lon=-117.2742&appid=ea641546880d9854a0de009620012099
		// set the resopnse to the weatherData state
		// make sure to handle errors
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?lat=32.8473&lon=-117.2742&units=imperial&appid=ea641546880d9854a0de009620012099"
		)
			.then((response) => response.json())
			.then((data) => setWeatherData(data))
			.catch((error) => console.error("Error fetching data: ", error));
	}, []);

	return (
		<WidgetContainer className="weather-copy white sans-serif">
			<Title className="sun">La Jolla, CA</Title>
			<p>
				<span style={{ marginRight: "1rem" }}>{time}</span>
				{weather?.data?.current?.temperature?.current ||
					weatherData?.main?.temp?.toString().split(".")[0]}
				&#176;
			</p>
		</WidgetContainer>
	);
}
