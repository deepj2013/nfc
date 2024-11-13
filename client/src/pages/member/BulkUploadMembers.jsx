import React, { useState } from "react";
import Papa from "papaparse";
import ModalWrapper from "../../layout/ModalWrapper";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { bulkUploadMemberServices } from "../../redux/thunk/useMangementServices";

const BulkUploadMembers = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadResponse, setUploadResponse] = useState({
    success: 0,
    failed: 0,
  });

  const SampleCSVPath = new URL(
    "../../assets/files/sample.csv",
    import.meta.url
  ).href;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage("");
    setParsedData([]);
    setUploadStatus("");
  };

  const handleParseCSV = () => {
    if (!file) {
      setErrorMessage("Please select a CSV file to upload.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.map((row, index) => {
          const isValid = validateRow(row);
          return {
            ...row,
            isValid,
            index,
            error: isValid ? "" : "Invalid Data",
          };
        });
        setParsedData(data);
        setErrorMessage("");
      },
      error: (err) => {
        setErrorMessage("Error parsing CSV: " + err.message);
      },
    });
  };

  const validateRow = (row) => {
    return (
      row.memberId &&
      row.firstName &&
      row.surname &&
      row.mobileNumber &&
      /^\d{10}$/.test(row.mobileNumber)
    );
  };

  const handleUpload = async () => {
    const validData = parsedData.filter((row) => row.isValid);
    if (validData.length === 0) {
      setErrorMessage("No valid records to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const response = await dispatch(
        bulkUploadMemberServices({ members: validData })
      ).unwrap();

      setUploadResponse({
        success: response.totalUploaded,
        failed: response.failedEntries.length,
      });

      setModalOpen(true);
      setUploadStatus(`Successfully uploaded ${response.totalUploaded} members.`);
      setParsedData((prev) =>
        prev.map((row) => ({
          ...row,
          uploaded: row.isValid,
        }))
      );
    } catch (error) {
      setErrorMessage("An error occurred during upload: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Bulk Upload Members
        </h2>

        {/* Upload Controls */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center gap-4">
            <Button
              name="Download Sample CSV"
              onClick={() => {
                const link = document.createElement("a");
                link.href = SampleCSVPath;
                link.download = "sample.csv";
                link.click();
              }}
              style={"bg-blue-500 hover:bg-blue-700 text-white"}
              title="Download this file to see the correct format for bulk upload"
            />
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <Button name="Parse CSV" onClick={handleParseCSV} />
          </div>
          <p className="text-sm text-gray-500">
            Note: Delete sample data before uploading your own.
          </p>
        </div>

        {/* Errors and Status Messages */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {uploadStatus && <p className="text-green-500 mb-4">{uploadStatus}</p>}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Index
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Member ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Mobile
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {parsedData.length > 0 ? (
                parsedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      row.isValid ? "bg-green-100" : "bg-red-100"
                    } border-b border-gray-200`}
                  >
                    <td className="p-4 text-sm text-gray-900">
                      {row.index + 1}
                    </td>
                    <td className="p-4 text-sm text-gray-900">
                      {row.memberId}
                    </td>
                    <td className="p-4 text-sm text-gray-900">{`${row.firstName} ${row.surname}`}</td>
                    <td className="p-4 text-sm text-gray-900">
                      {row.mobileNumber}
                    </td>
                    <td className="p-4 text-sm text-gray-900">
                      {row.isValid ? "Valid" : `Error: ${row.error}`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-sm text-gray-500"
                  >
                    No data to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            name="Upload Valid Data"
            onClick={handleUpload}
            disabled={isUploading || parsedData.every((row) => !row.isValid)}
            style={"bg-blue-600 hover:bg-blue-700 text-white"}
          />
          <Button
            name="Back"
            onClick={() => navigate(-1)}
            style={"bg-gray-600 hover:bg-gray-700 text-white"}
          />
        </div>

        {isUploading && (
          <p className="text-center text-gray-500 mt-4">Uploading data...</p>
        )}
      </div>

      {/* Modal for Upload Summary */}
      <ModalWrapper isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Upload Summary
          </h3>
          <p className="mt-2">
            Successfully Uploaded: {uploadResponse.success}
          </p>
          <p>Failed Entries: {uploadResponse.failed}</p>
          <Button name="Close" onClick={() => setModalOpen(false)} />
        </div>
      </ModalWrapper>
    </div>
  );
};

export default BulkUploadMembers;
