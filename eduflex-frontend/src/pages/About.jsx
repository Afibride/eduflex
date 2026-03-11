import React from 'react';
import colors from '@/utils/colors.js';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 style={{ color: colors.primary.main }} className="text-3xl font-semibold mb-4">About EduFlex</h1>
      <p className="text-gray-700">
        EduFlex provides digital tools for Cameroon's schools — bridging classroom administration,
        curriculum support and community engagement. Built with local needs in mind.
      </p>
    </div>
  );
};

export default About;