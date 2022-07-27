import { useEffect, useState } from 'react';
import { useOpenWeather } from 'react-open-weather'
import styled from 'styled-components';

const WidgetContainer = styled.div`
    position: relative;
    top: 2rem;
    left: 4rem;
    p { margin: 0; padding: 0; }
    @media only screen and (max-width: 600px){
        & { left: 12rem;}
    }
`
const Title = styled.div``

export default function WeatherWidget(props) {

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'acf0f517d76844a6ac7c40b3e64dcae3',
        lat: 32.8473,
        lon: -117.2742,
        lang: 'en',
        unit: 'imperial'
    })

    const time = new Date().toLocaleTimeString([], { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })
    
    return (
        <WidgetContainer className="weather-copy white sans-serif">
            <Title className="sun">La Jolla, CA</Title>
            <p><span style={{ marginRight: '1rem' }}>{time}</span>{data?.current?.temperature?.current}&#176;</p>
        </WidgetContainer>
    )
}