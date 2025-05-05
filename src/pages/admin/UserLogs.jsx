import React, { useEffect, useState } from 'react'
import { getUserLogs } from '../../services/UserLog'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLogChart from './AdminLogChart'  

const ITEMS_PER_PAGE = 10

function UserLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true)
      try {
        const data = await getUserLogs()
        setLogs(data)
      } catch (err) {
        console.error('Error fetching logs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [])

  // Filter logs by action
  const uniqueActions = [...new Set(logs.map(log => log.action))]
  const filteredLogs = filter ? logs.filter(log => log.action === filter) : logs

  // Sort logs by timestamp (newest first)
  const sortedLogs = [...filteredLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  // Paginate logs
  const totalPages = Math.ceil(sortedLogs.length / ITEMS_PER_PAGE)
  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Format timestamp
  const formatTimestamp = ts =>
    new Date(ts).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📄 User Activity Logs</h2>

      {/* Filter Section */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <label className="text-sm font-medium mr-2 text-gray-600">Filter by action:</label>
          <select
            className="border rounded-md px-3 py-2 text-sm shadow-sm"
            value={filter}
            onChange={e => {
              setFilter(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="">All</option>
            {uniqueActions.map((action, idx) => (
              <option key={idx} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <AdminLogChart logs={logs} /> 

      {/* Logs Table Section */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-5 text-gray-500">Loading...</td>
                </tr>
              ) : paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-5 text-gray-400">No logs found.</td>
                </tr>
              ) : (
                paginatedLogs.map((log, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 border-t">{log.email_snapshot}</td>
                    <td className="py-3 px-4 border-t capitalize text-indigo-600">{log.action}</td>
                    <td className="py-3 px-4 border-t text-gray-600">{formatTimestamp(log.timestamp)}</td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {filteredLogs.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
            className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default UserLogs
