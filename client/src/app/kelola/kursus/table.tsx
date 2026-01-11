'use client'
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../../components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Search, Edit, Trash2 } from "lucide-react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { putWithToken } from "@/lib/putWithToken";
import { deleteWithToken } from "@/lib/deleteWithToken";
import SearchComponent from './search';
import { motion } from "framer-motion";
import { fadeIn } from "../../variant";

export const Tables = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [materials, setMaterials] = useState<any[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<null | any>(null);
  const [editMaterial, setEditMaterial] = useState<null | any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteMaterial, setDeleteMaterial] = useState<null | any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithToken('/materials');
        const data = await response.json();
        const pageSize = 10;
        setMaterials(data);
        setFilteredMaterials(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const updateFilteredData = (filteredData: any[]) => {
    setFilteredMaterials(filteredData);
    setTotalPages(Math.ceil(filteredData.length / 10));
  };

  const paginatedData = filteredMaterials.slice(currentPage * 10, (currentPage + 1) * 10);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white/10 py-12">
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.h1 
          variants={fadeIn('down', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false, amount: 0.7}}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAB12F] font-['Outfit',Helvetica] mb-8 md:mb-12"
        >
          Kelola Kursus
        </motion.h1>

        <SearchComponent data={materials} onSearch={updateFilteredData} />

        <div className="w-full overflow-x-auto rounded-xl shadow-lg">
          <Table className="min-w-full table-auto border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="bg-white border-b border-[#FAB12F30]">
                {["No", "Judul Materi", "Minggu ke-", "Kursus", "Tipe", "Aksi"].map((head, idx) => (
                  <TableHead
                    key={idx}
                    className={`text-left px-4 py-5 text-[#FAB12F] text-base sm:text-lg md:text-xl font-semibold font-outfit ${
                      head === "Aksi" ? "text-center" : ""
                    }`}
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`rounded-lg transition hover:shadow-md ${
                    index % 2 === 0 ? "bg-[#FFF9E5]" : "bg-[#FFE9A070]"
                  }`}
                >
                  <TableCell className="px-4 py-4 text-[#1F1A17] font-medium">
                    {currentPage * 10 + index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-[#1F1A17]">
                    {item.materials_title}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-[#1F1A17]">
                    {item.week}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-[#1F1A17]">
                    {item.course?.title}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-[#1F1A17]">
                    {item.materials_type}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex justify-center items-center space-x-3">
                      <button
                        className="p-2 rounded-full hover:bg-[#FAB12F30] transition"
                        onClick={() => setSelectedMaterial(item)}
                      >
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAB12F]" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-[#FAB12F30] transition"
                        onClick={() => setEditMaterial(item)}
                      >
                        <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAB12F]" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-[#FAB12F30] transition"
                        onClick={() => setDeleteMaterial(item)}
                      >
                        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#ef4444]" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent className="gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <button
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-1 rounded-full ${
                      currentPage === i ? "bg-white/50" : "hover:bg-[#FAB12F20]"
                    }`}
                  >
                    <span className={`text-sm text-[#FAB12F] font-['Outfit',Helvetica] ${currentPage === i ? "font-semibold" : "font-light"}`}>
                      {i + 1}
                    </span>
                  </button>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>

        {/* Modal Detail */}
        {selectedMaterial && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-xl w-[90%] max-w-md p-6 relative">
              <h2 className="text-4xl font-semibold text-[#FAB12F] mb-4">Detail Materi</h2>
              <div className="space-y-2 text-xl text-gray-700">
                <p><span className="font-medium text-[#FAB12F]">Judul:</span> {selectedMaterial.materials_title}</p>
                <p><span className="font-medium text-[#FAB12F]">Minggu ke-:</span> {selectedMaterial.week}</p>
                <p><span className="font-medium text-[#FAB12F]">Kursus:</span> {selectedMaterial.course?.title}</p>
                <p><span className="font-medium text-[#FAB12F]">Tipe:</span> {selectedMaterial.materials_type}</p>
              </div>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedMaterial(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Modal Edit */}
        {editMaterial && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setErrorMsg('');
                try {
                  const response = await putWithToken(`/materials/${editMaterial.material_id}`, {
                    materials_title: editMaterial.materials_title,
                    week: editMaterial.week,
                    materials_type: editMaterial.materials_type,
                  });
                  if (!response.ok) throw new Error('Gagal memperbarui materi.');
                  setEditMaterial(null);
                  window.location.reload();
                } catch (error) {
                  setErrorMsg((error as Error).message);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
            >
              <h2 className="text-lg font-semibold text-[#FAB12F] mb-4">Edit Materi</h2>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Judul Materi
                <input
                  type="text"
                  value={editMaterial.materials_title}
                  onChange={(e) => setEditMaterial({ ...editMaterial, materials_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FAB12F]"
                  required
                />
              </label>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Minggu ke-
                <input
                  type="number"
                  value={editMaterial.week}
                  onChange={(e) => setEditMaterial({ ...editMaterial, week: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FAB12F]"
                  required
                />
              </label>

              <label className="block mb-4 text-sm font-medium text-gray-700">
                Tipe Materi
                <select
                  value={editMaterial.materials_type}
                  onChange={(e) => setEditMaterial({ ...editMaterial, materials_type: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FAB12F]"
                  required
                >
                  <option value="Video">Video</option>
                  <option value="Tugas">Tugas</option>
                  <option value="Bacaan">Bacaan</option>
                </select>
              </label>

              {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditMaterial(null)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAB12F] text-white rounded-md hover:bg-[#eaa010] disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Hapus */}
        {deleteMaterial && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
              <h2 className="text-lg font-semibold text-[#dc2626] mb-4">Hapus Materi</h2>
              <p className="mb-6 text-gray-700">
                Apakah Anda yakin ingin menghapus <span className="font-semibold">{deleteMaterial.materials_title}</span>?
              </p>

              {deleteError && <p className="text-red-600 mb-3">{deleteError}</p>}

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  onClick={() => setDeleteMaterial(null)}
                  disabled={isDeleting}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-[#dc2626] text-white hover:bg-[#b91c1c]"
                  onClick={async () => {
                    setIsDeleting(true);
                    try {
                      const response = await deleteWithToken(`/materials/${deleteMaterial.material_id}`, null);
                      if (!response.ok) throw new Error('Gagal menghapus materi.');
                      setDeleteMaterial(null);
                      window.location.reload();
                    } catch (error) {
                      setDeleteError((error as Error).message);
                    } finally {
                      setIsDeleting(false);
                    }
                  }}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Tables;
