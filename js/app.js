const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
console.log('time',time);
console.log('icon', icon);


const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties
    const{ cityDets, weather} = data;

    //Update details template
    details.innerHTML=`
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>
        `;
    //Remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    //Update time image
    const daytime = weather.IsDayTime? 'img/day.svg' : 'img/night.svg';
    time.src = daytime;
    //Update weather icon
    icon.src= `img/icons/${weather.WeatherIcon}.svg`;
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return{
        cityDets,
        weather
    };
};





cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();


    //Update the interface with the city info
    updateCity(city)
    .then(data=> updateUI(data))
    .catch(err => console.log(err));
    
    //Store the last value entered by the user into the localstorage
    localStorage.setItem('city', city);
    console.log(city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data=>updateUI(data))
        .catch(err => console.log(err));
}
