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
    input.addEventListener("input", updateRangeLabels);
  });

  updateRangeLabels();
  renderProducts();
});