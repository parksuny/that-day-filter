import Link from "next/link";
import { Photo } from "@/types/photo";
import { getFilterStyle } from "@/lib/filter";

type Props = {
  photo: Photo;
};

export default function PhotoCard({ photo }: Props) {
  const filter = getFilterStyle(`${photo.situation} ${photo.mood}`);

  return (
    <Link
      href={`/gallery/${photo.id}`}
      className="group overflow-hidden rounded-[1.7rem] border border-stone-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className="h-56 w-full rounded-[1.2rem] object-cover transition group-hover:scale-[1.03]"
        style={{ filter: filter.css }}
      />

      <div className="p-3">
        <p className="text-xs text-stone-400">{photo.date}</p>
        <h3 className="mt-1 font-bold">{photo.title}</h3>
        <p className="mt-1 text-sm text-stone-500">{photo.filterName}</p>
      </div>
    </Link>
  );
}