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

function sanitizeNumericValue(value, min = 0, max = 2000) {
    const digitsOnly = String(value ?? "").replace(/\D/g, "");

    if (!digitsOnly) {
        return "";
    }

    const numericValue = Number(digitsOnly);

    if (!Number.isFinite(numericValue)) {
        return "";
    }

    const clampedValue = Math.min(max, Math.max(min, Math.floor(numericValue)));
    return String(clampedValue);
}

function enforceNumericInput(input, min = 0, max = 2000) {
    if (!input) return;

    const sanitizedValue = sanitizeNumericValue(input.value, min, max);
    input.value = sanitizedValue;

    return sanitizedValue;
}

function getRangeInput(stat, bound = "max") {
  return document.querySelector(`input[type="range"][data-stat="${stat}"][data-bound="${bound}"]`);
}

function getValueInput(stat, bound = "max") {
  return document.querySelector(`input[type="text"][data-stat="${stat}"][data-bound="${bound}"].range-value-input`);
}

function syncStatValue(stat, bound = "max") {
  const rangeInput = getRangeInput(stat, bound);
  const valueInput = getValueInput(stat, bound);

  if (!rangeInput || !valueInput) return;

  const min = Number(rangeInput.min) || 0;
  const max = Number(rangeInput.max) || 2000;
  const sanitizedValue = enforceNumericInput(valueInput, min, max);
  const rawValue = Number(sanitizedValue);

  if (!Number.isFinite(rawValue)) {
    valueInput.value = rangeInput.value;
    return;
  }

  const clampedValue = Math.min(max, Math.max(min, Math.floor(rawValue)));
  rangeInput.value = clampedValue;
  valueInput.value = clampedValue;
}

function clampRangePair(stat, changedBound = null) {
  const minRange = getRangeInput(stat, "min");
  const maxRange = getRangeInput(stat, "max");

  if (!minRange || !maxRange) return;

  let minValue = Number(minRange.value);
  let maxValue = Number(maxRange.value);

  if (minValue > maxValue) {
    if (changedBound === "min") {
      minValue = maxValue;
      minRange.value = String(minValue);
    } else {
      maxValue = minValue;
      maxRange.value = String(maxValue);
    }
  }

  const minValueInput = getValueInput(stat, "min");
  const maxValueInput = getValueInput(stat, "max");

  if (minValueInput) minValueInput.value = minRange.value;
  if (maxValueInput) maxValueInput.value = maxRange.value;

  updateRangeTrack(stat);
}

function updateRangeTrack(stat) {
  const minRange = getRangeInput(stat, "min");
  const maxRange = getRangeInput(stat, "max");

  if (!minRange || !maxRange) return;

  const container = minRange.closest(".range-sliders");
  if (!container) return;

  const minimum = Number(minRange.min) || 0;
  const maximum = Number(minRange.max) || 100;
  const minValue = Number(minRange.value);
  const maxValue = Number(maxRange.value);
  const span = maximum - minimum || 1;

  const minPercent = ((minValue - minimum) / span) * 100;
  const maxPercent = ((maxValue - minimum) / span) * 100;

  container.style.setProperty("--range-min", `${minPercent}%`);
  container.style.setProperty("--range-max", `${maxPercent}%`);

  /*
   * Когда ползунки находятся рядом, активный ползунок должен быть выше.
   * Иначе один кружок может перекрывать второй.
   */
  if (maxValue - minValue <= Number(minRange.step || 1) * 2) {
    minRange.style.zIndex = minValue >= maximum ? "5" : "4";
    maxRange.style.zIndex = minValue >= maximum ? "4" : "5";
  } else {
    minRange.style.zIndex = "4";
    maxRange.style.zIndex = "5";
  }
}

function getStatValue(stat) {
  const minInput = getRangeInput(stat, "min");
  const maxInput = getRangeInput(stat, "max");

  const min = minInput ? Number(minInput.value) : 0;
  const max = maxInput ? Number(maxInput.value) : 0;

  return { min, max };
}

function updateRangeLabels() {
  const ranges = Array.from(document.querySelectorAll('#filterPanel input[type="range"]'));
  const stats = new Set(ranges.map(r => r.dataset.stat).filter(Boolean));

  stats.forEach(stat => {
    const minRange = getRangeInput(stat, "min");
    const maxRange = getRangeInput(stat, "max");

    const minValueInput = getValueInput(stat, "min");
    const maxValueInput = getValueInput(stat, "max");

    if (minRange && minValueInput) minValueInput.value = minRange.value;
    if (maxRange && maxValueInput) maxValueInput.value = maxRange.value;
  });
}