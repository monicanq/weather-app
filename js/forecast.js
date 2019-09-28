const key = ' 	9uXbwRiPc8gJITiEDGWbbhZTihyNewNd ';
  
//Get weather info
const getWeather = async (id) =>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();
    console.log(data[0]);

    return data[0];

}


//Get city information
const getCity = async (city) =>{

    const base ='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query =`?apikey=${key}&q=${city}`;
    
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(data[0])
    // console.log(data);
    return data[0];

};







// getCity('valencia')
// .then(data =>  getWeather(data.Key))
// .then(data =>  console.log(data))
// .catch(err => console.log(err));





 
