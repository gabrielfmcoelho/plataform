import type { TeamMember } from '@/types/team';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
  );
}