// document.addEventListener("click", function (event) {
//   const filterPanel = document.getElementById("filterPanel");
//   const filterWrapper = document.querySelector(".filter-wrapper");

//   if (
//     filterPanel &&
//     filterWrapper &&
//     !filterWrapper.contains(event.target)
//   ) {
//     filterPanel.classList.remove("active");
//   }
// });

// document.querySelectorAll('#filterPanel input[type="range"]').forEach(input => {
//   input.addEventListener("input", updateRangeLabels);
// });

// document.addEventListener("keydown", function (event) {
//   const viewer = document.getElementById("imageViewer");

//   if (!viewer.classList.contains("active")) return;

//   if (event.key === "Escape") {
//     viewer.classList.remove("active");
//     document.getElementById("imageViewerImg").src = "";
//   }

//   if (event.key === "ArrowLeft") {
//     showPrevImage(event);
//   }

//   if (event.key === "ArrowRight") {
//     showNextImage(event);
//   }
// });

// document.getElementById("searchInput").addEventListener("input", filterProducts);

// // Initialization
// updateRangeLabels();
// renderProducts();

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchInput").addEventListener("input", filterProducts);

  document.querySelectorAll('#filterPanel input[type="range"]').forEach(input => {
    input.addEventListener("input", () => {
      const stat = input.dataset.stat;
      const bound = input.dataset.bound || "max";
      if (stat) {
        const valueInput = document.querySelector(`input[type="text"].range-value-input[data-stat="${stat}"][data-bound="${bound}"]`);
        if (valueInput) {
          valueInput.value = input.value;
        }

        // ensure min <= max
        const minRange = document.querySelector(`input[type="range"][data-stat="${stat}"][data-bound="min"]`);
        const maxRange = document.querySelector(`input[type="range"][data-stat="${stat}"][data-bound="max"]`);
        if (minRange && maxRange) {
          if (Number(minRange.value) > Number(maxRange.value)) {
            if (bound === "min") {
              maxRange.value = minRange.value;
              const maxValInput = document.querySelector(`input[type="text"].range-value-input[data-stat="${stat}"][data-bound="max"]`);
              if (maxValInput) maxValInput.value = maxRange.value;
            } else {
              minRange.value = maxRange.value;
              const minValInput = document.querySelector(`input[type="text"].range-value-input[data-stat="${stat}"][data-bound="min"]`);
              if (minValInput) minValInput.value = minRange.value;
            }
          }
        }

        // update visual track
        if (typeof updateRangeTrack === 'function') updateRangeTrack(stat);
      }

      updateRangeLabels();
    });
  });

  document.querySelectorAll('#filterPanel .range-value-input[data-stat]').forEach(input => {
    input.addEventListener("keydown", event => {
      const allowedKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];

      if (allowedKeys.includes(event.key) || /^\d$/.test(event.key) || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === "Enter") {
        return;
      }

      event.preventDefault();
    });

    input.addEventListener("paste", event => {
      const pastedText = (event.clipboardData || window.clipboardData).getData("text");
      if (!/^\d*$/.test(pastedText)) {
        event.preventDefault();
      }
    });

    input.addEventListener("input", () => {
      const stat = input.dataset.stat;
      const bound = input.dataset.bound || "max";
      if (stat) {
        syncStatValue(stat, bound);
        // ensure ordering and update track
        if (typeof clampRangePair === 'function') clampRangePair(stat);
      }

      updateRangeLabels();
    });

    input.addEventListener("change", () => {
      const stat = input.dataset.stat;
      const bound = input.dataset.bound || "max";
      if (stat) {
        syncStatValue(stat, bound);
      }

      updateRangeLabels();
    });
  });

  updateRangeLabels();
  // initialize ranges so left handle at min, right handle at max
  document.querySelectorAll('#filterPanel .range-sliders').forEach(group => {
    const minRange = group.querySelector('input[type="range"][data-bound="min"]');
    const maxRange = group.querySelector('input[type="range"][data-bound="max"]');
    if (minRange) minRange.value = String(minRange.min || 0);
    if (maxRange) maxRange.value = String(maxRange.max || 0);
    const stat = (minRange || maxRange)?.dataset?.stat;
    if (stat && typeof updateRangeTrack === 'function') updateRangeTrack(stat);
  });

  renderProducts();
});