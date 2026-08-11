export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
        <p>© {new Date().getFullYear()} CineRate System. Built with Next.js & Prisma.</p>
        <p className="mt-2 sm:mt-0 font-medium text-stone-400">A centralized place for movie review</p>
      </div>
    </footer>
  );
}