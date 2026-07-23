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
  document.body.classList.add("modal-open");

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
          </div>

          <p class="extra-modal-text">
            ${product.description || ""}
          </p>
        </div>
      </div>
    </div>
  `;

  initModalMainImage();
  initAccountThumbCarousel();
  updateActiveModalThumb();
  modal.scrollTop = 0;
}

function openItemModal(product) {
  viewerImages = product.images || [];
  viewerIndex = 0;
  modalImageIndex = 0;

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modal.className = "modal active modal-items";
  document.body.classList.add("modal-open");

  modalContent.innerHTML = `
    <div class="modal-box item-modal-box">
      ${renderCloseButton()}

      <div class="item-modal-details">
        <h2>${product.title}</h2>

        <p class="item-modal-description">
          ${product.description || ""}
        </p>
      </div>

      <div class="item-modal-image-side">
        ${renderModalGallery(product)}
      </div>

      <div class="item-modal-bottom">
        <div class="price">${formatPrice(product.price)}</div>
        <button class="buy-btn">Купить</button>
      </div>
    </div>
  `;

  initModalMainImage();
  modal.scrollTop = 0;
}

function openDiamondModal(product) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  window.currentDiamondProduct = product;

  modal.className = "modal active modal-diamonds";
  document.body.classList.add("modal-open");

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

  modal.scrollTop = 0;
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


  if (window.innerWidth <= 1024) {
    return product.images.map((img, index) => `
      <img
        src="${img}"
        alt="${product.title} ${index + 1}"
        data-original-index="${index}"
        onclick="changeMainImage('${img}', ${index}); updateActiveModalThumb();"
      >
    `).join("");
  }

  const carouselImages = [...product.images, ...product.images];

  return `
    <div class="account-thumbs-carousel" aria-hidden="true">
      <div class="account-thumbs-track">
        ${carouselImages.map((img, index) => `
          <img
            src="${img}"
            alt="${product.title} ${index % product.images.length + 1}"
            draggable="false"
            data-original-index="${index % product.images.length}"
            tabindex="0"
            role="button"
            aria-label="Показать изображение ${index % product.images.length + 1}"
          >
        `).join("")}
      </div>
    </div>
  `;
}

function initAccountThumbCarousel() {
  if (window.innerWidth <= 1024) return;

  const carousel = document.querySelector(
    ".account-modal-box .account-thumbs-carousel"
  );
  const track = carousel?.querySelector(".account-thumbs-track");

  if (!carousel || !track) return;

  /*
   * Если предыдущая карточка была закрыта, останавливаем её animation frame.
   */
  if (typeof window.accountThumbCarouselCleanup === "function") {
    window.accountThumbCarouselCleanup();
  }

  let animationFrameId = null;
  let lastTimestamp = 0;
  let isHovered = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let resumeTimeoutId = null;

  const autoplaySpeed = 18; // px/sec
  const resetPoint = () => track.scrollWidth / 2;

  function normalizeScrollPosition() {
    const point = resetPoint();

    if (!point) return;

    if (carousel.scrollLeft >= point) {
      carousel.scrollLeft -= point;
    } else if (carousel.scrollLeft < 0) {
      carousel.scrollLeft += point;
    }
  }

  function pauseTemporarily(delay = 1200) {
    window.clearTimeout(resumeTimeoutId);

    resumeTimeoutId = window.setTimeout(() => {
      lastTimestamp = 0;
    }, delay);
  }

  function animate(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const deltaSeconds = Math.min(
      .05,
      (timestamp - lastTimestamp) / 1000
    );

    lastTimestamp = timestamp;

    if (!isHovered && !isDragging) {
      carousel.scrollLeft += autoplaySpeed * deltaSeconds;
      normalizeScrollPosition();
    }

    animationFrameId = window.requestAnimationFrame(animate);
  }

  /*
   * Перетаскивание курсором.
   */
  carousel.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();

    isDragging = true;
    dragStartX = event.clientX;
    dragStartScrollLeft = carousel.scrollLeft;

    carousel.classList.add("is-dragging");
    carousel.setPointerCapture(event.pointerId);
  });

  carousel.addEventListener("pointermove", event => {
    if (!isDragging) return;

    event.preventDefault();

    const deltaX = event.clientX - dragStartX;

    carousel.scrollLeft = dragStartScrollLeft - deltaX;
    normalizeScrollPosition();
  });

  function stopDragging(event) {
    if (!isDragging) return;

    isDragging = false;
    carousel.classList.remove("is-dragging");

    if (
      event?.pointerId !== undefined &&
      carousel.hasPointerCapture(event.pointerId)
    ) {
      carousel.releasePointerCapture(event.pointerId);
    }

    pauseTemporarily();
  }

  carousel.addEventListener("pointerup", stopDragging);
  carousel.addEventListener("pointercancel", stopDragging);
  carousel.addEventListener("lostpointercapture", stopDragging);

  /*
   * Колесо мыши прокручивает миниатюры горизонтально.
   */
  carousel.addEventListener(
    "wheel",
    event => {
      event.preventDefault();

      const wheelDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      carousel.scrollLeft += wheelDelta;
      normalizeScrollPosition();
      pauseTemporarily();
    },
    { passive: false }
  );

  carousel.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isHovered = false;
    stopDragging();
    lastTimestamp = 0;
  });

  /*
   * Не допускаем нативное перетаскивание картинок.
   */
  carousel.querySelectorAll("img").forEach(image => {
    image.addEventListener("dragstart", event => {
      event.preventDefault();
    });

    image.addEventListener("click", event => {
      if (carousel.classList.contains("is-dragging")) return;

      event.stopPropagation();

      const imageIndex = Number(image.dataset.originalIndex);

      if (!Number.isInteger(imageIndex)) return;

      changeMainImage(viewerImages[imageIndex], imageIndex);
      updateActiveModalThumb();
    });

    image.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();

      const imageIndex = Number(image.dataset.originalIndex);

      if (!Number.isInteger(imageIndex)) return;

      changeMainImage(viewerImages[imageIndex], imageIndex);
      updateActiveModalThumb();
    });
  });

  animationFrameId = window.requestAnimationFrame(animate);

  window.accountThumbCarouselCleanup = () => {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId);
    }

    window.clearTimeout(resumeTimeoutId);
    window.accountThumbCarouselCleanup = null;
  };
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
    defense: "img/accounts/stats/defense.png",
    dmg_reduction: "img/accounts/stats/dmg_reduction.png",
    resist_abilities: "img/accounts/stats/resist_abilities.png",
    damage: "img/accounts/stats/damage.png",
    accuracy: "img/accounts/stats/accuracy.png"
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
  if (typeof window.accountThumbCarouselCleanup === "function") {
    window.accountThumbCarouselCleanup();
  }

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modal.classList.remove("active", "modal-accounts", "modal-items", "modal-diamonds");
  modalContent.innerHTML = "";
  modal.scrollTop = 0;
  document.body.classList.remove("modal-open");
}

function closeModalOutside(event) {
  if (event.target.id === "modal" || event.target.id === "modalContent") {
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
    modalMainImg.onclick = () => openImageViewer(viewerImages, modalImageIndex);
  }

  updateActiveModalThumb();
}

function updateActiveModalThumb() {
  document.querySelectorAll(".account-modal-box .modal-thumbs img").forEach(image => {
    const imageIndex = Number(image.dataset.originalIndex);
    image.classList.toggle("active", imageIndex === modalImageIndex);
  });
}

function changeMainImage(src, index) {
  modalImageIndex = index;
  updateModalMainImage();
}