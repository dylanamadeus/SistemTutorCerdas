'use client'
import { FilterIcon, SortDescIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const Search = ({
  onSearch,
  data,
}: {
  onSearch: (filteredData: any[]) => void;
  data: any[];
}): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value, filter, sortOrder);
  };

  // Filter the data based on search input and filter
  const filterData = (query: string, filter: string, sort: "asc" | "desc") => {
    let filteredData = data;

    // Filter by search query
    if (query) {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filter (e.g., by role)
    if (filter) {
      filteredData = filteredData.filter((item) => item.role === filter);
    }

    // Apply sorting
    if (sort === "asc") {
      filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filteredData = filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Call the onSearch prop to update the parent component with filtered data
    onSearch(filteredData);
  };

  // Handle filter button click
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setFilter(selectedRole);
    filterData(searchQuery, selectedRole, sortOrder);
  };


  // Handle sort button click
  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    filterData(searchQuery, filter, newSortOrder);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-[2rem]">
      <div className="relative w-full sm:flex-1">
        <Input
          className="w-full h-[50px] sm:h-[70px] bg-white rounded-[20px] border-none pl-4 sm:pl-6 [font-family:'Outfit',Helvetica] font-normal text-[#8e9ca5] text-lg sm:text-xl"
          placeholder="Cari Mahasiswa"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Search;
