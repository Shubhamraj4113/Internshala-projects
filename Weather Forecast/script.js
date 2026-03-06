const apiKey="26412f620a371904481240f99e9f53ce"

let currentTemp=0
let isCelsius=true

const cityInput=document.getElementById("cityInput")
const searchBtn=document.getElementById("searchBtn")
const locationBtn=document.getElementById("locationBtn")

const cityName=document.getElementById("cityName")
const temp=document.getElementById("temperature")
const desc=document.getElementById("description")
const icon=document.getElementById("weatherIcon")
const date=document.getElementById("date")

const wind=document.getElementById("windSpeed")
const humidity=document.getElementById("humidity")
const visibility=document.getElementById("visibility")
const pressure=document.getElementById("pressure")

const forecast=document.getElementById("forecastContainer")
const errorMsg=document.getElementById("errorMsg")

const rain=document.getElementById("rain")
const snow=document.getElementById("snow")

searchBtn.onclick=()=>{

let city=cityInput.value.trim()

if(!city){
errorMsg.innerText="Enter city name"
return
}

getWeather(city)

saveCity(city)

}

locationBtn.onclick=()=>{

navigator.geolocation.getCurrentPosition(pos=>{

getWeatherByCoords(pos.coords.latitude,pos.coords.longitude)

})

}

document.getElementById("toggleTemp").onclick=()=>{

if(isCelsius){

temp.innerText=(currentTemp*9/5+32).toFixed(1)+"°F"

}else{

temp.innerText=currentTemp+"°C"

}

isCelsius=!isCelsius

}

async function getWeather(city){

try{

let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)

let data=await res.json()

displayWeather(data)

getForecast(city)

}catch{

errorMsg.innerText="City not found"

}

}

async function getWeatherByCoords(lat,lon){

let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)

let data=await res.json()

displayWeather(data)

getForecast(data.name)

}

function displayWeather(data){

cityName.innerText=data.name

date.innerText=new Date().toDateString()

currentTemp=data.main.temp

temp.innerText=currentTemp+"°C"

desc.innerText=data.weather[0].description

icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

wind.innerText=data.wind.speed+" m/s"

humidity.innerText=data.main.humidity+"%"

visibility.innerText=data.visibility/1000+" km"

pressure.innerText=data.main.pressure

weatherAnimation(data.weather[0].main)

if(currentTemp>40){

alert("Extreme heat warning!")

}

function setWeatherBackground(condition){

  document.body.classList.remove("rainy","sunny","cloudy")

  if(condition.includes("Rain")){
    document.body.classList.add("rainy")
  }

  else if(condition.includes("Cloud")){
    document.body.classList.add("cloudy")
  }

  else{
    document.body.classList.add("sunny")
  }

}

}

async function getForecast(city){

let res=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)

let data=await res.json()

forecast.innerHTML=""

let days=data.list.filter(x=>x.dt_txt.includes("12:00:00"))

days.forEach(day=>{

let card=document.createElement("div")

card.className="bg-white/10 p-4 rounded-lg justify-items-center"

card.innerHTML=`

<p>${new Date(day.dt_txt).toDateString()}</p>

<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">

<p>${day.main.temp}°C</p>

<p>💧 ${day.main.humidity}</p>

<p>💨 ${day.wind.speed}</p>

`

forecast.appendChild(card)

})

}

function weatherAnimation(condition){

rain.innerHTML=""
snow.innerHTML=""

rain.classList.add("hidden")
snow.classList.add("hidden")

if(condition.includes("Rain")){

rain.classList.remove("hidden")

for(let i=0;i<80;i++){

let drop=document.createElement("div")

drop.className="absolute w-0.5 h-8 bg-blue-300 animate-bounce"

drop.style.left=Math.random()*100+"%"

drop.style.animationDuration=Math.random()+0.5+"s"

rain.appendChild(drop)

}

}

if(condition.includes("Snow")){

snow.classList.remove("hidden")

for(let i=0;i<60;i++){

let flake=document.createElement("div")

flake.className="absolute w-2 h-2 bg-white rounded-full animate-ping"

flake.style.left=Math.random()*100+"%"

snow.appendChild(flake)

}

}

}

function saveCity(city){

let cities=JSON.parse(localStorage.getItem("cities"))||[]

if(!cities.includes(city)) cities.push(city)

localStorage.setItem("cities",JSON.stringify(cities))

loadCities()

}

function loadCities(){

let cities=JSON.parse(localStorage.getItem("cities"))||[]

let dropdown=document.getElementById("recentCities")

if(cities.length>0){

dropdown.classList.remove("hidden")

dropdown.innerHTML=""

cities.forEach(city=>{

let option=document.createElement("option")

option.value=city

option.innerText=city

dropdown.appendChild(option)

})

}

}

document.getElementById("recentCities").onchange=(e)=>{

getWeather(e.target.value)

}

loadCities()