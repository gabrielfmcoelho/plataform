import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onDemoRequest: () => void;
}

export default function CTASection({ onDemoRequest }: CTASectionProps) {
  return (
    <div className="py-16 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Agende uma Conversa</h2>
          <p className="mt-4 text-xl text-blue-100">
            Descubra como podemos transformar a gestão da sua instituição
          </p>
          <button
            onClick={onDemoRequest}
            className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
          >
            Agendar Demonstração
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}