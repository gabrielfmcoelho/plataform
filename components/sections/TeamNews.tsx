import TeamNewsCard from '@/components/cards/TeamNewsCard';
import { TeamMember } from '@/types/team';
import { TeamNews } from '@/types/team';
import Loading from '@/components/Loading';

interface TeamNewsProps {
    loading: boolean;
    teamMembers: TeamMember[];
    teamNews: TeamNews[];
}

export default function TeamNewsSection({ loading, teamMembers, teamNews }: TeamNewsProps) {
    return (
        <section className="py-16 bg-gray-50" aria-label="Notícias da Equipe">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Notícias da Equipe</h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Fique por dentro de tudo o que acontece na nossa equipe
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <Loading />
                    ) : (
                        teamNews.map((news) => {
                            const author = teamMembers.find(member => member.id === news.authorId)!;
                            return( 
                                <TeamNewsCard key={news.id} news={news} author={author} />
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
