import React from 'react';
import { ShieldCheck, ListChecks, Lock, Users, Settings } from 'lucide-react';

function Features() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: 'Role-Based Permissions',
      description: 'Granular control over who can access what, ensuring security and compliance.',
    },
    {
      icon: <ListChecks className="w-8 h-8 text-blue-600" />,
      title: 'Activity Logs',
      description: 'Comprehensive audit trails to monitor access events and changes for full transparency.',
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: 'Secure Authentication',
      description: 'Robust single sign-on (SSO) options for enhanced security.',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Centralized Directory',
      description: 'Manage all user accounts, groups, and access policies from a single unified interface.',
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      title: 'Automated Provisioning',
      description: 'Simplify user onboarding by automatically assigning roles and permissions.',
    },
  ];

  return (
    <div className="w-full min-h-screen py-16">
      <h1 className="text-5xl font-bold text-center mb-12">Key Features</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
              {feature.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
