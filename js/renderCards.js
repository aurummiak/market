function renderAccountCard(product) {
  return `
    <div class="card-cover">
      <img src="${product.cover}" alt="${product.title}">

      <div class="badges">
        <span class="badge region" data-tooltip="Страна регистрации аккаунта">
          ${product.region}
        </span>

        <span class="badge type ${product.typeClass}">
          ${product.drop}
        </span>
      </div>
    </div>

    <div class="card-body">
      <h3>${product.title}</h3>

      <div class="meta">
        ${renderCardStats(product)}
      </div>

      <div class="price">${formatPrice(product.price)}</div>
    </div>
  `;
}

function renderItemCard(product) {
  return `
    <div class="card-cover item-card-cover">
      <img src="${product.cover}" alt="${product.title}">

      <div class="badges">
        <span class="badge type ${product.typeClass}">
          ${product.drop}
        </span>
      </div>
    </div>

    <div class="card-body item-card-body">
      <h3>${product.title}</h3>

      <p class="item-card-text">
        ${product.description || ""}
      </p>

      <div class="price">${formatPrice(product.price)}</div>
    </div>
  `;
}

function renderDiamondCard(product) {
  return `
    <div class="card-cover diamond-card-cover">
      <img src="${product.cover}" alt="${product.title}">
    </div>

    <div class="card-body diamond-card-body">
      <h3>${product.title}</h3>

      <p class="item-card-text">
        ${product.description || ""}
      </p>

      <div class="price">от ${formatPrice(product.price)}</div>
    </div>
  `;
}

function renderCardContent(product) {
  if (currentCategory === "items") {
    return renderItemCard(product);
  }

  if (currentCategory === "diamonds") {
    return renderDiamondCard(product);
  }

  return renderAccountCard(product);
}

function renderProducts() {
  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = `
    <div class="empty-state" id="emptyState">
      <div class="empty-icon">
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none">
          <path d="M16 8L8 16M12 12L16 16M8 8L10 10" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>

      <h3>Товары не найдены</h3>
      <p>Результаты поиска не найдены. Пожалуйста, проверьте поисковой запрос или фильтры.</p>
    </div>
  `;

  const currentProducts = products[currentCategory] || [];

  currentProducts.forEach(product => {
    const card = document.createElement("div");

    card.className = `card card-${currentCategory}`;

    card.dataset.title = product.title || "";
    card.dataset.category = product.category || "";
    card.dataset.price = product.price || 0;
    card.dataset.region = product.region || "";
    card.dataset.drop = product.drop || "";

    if (product.stats) {
      card.dataset.def = product.stats.def || 0;
      card.dataset.reduction = product.stats.reduction || 0;
      card.dataset.resist = product.stats.resist || 0;
      card.dataset.damage = product.stats.damage || 0;
      card.dataset.accuracy = product.stats.accuracy || 0;
    }

    card.innerHTML = renderCardContent(product);
    card.addEventListener("click", () => openProduct(product));

    container.appendChild(card);
  });

  filterProducts();
}

function switchCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll(".hero-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  clearFilters();
  renderProducts();
}