import React from 'react';
import { twMerge } from 'tailwind-merge';

// Card Component
export function Card({ children, className }) {
  return (
    <div className={twMerge("p-4 bg-white shadow-lg rounded-xl border border-gray-200", className)}>
      {children}
    </div>
  );
}

// Card Content Component
export function CardContent({ children, className }) {
  return (
    <div className={twMerge("p-2", className)}>
      {children}
    </div>
  );
}

// Modal Component
export function Modal({ children, onClose, className }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={twMerge("bg-white p-6 rounded-xl shadow-lg w-96 relative", className)}>
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-black">✖</button>
        {children}
      </div>
    </div>
  );
}

// Export all components in one file
export default { Card, CardContent, Modal };