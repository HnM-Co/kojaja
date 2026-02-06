import React from 'react';

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gray-100">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-80" />

      {/* Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      {/* Glass overlay texture */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
    </div>
  );
};

export default LiquidBackground;