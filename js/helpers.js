const statLabels = {
    def: "Защита",
    reduction: "Урон",
    resist: "Точность",
    damage: "Сопротивление умениям",
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

  if (typeof container.updateCustomRange === "function") {
    container.updateCustomRange();
  }

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

function initializeCustomRangeSliders() {
  document.querySelectorAll("#filterPanel .range-sliders").forEach(container => {
    if (container.dataset.customRangeReady === "true") return;

    const minRange = container.querySelector(
      'input[type="range"][data-bound="min"]'
    );
    const maxRange = container.querySelector(
      'input[type="range"][data-bound="max"]'
    );

    if (!minRange || !maxRange) return;

    container.dataset.customRangeReady = "true";

    const stat = minRange.dataset.stat;
    const minimum = Number(minRange.min) || 0;
    const maximum = Number(minRange.max) || 2000;
    const step = Number(minRange.step) || 1;

    const track = document.createElement("div");
    track.className = "range-ui-track";

    const fill = document.createElement("div");
    fill.className = "range-ui-fill";

    const minHandle = document.createElement("button");
    minHandle.type = "button";
    minHandle.className = "range-ui-handle";
    minHandle.dataset.bound = "min";
    minHandle.setAttribute("role", "slider");
    minHandle.setAttribute("aria-label", `${statLabels[stat] || stat}: минимум`);

    const maxHandle = document.createElement("button");
    maxHandle.type = "button";
    maxHandle.className = "range-ui-handle";
    maxHandle.dataset.bound = "max";
    maxHandle.setAttribute("role", "slider");
    maxHandle.setAttribute("aria-label", `${statLabels[stat] || stat}: максимум`);

    track.append(fill, minHandle, maxHandle);
    container.append(track);

    function clamp(value) {
      const stepped = Math.round(value / step) * step;
      return Math.min(maximum, Math.max(minimum, stepped));
    }

    function valueToPercent(value) {
      const span = maximum - minimum || 1;
      return ((value - minimum) / span) * 100;
    }

    function clientXToValue(clientX) {
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / Math.max(1, rect.width))
      );

      return clamp(minimum + ratio * (maximum - minimum));
    }

    function updateUI() {
      const minValue = Number(minRange.value);
      const maxValue = Number(maxRange.value);

      const minPercent = valueToPercent(minValue);
      const maxPercent = valueToPercent(maxValue);

      minHandle.style.left = `${minPercent}%`;
      maxHandle.style.left = `${maxPercent}%`;

      fill.style.left = `${minPercent}%`;
      fill.style.width = `${Math.max(0, maxPercent - minPercent)}%`;

      minHandle.setAttribute("aria-valuemin", String(minimum));
      minHandle.setAttribute("aria-valuemax", String(maxValue));
      minHandle.setAttribute("aria-valuenow", String(minValue));

      maxHandle.setAttribute("aria-valuemin", String(minValue));
      maxHandle.setAttribute("aria-valuemax", String(maximum));
      maxHandle.setAttribute("aria-valuenow", String(maxValue));

      const minInput = getValueInput(stat, "min");
      const maxInput = getValueInput(stat, "max");

      if (minInput) minInput.value = String(minValue);
      if (maxInput) maxInput.value = String(maxValue);
    }

    function setValue(bound, rawValue) {
      const value = clamp(rawValue);

      if (bound === "min") {
        minRange.value = String(
          Math.min(value, Number(maxRange.value))
        );
      } else {
        maxRange.value = String(
          Math.max(value, Number(minRange.value))
        );
      }

      updateUI();
    }

    function bindHandle(handle, bound) {
      let pointerId = null;

      handle.addEventListener("pointerdown", event => {
        event.preventDefault();
        event.stopPropagation();

        pointerId = event.pointerId;
        handle.setPointerCapture(pointerId);
        handle.classList.add("is-dragging");

        setValue(bound, clientXToValue(event.clientX));
      });

      handle.addEventListener("pointermove", event => {
        if (pointerId !== event.pointerId) return;
        if (!handle.hasPointerCapture(pointerId)) return;

        event.preventDefault();
        setValue(bound, clientXToValue(event.clientX));
      });

      function stopDrag(event) {
        if (pointerId === null) return;

        if (handle.hasPointerCapture(pointerId)) {
          handle.releasePointerCapture(pointerId);
        }

        pointerId = null;
        handle.classList.remove("is-dragging");
      }

      handle.addEventListener("pointerup", stopDrag);
      handle.addEventListener("pointercancel", stopDrag);
      handle.addEventListener("lostpointercapture", () => {
        pointerId = null;
        handle.classList.remove("is-dragging");
      });

      handle.addEventListener("keydown", event => {
        const range = bound === "min" ? minRange : maxRange;
        let nextValue = Number(range.value);

        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          nextValue -= step;
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          nextValue += step;
        } else if (event.key === "Home") {
          nextValue = minimum;
        } else if (event.key === "End") {
          nextValue = maximum;
        } else {
          return;
        }

        event.preventDefault();
        setValue(bound, nextValue);
      });
    }

    bindHandle(minHandle, "min");
    bindHandle(maxHandle, "max");

    /*
      A click on the line moves whichever handle is closer.
      This does not interfere with dragging the handles.
    */
    track.addEventListener("pointerdown", event => {
      if (event.target.closest(".range-ui-handle")) return;

      event.preventDefault();

      const clickedValue = clientXToValue(event.clientX);
      const distanceToMin = Math.abs(
        clickedValue - Number(minRange.value)
      );
      const distanceToMax = Math.abs(
        clickedValue - Number(maxRange.value)
      );

      setValue(
        distanceToMin <= distanceToMax ? "min" : "max",
        clickedValue
      );
    });

    /*
      Expose update function so text inputs and reset can refresh
      the custom handles without recreating the component.
    */
    container.updateCustomRange = updateUI;

    updateUI();
  });
}

function refreshCustomRangeSlider(stat) {
  const minRange = getRangeInput(stat, "min");
  const container = minRange?.closest(".range-sliders");

  if (container && typeof container.updateCustomRange === "function") {
    container.updateCustomRange();
  }
}
