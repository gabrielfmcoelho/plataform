export default function OurWorkSection() {
  return (
    <section className="py-16 bg-gray-50" aria-label="Nosso Trabalho">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nosso Trabalho</h2>
            <p className="text-xl text-gray-600">
                'A Solude Health Tech oferece uma série de produtos e serviços que auxiliam instituições de saúde, como hospitais e clínicas, a tomar decisões informadas, economizar recursos e melhorar a qualidade do atendimento.'
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
              alt="Nossa equipe trabalhando"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-blue-900 opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}