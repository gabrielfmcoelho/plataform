'use client';

import { useEffect } from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { environment } from '@/lib/config/environment';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Algo de errado aconteceu !</h2>
        {environment.hideError && (
          <p className="mt-2 text-sm text-gray-600">
            {error.digest && (
              <>
                <span className="font-bold">Código digest:</span> {error.digest}
                <br />
                <span className="font-bold">Mensagem de erro:</span> {error.message}
              </>
            )}
          </p>
        )}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Tente Novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="h-4 w-4 mr-2" />
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
}