function openImageViewer(images, index = 0) {
  viewerImages = Array.isArray(images) ? images : [images];
  viewerIndex = index;

  const viewer = document.getElementById("imageViewer");
  const img = document.getElementById("imageViewerImg");

  img.src = viewerImages[viewerIndex];
  viewer.classList.add("active");
}

function updateViewerImage() {
  const img = document.getElementById("imageViewerImg");
  img.src = viewerImages[viewerIndex];
}

function showPrevImage(event) {
  event.stopPropagation();

  if (!viewerImages.length) return;

  viewerIndex =
    viewerIndex === 0
      ? viewerImages.length - 1
      : viewerIndex - 1;

  updateViewerImage();
}

function showNextImage(event) {
  event.stopPropagation();

  if (!viewerImages.length) return;

  viewerIndex =
    viewerIndex === viewerImages.length - 1
      ? 0
      : viewerIndex + 1;

  updateViewerImage();
}

function closeImageViewer(event) {
  if (
    event.target.id === "imageViewer" ||
    event.target.classList.contains("image-viewer-close")
  ) {
    document.getElementById("imageViewer").classList.remove("active");
    document.getElementById("imageViewerImg").src = "";
  }
}