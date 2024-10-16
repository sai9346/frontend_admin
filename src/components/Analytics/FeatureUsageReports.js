import React, { useEffect, useState } from 'react';

const FeatureUsageReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchFeatureUsageReports = async () => {
      const response = await fetch('/api/featureUsageReports'); // Placeholder API
      const data = await response.json();
      setReports(data);
    };
    fetchFeatureUsageReports();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Feature Usage Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id} className="border-b py-2">
            <strong>{report.featureName}:</strong> {report.usageDetails}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureUsageReports;
