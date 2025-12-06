"use client";

import { Search, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

interface SearchResult {
  _id: string;
  name: string;
  slug: string;
  type: "product" | "category";
  category?: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions based on search term
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // Search for both products and categories
        const query = `{
          "products": *[_type == "product" && name match $searchTerm + "*"] | order(name asc) [0...5] {
            _id,
            name,
            "slug": slug.current,
            "category": categories[0]->title
          },
          "categories": *[_type == "category" && title match $searchTerm + "*" && slug.current != "mobiles"] | order(title asc) [0...3] {
            _id,
            "name": title,
            "slug": slug.current
          }
        }`;

        const results = await client.fetch(query, { 
          searchTerm: searchTerm 
        });

        const productResults: SearchResult[] = results.products.map((p: { _id: string; name: string; slug: string; category?: string }) => ({
          _id: p._id,
          name: p.name,
          slug: p.slug,
          type: "product" as const,
          category: p.category,
        }));

        const categoryResults: SearchResult[] = results.categories.map((c: { _id: string; name: string; slug: string }) => ({
          _id: c._id,
          name: c.name,
          slug: c.slug,
          type: "category" as const,
        }));

        setSuggestions([...categoryResults, ...productResults]);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
    }
  };

  const handleSelectSuggestion = (suggestion: SearchResult) => {
    if (suggestion.type === "product") {
      router.push(`/product/${suggestion.slug}`);
    } else {
      router.push(`/category/${suggestion.slug}`);
    }
    setSearchTerm("");
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="p-2 hover:text-shop_light_green hoverEffect"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center gap-2 bg-white dark:bg-[#1e2768] border-2 border-[#3ab8a3] rounded-lg px-3 py-2 shadow-lg w-64 md:w-80">
            <Search className="w-4 h-4 text-[#3ab8a3]" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products, categories..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 dark:hover:bg-[#161d53] rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {(suggestions.length > 0 || loading) && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#1e2768] border border-[#3ab8a3]/30 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
              {loading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Searching...
                </div>
              ) : (
                <>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion._id}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#161d53] border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {suggestion.name}
                          </p>
                          {suggestion.type === "product" && suggestion.category && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              in {suggestion.category}
                            </p>
                          )}
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#3ab8a3]/10 text-[#3ab8a3] font-medium">
                          {suggestion.type === "product" ? "Product" : "Category"}
                        </span>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}

          {searchTerm.length >= 2 && !loading && suggestions.length === 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#1e2768] border border-[#3ab8a3]/30 rounded-lg shadow-xl p-4 z-50">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                No results found for &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchBar;
