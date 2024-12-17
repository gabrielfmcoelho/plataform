'use client';

import { Clock, Check, X, ExternalLink, Pin, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { Service } from '@/types/service';
import { useAuth } from '@/contexts/AuthContext';
import { serviceIcons } from '@/lib/utils/serviceIcons';
import { cn } from '@/lib/utils/cn';

interface ServiceCardProps {
  service: Service;
  onTogglePin?: (serviceId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ServiceCard({ service, onTogglePin, onEdit, onDelete }: ServiceCardProps) {
  const { user } = useAuth();
  const serviceUrl = `/service/${service.name.toLowerCase().replace(/\s+/g, '-')}`;
  const Icon = serviceIcons[service.tag] || serviceIcons['Clinical'];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
            {service.tag}
          </span>
          {user && (
            <button
              onClick={() => onTogglePin?.(service.id)}
              className={cn(
                "p-1.5 rounded-full transition-colors bg-white/90",
                service.isPinned ? "text-blue-600" : "text-gray-600"
              )}
              title={service.isPinned ? 'Unpin service' : 'Pin service'}
            >
              <Pin className={cn("h-4 w-4", service.isPinned && "fill-current")} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              {user && service.isSubscribed ? (
                <Link href={serviceUrl} className="hover:text-blue-600">
                  {service.name}
                </Link>
              ) : (
                service.name
              )}
            </h3>
          </div>
          {user && (
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                title="Edit service"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                title="Delete service"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-4">
          {service.description}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated {service.lastUpdate}</span>
          </div>
          {service.isSubscribed ? (
            <Link
              href={serviceUrl}
              className={cn(
                "w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700",
                "transition-colors text-sm sm:text-base inline-flex items-center justify-center"
              )}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Service
            </Link>
          ) : (
            <button className={cn(
              "w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
              "transition-colors text-sm sm:text-base"
            )}>
              Subscribe ${service.price}/mo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}