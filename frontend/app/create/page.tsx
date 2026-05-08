"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Header from "@/components/common/Header";
import { createPhoto, getImageUrl, type BackendPhoto } from "@/lib/photosApi";
import { getFilterStyle } from "@/lib/filter";
import { ImagePlus, Loader2, Sparkles, Wand2 } from "lucide-react";

export default function CreatePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
  );

  const [title, setTitle] = useState("비 오는 저녁");
  const [situation, setSituation] = useState("비가 온 뒤 혼자 걸어가던 길");
  const [mood, setMood] = useState("조금 외롭고 차분했음");

  const [createdPhoto, setCreatedPhoto] = useState<BackendPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const previewFilter = useMemo(() => getFilterStyle(`${situation} ${mood}`), [situation, mood]);

  const resultImageUrl = createdPhoto
    ? getImageUrl(createdPhoto.filteredImageUrl)
    : previewImage;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setCreatedPhoto(null);
    setErrorMessage("");

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("먼저 필터를 적용할 사진을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();

      formData.append("userId", "1");
      formData.append("title", title);
      formData.append("situation", situation);
      formData.append("mood", mood);
      formData.append("file", selectedFile);

      const result = await createPhoto(formData);
      setCreatedPhoto(result);
    } catch (error) {
      console.error(error);
      setErrorMessage("사진 업로드 또는 필터 생성 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f1ea] text-stone-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-400">
              Create
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              사진과 감정을 입력하세요
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
              사진을 선택하고 그 순간의 상황과 감정을 입력하면, 백엔드 서버가 실제 필터 이미지를 생성합니다.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-xl shadow-stone-900/5 backdrop-blur-xl"
          >
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-stone-300 bg-white/70 px-6 py-10 text-center transition hover:bg-white">
              <ImagePlus className="mb-3 text-stone-500" size={34} />
              <span className="font-bold">사진 업로드</span>
              <span className="mt-1 text-sm text-stone-500">
                JPG, PNG, WEBP 파일을 선택하세요
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>

            {selectedFile && (
              <p className="mt-3 text-sm text-stone-500">
                선택된 파일: <span className="font-semibold text-stone-800">{selectedFile.name}</span>
              </p>
            )}

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-stone-700">제목</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm outline-none focus:border-stone-500"
                  placeholder="예: 비 오는 저녁"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-stone-700">
                  사진을 찍었을 때의 상황
                </label>
                <textarea
                  value={situation}
                  onChange={(event) => setSituation(event.target.value)}
                  className="h-28 w-full resize-none rounded-2xl border border-stone-200 bg-white/80 p-4 text-sm leading-6 outline-none focus:border-stone-500"
                  placeholder="예: 비가 온 뒤 혼자 걸어가던 길"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-stone-700">
                  그때 느꼈던 감정과 분위기
                </label>
                <textarea
                  value={mood}
                  onChange={(event) => setMood(event.target.value)}
                  className="h-28 w-full resize-none rounded-2xl border border-stone-200 bg-white/80 p-4 text-sm leading-6 outline-none focus:border-stone-500"
                  placeholder="예: 조금 외롭고 차분했음"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-5 py-4 font-bold text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  필터 생성 중...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  이 감정으로 필터 생성하기
                </>
              )}
            </button>
          </form>

          <section className="rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-xl shadow-stone-900/5 backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.5rem] bg-stone-100">
              <img
                src={resultImageUrl}
                alt="Filtered result"
                className="h-[520px] w-full object-cover transition-all duration-500"
                style={{ filter: createdPhoto ? "none" : previewFilter.css }}
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl bg-white/75 p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                  <Wand2 size={16} />
                  적용된 필터
                </div>

                <p className="text-xl font-black text-stone-900">
                  {createdPhoto ? createdPhoto.filterName : previewFilter.name}
                </p>

                <p className="mt-3 text-sm leading-6 text-stone-500">
                  {createdPhoto
                    ? "백엔드에서 실제 이미지 파일에 필터를 적용해 생성한 결과입니다."
                    : previewFilter.description}
                </p>
              </div>

              <div className="rotate-[-1.5deg] rounded-2xl bg-[#fff4cf]/90 p-5 shadow-sm">
                <p className="text-sm font-bold text-stone-800">그날의 메모</p>
                <p className="mt-3 text-sm leading-7 text-stone-700">{situation}</p>
                <p className="mt-3 text-sm leading-7 text-stone-700">{mood}</p>
              </div>
            </div>

            {createdPhoto && (
              <div className="mt-5 rounded-2xl bg-green-50 p-4 text-sm leading-6 text-green-700">
                필터 이미지 생성 완료! 이제 갤러리에서 이 사진을 불러올 수 있습니다.
                <br />
                저장된 이미지 경로: {createdPhoto.filteredImageUrl}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}