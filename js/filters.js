function toggleFilterPanel() {
  document.getElementById("filterPanel").classList.toggle("active");
}

function applyFilters() {
  activeFilters.region = getCheckedValues("region");
  // activeFilters.drop = getCheckedValues("drop");

  activeFilters.stats = {
    def: getStatValue("def"),
    reduction: getStatValue("reduction"),
    resist: getStatValue("resist"),
    damage: getStatValue("damage"),
    accuracy: getStatValue("accuracy")
  };

  filterProducts();
  document.getElementById("filterPanel").classList.remove("active");
}

function clearFilters() {
  document.querySelectorAll('#filterPanel input[type="checkbox"]').forEach(input => {
    input.checked = false;
  });

  document.querySelectorAll('#filterPanel input[type="range"]').forEach(input => {
    // set min-bound to its min and max-bound to its max
    if (input.dataset.bound === "min") {
      input.value = input.min || 0;
    } else if (input.dataset.bound === "max") {
      input.value = input.max || 0;
    } else {
      input.value = 0;
    }
  });

  document.querySelectorAll('#filterPanel input[type="text"].range-value-input[data-stat]').forEach(input => {
    if (input.dataset.bound === "min") input.value = input.min || 0;
    else if (input.dataset.bound === "max") input.value = input.max || 0;
  });

  activeFilters.region = [];
  activeFilters.drop = [];

  activeFilters.stats = {
    def: { min: 0, max: 2000 },
    reduction: { min: 0, max: 2000 },
    resist: { min: 0, max: 2000 },
    damage: { min: 0, max: 2000 },
    accuracy: { min: 0, max: 2000 }
  };

  updateRangeLabels();
  // update visual tracks for all stats
  ["def","reduction","resist","damage","accuracy"].forEach(stat => {
    if (typeof updateRangeTrack === "function") {
      updateRangeTrack(stat);
    }

    if (typeof refreshCustomRangeSlider === "function") {
      refreshCustomRangeSlider(stat);
    }
  });

  filterProducts();
}

function matchesStats(card) {
  if (currentCategory !== "accounts") return true;
  const checkBetween = (value, range) => {
    if (!range) return true;

    const numericValue = Number(value);
    const minimum = Number(range.min);
    const maximum = Number(range.max);

    if (!Number.isFinite(numericValue)) return false;
    if (Number.isFinite(minimum) && numericValue < minimum) return false;
    if (Number.isFinite(maximum) && numericValue > maximum) return false;

    return true;
  };

  return (
    checkBetween(card.dataset.def, activeFilters.stats.def) &&
    checkBetween(card.dataset.reduction, activeFilters.stats.reduction) &&
    checkBetween(card.dataset.resist, activeFilters.stats.resist) &&
    checkBetween(card.dataset.damage, activeFilters.stats.damage) &&
    checkBetween(card.dataset.accuracy, activeFilters.stats.accuracy)
  );
}

function filterProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  const emptyState = document.getElementById("emptyState");

  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const region = card.dataset.region;
    const drop = card.dataset.drop;

    const matchesSearch = title.includes(search);

    const matchesRegion =
      activeFilters.region.length === 0 ||
      activeFilters.region.includes(region);

    const matchesDrop =
      activeFilters.drop.length === 0 ||
      activeFilters.drop.includes(drop);

    const isVisible =
      matchesSearch &&
      matchesRegion &&
      matchesDrop &&
      matchesStats(card);

    card.style.display = isVisible ? "block" : "none";

    if (isVisible) visibleCount++;
  });

  if (emptyState) {
    emptyState.classList.toggle("active", visibleCount === 0);
  }
}