export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-gray-600 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4">
            Never Polyester is a premium fashion technology brand with a
            shopping app that serves over 160 million annual shoppers, offering
            a vast selection from 17,000 leading brands and retailers worldwide.
          </p>
          <p className="mt-4">
            We focus on enhancing the online success of our partner brands and
            stores, driving significant direct sales through our platform.
          </p>
          <p className="mt-4">
            Our mission includes providing a trusted and eco-friendly shopping
            experience, aligning with consumers’ growing demand for ethical and
            sustainable choices in fashion.
          </p>
        </div>
        <div className="mt-16 border-t border-gray-300 pt-10">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-12">
            <div className="md:border-r md:border-gray-300 md:pr-8">
              <p className="text-3xl font-bold text-gray-900">8,000,000+</p>
              <p className="mt-3 text-base text-gray-600">
                Products can be explored and purchased via the Never Polyester
                website and app.
              </p>
            </div>
            <div className="md:border-r md:border-gray-300 md:px-8">
              <p className="text-3xl font-bold text-gray-900">#1</p>
              <p className="mt-3 text-base text-gray-600">
                The Never Polyester app is the most downloaded premium fashion
                app on iOS worldwide*.
              </p>
            </div>
            <div className="md:pl-8">
              <p className="text-3xl font-bold text-gray-900">$2BN</p>
              <p className="mt-3 text-base text-gray-600">
                Lifetime GMV has now surpassed $2 billion USD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
