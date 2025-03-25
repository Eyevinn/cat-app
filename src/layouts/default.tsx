import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex flex-col items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current pb-2"
          href="https://www.npmjs.com/package/@eyevinn/cat"
        >
          <span className="text-default-600">
            Based on @eyevinn/cat NPM library
          </span>
        </Link>
        <Link
          isExternal
          className="flex items-center gap-1 text-small"
          href="https://www.eyevinn.se"
          title="Eyevinn homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Eyevinn Technology AB</p>
        </Link>
      </footer>
    </div>
  );
}
