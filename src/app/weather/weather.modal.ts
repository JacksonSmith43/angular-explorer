export interface WeatherResponse {
    main: { temp: number },
    sys: { country: string },
    name: string,
    weather: { icon: string }[]
}