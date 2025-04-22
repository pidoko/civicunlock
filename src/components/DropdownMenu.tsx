/** @jsxImportSource preact */

import { useState, useEffect, useRef } from 'preact/hooks';

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} class="relative">
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="city-menu"
        class="hover:underline focus:outline-none flex items-center gap-2"
      >
        Cities
        <svg class={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id="city-menu"
        role="menu"
        class={`absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-800 transition-all transform origin-top-right duration-200 ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <a href="/whitehorse/" role="menuitem" class="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 focus:bg-blue-100">Whitehorse</a>
        <a href="/calgary/" role="menuitem" class="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 focus:bg-blue-100">Calgary</a>
        <a href="/vancouver/" role="menuitem" class="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 focus:bg-blue-100">Vancouver</a>
      </div>
    </div>
  );
}
