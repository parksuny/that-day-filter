"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import { getImageUrl, getUserPhotos, type BackendPhoto } from "@/lib/photosApi";
import { ImageIcon, Loader2, User } from "lucide-react";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<BackendPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await getUserPhotos(1);
        setPhotos(result);
      } catch (error) {
        console.error(error);
        setErrorMessage("사진 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f1ea] text-stone-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-400">
              Profile Gallery
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              내 감정 필터 갤러리
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
              백엔드에서 생성된 필터 이미지와 그날의 감정 기록을 불러옵니다.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-stone-600 shadow-sm backdrop-blur-md md:flex">
            <User size={16} />
            User 1
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-[360px] items-center justify-center rounded-[2rem] border border-white/70 bg-white/60 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3 text-stone-500">
              <Loader2 className="animate-spin" size={20} />
              사진 목록을 불러오는 중...
            </div>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && photos.length === 0 && (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-white/70 bg-white/60 p-8 text-center shadow-sm backdrop-blur-xl">
            <ImageIcon className="mb-4 text-stone-400" size={42} />
            <h3 className="text-xl font-black">아직 저장된 사진이 없어요.</h3>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              먼저 사진을 업로드하고 감정 필터를 생성해보세요.
            </p>
            <Link
              href="/create"
              className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-700"
            >
              필터 만들러 가기
            </Link>
          </div>
        )}

        {!isLoading && !errorMessage && photos.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <Link
                key={photo.id}
                href={`/gallery/${photo.id}`}
                className="group overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/65 p-3 shadow-lg shadow-stone-900/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={getImageUrl(photo.filteredImageUrl)}
                  alt={photo.title}
                  className="h-64 w-full rounded-[1.3rem] object-cover transition duration-500 group-hover:scale-[1.03]"
                />

                <div className="p-4">
                  <p className="text-xs text-stone-400">
                    {new Date(photo.createdAt).toLocaleString("ko-KR")}
                  </p>
                  <h3 className="mt-2 text-lg font-black">{photo.title}</h3>
                  <p className="mt-1 text-sm font-medium text-stone-500">
                    {photo.filterName}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
                    {photo.mood}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}