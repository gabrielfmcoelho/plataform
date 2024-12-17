import { Calendar, ArrowUpRight } from 'lucide-react';
import type { TeamNews, TeamMember } from '@/types/team';

interface TeamNewsCardProps {
  news: TeamNews;
  author: TeamMember;
}

export default function TeamNewsCard({ news, author }: TeamNewsCardProps) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4" />
          <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
          {news.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{news.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={author.image}
              alt={author.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{author.name}</p>
              <p className="text-gray-500">{author.role}</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-blue-600" />
        </div>
      </div>
    </a>
  );
}