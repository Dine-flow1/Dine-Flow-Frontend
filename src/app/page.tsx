import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#6b2c3e] to-[#4a1f2d]">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-white md:text-8xl">
            DineFlow
          </h1>
          <h2 className="text-2xl text-gray-200 md:text-3xl">
            Premium Dining Experience
          </h2>
        </div>
      </main>
    </div>
  );
}