import { useState } from 'react';
import FunctionListTab from './tabspages/FunctionListTab';


const WebsiteContent = () => {
  const [activeTab, setActiveTab] = useState('Function');

  const tabs = ['Function', 'Banners', 'Homepage']; // More tabs in future

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Website Content Management</h2>

      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === tab ? 'border-purple-700 text-purple-700' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'Function' && <FunctionListTab />}
        {/* Future: Add logic for Banners, Homepage */}
      </div>
    </div>
  );
};

export default WebsiteContent;