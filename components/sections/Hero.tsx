import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  callToAction?: string;
  ctaHref: string;
}

export default function HeroSectionHeroSectionProps({ title, subtitle, callToAction, ctaHref }: HeroSectionProps) {
  ctaHref = ctaHref || '#';
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800" aria-label="Solude">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {subtitle}
          </p>
          {callToAction && (
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                {callToAction}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}