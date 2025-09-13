'use client'

import Link from 'next/link'
import { Book, Users, Award, FileText, Code, Image as ImageIcon, Upload, Settings } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-brand text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About ANSXtra
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Amnuaysilpa School's comprehensive extracurricular management platform
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              ANSXtra is designed to streamline the process of discovering, applying to, and managing 
              extracurricular activities at Amnuaysilpa School. Our platform connects students with 
              opportunities that align with their interests and helps them build a well-rounded 
              educational experience.
            </p>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Club Discovery</h3>
                <p className="text-gray-600">
                  Browse and search through all available clubs with detailed information, 
                  meeting schedules, and application requirements.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Application Management</h3>
                <p className="text-gray-600">
                  Submit applications with built-in validation and track their status 
                  through a comprehensive dashboard.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Leader Tools</h3>
                <p className="text-gray-600">
                  Club leaders can manage rosters, review applications, and organize 
                  meetings and announcements.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Advisor Dashboard</h3>
                <p className="text-gray-600">
                  Faculty advisors have oversight tools to monitor club activities 
                  and support student leadership.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Content Management</h3>
                <p className="text-gray-600">
                  Easy-to-update JSON-based content system for club information, 
                  images, and application requirements.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Modern Technology</h3>
                <p className="text-gray-600">
                  Built with Next.js, TypeScript, and Tailwind CSS for a fast, 
                  responsive, and accessible user experience.
                </p>
              </div>
            </div>
          </section>

          {/* Content Management Guide */}
          <section id="content-guide" className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Content Management Guide</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Updating Club Information
                </h3>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    All club information is stored in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">data/clubs.json</code> file. 
                    To update club details:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                    <li>Open the <code className="bg-gray-100 px-2 py-1 rounded text-sm">data/clubs.json</code> file</li>
                    <li>Find the club object you want to modify</li>
                    <li>Update the relevant fields (name, description, meeting info, etc.)</li>
                    <li>Save the file - changes will be reflected immediately</li>
                  </ol>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Ensure the JSON format remains valid when making changes. 
                      Use a JSON validator if you're unsure about the syntax.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                  Managing Club Images
                </h3>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    Club images should be placed in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">public/clubs/</code> directory:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                    <li>Add your image file to <code className="bg-gray-100 px-2 py-1 rounded text-sm">public/clubs/</code></li>
                    <li>Use descriptive filenames (e.g., <code className="bg-gray-100 px-2 py-1 rounded text-sm">mun.jpg</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">eco-committee.png</code>)</li>
                    <li>Update the club's <code className="bg-gray-100 px-2 py-1 rounded text-sm">image</code> field in <code className="bg-gray-100 px-2 py-1 rounded text-sm">clubs.json</code></li>
                    <li>Use the format: <code className="bg-gray-100 px-2 py-1 rounded text-sm">"/clubs/filename.jpg"</code></li>
                  </ol>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                      <strong>Recommended:</strong> Use high-quality images with a 16:9 aspect ratio 
                      for best display results. Optimize images for web to ensure fast loading.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <Upload className="w-6 h-6 text-green-600" />
                  Adding New Clubs
                </h3>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    To add a new club to the system:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                    <li>Create a unique ID for the club (lowercase, hyphen-separated)</li>
                    <li>Add the club image to <code className="bg-gray-100 px-2 py-1 rounded text-sm">public/clubs/</code></li>
                    <li>Copy an existing club object in <code className="bg-gray-100 px-2 py-1 rounded text-sm">clubs.json</code></li>
                    <li>Update all fields with the new club's information</li>
                    <li>Ensure the club appears in the array and the JSON remains valid</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Important:</strong> The club ID must be unique and match the filename 
                      pattern used in the image path.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Information */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Built With</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Next.js 14</strong> - React framework with App Router</li>
                  <li>• <strong>TypeScript</strong> - Type-safe development</li>
                  <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
                  <li>• <strong>React Hook Form</strong> - Form validation</li>
                  <li>• <strong>Zod</strong> - Schema validation</li>
                  <li>• <strong>Lucide React</strong> - Icon library</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Responsive Design</strong> - Mobile-first approach</li>
                  <li>• <strong>Accessibility</strong> - WCAG AA compliant</li>
                  <li>• <strong>Performance</strong> - Optimized loading and rendering</li>
                  <li>• <strong>SEO Optimized</strong> - Proper meta tags and structure</li>
                  <li>• <strong>Type Safety</strong> - Full TypeScript coverage</li>
                  <li>• <strong>Modern UI</strong> - Clean and professional design</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have questions about using ANSXtra or need technical support, 
              don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="mailto:clubs@amnuaysilpa.ac.th">
                  Contact Support
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/clubs">
                  Browse Clubs
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
