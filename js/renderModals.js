function openProduct(product) {
  if (currentCategory === "items") {
    openItemModal(product);
    return;
  }

  if (currentCategory === "diamonds") {
    openDiamondModal(product);
    return;
  }

  openAccountModal(product);
}

function openAccountModal(product) {
  viewerImages = product.images || [];
  viewerIndex = 0;
  modalImageIndex = 0;

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modal.className = "modal active modal-accounts";

  modalContent.innerHTML = `
    <div class="modal-box account-modal-box">
      <div class="modal-gallery">
        <div class="modal-fixed-top">
          <h2>${product.title}</h2>

          <div class="modal-tags">
            <span class="badge region" data-tooltip="Страна регистрации аккаунта">
              ${product.region}
            </span>

            <span class="badge type ${product.typeClass}">
              ${product.drop}
            </span>
          </div>
        </div>

        ${renderModalGallery(product)}

        <div class="modal-thumbs">
          ${renderModalThumbs(product)}
        </div>

        <div class="modal-fixed-bottom">
          <div class="price">${formatPrice(product.price)}</div>
          <button class="buy-btn">Купить</button>
        </div>
      </div>

      <div class="modal-info">
        ${renderCloseButton()}

        <div class="modal-scroll">
          <div class="details-list">
            ${renderStats(product)}
            ${renderSkills(product)}
          </div>

          <p class="extra-modal-text">
            ${product.description || ""}
          </p>
        </div>
      </div>
    </div>
  `;

  initModalMainImage();
}

function openItemModal(product) {
  viewerImages = product.images || [];
  viewerIndex = 0;
  modalImageIndex = 0;

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modal.className = "modal active modal-items";

  modalContent.innerHTML = `
    <div class="modal-box item-modal-box">
      <div class="item-modal-image-side">
        ${renderModalGallery(product)}
      </div>

      <div class="item-modal-info">
        ${renderCloseButton()}

        <h2>${product.title}</h2>

        <p class="item-modal-description">
          ${product.description || ""}
        </p>

        <div class="item-modal-bottom">
          <div class="price">${formatPrice(product.price)}</div>
          <button class="buy-btn">Купить</button>
        </div>
      </div>
    </div>
  `;

  initModalMainImage();
}

