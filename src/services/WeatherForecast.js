
class WeatherForecast {
    
    constructor() {
        this.cloudiness = 0;
        this.windSpeed = 0;
        this.humidity = 0;

        this.temperatureValue = 0;
        this.temperatureHigh = 0;
        this.temperatureLow = 0;

        this.location = ' ';
        this.description = 'Please make sure you are connected to the internet! ';
        this.weatherIcon = require('../assets/icons/weather/cloud.svg');

        this.update();
    }

   
    //Update the above instances with location

    update() {
        if (navigator.onLine) {
            navigator.geolocation.getCurrentPosition(position => this.updateForecast(position));
        }
    }

    //Update weather with coordinates

    async updateForecast(position) {
        let data = null;

        try {
            data = await this.getForecast(position.coords);
        } catch (e) {
            data = this.getErrorData();
        }

        this.populate(data);
    }

    //Fetch weather data from API

    async getForecast(coordinates) {
        let appId = '7f1c07ad40fd3d97b78f1e235e05f8eb';
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${appId}&units=metric`;

        let response = await fetch(endpoint);

        return await response.json();
    }

    //Error tags

    getErrorData() {
        return {
                clouds: { all: 0 },
                wind: { speed: 0 },
                main: {
                    humidity: 0,
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0,
                },
                weather: [
                    {
                        id: 0,
                        description: `We're experiencing some issues with our server.`
                    }
                ],
                name: null,
                sys: {
                    country: null
                }
            };
    }

    //Passing the new data

    populate(data) {
        this.cloudiness = data.clouds.all;
        this.windSpeed = data.wind.speed;
        this.humidity = data.main.humidity;
        this.temperatureValue = Math.round(data.main.temp);
        this.temperatureHigh = Math.round(data.main.temp_max);
        this.temperatureLow = Math.round(data.main.temp_min);
        this.location = this.formatLocation(data.name, data.sys.country);
        this.description = data.weather[0].description;
        this.weatherIcon = this.getWeatherIcon(data.weather[0].id);
    }


    //Location format

    formatLocation(city, country) {
        if (city === null && country === null) {
            return '';
        }

        return `${city}, ${country}`;
    }

    //Showcase weather icon based on ID

    getWeatherIcon(id) {
        if(this.isThunderstorm(id)) {
            return require('../assets/icons/weather/thunderstorm.svg');
        }

        if(this.isDrizzle(id) || this.isRain(id)) {
            return require('../assets/icons/weather/rain.svg');
        }

        if(this.isSnow(id)) {
            return require('../assets/icons/weather/snow.svg');
        }

        return require('../assets/icons/weather/cloud.svg');
    }


    //Checking weather type instances

    isThunderstorm(id) {
        return id > 199 && id < 233;
    }

    
    isDrizzle(id) {
        return id >299 && id < 322;
    }

    
    isRain(id) {
        return id > 499 && id < 532;
    }

    
    isSnow(id) {
        return id > 599 && id < 623;
    }
}

export default WeatherForecast;
