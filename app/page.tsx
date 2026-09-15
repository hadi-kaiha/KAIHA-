import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-bold">KAIHA</h1>
      </main>
    </>
  );
}
