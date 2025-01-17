"use client"
import { Settings, User, Home, LogIn, LogOut, Menu, X, LayoutDashboard, Building2, Info } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { authUser, logout, isAdmin } = useAuth();
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
            <span className="ml-2 text-xl font-bold text-gray-800">{
              authUser ? authUser.organizationName : "Solude"
              }</span>
          </Link>

          {/* Desktop Navigation */}
          { !authUser && (
            <div className="hidden md:flex items-center space-x-8">
              <Link href={"/"} className="text-gray-600 hover:text-gray-900">
                Início
              </Link>
              <Link href={"/about"} className="text-gray-600 hover:text-gray-900">
                Empresa
              </Link>
              <Link href={"/services"} className="text-gray-600 hover:text-gray-900">
                Soluções
              </Link>
            </div>
          )}
          
          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
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
                <Link
                  href={"/"}
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Link>
              </>
            ) : (
              <Link
                href={"/login"}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Acessar plataforma
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
            {!authUser && (
              <>
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
                  Empresa
                </Link>
                <Link
                  href={"/services"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Soluções
                </Link>
              </>
            )}
            {authUser ? (
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
                <Link
                  href={"/"}
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sair
                </Link>
              </>
            ) : (
              <Link
                href={"/login"}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Acessar plataforma
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}