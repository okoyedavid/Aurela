export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Meet The Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Return
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                X
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                f
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                in
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                ig
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 flex justify-between items-center text-sm text-gray-600">
          <span>Copyright © 2023 Auvé. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
