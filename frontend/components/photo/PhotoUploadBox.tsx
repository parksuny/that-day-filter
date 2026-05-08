"use client";

import { ImagePlus, Sparkles } from "lucide-react";

type Props = {
  situation: string;
  mood: string;
  onSituationChange: (value: string) => void;
  onMoodChange: (value: string) => void;
  onImageUpload: (url: string) => void;
};

export default function PhotoUploadBox({
  situation,
  mood,
  onSituationChange,
  onMoodChange,
  onImageUpload,
}: Props) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    onImageUpload(url);
  };

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-stone-300 bg-white px-6 py-10 text-center hover:bg-stone-50">
        <ImagePlus className="mb-3 text-stone-500" size={34} />
        <span className="font-bold">사진 업로드</span>
        <span className="mt-1 text-sm text-stone-500">JPG, PNG 파일을 선택하세요</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-stone-700">
            사진을 찍었을 때의 상황
          </label>
          <textarea
            value={situation}
            onChange={(event) => onSituationChange(event.target.value)}
            className="h-28 w-full resize-none rounded-2xl border border-stone-200 bg-white p-4 text-sm outline-none focus:border-stone-500"
            placeholder="예: 밤 늦게 프로젝트를 끝내고 집에 가는 길"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-stone-700">
            그때 느낀 감정과 분위기
          </label>
          <textarea
            value={mood}
            onChange={(event) => onMoodChange(event.target.value)}
            className="h-28 w-full resize-none rounded-2xl border border-stone-200 bg-white p-4 text-sm outline-none focus:border-stone-500"
            placeholder="예: 뿌듯했지만 조금 지쳐 있었다"
          />
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-5 py-4 font-bold text-white shadow-sm hover:bg-stone-700">
        <Sparkles size={18} />
        AI 필터 적용하기
      </button>
    </div>
  );
}