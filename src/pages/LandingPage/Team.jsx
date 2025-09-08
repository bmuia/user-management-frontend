import React from 'react'
import { Plus } from 'lucide-react'

function Team() {
  const developers = [
    {
      img: 'images/dev1.jpeg',
      title: 'Belam Muia',
      role: 'Fullstack Developer'
    }
  ]

  return (
    <section className="w-full min-h-screen px-6 py-16 flex flex-col items-center justify-center" id='team'>
      <div className="mx-auto max-w-7xl flex flex-col items-center px-6">
        {/* Section Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Meet the Team</h1>
        <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
          Behind <span className="font-semibold text-blue-600">UMC</span> is a passionate team of 
          builders, designers, and problem-solvers who believe in making user management smarter, 
          safer, and more efficient. Each member brings unique expertise and dedication to 
          delivering the best possible experience for our users.
        </p>

        {/* Team Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {developers.map((d, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={d.img}
                alt={d.title}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-100 shadow-sm"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{d.title}</h2>
              <p className="text-gray-600">{d.role}</p>
            </div>
          ))}

          {/* Future Role Card */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex justify-center items-center border-4 border-dashed border-gray-300">
              <Plus className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">Your Future Role</h2>
            <p className="text-gray-500">We’re always looking for passionate contributors.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
