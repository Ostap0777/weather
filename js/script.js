
const API_KEY = 'GQNEMT3EGWJKTXW6ZWB6HYGJF'

const hidden = document.querySelector('.hidden');

const hidden2 = document.querySelector('.hidden2');
const form = document.querySelector('#form');

const input = document.querySelector('.weather__input')

const button = document.querySelector('.weather__button');
const nowDay = document.querySelector('.now__day')
/* =========================== */ 
const today = new Date();

const dayOfWeek = today.getDay();

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
nowDay.textContent = daysOfWeek[dayOfWeek];


/* ============================= */
button.addEventListener('click', function () {
   hidden2.classList.remove('hidden2')
})


	form.onsubmit = submitHandler;
 async function submitHandler(e) {
	e.preventDefault();
	
	if (!input.value.trim()) {
		 hidden.classList.remove('hidden');
		 setTimeout(function () {
			  hidden.classList.add('hidden')
		 }, 2000);
		 return;
	} 
	const cityInfo = await getGeo(input.value.trim());
	
}


async function getGeo(name,e) {
	const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}%2CUK?unitGroup=metric&key=${API_KEY}`;
	const response = await fetch(apiUrl);
	if(response.status > 300) {
		hidden.classList.remove('hidden');
		setTimeout(function () {
			 hidden.classList.add('hidden')
		}, 2000);
		return;
	}
	const data = await response.json();
	const realAddress = data.resolvedAddress;
	const likeFeel = data.days[0].feelslike;
	const tempBoss = data.days[0].temp;
	const humidityBoss = data.days[0].humidity;
	const sunriseBoss = data.days[0].sunrise;
	const sunsetBoss = data.days[0].sunset;
	const pressureBoss = data.days[0].pressure;
	const visibilityBoss = data.days[0].visibility;
	const dateTimeBoss = data.days[0].datetime;
	const timeBoss = data.currentConditions.datetime;
	const conditionsBoss = data.days[0].conditions;
// SWITCH!

	console.log(data);

	const cityName = document.querySelector('.modal-weather-result__poshuk');
	cityName.textContent = realAddress
	 console.log(realAddress);

	 const feelLike = document.querySelector('.feels__result');
	 feelLike.textContent = likeFeel + '°C';
	 console.log(likeFeel)

   const temp = document.querySelector('.weather__degrees');
	temp.textContent = tempBoss + '°C';
	console.log(tempBoss)

	const Humidity = document.querySelector('.humidity__result');
	Humidity.textContent = humidityBoss + '%';
	console.log(humidityBoss);

	const sunrise = document.querySelector('.sunrise__result');
	sunrise.textContent = sunriseBoss;
	console.log(sunriseBoss);

	const sunset = document.querySelector('.sunset__result');
	sunset.textContent = sunsetBoss;
	console.log(sunsetBoss);


	const pressure = document.querySelector('.pressure__result');
	pressure.textContent = pressureBoss + 'GPa';
	console.log(pressureBoss);

	const visibility = document.querySelector('.visibility__result');
	visibility.textContent = visibilityBoss + 'km';
	console.log(visibilityBoss);

   const dateTime = document.querySelector('.modal-weather__date');
   dateTime.textContent = dateTimeBoss;
	console.log(dateTimeBoss);

	const time = document.querySelector('.now__time');
   time.textContent = timeBoss;
	console.log(timeBoss);


	const conditions = document.querySelector('.weather__opus');
	conditions.textContent = conditionsBoss;
	console.log(conditionsBoss);

   

   const weatherImage = document.querySelector('.weather__image');


   weatherIcon = data.days[0].icon;
	switch (weatherIcon) {
     case 'partly-cloudy-day':
	  weatherImage.src = './img/clouds.png';
	  break;
	  case('rain'):
	  weatherImage.src = './img/rain.png';
	  break;
	  case('Clear'):
	  weatherImage.src = './img/clear.png'
	  break;
	}
	return data;
 }

