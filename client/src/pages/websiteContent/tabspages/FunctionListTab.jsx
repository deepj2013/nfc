import React, { useEffect, useState } from 'react';
import { Eye, Pencil } from 'lucide-react';
import FunctionForm from './FunctionForm';
import { getAllFunctions } from '../../../services/useMicellaneousServices';

const FunctionListTab = () => {
  const [functions, setFunctions] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'form'
  const [selectedFunction, setSelectedFunction] = useState(null);

  useEffect(() => {
    fetchFunctions();
  }, []);

  const fetchFunctions = async () => {
    try {
      const data = await getAllFunctions();
      setFunctions(data || []);
    } catch (err) {
      console.error('Failed to load functions:', err);
    }
  };

  const handleAddNew = () => {
    setSelectedFunction(null);
    setViewMode('form');
  };

  const handleEdit = (fn) => {
    setSelectedFunction(fn);
    setViewMode('form');
  };

  return (
    <div className="p-2 sm:p-4">
      {/* Persistent Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">🎉 Function Manager</h3>
        <button
          onClick={handleAddNew}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          + Add Function
        </button>
      </div>

      {/* FORM MODE */}
      {viewMode === 'form' && (
        <FunctionForm
          editData={selectedFunction}
          onBack={() => {
            setViewMode('list');
            fetchFunctions();
          }}
        />
      )}

      {/* LIST MODE */}
      {viewMode === 'list' && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Function Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Photos</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {functions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500 italic">
                    No functions found.
                  </td>
                </tr>
              ) : (
                functions.map((fn, i) => (
                  <tr
                    key={fn._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <td className="p-4 font-medium text-gray-700">{i + 1}</td>
                    <td className="p-4">{fn.title}</td>
                    <td className="p-4">{new Date(fn.date).toLocaleDateString()}</td>
                    <td className="p-4">{fn.galleryImages.length}</td>
                    <td className="p-4 flex gap-2">
                      <button
                        title="View Gallery"
                        onClick={() => handleEdit(fn)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        title="Edit Function"
                        onClick={() => handleEdit(fn)}
                        className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-full transition"
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FunctionListTab;
