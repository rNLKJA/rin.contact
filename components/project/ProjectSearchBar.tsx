"use client";
import React from "react";
import { ClearButton } from "@/components/ui/ClearButton";
import { SearchInput } from "@/components/ui/SearchInput";

export function ProjectSearchBar(
  searchQuery: string,
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  clearSearch: () => void,
) {
  return (
    <div className="flex flex-col justify-center md:flex-row  md:justify-between items-center gap-2">
      <SearchInput
        className="flex "
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ClearButton className="flex " onClick={clearSearch}>
        Clear
      </ClearButton>
    </div>
  );
}
