"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/common/Header";
import { getImageUrl, getPhoto, type BackendPhoto } from "@/lib/photosApi";
import { BookOpen, Loader2, Wand2 } from "lucide-react";

export default function PhotoDetailPage() {
  const params = useParams();
  const photoId = Number(params.photoId);

  const [photo, setPhoto] = useState<BackendPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const result = await getPhoto(photoId);
        setPhoto(result);
      } catch (error) {
        console.error(error);
        setErrorMessage("사진 상세 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!Number.isNaN(photoId)) {
      fetchPhoto();
    }
  }, [photoId]);

  return (
    <div className="min-h-screen bg-[#f8f1ea] text-stone-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <Link href="/gallery" className="text-sm font-semibold text-stone-500 hover:text-stone-900">
          ← 갤러리로 돌아가기
        </Link>

        {isLoading && (
          <div className="mt-8 flex min-h-[420px] items-center justify-center rounded-[2rem] border border-white/70 bg-white/60 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3 text-stone-500">
              <Loader2 className="animate-spin" size={20} />
              사진 정보를 불러오는 중...
            </div>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        {!isLoading && photo && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-xl shadow-stone-900/5 backdrop-blur-xl">
              <img
                src={getImageUrl(photo.filteredImageUrl)}
                alt={photo.title}
                className="h-[560px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div>
              <p className="text-sm text-stone-400">
                {new Date(photo.createdAt).toLocaleString("ko-KR")}
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight">
                {photo.title}
              </h2>

              <div className="mt-5 rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-xl">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                  <Wand2 size={16} />
                  Applied filter
                </div>
                <p className="mt-1 text-xl font-black">{photo.filterName}</p>
                <p className="mt-3 text-sm leading-6 text-stone-500">
                  백엔드에서 감정/상황 텍스트를 기반으로 선택하고 실제 이미지 파일에 적용한 필터입니다.
                </p>
              </div>

              <div className="mt-6 rotate-[-1.5deg] rounded-2xl bg-[#fff4cf]/90 p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 font-bold text-stone-800">
                  <BookOpen size={17} />
                  그날의 메모
                </div>

                <p className="text-sm leading-7 text-stone-700">
                  상황: {photo.situation}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-700">
                  감정: {photo.mood}
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-white/70 p-5 text-sm leading-7 text-stone-500 shadow-sm backdrop-blur-xl">
                <p className="font-bold text-stone-700">저장 경로</p>
                <p className="mt-2 break-all">원본: {photo.originalImageUrl}</p>
                <p className="mt-1 break-all">필터: {photo.filteredImageUrl}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}