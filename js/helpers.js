const statLabels = {
    def: "Сопротивление умениям",
    reduction: "Урон",
    resist: "Точность",
    damage: "Защита",
    accuracy: "Снижение урона"
};

function renderCardStats(product) {
    if (!product.cardStats || !Array.isArray(product.cardStats)) {
        return "";
    }

    return product.cardStats.map(stat => `
    <span class="tag stat-tag" data-tooltip="${stat.label}: ${stat.value}">
      <img
        src="${stat.icon}"
        alt="${stat.label}"
        draggable="false"
      >
      <span>${stat.value}</span>
    </span>
  `).join("");
}

function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₽";
}

function renderStats(product) {
    if (!product.stats) return "";

    const icons = {
        damage: "img/tags/damage.png",
        accuracy: "img/tags/accuracy.png",
        def: "img/tags/defence.png",
        reduction: "img/tags/reduction.png",
        resist: "img/tags/resistance.png"
    };

    return `
    <div class="stats-list">
      ${Object.entries(product.stats).map(([key, value]) => `
        <div class="stat-line">
          <div class="stat-icon">
            <img src="${icons[key]}" alt="">
          </div>
          <div class="stat-text">
            <span>${statLabels[key]}</span>
            <strong>${value}</strong>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderSkills(product) {
    if (!product.skills) return "";

    return `
    <table class="skills-table">
      <thead>
        <tr>
          <th>Персонаж</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>Доп.</th>
        </tr>
      </thead>
      <tbody>
        ${product.skills.map(skill => `
          <tr>
            <td>${skill.name}</td>
            <td>${skill.a}</td>
            <td>${skill.b}</td>
            <td>${skill.c}</td>
            <td>${skill.note}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .map(input => input.value);
}

function getStatValue(stat) {
    const input = document.querySelector(`input[data-stat="${stat}"]`);
    return input ? Number(input.value) : 0;
}

function updateRangeLabels() {
    document.getElementById("defValue").textContent = getStatValue("def");
    document.getElementById("reductionValue").textContent = getStatValue("reduction");
    document.getElementById("resistValue").textContent = getStatValue("resist");
    document.getElementById("damageValue").textContent = getStatValue("damage");
    document.getElementById("accuracyValue").textContent = getStatValue("accuracy");
}