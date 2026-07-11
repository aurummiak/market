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

function clampRangePair(stat) {
  const minRange = getRangeInput(stat, "min");
  const maxRange = getRangeInput(stat, "max");

  if (!minRange || !maxRange) return;

  let minVal = Number(minRange.value);
  let maxVal = Number(maxRange.value);

  if (minVal > maxVal) {
    // keep a 1-step gap or swap
    if (minRange === document.activeElement) {
      maxVal = minVal;
      maxRange.value = maxVal;
      const maxInput = getValueInput(stat, "max"); if (maxInput) maxInput.value = maxVal;
    } else {
      minVal = maxVal;
      minRange.value = minVal;
      const minInput = getValueInput(stat, "min"); if (minInput) minInput.value = minVal;
    }
  }

  updateRangeTrack(stat);
}

function updateRangeTrack(stat) {
  const minRange = getRangeInput(stat, "min");
  const maxRange = getRangeInput(stat, "max");
  if (!minRange || !maxRange) return;

  const min = Number(minRange.min) || 0;
  const max = Number(maxRange.max) || 100;

  const minVal = Number(minRange.value);
  const maxVal = Number(maxRange.value);

  const range = max - min || 1;
  const minPercent = ((minVal - min) / range) * 100;
  const maxPercent = ((maxVal - min) / range) * 100;

  const gradient = `linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.12) ${minPercent}%, var(--primary) ${minPercent}%, var(--primary) ${maxPercent}%, rgba(255,255,255,0.12) ${maxPercent}%, rgba(255,255,255,0.12) 100%)`;

  // apply gradient to both sliders so track is visible
  minRange.style.background = gradient;
  maxRange.style.background = gradient;
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