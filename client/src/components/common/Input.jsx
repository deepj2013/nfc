import React from 'react'

function Input({ placeholder,width }) {
  return (
    <div class="mb-5 w-full">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">{placeholder}</label>
      <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={`Enter ${placeholder}`} required />
    </div>
  )
}

export default Input