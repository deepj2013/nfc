import React, { useEffect, useState } from "react";
import moment from "moment";
import { getOrgDetail } from "../../services/posApiServices";

const ThermalInvoice = ({ data }) => {
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await getOrgDetail();
        setOrg(res.data?.result?.[0] || null);
      } catch (err) {
        console.error("Error loading organization details", err);
      }
    };
    fetchOrg();
  }, []);

  if (!data) {
    return <p className="text-center mt-10 text-gray-500">Loading Invoice...</p>;
  }

  const getAmountInWords = (amount) => {
    return `RUPEES ${amount} ONLY`.toUpperCase();
  };

  const getTotal = () =>
    data.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  const CGST = +(getTotal() * 0.025).toFixed(2);
  const SGST = +(getTotal() * 0.025).toFixed(2);
  const total = +(getTotal() + CGST + SGST).toFixed(2);
  const rounding = +(Math.round(total) - total).toFixed(2);

  return (
    <div id="printable" className="p-4 text-xs font-mono w-[280px]">
      <div className="text-center mb-1">
        <h1 className="font-bold text-base uppercase">{org?.fullName || "N/A"}</h1>
        <p>{org?.address || "N/A"}</p>
        <p>GST No: {org?.gst || "N/A"}</p>
        <p>PAN: {org?.pan || "N/A"}</p>
        <p>TIN: {org?.tan || "N/A"}</p>
        <hr className="my-2 border-black" />
      </div>

      <div className="text-left text-xs">
        <p>MEMBER NO: {data.memberId || "N/A"}</p>
        <p>TABLE: {data.tableId || "N/A"}</p>
        <p>BILL NO: {data.billNumber || "N/A"}</p>
        <p>DATE: {data.date ? moment(data.date).format("DD-MMM-YYYY HH:mm:ss") : "N/A"}</p>
      </div>

      <table className="w-full mt-2 text-left">
        <thead>
          <tr>
            <th className="w-1/12">SNo</th>
            <th className="w-6/12">Item</th>
            <th className="w-1/12 text-right">Qty</th>
            <th className="w-2/12 text-right">Rate</th>
            <th className="w-2/12 text-right">Amt</th>
          </tr>
        </thead>
        <tbody>
          {data.items?.length > 0 ? (
            data.items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name || "N/A"}</td>
                <td className="text-right">{item.quantity || 0}</td>
                <td className="text-right">{item.price || 0}</td>
                <td className="text-right">{(item.price || 0) * (item.quantity || 0)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-2">No Items</td>
            </tr>
          )}
        </tbody>
      </table>

      <hr className="my-1 border-black" />
      <div className="text-right space-y-1">
        <p>SUBTOTAL: ₹{getTotal()}</p>
        <p>CGST @2.5%: ₹{CGST}</p>
        <p>SGST @2.5%: ₹{SGST}</p>
        <p>ROUNDING: ₹{rounding}</p>
        <p className="font-bold">TOTAL: ₹{Math.round(total)}</p>
      </div>

      <p className="mt-2 text-xs italic">
        ({getAmountInWords(Math.round(total))})
      </p>

      <div className="mt-2 text-xs">
        <p>Opening Balance: ₹{data.openingBalance ?? "N/A"}</p>
        <p>Closing Balance: ₹{data.closingBalance ?? "N/A"}</p>
        <p>Remarks: {data.remarks || "N/A"}</p>
      </div>

      <div className="text-center mt-3 border-t pt-2">
        <p>THIS IS A COMPUTER GENERATED BILL</p>
        <p className="text-[10px]">DOES NOT REQUIRE SIGNATURE</p>
      </div>
    </div>
  );
};

export default ThermalInvoice;