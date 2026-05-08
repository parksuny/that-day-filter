import { BookOpen } from "lucide-react";
import { Photo } from "@/types/photo";

type Props = {
  photo: Photo;
};

export default function PhotoDiaryNote({ photo }: Props) {
  return (
    <div className="rotate-[-1.5deg] rounded-2xl bg-yellow-100 p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 font-bold text-stone-800">
        <BookOpen size={17} />
        그날의 메모
      </div>

      <p className="text-sm leading-6 text-stone-700">상황: {photo.situation}</p>

      <p className="mt-3 text-sm leading-6 text-stone-700">감정: {photo.mood}</p>
    </div>
  );
}