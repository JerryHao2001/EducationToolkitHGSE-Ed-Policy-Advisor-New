import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="bg-white border-b p-4 shadow-sm">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
