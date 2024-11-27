const artefactsList = document.querySelector(".artefact-list");

async function loadArtefacts() {
  try {
    const response = await fetch("../data/artefacts.json");
    if (!response.ok) {
      throw new Error(`Не удалось загрузить json: ${response.status}`);
    }

    const artefacts = await response.json();

    Object.keys(artefacts).forEach((category) => {
      const artefactCategory = artefacts[category];

      artefactCategory.forEach((artefactObj) => {
        const artefactCard = document.createElement("div");
        artefactCard.classList.add("artefact-card");

        Object.keys(artefactObj).forEach((key) => {
          const artefactData = artefactObj[key];

          const artefactItem = document.createElement("div");
          artefactItem.classList.add("artefact-item");

          const description = document.createElement("p");
          description.textContent = artefactData.description;

          const img = document.createElement("img");
          img.src = artefactData.src;
          img.alt = `${category} artefact`;

          artefactItem.appendChild(img);
          artefactItem.appendChild(description);

          artefactCard.appendChild(artefactItem);
        });

        artefactsList.appendChild(artefactCard);
      });
    });
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

loadArtefacts();
