// import React, { useEffect, useState } from 'react';

// const AuditTrail = () => {
//   const [auditLogs, setAuditLogs] = useState([]);

//   useEffect(() => {
//     const fetchAuditLogs = async () => {
//       const response = await fetch('/api/auditTrail'); // Placeholder API
//       const data = await response.json();
//       setAuditLogs(data);
//     };
//     fetchAuditLogs();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Audit Trail</h2>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Action</th>
//             <th className="border px-4 py-2">User</th>
//             <th className="border px-4 py-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {auditLogs.map(log => (
//             <tr key={log.id}>
//               <td className="border px-4 py-2">{log.action}</td>
//               <td className="border px-4 py-2">{log.user}</td>
//               <td className="border px-4 py-2">{log.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AuditTrail;



import React, { useState } from 'react';

const AuditTrail = () => {
  const [auditLogs] = useState([
    { id: 1, action: 'User logged in', date: '2024-10-10', user: 'user1' },
    { id: 2, action: 'Password changed', date: '2024-10-11', user: 'user1' },
    { id: 3, action: 'Profile updated', date: '2024-10-12', user: 'user2' },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Audit Trail</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">User</th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.map(log => (
            <tr key={log.id}>
              <td className="py-2 px-4 border-b">{log.action}</td>
              <td className="py-2 px-4 border-b">{log.date}</td>
              <td className="py-2 px-4 border-b">{log.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrail;
