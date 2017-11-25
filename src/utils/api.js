export const baseUrl = `http://localhost:3000/api`;

export function formatTime(seconds) {
  if (isNaN(seconds)) {
    return `00:00`;
  } else {
    return [parseInt((seconds / 60) % 60), parseInt(seconds % 60)].join(':').replace(/\b(\d)\b/g, '0$1');
  }
}
