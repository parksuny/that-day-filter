import Link from "next/link";
import { Camera } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white shadow-sm">
            <Camera size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">That Day Filter</h1>
            <p className="text-xs text-stone-500">감정으로 완성하는 사진 일기</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
          <Link href="/create" className="hover:text-stone-950">
            Create
          </Link>
          <Link href="/gallery" className="hover:text-stone-950">
            Gallery
          </Link>
          <Link href="/login" className="hover:text-stone-950">
            Login
          </Link>
        </nav>

        <Link
          href="/gallery"
          className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-700"
        >
          My Profile
        </Link>
      </div>
    </header>
  );
}