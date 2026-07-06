function toggleFilterPanel() {
  document.getElementById("filterPanel").classList.toggle("active");
}

function applyFilters() {
  activeFilters.region = getCheckedValues("region");
  activeFilters.drop = getCheckedValues("drop");

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
    input.value = 0;
  });

  activeFilters.region = [];
  activeFilters.drop = [];

  activeFilters.stats = {
    def: 0,
    reduction: 0,
    resist: 0,
    damage: 0,
    accuracy: 0
  };

  updateRangeLabels();
  filterProducts();
}

function matchesStats(card) {
  if (currentCategory !== "accounts") return true;

  return (
    Number(card.dataset.def) >= activeFilters.stats.def &&
    Number(card.dataset.reduction) >= activeFilters.stats.reduction &&
    Number(card.dataset.resist) >= activeFilters.stats.resist &&
    Number(card.dataset.damage) >= activeFilters.stats.damage &&
    Number(card.dataset.accuracy) >= activeFilters.stats.accuracy
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