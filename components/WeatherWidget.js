import { useEffect, useState } from 'react';
import { useOpenWeather } from 'react-open-weather'
import styled from 'styled-components';

const WidgetContainer = styled.div`
    position: relative;
    top: 2rem;
    left: 4rem;
`

export default function WeatherWidget(props) {

    const [weatherData, setWeatherData] = useState({})

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'acf0f517d76844a6ac7c40b3e64dcae3',
        lat: 32.8473,
        lon: -117.2742,
        lang: 'en',
        unit: 'imperial'
    })

    console.log('data', data);
    const time = new Date().toLocaleTimeString([], { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })
    
    return (
        <WidgetContainer className="body-copy white">
            La Jolla, CA<br />
            <span style={{ marginRight: '1rem' }}>{time}</span>{data?.current?.temperature?.current}&#176;
        </WidgetContainer>
    )
}