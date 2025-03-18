require("dotenv").config();

navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weatherApiKey = process.env.weatherApi_Key;
    const newsApiKey = process.env.newsApi_Key;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherDiv = document.getElementById("weather-data");
        weatherDiv.innerHTML = `
                <p>Location: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
      })
      .catch((error) => console.error("Error fetching weather data:", error));

    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newsDiv = document.getElementById("news-data");
        const article = data.articles[0];
        newsDiv.innerHTML = `
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
      })
      .catch((error) => console.error("Error fetching news data:", error));
  },
  (error) => {
    console.error("Error getting location: ", error);
  }
);

document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("info-block").style.display = "none";
});
