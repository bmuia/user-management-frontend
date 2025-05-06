import React, { useEffect, useState } from 'react';
import { getUserLogs } from '../../services/UserLog';
import AdminLogChart from './AdminLogChart';

const ITEMS_PER_PAGE = 10;

function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await getUserLogs();
        setLogs(data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const uniqueActions = [...new Set(logs.map(log => log.action))];
  const filtered = filter ? logs.filter(log => log.action === filter) : logs;
  const sorted = [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const formatDate = ts => new Date(ts).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-center mb-6">📄 User Activity Logs</h2>

      {/* Filter */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm text-gray-700">
          Filter:
          <select
            className="ml-2 border rounded px-3 py-1 text-sm"
            value={filter}
            onChange={e => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            {uniqueActions.map((action, i) => (
              <option key={i} value={action}>{action}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Chart */}
      <AdminLogChart logs={logs} />

      {/* Logs Table */}
      <div className="border rounded shadow overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-4 py-2 text-sm">Email</th>
              <th className="text-left px-4 py-2 text-sm">Action</th>
              <th className="text-left px-4 py-2 text-sm">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="text-center py-6 text-gray-500">Loading...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan="3" className="text-center py-6 text-gray-400">No logs found.</td></tr>
            ) : (
              paginated.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50 border-t">
                  <td className="px-4 py-2">{log.email_snapshot}</td>
                  <td className="px-4 py-2 capitalize text-indigo-600">{log.action}</td>
                  <td className="px-4 py-2 text-gray-600">{formatDate(log.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default UserLogs;
