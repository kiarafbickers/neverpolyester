import Image from "next/image";

interface Logo {
  alt: string;
  src: string;
}

interface Props {
  logos: Logo[];
}

export default function MediaLogos({ logos }: Props) {
  return (
    <div className="bg-primaryDz py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center">
          Not Yet Seen On
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <Image
                alt={logo.alt}
                src={logo.src}
                width={158}
                height={48}
                className="max-h-12 object-contain"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
