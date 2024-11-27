const anomalyList = document.querySelector(".anomaly-list");

async function loadAnomalies() {
  try {
    const response = await fetch("../data/anomaly.json");
    if (!response.ok) {
      throw new Error(`Не удалось загрузить json: ${response.status}`);
    }
    const anomalies = await response.json();

    Object.keys(anomalies).forEach((category) => {
      const anomalyCategory = anomalies[category];

      anomalyCategory.forEach((anomalyObj) => {
        const anomalyCard = document.createElement("div");
        anomalyCard.classList.add("anomaly-card");

        Object.keys(anomalyObj).forEach((key) => {
          const anomalyData = anomalyObj[key];

          const anomalyItem = document.createElement("div");
          anomalyItem.classList.add("anomaly-item");

          const description = document.createElement("p");
          description.textContent = anomalyData.description;

          const img = document.createElement("img");
          img.src = anomalyData.src;
          img.alt = `${category} anomaly`;

          anomalyItem.appendChild(img);
          anomalyItem.appendChild(description);

          anomalyCard.appendChild(anomalyItem);
        });

        anomalyList.appendChild(anomalyCard);
      });
    });
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

loadAnomalies();
