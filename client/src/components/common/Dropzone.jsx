import React, { useState } from 'react';

const Dropzone = () => {
  const [previewSrc, setPreviewSrc] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-indigo-600');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-600');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-600');
    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    displayPreview(file);
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
  };

  return (
    <div
      className=" relative border-2 border-gray-300 border-dashed rounded-lg p-6"
      id="dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={handleChange}
      />
      <div className="text-center">
        <img
          className="mx-auto h-12 w-12"
          src="https://www.svgrepo.com/show/357902/image-upload.svg"
          alt=""
        />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse</span>
            <span> to upload</span>
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
      {previewSrc && (
        <img src={previewSrc} className="mt-4 mx-auto max-h-40" alt="Preview" />
      )}
    </div>
  );
};

export default Dropzone;
