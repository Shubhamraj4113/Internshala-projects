const apiKey = "26412f620a371904481240f99e9f53ce"

let isCelsius = true
let currentTemp = 0

const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")
const locationBtn = document.getElementById("locationBtn")
const recentCities = document.getElementById("recentCities")
const errorMsg = document.getElementById("errorMsg")

const cityName = document.getElementById("cityName")
const dateEl = document.getElementById("date")
const tempEl = document.getElementById("temperature")
const descEl = document.getElementById("description")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const icon = document.getElementById("weatherIcon")

const windSpeed = document.getElementById("windSpeed")
const humidity2 = document.getElementById("humidity2")
const visibility = document.getElementById("visibility")
const pressure = document.getElementById("pressure")

const suggestions = document.getElementById("suggestions")

const forecastContainer = document.getElementById("forecast")

searchBtn.addEventListener("click", () => {
const city = cityInput.value.trim()

if(!city){
showError("Please enter a city")
return
}

getWeather(city)
saveCity(city)
})

locationBtn.addEventListener("click", () => {
navigator.geolocation.getCurrentPosition(pos=>{
const lat = pos.coords.latitude
const lon = pos.coords.longitude
getWeatherByCoords(lat,lon)
})
})

document.getElementById("toggleTemp").addEventListener("click",()=>{
toggleTemp()
})

recentCities.addEventListener("change",()=>{
getWeather(recentCities.value)
})

function showError(msg){
errorMsg.innerText = msg
errorMsg.classList.remove("hidden")
}

function clearError(){
errorMsg.classList.add("hidden")
}

async function getWeather(city){

clearError()

try{

const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
)

if(!res.ok) throw new Error()

const data = await res.json()

displayWeather(data)

getForecast(city)

}catch{
showError("City not found")
}

}

async function getWeatherByCoords(lat,lon){

const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
)

const data = await res.json()

displayWeather(data)

getForecast(data.name)

}

function displayWeather(data){

cityName.innerText = data.name
dateEl.innerText = new Date().toDateString()

currentTemp = data.main.temp

tempEl.innerText = `${currentTemp} °C`

descEl.innerText = data.weather[0].description

humidity.innerText = data.main.humidity
wind.innerText = data.wind.speed

icon.src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

windSpeed.innerText = data.wind.speed
humidity2.innerText = data.main.humidity
visibility.innerText = data.visibility/1000 + " km"
pressure.innerText = data.main.pressure

dynamicBackground(data.weather[0].main)

if(currentTemp > 40){
alert("Extreme temperature warning!")
}

}

async function getForecast(city){

const res = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
)

const data = await res.json()

forecastContainer.innerHTML=""

const days = data.list.filter(item=>item.dt_txt.includes("12:00:00"))

days.forEach(day=>{

const card = document.createElement("div")

card.className="bg-gray-800 p-3 rounded justify-items-center"

card.innerHTML = `
<p>${new Date(day.dt_txt).toDateString()}</p>
<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
<p>${day.main.temp}°C</p>
<p>💧 ${day.main.humidity}%</p>
<p>💨 ${day.wind.speed}</p>
`

forecastContainer.appendChild(card)

})

}

function toggleTemp(){

if(isCelsius){

tempEl.innerText = `${(currentTemp*9/5+32).toFixed(1)} °F`

}else{

tempEl.innerText = `${currentTemp} °C`

}

isCelsius = !isCelsius
}

function saveCity(city){

let cities = JSON.parse(localStorage.getItem("cities")) || []

if(!cities.includes(city)){
cities.push(city)
}

localStorage.setItem("cities",JSON.stringify(cities))

loadCities()

}

function loadCities(){

let cities = JSON.parse(localStorage.getItem("cities")) || []

if(cities.length > 0){
recentCities.classList.remove("hidden")
}

recentCities.innerHTML=""

cities.forEach(c=>{

const option = document.createElement("option")

option.value=c
option.innerText=c

recentCities.appendChild(option)

})

}

function dynamicBackground(condition){

document.body.classList.remove("sunny","rainy","cloudy")

if(condition.includes("Rain"))
document.body.classList.add("rainy")

else if(condition.includes("Cloud"))
document.body.classList.add("cloudy")

else
document.body.classList.add("sunny")

}

loadCities()

cityInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const city = cityInput.value.trim()

    if (!city) {
      showError("Please enter a city")
      return
    }

    getWeather(city)
    saveCity(city)
  }
})


cityInput.addEventListener("input", async () => {

  const query = cityInput.value.trim()

  if (query.length < 2) {
    suggestions.classList.add("hidden")
    return
  }

  const res = await fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  )

  const data = await res.json()

  suggestions.innerHTML = ""

  data.forEach(city => {

    const li = document.createElement("li")

    li.className = "p-2 hover:bg-gray-700 cursor-pointer"

    li.innerText = `${city.name}, ${city.country}`

    li.addEventListener("click", () => {

      cityInput.value = city.name
      suggestions.classList.add("hidden")

      getWeather(city.name)
      saveCity(city.name)

    })

    suggestions.appendChild(li)

  })

  suggestions.classList.remove("hidden")

})

document.addEventListener("click", (e) => {

  if (!cityInput.contains(e.target)) {
    suggestions.classList.add("hidden")
  }

})