import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-3">ANSXtra</h4>
            <p className="text-gray-300">Amnuaysilpa School's extracurricular management portal</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/clubs" className="text-gray-300 hover:text-white transition-colors">
                  Browse Clubs
                </Link>
              </li>
              <li>
                <Link href="/me" className="text-gray-300 hover:text-white transition-colors">
                  My Applications
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about#content-guide" className="text-gray-300 hover:text-white transition-colors">
                  Content Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">Contact</h4>
            <p className="text-gray-300">Email: clubs@amnuaysilpa.ac.th</p>
            <p className="text-gray-300">Phone: 02-XXX-XXXX</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Amnuaysilpa School. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            {' | '}
            <a href="#" className="text-gray-300 hover:text-white">Terms of Use</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
