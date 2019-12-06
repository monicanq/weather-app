class Forecast{
    constructor(){
        this.key = '&appid=bd46c1b5910986493559588cfa4d9aa9';
        this.weatherURI = 'https://api.openweathermap.org/data/2.5/weather?';
        this.weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast?';
        this.units = '&units=metric';
    }
    async updateCity(city){
        const cityWeather = await this.getCityWeather(city);
        const fiveForecast = await this.fiveDayForecast(city);

        return {cityWeather, fiveForecast};
    }
    
    async getCityWeather(city){
        const address = `q=${city}`
        const response = await fetch(this.weatherURI + address + this.key + this.units);
        const data = await response.json();

        return data;
    }
    async fiveDayForecast(city){
        const address = `q=${city}`
        const response = await fetch(this.weatherForecast + address + this.key + this.units);
        const data = await response.json();
       
        return data;
    }

}

  









 
