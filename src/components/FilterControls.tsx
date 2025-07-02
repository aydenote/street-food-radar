
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface FilterControlsProps {
  onFilterChange: (filters: string[]) => void;
  selectedFilters: string[];
}

const FilterControls = ({ onFilterChange, selectedFilters }: FilterControlsProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const menuCategories = [
    "붕어빵", "호떡", "어묵", "떡볶이", "김밥", "토스트", 
    "순대", "만두", "군고구마", "계란말이", "라면"
  ];

  const handleFilterToggle = (category: string) => {
    const newFilters = selectedFilters.includes(category)
      ? selectedFilters.filter(f => f !== category)
      : [...selectedFilters, category];
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          메뉴 필터
          {selectedFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedFilters.length}
            </Badge>
          )}
        </Button>
        
        {selectedFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X size={16} />
            필터 초기화
          </Button>
        )}
      </div>

      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedFilters.map(filter => (
            <Badge
              key={filter}
              variant="default"
              className="cursor-pointer bg-orange-500 hover:bg-orange-600"
              onClick={() => handleFilterToggle(filter)}
            >
              {filter} <X size={12} className="ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {showFilters && (
        <Card>
          <CardContent className="p-3">
            <div className="grid grid-cols-3 gap-2">
              {menuCategories.map(category => (
                <Badge
                  key={category}
                  variant={selectedFilters.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer text-center justify-center ${
                    selectedFilters.includes(category)
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-orange-50'
                  }`}
                  onClick={() => handleFilterToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FilterControls;
