'use client';

import { useState, useEffect } from 'react';
import { Club } from '../../types';
import { getFilteredClubs, getAvailableCategories } from '../../lib/data';
import ClubCard from '../../components/ClubCard';

export default function ClubsPage() {
  const clubs = [
    {
      id: "1",
      name: "UNICEF Ambassadors",
      description: "Promoting children's rights and humanitarian values through awareness campaigns and community service.",
      tags: ["Service", "Leadership"],
      isOpen: true,
      memberCount: 15,
      type: "student_led"
    },
    {
      id: "2",
      name: "Interact Club",
      description: "Rotary-sponsored service club developing leadership skills through community service projects.",
      tags: ["Service", "Leadership"],
      isOpen: true,
      memberCount: 22,
      type: "student_led"
    },
    {
      id: "3",
      name: "Model United Nations",
      description: "Simulate UN committees and debate global issues while developing diplomatic and public speaking skills.",
      tags: ["Academic", "Competition", "Leadership"],
      isOpen: true,
      memberCount: 18,
      type: "student_led"
    },
    {
      id: "4",
      name: "Moot Court",
      description: "Simulate court proceedings and develop legal reasoning skills through competitive mock trials.",
      tags: ["Academic", "Competition", "Leadership"],
      isOpen: true,
      memberCount: 12,
      type: "student_led"
    },
    {
      id: "5",
      name: "Operation Smile",
      description: "Support children with facial deformities through fundraising and awareness campaigns for free surgeries.",
      tags: ["Service", "Leadership"],
      isOpen: true,
      memberCount: 20,
      type: "student_led"
    },
    {
      id: "6",
      name: "Sports Club",
      description: "Teacher-led sports program offering basketball, volleyball, swimming, and track & field training.",
      tags: ["Sports", "Leadership"],
      isOpen: false,
      memberCount: 35,
      type: "teacher_led"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Extracurricular Clubs
        </h1>
        <p className="text-gray-600">
          Discover and join clubs that match your interests and passions
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {club.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {club.name}
                </h3>
                {club.isOpen && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Open for applications
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {club.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {club.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  {club.memberCount} members
                </span>
                <span className="capitalize">
                  {club.type.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}