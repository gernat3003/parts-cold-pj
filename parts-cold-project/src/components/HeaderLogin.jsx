import React from "react";
import logo from "../img/partsfrio.jpg";

export default function HeaderLogin() {
  return (
    <div class="p-2 text-gray-900 bg-white rounded-lg shadow-lg font-medium capitalize">
      <span class="px-2 mr-2 border-r border-gray-800">
        <img
          src={logo}
          alt="alt placeholder"
          class="w-15 h-11 -mt-1 inline mx-auto"
        />
      </span>
    </div>
  );
}
