
interface ConditionProps {
  code: number;
  icon: string;
  text: string;
}

interface DayProps {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: ConditionProps;
  uv: number;
}

export interface HourProps {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: ConditionProps;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  uv: number;
}

interface ForecastDayProps {
  date: string;
  date_epoch: number;
  day: DayProps;
  hour: HourProps[];
}

interface ForecastProps {
  forecastday: ForecastDayProps[];
}

interface LocationProps {
  country: string;
  localtime: string;
  localtime_epoch: number;
  name: string;
}

interface CurrentProps {
  condition: ConditionProps;
  temp_c: number;
}

export interface WeatherProps {
  location: LocationProps;
  current: CurrentProps;
  forecast: ForecastProps;
}

export interface CityProps {
  id: number;
  name: string;
  country: string;
  region: string;
  lat?: string;
  log?: string;
}
