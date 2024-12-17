export default function AboutUsSection() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
              alt="Nossa missão"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-blue-900 opacity-10 rounded-lg"></div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
            <p className="text-xl text-gray-600">
              Health Tech com o propósito de ajudar gestores na tomada de decisões baseadas na organização e visualização dos dados de Saúde, gerando eficiência na saúde e no uso e captação de recursos financeiros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}