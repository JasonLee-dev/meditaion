// https://jasonlee-dev.github.io/meditaion/
const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  const defaultTime = 600;
  // sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  // Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // Get the length of the outLine
  const outlineLength = outline.getTotalLength();

  // Duration
  let fakeDuration = defaultTime;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  // play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // Select time
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");

      let seconds = Math.floor(fakeDuration % 60);
      let minutes = Math.floor(fakeDuration / 60);

      outline.style.strokeDashoffset = outlineLength;
      song.currentTime = 0;

      if (seconds == 0) {
        seconds = seconds + "0";
      }
      timeDisplay.textContent = `${minutes}:${seconds}`;
    });
  });
  // Create a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    // console.log("progress : ", progress);
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    } else {
      if (seconds == 0) {
        seconds = seconds + "0";
      }
      // Animate the text
      timeDisplay.textContent = `${minutes}:${seconds}`;
    }
  };
};

app();
