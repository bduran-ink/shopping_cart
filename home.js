document.addEventListener("DOMContentLoaded", function() {
  const banner = document.createElement("div");
  banner.textContent = "Welcome to the Whatever Store!";
  banner.className = "welcome-banner";
  document.body.prepend(banner);
  });