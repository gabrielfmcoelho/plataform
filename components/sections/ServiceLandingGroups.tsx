import { MarketingService } from "@/types/service";
import Loading from "@/components/Loading";
import ServiceFeatureCard from "@/components/cards/ServiceFeatureCard";

interface ServiceLandingGroupsProps {
    loading: boolean;
    services: MarketingService[];
    handleServiceClick: (serviceName: string) => void;
}

export default function ServiceLandingGroups({ loading, services, handleServiceClick }: ServiceLandingGroupsProps) {
    return (
        <section aria-label="Nossas Aplicações">
                {loading ? (
                    <Loading />
                ) : (
                    services.map((service, index) => (
                        <ServiceFeatureCard
                            key={service.id}
                            service={service}
                            index={index}
                            onDemoRequest={handleServiceClick}
                        />
                    ))
                )}
        </section>
    );
}