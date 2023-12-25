async function fetching() {
  try {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const countries = await result.json();
    return countries;
  } catch (error) {
    console.log(error);
  }
}

function createCard(data) {
  const newCard = document.createElement("div");
  newCard.className = "card  my-4 my-lg-5  pb-5 px-0";
  newCard.style.width = "18rem";

  newCard.innerHTML = `
            <img src="${data.flags.png}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title py-2"> <strong> ${data.name.common} </strong> </h5>
              <div class="population"><span style = "font-weight:600">Population: </span>${data.population}</div>
              <div class="region"><span style = "font-weight:600">Region: </span>${data.region}</div>
              <div class="capital"><span style = "font-weight:600">Capital:</span>${data.capital}</div>
            </div>`;
  document.getElementById("cards").appendChild(newCard);
}

async function countryCards() {
  try {
    const countries = await fetching();
    countries.forEach((country) => {
      createCard(country);
    });
  } catch (error) {
    console.log(error);
  }
}

countryCards();

//filters

const list = document.getElementsByTagName("li");

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", filtered);
}

function filtered(e) {
  const filter = e.target.innerText;
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card) => {
    const region = card.querySelector(".region");
    const text = region.innerText;
    const value = text.split(":")[1].trim();
    if (filter === value) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

//search

const input = document.getElementById("search");

input.addEventListener("keyup", search);

function search(e) {
  const inn = e.target.value.toLowerCase();
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card) => {
    const val = card.querySelector(".card-title");
    const country = val.innerText.toLowerCase();
    if (country.indexOf(inn) != -1) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// mode switcher
// const mode = document.querySelector(".mode");

// mode.addEventListener("click", switcher);

// function switcher() {
//   const newTheme = document.documentElement.getAttribute("data-bs-theme");
//   const theme = newTheme === "dark" ? "light" : "dark";

//   document.documentElement.setAttribute("data-bs-theme", theme);
//   if (theme === "dark") {
//     const container = document.getElementsByClassName("container-fluid");
//     container[0].style.backgroundColor = "hsl(207, 26%, 17%)";
//     document.body.style.color = "white";
//     const head = document.getElementsByClassName("d-flex");
//     head[0].style.backgroundColor = "hsl(209, 23%, 22%)";

//     const btn = document.querySelectorAll(".btn");
//     btn[0].style.backgroundColor = "hsl(209, 23%, 22%)";
//     btn[1].style.backgroundColor = "hsl(209, 23%, 22%)";
//     console.log(btn);
//   }
// }
