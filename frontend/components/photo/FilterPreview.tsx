import { Wand2 } from "lucide-react";
import { FilterResult } from "@/types/photo";

type Props = {
  imageUrl: string;
  filter: FilterResult;
};

export default function FilterPreview({ imageUrl, filter }: Props) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="overflow-hidden rounded-[1.5rem] bg-stone-100">
        <img
          src={imageUrl}
          alt="AI filtered result"
          className="h-[430px] w-full object-cover transition-all duration-500"
          style={{ filter: filter.css }}
        />
      </div>

      <div className="mt-5 rounded-2xl bg-stone-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
          <Wand2 size={16} />
          적용된 필터
        </div>
        <p className="font-bold text-stone-900">{filter.name}</p>
        <p className="mt-2 text-sm leading-6 text-stone-500">{filter.description}</p>
      </div>
    </div>
  );
}