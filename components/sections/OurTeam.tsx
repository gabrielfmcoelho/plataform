import { TeamMember } from "@/types/team";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import Loading from "@/components/Loading";

interface OurTeamProps {
    loading: boolean;
    teamMembers: TeamMember[];
}

export default function OurTeamSection({ loading, teamMembers }: OurTeamProps) {
    return (
        <section className="py-16 bg-gray-50" aria-label="Nossa Equipe">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Nossa Equipe</h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Conheça os especialistas por trás das nossas soluções inovadoras
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <Loading />
                    ) :
                    teamMembers.map((member) => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}