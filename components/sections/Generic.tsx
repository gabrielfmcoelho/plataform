import { Section } from "@/types/section";

interface GenericSectionProps extends Section {
  backgroundType: number;
  inverted?: boolean;
}

export default function GenericSection({
  title,
  description,
  imgAlt,
  backgroundType,
  inverted = false,
}: GenericSectionProps) {
  // Define a classe de fundo com base no valor de backgroundType
  const backgroundClass =
    backgroundType === 1 ? "bg-gray-50" :
    backgroundType === 2 ? "bg-red-500" : "";

  // Define a ordem das divs (texto e imagem) com base em `inverted`
  const contentOrder = inverted
    ? ["image", "text"]
    : ["text", "image"];

  return (
    <section className={`py-16 ${backgroundClass}`} aria-label={title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {contentOrder.map((item, index) => (
            item === "text" ? (
              <div key={index} className={`text-center ${inverted ? "lg:text-left" : "lg:text-right"}`}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
                <p className="text-xl text-gray-600">{description}</p>
              </div>
            ) : (
              <div key={index} className="max-lg:flex max-lg:justify-center">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                  alt={imgAlt}
                  className="rounded-lg shadow-xl max-lg:w-1/2"
                />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
