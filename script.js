const screenPlay = document.getElementById("preview-play");
const controlPlay = document.getElementById("control-play");
const subtitleToggle = document.getElementById("subtitle-toggle");
const timeLabel = document.getElementById("player-time");
const timeline = document.getElementById("timeline-fill");
let playing = true;
let elapsed = 32 * 60 + 10;

document.getElementById("year").textContent = new Date().getFullYear();

function togglePlayback() {
  playing = !playing;
  for (const button of [screenPlay, controlPlay]) {
    button.textContent = playing ? "Ⅱ" : "▶";
    button.setAttribute(
      "aria-label",
      playing ? "Pause preview" : "Play preview",
    );
  }
  document.querySelector(".synced").lastChild.textContent = playing
    ? " In sync"
    : " Paused together";
}
screenPlay.addEventListener("click", togglePlayback);
controlPlay.addEventListener("click", togglePlayback);

subtitleToggle.addEventListener("click", () => {
  const enabled = subtitleToggle.getAttribute("aria-pressed") !== "true";
  subtitleToggle.setAttribute("aria-pressed", String(enabled));
  if (enabled) {
    const subtitle = document.createElement("span");
    subtitle.className = "subtitle-line";
    subtitle.textContent = "Some moments are better together.";
    document.querySelector(".movie-screen").append(subtitle);
  } else {
    document.querySelector(".subtitle-line")?.remove();
  }
});

// Animate only the concept's time display; this is not a video player.
setInterval(() => {
  if (!playing || document.hidden) return;
  elapsed = elapsed >= 102 * 60 ? 0 : elapsed + 1;
  timeLabel.textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
  timeline.style.width = `${(elapsed / (102 * 60)) * 100}%`;
}, 1000);
