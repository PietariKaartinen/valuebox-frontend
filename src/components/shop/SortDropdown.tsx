'use client';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { label: 'Best Sellers', value: 'BEST_SELLING' },
  { label: 'Price: Low to High', value: 'PRICE_ASC' },
  { label: 'Price: High to Low', value: 'PRICE_DESC' },
  { label: 'Newest', value: 'CREATED_AT' },
  { label: 'Discount %', value: 'DISCOUNT' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm font-medium text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer pr-6 appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0 center',
          backgroundSize: '16px',
        }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
