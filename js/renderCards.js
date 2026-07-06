function renderProducts() {
  const container = document.getElementById("products");

  container.innerHTML = `
    <div class="empty-state" id="emptyState">
      <div class="empty-icon">
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M12 12L16 16M8 8L10 10" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div>
      <h3>Товары не найдены</h3>
      <p>Результаты поиска не найдены. Пожалуйста, проверьте поисковой запрос или фильтры.</p>
    </div>
  `;

  products[currentCategory].forEach(product => {
    const card = document.createElement("div");

    card.className = "card";
    card.dataset.title = product.title;
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    card.dataset.region = product.region;
    card.dataset.drop = product.drop;

    if (product.stats) {
      card.dataset.def = product.stats.def;
      card.dataset.reduction = product.stats.reduction;
      card.dataset.resist = product.stats.resist;
      card.dataset.damage = product.stats.damage;
      card.dataset.accuracy = product.stats.accuracy;
    }

    card.innerHTML = `
      <div class="card-cover">
        <img src="${product.cover}" alt="${product.title}">

        <div class="badges">
          <span
            class="badge region"
            data-tooltip="Страна регистрации аккаунта"
          >
            ${product.region}
          </span>
          <span class="badge type ${product.typeClass}">${product.drop}</span>
        </div>
      </div>

      <div class="card-body">
        <h3>${product.title}</h3>
        <div class="meta">
          ${renderCardStats(product)}
        </div>

        <div class="price">${product.price.toLocaleString("ru-RU")} ₽</div>
      </div>
    `;

    card.onclick = () => openProduct(product);
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
  renderProducts();
}