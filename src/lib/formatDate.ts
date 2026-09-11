export function formatLastUpdated(dateString?: string | null): string {
  if (!dateString) return "—";

  const date = new Date(dateString);

  const hari = date.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");

  // Sederhana: 12+ = siang, bisa kamu sesuaikan (sore/malam)
  if (hour >= 15) {
    // optional
  }

  const hour12 = hour % 12 || 12;

  return `${hari}, ${tanggal} jam ${hour12}.${minute} ${hour >= 12 ? (hour >= 18 ? "malam" : hour >= 15 ? "sore" : "siang") : "pagi"}`;
}