import React from 'react';
import colors from '@/utils/colors.js';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 style={{ color: colors.primary.main }} className="text-3xl font-semibold mb-4">Terms of Service</h1>
      <p className="text-gray-700">
        These are the terms of service for using EduFlex. Replace with your full legal terms.
      </p>
    </div>
  );
};

export default TermsOfService;