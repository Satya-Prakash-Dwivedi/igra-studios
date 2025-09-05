import React from "react";

const Invoices = () => {
    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-igraRed">Invoices</h1>
                <p className="text-gray-400">Manage your invoices</p>
            </div>

            {/* Table Container */}
            <div className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden border border-neutral-800">
                {/* Empty state */}
                <div className="p-6 text-center text-gray-400">
                    No invoices found
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-t border-neutral-800">
                        <thead>
                            <tr className="bg-neutral-950">
                                <th className="px-6 py-3 text-sm font-semibold text-gray-300">Note</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-300">Credits</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-300">Status</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-300">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row (remove if invoices empty) */}
                            {/* <tr className="border-t border-neutral-800">
                <td className="px-6 py-4">Design Work</td>
                <td className="px-6 py-4">10</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded bg-igraRed text-white">Pending</span>
                </td>
                <td className="px-6 py-4">Sep 5, 2025</td>
              </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
