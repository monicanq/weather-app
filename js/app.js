const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const region = document.querySelector('.region');
const cityInfo = document.querySelectorAll('.cityinfo');
const cityChange = document.querySelector('.cityinfo button');
const sunrise = document.querySelector('.sunrise-text');
const sunset = document.querySelector('.sunset-text');
const tableforecast = document.querySelector('#forecast table');

//Calls to objects
const forecast = new Forecast();
const timecon = new timeConvert();
const avgtemp = new avgTemp();


const updateUI = (data) => {

    //destructure properties
    const {cityWeather, fiveForecast} = data;

    const today = timecon.convertDay(cityWeather.dt,0);
    const date = timecon.convertTimeDate(cityWeather.dt);
    // Update details template ${cityDets.weather[0].description}
    details.innerHTML=`
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityWeather.name}</h5>
            <div class="my-3">${cityWeather.weather[0].description}</div>
            <div class="display-4 my-4">
                <span>${cityWeather.main.temp}</span>
                <span>&deg;C</span>
            </div>
            <p class="my-3">${today}, ${date}</p>
        </div>
        `;
    //Remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    //Update time image
    const daytime =(cityWeather.dt>=cityWeather.sys.sunrise && cityWeather.dt<= cityWeather.sys.sunset)? 'img/day.svg' : 'img/night.svg';
    time.src = daytime;
    
    //Update weather icon
    icon.src= `img/icons/${cityWeather.weather[0].icon.substring(0,2)}.svg`;

    //Update sunrise and sunset cards
    const timeSunrise= timecon.convertTime(cityWeather.sys.sunrise);
    const timeSunset= timecon.convertTime(cityWeather.sys.sunset);
    sunrise.textContent=`${timeSunrise}`;
    sunset.textContent=`${timeSunset}`;
    
    avgtemp.avgCalc(fiveForecast.list);

    //Update table forecast
    tableforecast.innerHTML=`
                            <thead>
                                <tr>
                                <th scope="col">Day</th>
                                <th scope="col">Min</th>
                                <th scope="col">Max</th>
                                <th scope="col">Desc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">${timecon.convertDay(cityWeather.dt,1)}</th>
                                <td>${fiveForecast.list[4].main.temp_min}°C</td>
                                <td>${fiveForecast.list[4].main.temp_min}°C</td>
                                <td>${fiveForecast.list[4].weather[0].main}</td>
                                </tr>
                                <tr>
                                <th scope="row">${timecon.convertDay(cityWeather.dt,2)}</th>
                                <td>${fiveForecast.list[12].main.temp_min}°C</td>
                                <td>${fiveForecast.list[12].main.temp_min}°C</td>
                                <td>${fiveForecast.list[12].weather[0].main}</td>
                                </tr>
                                <tr>
                                <th scope="row">${timecon.convertDay(cityWeather.dt,3)}</th>
                                <td>${fiveForecast.list[20].main.temp_min}°C</td>
                                <td>${fiveForecast.list[20].main.temp_min}°C</td>
                                <td>${fiveForecast.list[20].weather[0].main}</td>
                                </tr>
                                <th scope="row">${timecon.convertDay(cityWeather.dt,4)}</th>
                                <td>${fiveForecast.list[28].main.temp_min}°C</td>
                                <td>${fiveForecast.list[28].main.temp_min}°C</td>
                                <td>${fiveForecast.list[28].weather[0].main}</td>
                                </tr>
                                <th scope="row">${timecon.convertDay(cityWeather.dt,5)}</th>
                                <td>${fiveForecast.list[36].main.temp_min}°C</td>
                                <td>${fiveForecast.list[36].main.temp_min}°C</td>
                                <td>${fiveForecast.list[36].weather[0].main}</td>
                                </tr>
                            </tbody>
                            `;
    
};

const toggleSearch = () =>{
    cityInfo.forEach(city=>{
        city.classList.toggle('d-none');
    });
};
cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();


    //Update the interface with the city info
    forecast.updateCity(city)
    .then(data=> updateUI(data))
    .catch(err => console.log(err));

    //Hide the search bar
    toggleSearch();


    //Store the last value entered by the user into the localstorage
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
    //Hide the search bar
    toggleSearch();
    forecast.updateCity(localStorage.getItem('city'))
        .then(data=>updateUI(data))
        .catch(err => console.log(err));
    
}
cityChange.addEventListener('click', ()=>{
    //Show search bar
    toggleSearch();
})