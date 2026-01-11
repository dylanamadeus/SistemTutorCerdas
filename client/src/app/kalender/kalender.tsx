"use client";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { CalendarDays } from "lucide-react";

export const KalenderPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetchWithToken("/materials");
        if (res.ok) {
          const data = await res.json();
          // hanya yang punya deadline
          const withDeadline = data.filter((item: any) => item.deadline !== null);
          setMaterials(withDeadline);
        } else {
          console.error("Failed to fetch materials:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // buat dictionary event per tanggal
  const eventsByDate: Record<string, any[]> = {};
  materials.forEach((mat) => {
    const deadline = new Date(mat.deadline);
    const key = deadline.toISOString().split("T")[0]; // YYYY-MM-DD
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(mat);
  });

  // ambil bulan & tahun dari currentDate (bukan today)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // hitung total hari & offset mulai Senin
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = (startDay + 6) % 7; // bikin Senin = 0

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const currentMonthName = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // helper format YYYY-MM-DD
  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const today = new Date();

  return (
    <div className="relative min-h-screen overflow-hidden pb-16">
      {/* Background Gradient */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          background:
            "linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)",
        }}
      />

      <section className="flex flex-col justify-start pt-28 md:mt-12 sm:mt-4 px-4 md:px-[60px] lg:px-[200px] w-full max-w-[1440px] mx-auto mb-[80px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-orange-400" />
            Kalender
          </h1>
        </div>

        {/* Navigasi Bulan - Versi Modern & Bersih */}
        <div className="flex items-center justify-between mb-8">
          
          {/* Judul Bulan & Tahun */}
          <span className="text-xl font-semibold text-[#FAB12F]">
            {currentMonthName} {currentYear}
          </span>

          {/* Grup Tombol Navigasi */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg text-[#DD0303] hover:bg-gray-100 hover:text-[#FAB12F] focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              aria-label="Previous month"
            >
              {/* Heroicon: chevron-left */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg text-[#DD0303] hover:bg-gray-100 hover:text-[#FAB12F] focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              aria-label="Next month"
            >
              {/* Heroicon: chevron-right */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Kalender Grid */}
        <div className="grid grid-cols-7 gap-[1px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="bg-[#FFF9F1] py-3 text-center font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}

          {/* Isi Kalender */}
          {Array.from({ length: offset + totalDays }).map((_, i) => {
            const dayNum = i - offset + 1;
            const dateKey = formatDate(year, month, dayNum);
            const dayEvents =
              dayNum > 0 && eventsByDate[dateKey] ? eventsByDate[dateKey] : [];

            return (
              <div
                key={i}
                className="bg-white min-h-[100px] sm:min-h-[120px] md:min-h-[140px] relative p-2 text-sm text-gray-700 hover:bg-[#FFF3E2] transition-colors duration-200"
              >
                {dayNum > 0 && (
                  <span className="absolute top-2 right-2 text-gray-500 text-xs md:text-sm">
                    {dayNum}
                  </span>
                )}

                {/* Render event */}
                {dayEvents.map((event, idx) => {
                  const isOverdue = new Date(event.deadline) < today;
                  const eventColor = isOverdue
                    ? "bg-red-50 border border-red-200 text-red-600"
                    : "bg-yellow-50 border border-yellow-200 text-yellow-700";

                  const statusText = isOverdue
                    ? `${event.materials_type} is closed`
                    : `${event.materials_type} is due`;

                  // ambil jam langsung dari UTC string (tanpa locale)
                  const date = new Date(event.deadline);
                  const time = `${String(date.getUTCHours()).padStart(2, "0")}:${String(
                    date.getUTCMinutes()
                  ).padStart(2, "0")}`;

                  return (
                    <div
                      key={idx}
                      className={`mt-5 rounded-lg p-2 shadow-sm ${eventColor}`}
                    >
                        <p
                          className="text-[10px] sm:text-xs font-semibold leading-tight 
                                    overflow-x-auto whitespace-nowrap scrollbar-hide sm:overflow-visible sm:whitespace-normal"
                        >
                          {statusText}
                        </p>

                        <p
                          className="text-[10px] sm:text-[11px] text-gray-600 leading-tight 
                                    overflow-x-auto whitespace-nowrap scrollbar-hide sm:overflow-visible sm:whitespace-normal"
                        >
                          {event.course?.title}
                        </p>

                      <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight overflow-x-auto whitespace-nowrap scrollbar-hide sm:overflow-visible sm:whitespace-normal">{time}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default KalenderPage;
