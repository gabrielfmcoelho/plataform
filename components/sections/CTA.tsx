import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  calling: string;
  description: string;
  callToAction: string;
  onDemoRequest: () => void;
}

export default function CTASection({ calling, description, callToAction, onDemoRequest }: CTASectionProps) {
  return (
    <section className="py-16 bg-blue-900" aria-label="Agende uma Conversa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">{calling}</h2>
          <p className="mt-4 text-xl text-blue-100">{description}</p>
          <button
            onClick={onDemoRequest}
            className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
          >
            {callToAction}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}