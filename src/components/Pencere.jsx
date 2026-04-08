import React from 'react';

const Pencere = ({ acikMi, kapat, children }) => {
  if (!acikMi) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* arka plan kararisi */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={kapat}
      ></div>

      {/* pencere icerik */}
      <div className="relative z-10 w-full mx-4 transform transition-all kart-giris max-w-sm sm:max-w-md flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default Pencere;
