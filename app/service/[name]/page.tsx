"use client"

import Link from 'next/link';
import { ArrowLeft, Clock, Tag, AirVent } from 'lucide-react';
import { useService } from '@/hooks/useService';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
// next icon

export default function ServiceApp() {
    const { serviceApplication, loading, error } = useService(1);

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link
                      href={"/hub"}
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Voltar
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Atualizado em {serviceApplication?.service.last_update}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Tag className="h-4 w-4 mr-1" />
                      v{serviceApplication?.service.version}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-3">
                  {/*<AirVent className="h-6 w-6 text-blue-600" />*/}
                  <h1 className="text-2xl font-bold text-gray-900">{serviceApplication?.service.name}</h1>
                </div>
              </div>
            </div>
          </div>
    
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-12rem)]">
              <iframe
                src={serviceApplication?.service.app_url}
                title={serviceApplication?.service.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      );
    }