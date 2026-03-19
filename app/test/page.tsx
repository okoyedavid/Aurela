export default function page() {
  return (
    <main className="max-w-6xl mx-auto p-6 grid gap-10">
      {/* <!-- 1. Hero Banner --> */}
      <section className="relative hero-section text-white p-10 flex flex-col justify-center items-center min-h-[250px] bg-linear-to-r from-indigo-600 to-purple-500">
        <h1 className="text-4xl font-bold">Polygon Hero Banner</h1>
        <p className="text-sm mt-2 text-gray-200">
          Uses angled bottom for dynamic visual separation
        </p>
      </section>

      {/* <!-- 2. Skewed Card --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 text-gray-800">
          <h2 className="text-xl font-bold mb-2">Skewed Card Edge</h2>
          <p className="text-sm text-gray-600">
            A stylish diagonal divider between text and image.
          </p>
        </div>
        <div
          className="card-img relative h-48 md:h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1550439062-609e1531270e"
            )`,
          }}
        ></div>
      </div>

      {/* <!-- 3. Diamond Avatar --> */}
      <div className="flex justify-center">
        <div
          className="diamond-avatar w-32 h-32 bg-cover bg-center border-4 border-white shadow-lg"
          style={{
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1550439062-609e1531270e"
            )`,
          }}
        ></div>
      </div>

      {/* <!-- 4. Hexagonal Gallery --> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="hex bg-blue-500 aspect-square"></div>
        <div className="hex bg-pink-400 aspect-square"></div>
        <div className="hex bg-yellow-400 aspect-square"></div>
        <div className="hex bg-green-500 aspect-square"></div>
      </div>

      {/* <!-- 5. Ribbon Label --> */}
      <div className="relative inline-block px-6 py-3 bg-indigo-600 text-white text-lg font-semibold ribbon">
        Ribbon Label
      </div>

      {/* <!-- 6. Diagonal Split Section --> */}
      <section className="relative overflow-hidden text-white bg-gray-800 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-2">Diagonal Split Section</h2>
          <p className="text-gray-300 text-sm">
            Uses polygon to create a diagonal color transition.
          </p>
        </div>
        <div
          className="split-img w-full md:w-1/2 h-48 bg-cover bg-center"
          style={{
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1550439062-609e1531270e"
            )`,
          }}
        ></div>
      </section>

      {/* <!-- 7. Trapezoid Button --> */}
      <button className="trapezoid-btn px-8 py-3 text-white font-bold text-sm">
        SHOP NOW
      </button>

      {/* <!-- 8. Footer Banner --> */}
      <footer className="footer-banner text-white text-center py-8">
        <h3 className="text-lg font-semibold">Polygon Footer Banner</h3>
        <p className="text-gray-300 text-sm">
          Stylish angular shape for a clean closing section.
        </p>
      </footer>
    </main>
  );
}
