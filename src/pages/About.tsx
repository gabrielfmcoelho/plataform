import { ArrowRight } from 'lucide-react';
import DemoRequestModal from '../components/DemoRequestModal';
import TeamNewsCard from '../components/TeamNewsCard';
import { useState } from 'react';
import { useAboutData } from '../hooks/useAboutData';


export default function About() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { teamMembers, teamNews, partners, loading, error } = useAboutData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 py-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              About Solude
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transforming healthcare through innovative technology solutions
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600">
                At Solude, we're dedicated to revolutionizing healthcare management through cutting-edge technology. 
                Our mission is to empower healthcare providers with intelligent solutions that improve patient outcomes, 
                streamline operations, and drive innovation in healthcare delivery.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                alt="Our mission"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured News Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
            <p className="mt-4 text-xl text-gray-600">
              Stay up to date with our latest research and achievements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamNews.map((news) => {
              const author = teamMembers.find(member => member.id === news.authorId)!;
              return (
                <TeamNewsCard
                  key={news.id}
                  news={news}
                  author={author}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-xl text-gray-600">
              Meet the experts behind our innovative solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mt-1">{member.role}</p>
                  <p className="mt-3 text-gray-600 mb-4">{member.description}</p>
                  <div className="flex space-x-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.lattes && (
                      <a
                        href={member.lattes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        Lattes
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
            <p className="mt-4 text-xl text-gray-600">
              Leading healthcare institutions that trust our solutions
            </p>
            <p className="mt-4 text-xl text-gray-600">
              Leading healthcare institutions that trust our solutions
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="col-span-1 flex justify-center items-center py-8 px-8 bg-gray-50 rounded-lg"
              >
                <img
                  className="max-h-12"
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book a Talk Section */}
      <div className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Transform Healthcare?</h2>
            <p className="mt-4 text-xl text-blue-100">
              Schedule a demo to see how our solutions can benefit your organization
            </p>
            <button
              onClick={() => setShowDemoModal(true)}
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <DemoRequestModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        serviceName="Solude Health Tech"
      />
    </div>
  );
}