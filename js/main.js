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

  document.querySelectorAll('#filterPanel input[type="range"][data-stat][data-bound]').forEach(input => {
    input.addEventListener("input", () => {
      const stat = input.dataset.stat;
      const bound = input.dataset.bound;

      clampRangePair(stat, bound);
      updateRangeLabels();
    });

    /*
     * При нажатии поднимаем выбранный range над вторым,
     * чтобы оба кружка оставались доступными даже рядом.
     */
    input.addEventListener("pointerdown", () => {
      const stat = input.dataset.stat;
      const minRange = getRangeInput(stat, "min");
      const maxRange = getRangeInput(stat, "max");

      if (minRange) minRange.style.zIndex = input === minRange ? "6" : "4";
      if (maxRange) maxRange.style.zIndex = input === maxRange ? "6" : "5";
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
        clampRangePair(stat, bound);
      }

      updateRangeLabels();
    });

    input.addEventListener("change", () => {
      const stat = input.dataset.stat;
      const bound = input.dataset.bound || "max";
      if (stat) {
        syncStatValue(stat, bound);
        clampRangePair(stat, bound);
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

  const burgerButton = document.getElementById("burgerButton");
  const mainNavigation = document.getElementById("mainNavigation");

  function closeMobileMenu() {
    if (!burgerButton || !mainNavigation) return;

    burgerButton.classList.remove("active");
    mainNavigation.classList.remove("active");
    burgerButton.setAttribute("aria-expanded", "false");
    burgerButton.setAttribute("aria-label", "Открыть меню");
  }

  if (burgerButton && mainNavigation) {
    burgerButton.addEventListener("click", event => {
      event.stopPropagation();

      const isOpen = mainNavigation.classList.toggle("active");

      burgerButton.classList.toggle("active", isOpen);
      burgerButton.setAttribute("aria-expanded", String(isOpen));
      burgerButton.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню"
      );
    });

    mainNavigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", event => {
      if (
        !mainNavigation.contains(event.target) &&
        !burgerButton.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });
  }


  const filterPanel = document.getElementById("filterPanel");
  const filterWrapper = document.querySelector(".filter-wrapper");

  function closeFilterPanel() {
    if (filterPanel) {
      filterPanel.classList.remove("active");
    }
  }

  document.addEventListener("click", event => {
    if (
      filterPanel &&
      filterWrapper &&
      filterPanel.classList.contains("active") &&
      !filterWrapper.contains(event.target)
    ) {
      closeFilterPanel();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeFilterPanel();
    }
  });

});