'use client'
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
  const [users, setUsers] = useState<any[]>([]); // Users data from the API
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // Filtered users after search, filter, and sort
  const [totalPages, setTotalPages] = useState(0); // Total pages from API
  const [selectedAccount, setSelectedAccount] = useState<null | {
    id: number;
    name: string;
    role: string;
    email: string;
  }>(null);
  const [editAccount, setEditAccount] = useState<null | {
    id: number;
    name: string;
    email: string;
    role: string;
  }>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [deleteAccount, setDeleteAccount] = useState<null | { id: number; name: string }>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const [role, setRole] = useState('');

  useEffect(() => {
    async function fetchRole() {
      try {
        const roleRes = await fetchWithToken('/users/me');
        const roleData = await roleRes.json();
        setRole(roleData.role);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    }
    fetchRole();
  }, []);


  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithToken('/users'); // API call to fetch user data
        const data = await response.json(); // Assuming the response is a JSON object
        const pageSize = 10; // Adjust according to your pagination needs

        setUsers(data); // Set the users data
        setFilteredUsers(data); // Set filtered data to the initial data
        setTotalPages(Math.ceil(data.length / pageSize)); // Calculate total pages
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Update filtered data whenever search, filter, or sort changes
  const updateFilteredData = (filteredData: any[]) => {
    setFilteredUsers(filteredData);
    setTotalPages(Math.ceil(filteredData.length / 10)); // Recalculate total pages after filtering
  };

  // Paginate the data
  const paginatedData = filteredUsers.slice(currentPage * 10, (currentPage + 1) * 10);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white/10 py-12">
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.h1 
        variants={fadeIn('down', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once: false, amount: 0.7}}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAB12F] font-['Outfit',Helvetica] mb-8 md:mb-12">
          Kelola Mahasiswa
        </motion.h1>

        {/* Search, filter, and sort component */}
        <SearchComponent data={users} onSearch={updateFilteredData} />

        <div className="w-full overflow-x-auto rounded-xl shadow-lg">
          <Table className="min-w-full table-auto border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="bg-white border-b border-[#FAB12F30]">
                {["No", "Id", "Name", "Role", "Email", "Action"].map((head, idx) => (
                  <TableHead
                    key={idx}
                    className={`text-left px-4 py-5 text-[#FAB12F] text-base sm:text-lg md:text-xl font-semibold font-outfit ${
                      head === "Action" ? "text-center" : ""
                    }`}
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((account, index) => (
                <TableRow
                  key={index}
                  className={`rounded-lg transition hover:shadow-md ${
                    index % 2 === 0 ? "bg-[#FFF9E5]" : "bg-[#FFE9A070]"
                  }`}
                >
                  <TableCell className="px-4 py-4 text-sm sm:text-base text-[#1F1A17] font-medium font-outfit">
                    {currentPage * 10 + index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm sm:text-base text-[#1F1A17] font-outfit">
                    {account.id}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm sm:text-base text-[#1F1A17] font-outfit">
                    {account.name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm sm:text-base text-[#1F1A17] font-outfit">
                    {account.role}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm sm:text-base text-[#1F1A17] font-outfit truncate max-w-[300px]">
                    {account.email}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex justify-center items-center space-x-2 sm:space-x-3">
                      <button
                        className="p-2 rounded-full hover:bg-[#FAB12F30] transition"
                        onClick={() =>
                          setSelectedAccount({
                            id: account.id,
                            name: account.name,
                            role: account.role,
                            email: account.email,
                          })
                        }
                      >
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAB12F]" />
                      </button>
                      {(role === "teacher" || role === 'admin') && (
                        <>
                          <button
                            className="p-2 rounded-full hover:bg-[#FAB12F30] transition"
                            onClick={() =>
                              setEditAccount({
                                id: account.id,
                                name: account.name,
                                email: account.email,
                                role: account.role,
                              })
                            }
                          >
                            <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAB12F]" />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-[#FAB12F30] transition"
                            onClick={() =>
                              setDeleteAccount({ id: account.id, name: account.name })
                            }
                          >
                            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#ef4444]" />
                          </button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent className="gap-1 sm:gap-2">
              <PaginationItem>
                <button 
                  className="p-2 hover:bg-[#FAB12F20] rounded-full transition-colors"
                  onClick={() => handlePageChange(0)}
                  disabled={currentPage === 0}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2L5 6L9 10" stroke="#FAB12F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 2L1 6L5 10" stroke="#FAB12F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </PaginationItem>
              <PaginationItem>
                <button 
                  className="p-2 hover:bg-[#FAB12F20] rounded-full transition-colors"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2L3 6L7 10" stroke="#FAB12F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <button
                    onClick={() => handlePageChange(index)}
                    className={`px-4 py-1 rounded-full ${currentPage === index ? "bg-white/50 font-medium" : "hover:bg-[#FAB12F20]"}`}
                  >
                    <span className={`text-xs sm:text-sm text-[#FAB12F] font-['Outfit',Helvetica] ${currentPage === index ? "font-medium" : "font-light"}`}>
                      {index + 1}
                    </span>
                  </button>
                </PaginationItem>
              ))}
              <PaginationItem>
                <button 
                  className="p-2 hover:bg-[#FAB12F20] rounded-full transition-colors"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10L5 6L1 2" stroke="#FAB12F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </PaginationItem>
              <PaginationItem>
                <button 
                  className="p-2 hover:bg-[#FAB12F20] rounded-full transition-colors"
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10L7 6L3 2" stroke="#FAB12F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L11 6L7 2" stroke="#FAB12F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {selectedAccount && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-xl w-[90%] max-w-md p-6 relative">
              <h2 className="text-4xl font-semibold text-[#FAB12F] mb-4">Account Info</h2>
              <div className="space-y-2 text-xl text-gray-700">
                <p><span className="font-medium text-[#FAB12F]">ID:</span> {selectedAccount.id}</p>
                <p><span className="font-medium text-[#FAB12F]">Nama:</span> {selectedAccount.name}</p>
                <p><span className="font-medium text-[#FAB12F]">Role:</span> {selectedAccount.role}</p>
                <p><span className="font-medium text-[#FAB12F]">Email:</span> {selectedAccount.email}</p>
              </div>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                onClick={() => setSelectedAccount(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {editAccount && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setErrorMsg('');

                try {
                  const response = await putWithToken(`/users/${editAccount.id}`, {
                    name: editAccount.name,
                    email: editAccount.email,
                    role: editAccount.role,
                  });

                  if (!response.ok) throw new Error('Failed to update user.');

                  const data = await response.json();
                  console.log(data.message);
                  // Optionally refresh user data here
                  setEditAccount(null);
                  window.location.reload();
                } catch (error) {
                  setErrorMsg((error as Error).message);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
            >
              <h2 className="text-lg font-semibold text-[#FAB12F] mb-4">Edit Account</h2>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nama
                <input
                  type="text"
                  value={editAccount.name}
                  onChange={(e) => setEditAccount({ ...editAccount, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                  required
                />
              </label>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  value={editAccount.email}
                  onChange={(e) => setEditAccount({ ...editAccount, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                  required
                />
              </label>

              <label className="block mb-4 text-sm font-medium text-gray-700">
                Role
                <select
                  value={editAccount.role}
                  onChange={(e) => setEditAccount({ ...editAccount, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  {/* Add other roles if needed */}
                </select>
              </label>

              {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditAccount(null)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#FAB12F] text-white hover:bg-[#2867a0] transition disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        )}
        {deleteAccount && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
              <h2 className="text-lg font-semibold text-[#dc2626] mb-4">Confirm Delete</h2>
              <p className="mb-6 text-gray-700">
                Apakah Anda yakin ingin menghapus pengguna <span className="font-semibold">{deleteAccount.name}</span>?
                Tindakan ini tidak dapat dibatalkan.
              </p>

              {deleteError && <p className="text-red-600 mb-3">{deleteError}</p>}

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => setDeleteAccount(null)}
                  disabled={isDeleting}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-[#dc2626] text-white hover:bg-[#b91c1c] transition disabled:opacity-50"
                  onClick={async () => {
                    setIsDeleting(true);
                    setDeleteError('');
                    try {
                      const response = await deleteWithToken(`/users/${deleteAccount.id}`, null);

                      if (!response.ok) throw new Error('Failed to delete user.');

                      // Optionally refresh your user list here, e.g., call a fetch function or update state

                      setDeleteAccount(null);
                      window.location.reload();
                    } catch (error) {
                      setDeleteError((error as Error).message);
                    } finally {
                      setIsDeleting(false);
                    }
                  }}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
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
