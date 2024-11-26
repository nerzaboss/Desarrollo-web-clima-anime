let searchButton=document.getElementById('search'),tempText=document.getElementById('temp'),humidity=document.getElementById('humidity'),wind=document.getElementById('wind'),searchedLocation=document.getElementById('location'),searchSection=document.getElementById('searchSection'),weatherInfo=document.getElementById('weatherInfo'),backToSearch=document.getElementById('backToSearch'),weatherStatus=document.getElementById('weatherStatus'),noSelected=document.getElementById('noSelected'),container=document.getElementById('container'),errorText=document.getElementById('errorText'),error404=document.getElementById('error404'),cityInput=document.getElementById('cityInput'),itemTemperature=document.getElementById('itemTemperature'),itemHumidity=document.getElementById('itemHumidity'),itemWind=document.getElementById('itemWind'),tooltip1=document.getElementById('tooltip1'),tooltip2=document.getElementById('tooltip2'),tooltip3=document.getElementById('tooltip3'),arrow1=document.getElementById('arrow1'),arrow2=document.getElementById('arrow2'),arrow3=document.getElementById('arrow3'), myLocation = document.getElementById('myLocation'), searchResults = document.getElementById('searchResults'), errorAudio = document.getElementById('errorAudio'), searchResultsContainer = document.getElementById('searchResultsContainer'), github = document.getElementById('github')


const api = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = 'ca7d7fdad89664ea1407c30ac66eb163';


function getData() {
    
    let cityValue = cityInput.value.trim();
    let query = `${api}${cityValue}&units=metric&appid=${key}&lang=en`;

    
    if (cityValue === '') {
		noSelected.style.display = 'block';  
		setTimeout(() => {
			if (window.innerWidth < 800) {
				noSelected.style.left = '-30px';
			} else{
				noSelected.style.right = '0';
			}
			noSelected.style.opacity = '1';
			errorAudio.play();
		}, 100);
		setTimeout(() => {
			if (window.innerWidth < 800) {
				noSelected.style.left = '-420px';
			}else{
				noSelected.style.right = '-400px';
			}
			noSelected.style.opacity = '0'
			setTimeout(() => {
				noSelected.style.display = 'none';
			}, 200);
		}, 3000);
		
        return;
    }
    // Get API data
    fetch(query)
        .then(response => response.json())
        .then(json => {
            if (json.cod == 404) {
                handleNotFoundError(error);
            } else {
                handleWeatherData(json);
            }
        })
        .catch(error => {
            handleNotFoundError(error);
        });

    
    alternateView();
}

function getUsersLocation() {
	navigator.geolocation.getCurrentPosition(position => {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		let queryUsersLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
		
		fetch(queryUsersLocation)
		.then(usersLocation => usersLocation.json())
		.then(usersLocation => {
	
			handleWeatherData(usersLocation);
			alternateView();
			
			searchedLocation.innerHTML = usersLocation.name + ` <img class="fadeIn flag" src="https://flagsapi.com/${usersLocation.sys.country}/flat/64.png" alt="${usersLocation.sys.country} flag" style="vertical-align: middle; max-height: 55px;">`;
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
	});
}

function handleNotFoundError(error) {
    searchedLocation.innerHTML = ''
    weatherStatus.innerHTML = ''
    tempText.innerHTML = ''
    humidity.innerHTML = ''
    wind.innerHTML = ''
    errorText.innerHTML = 'Country, state, or city not found.'
    error404.style.display = 'block'

    setTimeout(() => {
        console.clear()
    }, 5)

    setTimeout(() => {
        errorText.innerHTML = ''
        error404.style.display = 'none'
        backToSearch.click()
    }, 3000)
}

function handleWeatherData(json) {
    searchedLocation.innerHTML = capitalizeString(json.name) + ` <img class="fadeIn flag" src="https://flagsapi.com/${json.sys.country}/flat/64.png" alt="${json.sys.country} flag" style="vertical-align: middle; max-height: 55px;">`;

    
    container.className = 'container ' + json.weather[0].main.toLowerCase();

	switch (json.weather[0].main) {

		case 'Ash':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sparking-line"></i> Ash particles in the air';
		break;
	  
		case 'Clear':
		container.className = 'container textShadow ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sun-fill"></i> The sky is Clear';
		break;
	  
		case 'Clouds':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-cloudy-fill"></i> The sky is Cloudy';
		break;
	  
		case 'Drizzle':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-drizzle-fill"></i> The sky is Drizzly';
		break;
	  
		case 'Dust':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-haze-line"></i> Dusty conditions prevail';
		break;
	  
		case 'Fog':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> There is a lot of Fog';
		break;
	  
		case 'Haze':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-haze-line"></i> Light haze in the air';
		break;
	  
		case 'Mist':
		container.className = 'container textShadow ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> The sky is Misty';
		break;
	  
		case 'Rain':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-rainy-fill"></i> The sky is Rainy';
		break;
	  
		case 'Sand':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sun-foggy-line"></i> Sandy conditions in the air';
		break;
	  
		case 'Smoke':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> Smoke in the air';
		break;
	  
		case 'Snow':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-snowy-fill"></i> The sky is Snowy';
		break;
	  
		case 'Squall':
			container.className = 'container ' + json.weather[0].main.toLowerCase();

		  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-windy-line"></i> Sudden squall in progress';
		  break;
	  
		case 'Thunderstorm':
			container.className = 'container ' + json.weather[0].main.toLowerCase();

		  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-thunderstorms-fill"></i> The sky is Stormy';
		  break;
	  
		case 'Tornado':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		  weatherStatus.innerHTML = `<i style="font-size: 30px; vertical-align: middle;" class="ri-tornado-fill"></i> There's a tornado, please be attentive to the indications of the authorities.`;
		  break;
	  
		default:
		  
		  weatherStatus.innerHTML = '<i class="ri-question-line"></i> Unknown Weather Status';
		  console.log(json.weather[0].main);
		  break;
	  }

    let tempMode = 0;
    const termImage = '<img src="src/img/term.webp" alt="Term Logo" style="height: 40px; vertical-align: middle;">';

    tempText.addEventListener('click', () => {
        const celsiusTemp = json.main.temp;
        let newTemp, unit;

        switch (tempMode) {
				case 0:
					newTemp = celsiusTemp * 9/5 + 32;
					unit = '°F';
					tempMode++;
					break;
				case 1:
					newTemp = 5/9 * (celsiusTemp * 9/5 + 32) + 273.15;
					unit = '°K';
					tempMode++;
					break;
				case 2:
					newTemp = celsiusTemp;
					unit = '°C';
					tempMode = 0;
					
					default: 
					newTemp = celsiusTemp;
					unit = '°C';
					tempMode = 0;
					break;
			}

        tempText.innerHTML = `${termImage}${newTemp.toFixed(2)} ${unit}`;
    });

    
    tempText.innerHTML = '<img src="src/img/term.webp" alt="Term Logo" width="40" height="40" style="vertical-align: middle;">' + json.main.temp + ' °C';
    humidity.innerHTML = '<img src="src/img/humidity.webp" alt="Humidity Logo" width="37" height="37" style="vertical-align: middle;"> ' + json.main.humidity + '%';
    wind.innerHTML = '<img src="src/img/wind.webp" alt="Wind Logo" width="42" height="42" style="vertical-align: middle;"> ' + json.wind.speed + 'm/s';
}

myLocation.addEventListener('click', () => {
	getUsersLocation();
})
searchButton.addEventListener('click', () => {getData()});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {searchButton.click();}});

