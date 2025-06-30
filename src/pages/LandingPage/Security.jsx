import React from 'react';
import { ShieldCheck } from 'lucide-react';

function Security() {
  return (
    <div className="w-full py-20 flex flex-col md:flex-row items-center justify-center px-6 gap-10">
      <div className="flex justify-center items-center bg-blue-100 p-6 rounded-full">
        <ShieldCheck className="text-blue-600 w-16 h-16" />
      </div>
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Your Data Security, Our Top Priority
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          AccessHub employs industry-leading encryption, regular security audits, and continuous threat monitoring 
          to safeguard your sensitive organizational data. We are committed to maintaining the highest standards of 
          data protection and privacy for all our users. Trust AccessHub to keep your team's access secure and compliant.
        </p>
      </div>
    </div>
  );
}

export default Security;
