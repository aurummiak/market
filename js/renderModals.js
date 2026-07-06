function openProduct(product) {
  const modal = document.getElementById("modal");

  modal.classList.remove("modal-accounts", "modal-items", "modal-diamonds");
  modal.classList.add(`modal-${currentCategory}`);

  if (currentCategory === "items") {
    openItemProduct(product);
    return;
  }

  if (currentCategory === "diamonds") {
    openDiamondProduct(product);
    return;
  }

  openAccountProduct(product);
}

function openAccountProduct(product) {
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalText").textContent = product.description;
  document.getElementById("modalPrice").textContent =
    product.price.toLocaleString("ru-RU") + " ₽";

  viewerImages = product.images || [];
  viewerIndex = 0;
  modalImageIndex = 0;

  const modalMainImg = document.getElementById("modalMainImg");

  if (viewerImages.length > 0) {
    modalMainImg.src = viewerImages[0];
    modalMainImg.onclick = () => openImageViewer(viewerImages, 0);
  } else {
    modalMainImg.src = "";
    modalMainImg.onclick = null;
  }

  document.getElementById("modalTags").innerHTML = `
    <span class="badge region" data-tooltip="Страна регистрации аккаунта">
      ${product.region}
    </span>
    <span class="badge type ${product.typeClass}">${product.drop}</span>
  `;

  document.getElementById("modalDetails").innerHTML =
    renderStats(product) + renderSkills(product);

  document.getElementById("modalThumbs").innerHTML =
    viewerImages.map((img, index) => `
      <img src="${img}" onclick="changeMainImage('${img}', ${index})">
    `).join("");

  document.getElementById("modal").classList.add("active");
}

function openItemProduct(product) {
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalText").textContent = product.description;
  document.getElementById("modalPrice").textContent =
    product.price.toLocaleString("ru-RU") + " ₽";

  viewerImages = product.images || [];
  viewerIndex = 0;
  modalImageIndex = 0;

  const modalMainImg = document.getElementById("modalMainImg");

  if (viewerImages.length > 0) {
    modalMainImg.src = viewerImages[0];
    modalMainImg.onclick = () => openImageViewer(viewerImages, 0);
  } else {
    modalMainImg.src = "";
    modalMainImg.onclick = null;
  }

  document.getElementById("modalTags").innerHTML = "";
  document.getElementById("modalDetails").innerHTML = "";
  document.getElementById("modalThumbs").innerHTML = "";

  document.getElementById("modal").classList.add("active");
}

function openDiamondProduct(product) {
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalText").textContent = product.description;
  document.getElementById("modalPrice").textContent = "";

  document.getElementById("modalTags").innerHTML = "";
  document.getElementById("modalThumbs").innerHTML = "";

  const serverButtons = product.servers.map((server, index) => `
    <button
      class="diamond-option ${index === 0 ? "active" : ""}"
      onclick="selectDiamondOption(this)"
    >
      ${server}
    </button>
  `).join("");

  const clusterButtons = product.clusters.map((cluster, index) => `
    <button
      class="diamond-option ${index === 0 ? "active" : ""}"
      onclick="selectDiamondOption(this)"
    >
      ${cluster}
    </button>
  `).join("");

  document.getElementById("modalDetails").innerHTML = `
    <div class="diamond-panel">
      <div class="diamond-section">
        <h3>Сервер</h3>
        <div class="diamond-options">
          ${serverButtons}
        </div>
      </div>

      <div class="diamond-section">
        <h3>Кластер</h3>
        <div class="diamond-options">
          ${clusterButtons}
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
            type="number"
            id="diamondInput"
            min="${product.minAmount}"
            max="${product.maxAmount}"
            step="${product.amountStep}"
            value="${product.defaultAmount}"
            oninput="syncDiamondAmount(this.value)"
          >
        </div>
      </div>
    </div>
  `;

  document.getElementById("modal").classList.add("active");
}

function selectDiamondOption(button) {
  const group = button.closest(".diamond-options");

  group.querySelectorAll(".diamond-option").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
}

function syncDiamondAmount(value) {
  const range = document.getElementById("diamondRange");
  const input = document.getElementById("diamondInput");

  if (!range || !input) return;

  let amount = Number(value);

  const min = Number(range.min);
  const max = Number(range.max);

  if (amount < min) amount = min;
  if (amount > max) amount = max;

  range.value = amount;
  input.value = amount;
}

function changeMainImage(src, index = 0) {
  const modalMainImg = document.getElementById("modalMainImg");

  modalImageIndex = index;
  viewerIndex = index;

  modalMainImg.src = src;
  modalMainImg.onclick = () => openImageViewer(viewerImages, index);
}

function updateModalImage() {
  const modalMainImg = document.getElementById("modalMainImg");

  if (!viewerImages.length) return;

  modalMainImg.src = viewerImages[modalImageIndex];
  modalMainImg.onclick = () => openImageViewer(viewerImages, modalImageIndex);
}

function showPrevModalImage(event) {
  event.stopPropagation();

  if (!viewerImages.length) return;

  modalImageIndex =
    modalImageIndex === 0
      ? viewerImages.length - 1
      : modalImageIndex - 1;

  viewerIndex = modalImageIndex;
  updateModalImage();
}

function showNextModalImage(event) {
  event.stopPropagation();

  if (!viewerImages.length) return;

  modalImageIndex =
    modalImageIndex === viewerImages.length - 1
      ? 0
      : modalImageIndex + 1;

  viewerIndex = modalImageIndex;
  updateModalImage();
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function closeModalOutside(event) {
  if (event.target.id === "modal") {
    closeModal();
  }
}