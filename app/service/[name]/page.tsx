"use client";

import Link from 'next/link';
import { ArrowLeft, Clock, Tag, Expand, Minimize } from 'lucide-react';
import { useState } from 'react';
import { useService } from '@/hooks/useService';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function ServiceApp() {
    const { serviceApplication, loading, error } = useService(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

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
                            <h1 className="text-2xl font-bold text-gray-900">
                                {serviceApplication?.service.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main content */}
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isFullScreen ? 'h-screen' : 'max-w-7xl'}`}>
                <div className={`bg-white shadow rounded-lg overflow-hidden ${isFullScreen ? 'h-full' : 'h-[calc(100vh-12rem)]'} relative`}>
                    <iframe
                        src={serviceApplication?.service.app_url}
                        title={serviceApplication?.service.name}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                    {/* Fullscreen toggle button */}
                    <button
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow"
                        aria-label="Toggle fullscreen"
                    >
                        {isFullScreen ? <Minimize className="h-5 w-5 text-gray-600" /> : <Expand className="h-5 w-5 text-gray-600" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
