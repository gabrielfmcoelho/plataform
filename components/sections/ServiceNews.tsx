import { Calendar, ArrowRight } from 'lucide-react';
import type { ServiceNews } from '@/types/service';

interface ServiceNewsProps {
  news: ServiceNews[];
}

export default function ServiceNews({ news }: ServiceNewsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {item.date}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.content}</p>
              <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                Read more
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}