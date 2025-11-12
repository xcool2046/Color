import { useState } from 'react';
import { exportAsCSS, exportAsJSON, copyToClipboard } from '../utils/colorGenerator';

const ExportButtons = ({ colors }) => {
  const [copiedType, setCopiedType] = useState(null);

  const handleCopyCSS = async () => {
    const css = exportAsCSS(colors);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedType('css');
      setTimeout(() => setCopiedType(null), 1500);
    }
  };

  const handleCopyJSON = async () => {
    const json = exportAsJSON(colors);
    const success = await copyToClipboard(json);
    if (success) {
      setCopiedType('json');
      setTimeout(() => setCopiedType(null), 1500);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <button
        onClick={handleCopyCSS}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>复制 CSS</span>
        {copiedType === 'css' && <span className="text-green-400">✓</span>}
      </button>

      <button
        onClick={handleCopyJSON}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <span>复制 JSON</span>
        {copiedType === 'json' && <span className="text-green-400">✓</span>}
      </button>
    </div>
  );
};

export default ExportButtons;
