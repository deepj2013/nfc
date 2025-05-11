import { useState } from "react";
import MemberScannerTab from "../../Tabspages/CaptainTabs/MemberScannerTab.jsx";
import TableSelectionTab from "../../Tabspages/CaptainTabs/ChairSelectionTab.jsx";
import MenuOrderingTab from "../../Tabspages/CaptainTabs/MenuOrderingTab.jsx";
import OrderTrackingTab from "../../Tabspages/CaptainTabs/OrderTrackingTab.jsx";
import TableStatusTab from "../../Tabspages/CaptainTabs/TableStatusTab.jsx";

const tabs = [
  { id: 1, label: "👤 Member QR Scan", component: MemberScannerTab },
  { id: 2, label: "🪑 Select Table & Seats", component: TableSelectionTab },
  { id: 3, label: "🍽️ Place Order", component: MenuOrderingTab },
  { id: 4, label: "📦 Track Orders", component: OrderTrackingTab },
  { id: 5, label: "📋 Table Overview", component: TableStatusTab },
];

const CaptainDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [memberInfo, setMemberInfo] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-2">
        {ActiveComponent && (
          <ActiveComponent
            memberInfo={memberInfo}
            setMemberInfo={setMemberInfo}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
        )}
      </div>
    </div>
  );
};

export default CaptainDashboard;