backToSearch.addEventListener('click', () => {
	searchResults.innerHTML = ''
	searchResultsContainer.style.display = 'none'
    cityInput.value = ''
    searchSection.classList.add('show')
    weatherInfo.classList.remove('show')
    weatherInfo.classList.add('hide')
    cityInput.focus()
})
function alternateView() {
	searchSection.classList.remove('show');
    searchSection.classList.add('hide');
    weatherInfo.classList.add('show');
}
function capitalizeString(str) {
    
    if (str.length === 0) {
        return "";
    }
    
    let capitalizedWords = str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    
    return capitalizedWords.join(' ');
}
function autoCompleteSearch() {
    cityInput.addEventListener('input', () => {

        const searchTerm = cityInput.value.trim();

        if (searchTerm.length >= 3) {
			searchResultsContainer.style.display = 'block'
			searchResults.innerHTML = ''
            fetch(`https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&units=metric&appid=${key}`)
                .then(response => response.json())
                .then(json => {
					
					let cities = json.list

					if (cities.length > 0) {
						cities.forEach(city => {
							
							const cityButton = document.createElement('button');
							
							
							cityButton.className = 'fadeIn'
							cityButton.innerHTML = `<img class="fadeIn flag" src="https://flagsapi.com/${city.sys.country}/shiny/24.png" alt="${city.sys.country} flag" style="vertical-align: middle; max-height: 55px;"> ${city.name}, ${city.sys.country}`
							
							searchResults.appendChild(cityButton);
	
							cityButton.addEventListener('click', () => {
								handleWeatherData(city)
								alternateView()
							})
						});
					}else{
						searchResults.innerHTML = "Your input doesn't match with any city, state or country."
					}
                })
                .catch(error => {
                    handleNotFoundError(error)
                });
        }
    });
}
cityInput.addEventListener('input', () => {
	if (cityInput.value == '') {
		searchResults.innerHTML = ''
		searchResultsContainer.style.display = 'none'
	}
})
autoCompleteSearch()
const body = document.querySelector('body');
setTimeout(() => {
	body.click();
}, 250);
window.addEventListener("offline", function (e) {
	let disconnected = document.getElementById('disconnected')
	disconnected.style.scale = 1
	document.getElementById('connectionAudio').play()
	setTimeout(() => {
		disconnected.style.scale = 0
	}, 5000);
});
window.addEventListener("online", function (e) {
	let connected = document.getElementById('connected')
	connected.style.scale = 1
	document.getElementById('connectionAudio').play()
	setTimeout(() => {
		connected.style.scale = 0
	}, 5000);
});