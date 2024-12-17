"use client"
import { Settings, User, Home, LogIn, LogOut, Menu, X, LayoutDashboard, Building2, Info } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href={"/"} className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=100"
              alt="Solude Logo"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">Solude</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link href={"/"} className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            
            <Link href={"/about"} className="text-gray-600 hover:text-gray-900">
              Sobre Nós
            </Link>
            
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900 flex items-center"
                onMouseEnter={() => setShowServicesMenu(true)}
                onMouseLeave={() => setShowServicesMenu(false)}
              >
                Sistemas
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showServicesMenu && (
                <div
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  onMouseEnter={() => setShowServicesMenu(true)}
                  onMouseLeave={() => setShowServicesMenu(false)}
                >
                  <div className="py-1">
                    <Link
                      href={"/services"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Nossos Serviços
                    </Link>
                    <Link
                      href={"/hub"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Hub de Sistemas
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={"/hub"}
                  className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
                  title="Home"
                >
                  <Home className="h-6 w-6" />
                </Link>
                <Link
                  href={"/settings"}
                  className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
                  title="Settings"
                >
                  <Settings className="h-6 w-6" />
                </Link>
                {isAdmin && (
                  <Link
                    href={"/admin"}
                    className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
                    title="Admin"
                  >
                    <Building2 className="h-6 w-6" />
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={"/login"}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href={"/company"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Início
            </Link>
            <Link
              href={"/about"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Sobre Nós
            </Link>
            <Link
              href={"/services"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Nossos Serviços
            </Link>
            <Link
              href={"/hub"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Hub de Sistemas
            </Link>
            {user ? (
              <>
                <Link
                  href={"/settings"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Configurações
                </Link>
                {isAdmin && (
                  <Link
                    href={"/admin"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Administração
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={"/login"}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}