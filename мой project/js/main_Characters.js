// characters

const charactersContainer = document.querySelector(".characters");
const loadCharastersButton = document.querySelector("#loadCharastersButton");

loadCharastersButton.onclick = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/data/person.json");
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const characters = JSON.parse(xhr.responseText);
      displayCharacters(characters);
    } else {
      console.error("Ошибка загрузки данных персонажей");
    }
  };
};

function displayCharacters(characters) {
  charactersContainer.innerHTML = "";

  characters.forEach((character, index) => {
    const card = document.createElement("div");
    card.classList.add("characters-card");

    const img = document.createElement("img");
    img.src = character.person_photo;
    img.alt = character.name;

    const name = document.createElement("h2");
    name.textContent = character.name;

    const grouping = document.createElement("p");
    grouping.textContent = character.grouping;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(grouping);

    charactersContainer.appendChild(card);

    setTimeout(() => {
      card.classList.add("show");
    }, index * 200);
  });
}

// SLAIDER

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");
let currentTabIndex = 0;

const hideTabContent = () => {
  tabContentBlocks.forEach((block) => {
    block.style.display = "none";
  });
  tabs.forEach((tab) => {
    tab.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (id = 0) => {
  tabContentBlocks[id].style.display = "block";
  tabs[id].classList.add("tab_content_item_active");
};

hideTabContent();
showTabContent(currentTabIndex);

tabsParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabs.forEach((tab, tabIndex) => {
      if (event.target === tab) {
        hideTabContent();
        showTabContent(tabIndex);
        currentTabIndex = tabIndex;
      }
    });
  }
};

setInterval(() => {
  currentTabIndex = (currentTabIndex + 1) % tabs.length;
  hideTabContent();
  showTabContent(currentTabIndex);
}, 12000);

// CONVERTER

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElements) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/converter.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);
      const usdRate = data.usd;
      const eurRate = data.eur;

      if (element.value === "") {
        targetElements.som.value = "";
        targetElements.usd.value = "";
        targetElements.eur.value = "";
      }

      if (element.id === "som") {
        targetElements.usd.value = (element.value / usdRate).toFixed(2);
        targetElements.eur.value = (element.value / eurRate).toFixed(2);
      }
      if (element.id === "usd") {
        targetElements.som.value = (element.value * usdRate).toFixed(2);
        targetElements.eur.value = (
          element.value *
          (eurRate / usdRate)
        ).toFixed(2);
      }
      if (element.id === "eur") {
        targetElements.som.value = (element.value * eurRate).toFixed(2);
        targetElements.usd.value = (
          element.value *
          (usdRate / eurRate)
        ).toFixed(2);
      }
    };
  };
};

converter(somInput, { usd: usdInput, eur: eurInput });
converter(usdInput, { som: somInput, eur: eurInput });
converter(eurInput, { som: somInput, usd: usdInput });
