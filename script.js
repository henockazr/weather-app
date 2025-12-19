const apiKey = 'API_KEY';
const inputCity = document.querySelector('#inputCity');
const btnSubmit = document.querySelector('#btnSubmit');
const container = document.querySelector('#resultCard');

const nameCity = document.querySelector('#nameCity');
const weatherIcon = document.querySelector('#weatherIcon');
const temperature = document.querySelector('#temp');
const description = document.querySelector('#desc');

const fetchWeather = async (city) => {
    if (!city) return alert('Please fill the city');

    btnSubmit.innerText = 'Finding city...';
    container.style.display = 'none';

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Something wrong while connecting to server. Error : " + response.status);
        }

        const data = await response.json();
        console.log('Weather Data :', data);

        const weatherMode = data.weather[0].main;
        if(weatherMode == 'Clouds'){
            document.body.style.backgroundColor = '#87CEEB';
        } else if (weatherMode == 'Rain'){
            document.body.style.backgroundColor = '#4a5666';
        } else if (weatherMode == 'Clouds'){
            document.body.style.backgroundColor = '#bdc3c7';
        } else {
            document.body.style.backgroundColor = '';
        }

        nameCity.innerText = data.name + ', ' + data.sys.country;
        temperature.innerText = Math.round(data.main.temp) + '°C';
        description.innerText = data.weather[0].description;
        const icon = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

        container.style.display = 'block';
    } catch (error) {
        alert('Something wrong while connecting to server..');
        console.log('Error :', error);
    } finally {
        inputCity.value = '';
        btnSubmit.innerText = 'Find';
    }
};

btnSubmit.addEventListener('click', () => {
    const city = inputCity.value;
    fetchWeather(city);
});

inputCity.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') {
        btnSubmit.click();
    }
});