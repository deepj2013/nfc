import React, { useRef, useState } from "react";
import {
  bulkUploadImages,
  createFunction,
  updateFunction,
} from "../../../services/useMicellaneousServices";


const FunctionForm = ({ editData, onBack }) => {





  const [functionName, setFunctionName] = useState(editData?.title || "");
  const [date, setDate] = useState(
    editData ? new Date(editData.date).toISOString().split("T")[0] : ""
  );
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const inputRef = useRef();

  const getToken = () => {
    try {
      const admin = JSON.parse(localStorage.getItem("userDetails"));
      return admin?.token || "";
    } catch {
      return "";
    }
  };

  const handleFiles = async (fileList) => {
    try {
      const files = Array.from(fileList);
      if (files.length > 50) {
        alert("You can upload a maximum of 40 files at once.");
        return;
      }

      const res = await bulkUploadImages(files, functionName);

      if (res.uploaded && Array.isArray(res.uploaded)) {
        setUploadedFiles((prev) => [...prev, ...res.uploaded]);
        res.uploaded.forEach((name) => {
          setUploadStatus((prev) => ({ ...prev, [name]: "Uploaded" }));
        });
      }

      if (res.failed && res.failed.length) {
        res.failed.forEach((name) => {
          setUploadStatus((prev) => ({ ...prev, [name]: "Failed" }));
        });
      }
    } catch (err) {
      alert("Bulk upload failed: " + err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!functionName || !date || (uploadedFiles.length === 0 && !editData?._id)) {
      alert("All fields and at least one image are required.");
      return;
    }

    try {
      const payload = {
        title: functionName,
        date,
        galleryImages: uploadedFiles,
        mode: editData ? "replace" : "append", // or let user choose via toggle
      };
      

      if (editData?._id) {
        await updateFunction(editData._id, payload, token);
        alert("Function updated successfully.");
      } else {
        await createFunction(payload, token);
        alert("Function created successfully.");
      }

      onBack();
    } catch (err) {
      alert("Error saving function: " + err.message);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-sm text-blue-600 underline">
        ← Back
      </button>
      <h3 className="text-xl font-semibold mb-4">
        {editData ? "Edit Function" : "Add New Function"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Function Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <p className="text-sm text-gray-500">
          📌 <strong>Note:</strong> You can upload <strong>up to 50 images</strong> per session.
        </p>

        {/* Upload Section */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current.click()}
          className="w-full h-40 border-2 border-dashed border-gray-400 rounded flex flex-col justify-center items-center text-gray-500 bg-gray-50 cursor-pointer transition hover:bg-gray-100"
        >
          <div className="flex flex-col items-center gap-1 text-sm">
            <span className="font-medium">Click to browse or Drag & Drop Images</span>
            <span className="text-xs text-gray-400">
              Accepted formats: JPG, PNG. Max: 50 images
            </span>
          </div>
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>

        {/* Existing Images (if any) */}
        {editData?.galleryImages?.length > 0 && (
          <div>
            <h4 className="mt-6 text-md font-semibold">📸 Existing Images</h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mt-2">
              {editData.galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setPreviewImage(img)}
                  alt={`existing-${i}`}
                  className="w-full h-24 object-cover rounded shadow cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Previews */}
        {uploadedFiles.length > 0 && (
          <div>
            <h4 className="mt-6 text-md font-semibold">🆕 New Uploads</h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mt-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="text-center">
                  <img
                    src={file}
                    alt={`upload-${idx}`}
                    onClick={() => setPreviewImage(file)}
                    className="w-full h-24 object-cover rounded shadow cursor-pointer hover:scale-105 transition"
                  />
                  <p
                    className={`text-xs mt-1 ${
                      uploadStatus[file] === "Failed" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {uploadStatus[file] || "Uploaded"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          {editData ? "Update Function" : "Submit Function"}
        </button>
      </form>

      {/* Fullscreen Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-lg border"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setPreviewImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default FunctionForm;
