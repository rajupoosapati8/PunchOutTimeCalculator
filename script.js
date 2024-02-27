document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("end-time-form");
  const resultContainer = document.getElementById("result");
  const startTimeInput = document.getElementById("start-time");
  const currentHoursInput = document.getElementById("current-hours");
  const endTimeOutput = document.getElementById("end-time");

  function calculateEndTime(start_time, current_hours) {
    const [hours, minutes, seconds] = start_time.split(":");
    const start_time_seconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    const remaining_seconds = (10 - current_hours) * 3600;

    const end_time_seconds = start_time_seconds + remaining_seconds;

    const end_time_hours = Math.floor(end_time_seconds / 3600);
    const end_time_minutes = Math.floor((end_time_seconds % 3600) / 60);
    const end_time_seconds_final = end_time_seconds % 60;

    return `${end_time_hours
      .toString()
      .padStart(
        2,
        "0"
      )}:${end_time_minutes.toString().padStart(2, "0")}:${end_time_seconds_final.toString().padStart(2, "0")}`;
  }

  function formatTime(value) {
    value = value.replace(/\D/g, "");
    const segments = [2, 2, 2];
    const formattedSegments = [];

    let startPos = 0;
    for (let i = 0; i < segments.length; i++) {
      if (value.length <= startPos) {
        break;
      }
      const segment = value.substr(startPos, segments[i]);
      formattedSegments.push(segment);
      startPos += segments[i];
    }

    return formattedSegments.join(":");
  }

  startTimeInput.addEventListener("input", function () {
    const { value, selectionStart, selectionEnd } = this;

    this.value = formatTime(value);

    const diff = this.value.length - value.length;
    const newStartPos = selectionStart + diff;
    const newEndPos = selectionEnd + diff;

    this.setSelectionRange(newStartPos, newEndPos);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const startTime = startTimeInput.value.trim();
    const currentHours = parseFloat(currentHoursInput.value);

    if (startTime === "" || isNaN(currentHours)) {
      return;
    }

    const end_time = calculateEndTime(startTime, currentHours);
    endTimeOutput.textContent = end_time;
    resultContainer.classList.remove("hidden");
  });
});
