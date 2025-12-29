"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DropDownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface DropDownProps {
  options: DropDownOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید...",
  disabled = false,
  className = "",
  label,
  error,
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: DropDownOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between
          ${sizeClasses[size]}
          bg-white border rounded-lg
          transition-all duration-200
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }
          ${error ? "border-red-500" : "border-gray-300"}
          ${isOpen ? "ring-2 ring-blue-500 border-transparent" : ""}
        `}
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon && <span>{selectedOption.icon}</span>}
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              موردی یافت نشد
            </div>
          ) : (
            <ul className="py-1">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={`
                      w-full text-right px-4 py-2.5
                      flex items-center gap-2
                      transition-colors duration-150
                      ${
                        option.disabled
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "text-gray-900 hover:bg-blue-50 cursor-pointer"
                      }
                      ${
                        option.value === value
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : ""
                      }
                    `}
                  >
                    {option.icon && <span>{option.icon}</span>}
                    <span>{option.label}</span>
                    {option.value === value && (
                      <svg
                        className="h-5 w-5 mr-auto text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
