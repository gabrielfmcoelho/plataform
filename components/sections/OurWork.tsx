import { useTranslation } from 'react-i18next';

export default function OurWorkSection() {
  const { t } = useTranslation();  // Use the t function to fetch translations

  return (
    <section className="py-16 bg-gray-50" aria-label={t('ourWork.title')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ourWork.title')}</h2>
            <p className="text-xl text-gray-600">{t('ourWork.description')}</p>
          </div>
          <div className="max-lg:flex max-lg:justify-center">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
              alt={t('ourWork.alt')}
              className="rounded-lg shadow-xl max-lg:w-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
