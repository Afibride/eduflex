import React from 'react';
import { Link } from 'react-router-dom';
import colors from '@/utils/colors.js';

const Documentation = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 style={{ color: colors.primary.main }} className="text-3xl font-semibold mb-4">Documentation</h1>
      <p className="text-gray-700 mb-4">Find guides, API docs and integration steps for EduFlex.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li><Link to="/documentation/getting-started" className="text-blue-600 hover:underline">Getting started</Link></li>
        <li><Link to="/documentation/api" className="text-blue-600 hover:underline">API reference</Link></li>
      </ul>
    </div>
  );
};

export default Documentation;