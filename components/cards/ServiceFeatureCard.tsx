"use client"
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { MarketingService } from '@/types/service';
import { serviceIcons } from '@/lib/utils/serviceIcons';

interface ServiceFeatureCardProps {
  service: MarketingService;
  index: number;
  onDemoRequest: (serviceName: string) => void;
}

export default function ServiceFeatureCard({ service, index, onDemoRequest }: ServiceFeatureCardProps) {
  const Icon = serviceIcons['Clinical'];

  return (
    <article className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className={`mb-12 lg:mb-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
            <div className="flex items-center space-x-3 mb-6">
              <Icon className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">{service.marketing_name}</h2>
            </div>
            <p className="text-xl font-semibold text-blue-600 mb-4">{service.tag_line}</p>
            <p className="text-gray-600 mb-8">{service.description}</p>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefícios Comprovados</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Principais</h3>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => onDemoRequest(service.marketing_name)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Agendar Demonstração
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={service.screenshot_url}
                alt={`${service.marketing_name} interface`}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}