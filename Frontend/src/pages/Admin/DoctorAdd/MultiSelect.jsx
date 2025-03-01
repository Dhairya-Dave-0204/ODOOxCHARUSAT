import React, { useState } from "react";

function MultiSelect({ selectedLanguages, setSelectedLanguages, languages }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    
  const handleSelect = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleRemove = (language) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
  };

  return (
    <>
      <div className="w-full">
        <div className="relative font-light">
          <button
            className="w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="block truncate">
              {selectedLanguages.length > 0
                ? selectedLanguages.join(", ")
                : "Select languages"}
            </span>
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-60">
              {languages.map((language, index) => (
                <li
                  key={index}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-4 hover:bg-gray-100 ${
                    selectedLanguages.includes(language)
                      ? "font-medium"
                      : "font-normal"
                  }`}
                  onClick={() => handleSelect(language)}
                >
                  {language}
                  {selectedLanguages.includes(language) && (
                    <span className="ml-2 text-green-500">✔</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-2 space-x-2">
          {selectedLanguages.map((language) => (
            <span
              key={language}
              className="inline-flex items-center px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full"
            >
              {language}
              <button
                className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemove(language)}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default MultiSelect;
