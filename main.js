const input = document.querySelector('.search');
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const time = document.querySelector('.time');
const temperature = document.querySelector('.temperature');
const type = document.querySelector('.type');
const visibility = document.querySelector('.visibility span');
const wind = document.querySelector('.wind span');
const moisture = document.querySelector('.moisture span');
const body = document.body;
const weather = document.querySelector('.weather');
const info = document.querySelector('.info');

function hot(){
    body.style.background = 'linear-gradient(to top, rgba(0,0,0,.9),rgba(0,0,0,.7)), url(./images/hot.png) no-repeat center/cover'
    weather.style.background = 'url(./images/hot.png) no-repeat center/cover'
}

function cold(){
    body.style.background = 'linear-gradient(to top, rgba(0,0,0,.9),rgba(0,0,0,.7)), url(./images/cold.png) no-repeat center/cover'
    weather.style.background = 'url(./images/cold.png) no-repeat center/cover'
}

async function updateWeatherUI(inputValue = 'Can Tho'){
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=70095f5e19d27d739bb56173e893ad55`).then(res => res.json());
    
    if(data.cod === 200){
        // Chang info
        let temp = Math.floor(data.main.temp)-273;
        city.textContent = data.name;
        country.textContent = data.sys.country;
        time.textContent = new Date().toLocaleString('vi');
        temperature.innerHTML = `
                    <span>
                        ${temp} <sup>o</sup>C
                    </span>
        `;
        type.textContent = data.weather[0].main;
        visibility.textContent = data.visibility + ' m';
        wind.textContent = data.wind.speed + ' m/s';
        moisture.textContent = data.main.humidity + ' (%)';

        // Show info
        info.classList.remove('hide');

        // Chang theme
        if(temp<=20){
            cold();
        }
        else{
            hot();
        }
    }
    else{
        info.classList.add('hide');
    }

    
}

input.addEventListener('change',function(e){
    updateWeatherUI(e.target.value.trim())
})