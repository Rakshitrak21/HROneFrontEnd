import React from 'react';
import { Copy, Download } from 'lucide-react';

const JsonPreview = ({ schema }) => {
  const jsonString = JSON.stringify(schema, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    alert('JSON copied to clipboard!');
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Copy size={14} />
          Copy
        </button>
        <button
          onClick={downloadJson}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Download size={14} />
          Download
        </button>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 font-mono text-sm">
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
};

export default JsonPreview;