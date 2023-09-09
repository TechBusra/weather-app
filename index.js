async function searchWeather(event) {
    if (event.key === "Enter") {
        const apiKey = "2fa73590fd8b5a4c6e68098ad5625395";  
        const city = document.getElementById("search-input").value;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );

            if (response.status === 404) {
                throw new Error("City not found");
            }

            if (!response.ok) {
                throw new Error("Weather data request failed");
            }

            const data = await response.json();

           
            document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
            const date = new Date();
            document.getElementById("date").textContent = date.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById("weather-description").textContent = data.weather[0].description;
            document.getElementById("temperature-range").textContent = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

          
            const advice = generateWeatherAdvice(data.weather[0].main);
            document.getElementById("weather-advice").textContent = advice;
        } catch (error) {
            console.error("Error:", error);
            if (error.message === "City not found") {
                alert("City not found. Please enter a valid city name.");
            } else {
            
                setTimeout(() => {
                    alert("Weather data request failed. Please try again later.");
                }, 2000);
            }
        }
    }
}

function generateWeatherAdvice(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'rain':
            return "Please take your umbrella.";
        case 'hot':
            return "Stay at home, it's too hot.";
        case 'cold':
            return "Bundle up, it's cold outside.";
        case 'snow':
            return "Wear warm clothes and boots for the snow.";
        case 'clouds':
            return "Partly cloudy skies today.";
        case 'thunderstorm':
            return "Be cautious during thunderstorms. Stay indoors.";
        case 'wind':
            return "Hold onto your hat, it's windy out there.";
        default:
            return "Enjoy the weather!";
    }
}
