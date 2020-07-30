const search = document.querySelector(".search-bar");
const suggestions = document.querySelector(".suggestions");
const endpoint = "https://immense-depths-06783.herokuapp.com/get";

let cities = [];
fetch(endpoint)
  .then((resp) => resp.json())
  .then((data) => {
    cities = data;
  });

function findMatches(wordMatch, city) {
  return city.filter((place) => {
    const regex = new RegExp(wordMatch, "gi");
    return place.City.match(regex);
  });
}

function displayMatches() {
  const array = findMatches(this.value, cities);
  const value = array
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.City.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li><span class="city">${cityName}</span>
      <span class="temperature">${Math.ceil(place.Temp - 273)}°C</span></li>`;
    })
    .join(" ");
  suggestions.innerHTML = value;
}

search.addEventListener("keyup", displayMatches);
document.addEventListener("click", (e) => {
  if (e.target.localName === "body" || e.target.localName === "html") {
    suggestions.innerHTML = "";
  }
});