function openDiamondModal(product) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  window.currentDiamondProduct = product;

  modal.className = "modal active modal-diamonds";

  const initialCluster = product.clusters?.[0] || "";
  const initialServers = product.clusterServers?.[initialCluster] || [];

  modalContent.innerHTML = `
    <div class="modal-box diamond-modal-box">
      ${renderCloseButton()}

      <div class="diamond-modal-content">
        <h2>${product.title}</h2>

        <p class="diamond-modal-description">
          ${product.description || ""}
        </p>

        <div class="diamond-section">
          <h3>Кластер</h3>

          <div class="diamond-options" id="clusterOptions">
            ${product.clusters.map((cluster, index) => `
              <button
                class="diamond-option ${index === 0 ? "active" : ""}"
                onclick="selectDiamondOption(this)"
              >
                ${cluster}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="diamond-section">
          <h3>Сервер</h3>

          <div class="diamond-options" id="serverOptions">
            ${initialServers.map((server, index) => `
              <button
                class="diamond-option ${index === 0 ? "active" : ""}"
                onclick="selectDiamondOption(this)"
              >
                ${server}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="diamond-section">
          <h3>Количество алмазов</h3>

          <div class="diamond-amount">
            <input
              type="range"
              id="diamondRange"
              min="${product.minAmount}"
              max="${product.maxAmount}"
              step="${product.amountStep}"
              value="${product.defaultAmount}"
              oninput="syncDiamondAmount(this.value)"
            >

            <input
              type="text"
              id="diamondInput"
              min="${product.minAmount}"
              max="${product.maxAmount}"
              step="${product.amountStep}"
              value="${product.defaultAmount}"
              inputmode="numeric"
              pattern="[0-9]*"
              autocomplete="off"
              oninput="syncDiamondAmount(this.value)"
            >
          </div>
        </div>

        <div class="diamond-modal-bottom">
          <div class="price">
            ${formatPrice(product.defaultAmount * product.price)}
          </div>

          <button class="buy-btn">Купить</button>
        </div>
      </div>
    </div>
  `;
}

function renderCloseButton() {
  return `
    <span class="close" onclick="closeModal()">
      <img src="img/main/cross-small-svgrepo-com.svg" alt="Закрыть" class="exit-cross">
    </span>
  `;
}

function renderModalGallery(product) {
  const firstImage = product.images && product.images.length > 0
    ? product.images[0]
    : "";

  return `
    <div class="modal-main-img">
      <button class="modal-gallery-arrow modal-gallery-prev" onclick="showPrevModalImage(event)">
        <img src="img/main/cross-to-side-white.svg" alt="" style="transform: rotate(180deg);">
      </button>

      <div class="show-another-left" onclick="showPrevModalImage(event)"></div>

      <img id="modalMainImg" src="${firstImage}" alt="${product.title}">

      <button class="modal-gallery-arrow modal-gallery-next" onclick="showNextModalImage(event)">
        <img src="img/main/cross-to-side-white.svg" alt="">
      </button>

      <div class="show-another-right" onclick="showNextModalImage(event)"></div>
    </div>
  `;
}

function renderModalThumbs(product) {
  if (!product.images || !product.images.length) {
    return "";
  }

  return product.images.map((img, index) => `
    <img src="${img}" onclick="changeMainImage('${img}', ${index})">
  `).join("");
}

function initModalMainImage() {
  const modalMainImg = document.getElementById("modalMainImg");

  if (!modalMainImg || !viewerImages.length) return;

  modalMainImg.src = viewerImages[0];
  modalMainImg.onclick = () => openImageViewer(viewerImages, 0);
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

function selectDiamondOption(button) {
  const group = button.closest(".diamond-options");

  if (!group) return;

  group.querySelectorAll(".diamond-option").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  if (group.id === "clusterOptions" && window.currentDiamondProduct?.clusterServers) {
    const selectedCluster = button.textContent.trim();
    const serverOptions = document.getElementById("serverOptions");

    if (!serverOptions) return;

    const servers = window.currentDiamondProduct.clusterServers[selectedCluster] || [];

    serverOptions.innerHTML = servers.map((server, index) => `
      <button
        class="diamond-option ${index === 0 ? "active" : ""}"
        onclick="selectDiamondOption(this)"
      >
        ${server}
      </button>
    `).join("");
  }
}

function syncDiamondAmount(value) {
  const range = document.getElementById("diamondRange");
  const input = document.getElementById("diamondInput");
  const price = document.querySelector(".diamond-modal-bottom .price");

  if (!range || !input) return;

  const digitsOnly = String(value ?? "").replace(/\D/g, "");
  const min = Number(range.min);
  const max = Number(range.max);

  let amount = digitsOnly ? Number(digitsOnly) : 0;

  if (!Number.isFinite(amount)) {
    amount = min;
  }

  if (amount < min) amount = min;
  if (amount > max) amount = max;

  range.value = amount;
  input.value = String(amount);

  if (price) {
    price.textContent = formatPrice(amount);
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modal.classList.remove("active", "modal-accounts", "modal-items", "modal-diamonds");
  modalContent.innerHTML = "";
}

function closeModalOutside(event) {
  if (event.target.id === "modalContent") {
    closeModal();
  }
}

function showPrevModalImage(event) {
  event.stopPropagation();

  if (!viewerImages || !viewerImages.length) return;

  modalImageIndex =
    modalImageIndex === 0
      ? viewerImages.length - 1
      : modalImageIndex - 1;

  updateModalMainImage();
}

function showNextModalImage(event) {
  event.stopPropagation();

  if (!viewerImages || !viewerImages.length) return;

  modalImageIndex =
    modalImageIndex === viewerImages.length - 1
      ? 0
      : modalImageIndex + 1;

  updateModalMainImage();
}

function updateModalMainImage() {
  const modalMainImg = document.getElementById("modalMainImg");
  if (modalMainImg && viewerImages && viewerImages.length > 0) {
    modalMainImg.src = viewerImages[modalImageIndex];
  }
}

function changeMainImage(src, index) {
  modalImageIndex = index;
  updateModalMainImage();
}