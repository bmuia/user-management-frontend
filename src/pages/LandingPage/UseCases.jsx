import React from "react";
import { Briefcase, GraduationCap, Users, Building } from "lucide-react";

function UseCases() {
  const useCases = [
    {
      title: "SMEs & Startups",
      description:
        "Easily onboard new hires, assign roles, and scale as your team grows without complexity.",
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "Education",
      description:
        "Manage students, teachers, and staff accounts with structured roles and secure logins.",
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
    },
    {
      title: "CRM & SaaS Platforms",
      description:
        "Integrate user management into customer-facing apps with centralized authentication.",
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Enterprises",
      description:
        "Role-based access control, compliance-ready auditing, and seamless SSO integration.",
      icon: <Building className="w-8 h-8 text-orange-600" />,
    },
  ];

  return (
    <section className="w-full min-h-screen px-6 py-16 flex flex-col items-center justify-center" id="usecases">
      <h1 className="text-5xl font-bold text-center mb-12">Use Cases</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {useCases.map((u, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
              {u.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{u.title}</h2>
            <p className="text-gray-600">{u.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UseCases;
