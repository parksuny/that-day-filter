"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import Header from "@/components/common/Header";
import FadeInSection from "@/components/common/FadeInSection";
import { getFilterStyle } from "@/lib/filter";
import {
  Camera,
  Film,
  Heart,
  ImagePlus,
  Lock,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState(
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
  );

  const [situation, setSituation] = useState("비가 온 뒤, 혼자 천천히 걸어가던 저녁");
  const [mood, setMood] = useState("조금 외로웠지만 이상하게 편안했고, 공기가 부드러웠음");

  const filter = useMemo(() => getFilterStyle(`${situation} ${mood}`), [situation, mood]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f1ea] text-stone-900">
      <Header />

      <main>
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,238,215,0.95),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(255,211,218,0.62),transparent_30%),radial-gradient(circle_at_48%_88%,rgba(217,196,255,0.35),transparent_35%),linear-gradient(135deg,#f8f1ea_0%,#f4e8de_45%,#efe7df_100%)]" />
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-amber-200/35 blur-3xl" />
          <div className="absolute -right-28 top-32 h-96 w-96 rounded-full bg-rose-200/45 blur-3xl" />
          <div className="absolute bottom-[-100px] left-1/3 h-96 w-96 rounded-full bg-violet-200/25 blur-3xl" />

          <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <FadeInSection>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm text-stone-600 shadow-sm backdrop-blur-xl">
                  <Sparkles size={16} />
                  That Day Filter
                </div>
              </FadeInSection>

              <FadeInSection delay={0.08}>
                <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
                  그날의 공기까지
                  <br />
                  사진에 남길 수 있다면
                </h1>
              </FadeInSection>

              <FadeInSection className="mt-8" delay={0.16}>
                <div className="space-y-4 text-lg leading-9 text-stone-600 md:text-xl">
                  <p>사진은 순간을 기억하게 하는 가장 조용한 매개체입니다.</p>
                  <p>
                    우리는 사진을 통해 지나간 시간을 형태로 보존하지만,
                    <br className="hidden md:block" />
                    그 순간의 감정과 분위기는 쉽게 흐려지곤 합니다.
                  </p>
                  <p>
                    그날의 마음, 공기, 빛, 온도까지
                    <br className="hidden md:block" />
                    다시 느낄 수 있다면 어떨까요?
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection className="mt-8" delay={0.24}>
                <div className="inline-block rotate-[-1.5deg] rounded-[1.8rem] bg-[#fff4cf]/85 px-6 py-5 shadow-xl shadow-stone-900/10 backdrop-blur-md">
                  <p className="text-base leading-8 text-stone-700 md:text-lg">
                    그 순간을,
                    <br />
                    당신만의 필터와 함께
                    <br />
                    다시 느껴보세요.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection className="mt-10 flex flex-wrap gap-4" delay={0.32}>
                <a
                  href="#memory-maker"
                  className="rounded-full bg-stone-900 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-700"
                >
                  지금 바로 만들어보기
                </a>

                <Link
                  href="/gallery"
                  className="rounded-full border border-stone-300 bg-white/65 px-7 py-4 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-xl transition hover:bg-white"
                >
                  감정 갤러리 보기
                </Link>
              </FadeInSection>
            </div>

            <FadeInSection delay={0.18}>
              <div className="relative">
                <div className="absolute -left-5 -top-5 z-10 hidden rotate-[-6deg] rounded-3xl bg-[#fff7d8]/90 p-5 text-sm leading-7 text-stone-700 shadow-xl backdrop-blur-md md:block">
                  “오늘은 조용했고,
                  <br />
                  이상하게 오래 기억하고 싶었다.”
                </div>

                <div className="overflow-hidden rounded-[2.4rem] border border-white/70 bg-white/50 p-4 shadow-2xl shadow-stone-900/10 backdrop-blur-2xl">
                  <img
                    src={uploadedImage}
                    alt="Filtered memory preview"
                    className="h-[520px] w-full rounded-[1.8rem] object-cover"
                    style={{ filter: filter.css }}
                  />

                  <div className="mt-4 flex items-center justify-between px-2 pb-1">
                    <div>
                      <p className="text-sm text-stone-500">Applied memory filter</p>
                      <p className="text-lg font-bold text-stone-900">{filter.name}</p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur-md">
                      <Wand2 size={16} />
                      AI Filter
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-7 right-6 rotate-[3deg] rounded-[1.5rem] bg-white/70 px-5 py-4 text-sm leading-6 text-stone-600 shadow-xl backdrop-blur-md">
                  감정이 색감이 되고,
                  <br />
                  기억이 하나의 장면이 됩니다.
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="memory-maker" className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <FadeInSection className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-stone-400">
                Make your memory
              </p>
              <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                사진을 올리고,
                <br />
                그날의 마음을 적어보세요.
              </h2>
              <p className="mt-6 text-base leading-8 text-stone-600 md:text-lg">
                입력한 감정과 상황에 따라 필터가 달라집니다.
                <br />
                지금은 프론트 단계의 미리보기지만, 이후에는 실제 AI 생성 API와 연결할 수 있습니다.
              </p>
            </FadeInSection>

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <FadeInSection>
                <div className="rounded-[2.2rem] border border-white/70 bg-white/60 p-6 shadow-xl shadow-stone-900/5 backdrop-blur-2xl">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.7rem] border-2 border-dashed border-stone-300/80 bg-white/60 px-6 py-10 text-center transition hover:bg-white/85">
                    <ImagePlus className="mb-3 text-stone-500" size={34} />
                    <span className="font-bold text-stone-800">사진 업로드</span>
                    <span className="mt-1 text-sm text-stone-500">
                      기억하고 싶은 장면을 선택하세요
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-stone-700">
                        사진을 찍었을 때의 상황
                      </label>
                      <textarea
                        value={situation}
                        onChange={(event) => setSituation(event.target.value)}
                        className="h-28 w-full resize-none rounded-2xl border border-stone-200/80 bg-white/80 p-4 text-sm leading-6 outline-none backdrop-blur-md focus:border-stone-500"
                        placeholder="예: 해가 지기 직전, 혼자 걷던 골목"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-stone-700">
                        그때 느꼈던 감정과 분위기
                      </label>
                      <textarea
                        value={mood}
                        onChange={(event) => setMood(event.target.value)}
                        className="h-28 w-full resize-none rounded-2xl border border-stone-200/80 bg-white/80 p-4 text-sm leading-6 outline-none backdrop-blur-md focus:border-stone-500"
                        placeholder="예: 조금 쓸쓸했지만 마음이 편안했다"
                      />
                    </div>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-5 py-4 font-bold text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-700">
                    <Sparkles size={18} />
                    이 감정으로 필터 만들기
                  </button>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.12}>
                <div className="relative rounded-[2.2rem] border border-white/70 bg-white/60 p-5 shadow-xl shadow-stone-900/5 backdrop-blur-2xl">
                  <div className="overflow-hidden rounded-[1.8rem] bg-stone-100">
                    <img
                      src={uploadedImage}
                      alt="Memory filter result"
                      className="h-[520px] w-full object-cover transition-all duration-700"
                      style={{ filter: filter.css }}
                    />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md">
                      <p className="text-sm text-stone-500">Selected filter</p>
                      <p className="mt-1 text-xl font-black text-stone-900">{filter.name}</p>
                      <p className="mt-3 text-sm leading-6 text-stone-500">
                        {filter.description}
                      </p>
                    </div>

                    <div className="rotate-[-1.5deg] rounded-2xl bg-[#fff4cf]/90 p-5 shadow-sm">
                      <p className="text-sm font-bold text-stone-800">그날의 메모</p>
                      <p className="mt-3 text-sm leading-7 text-stone-700">{situation}</p>
                      <p className="mt-3 text-sm leading-7 text-stone-700">{mood}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <FadeInSection className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-stone-400">
              How it feels
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
              단순한 보정이 아니라,
              <br />
              기억의 분위기를 다시 만드는 일
            </h2>
          </FadeInSection>

          <div className="grid gap-6 md:grid-cols-3">
            <FadeInSection>
              <div className="h-full rounded-[2rem] border border-white/70 bg-white/60 p-7 shadow-lg shadow-stone-900/5 backdrop-blur-xl">
                <Camera className="mb-5 text-stone-700" />
                <h3 className="text-xl font-bold">순간을 올리고</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  카메라에 담긴 장면을 업로드합니다. 사진은 그날의 시작점이 됩니다.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="h-full rounded-[2rem] border border-white/70 bg-white/60 p-7 shadow-lg shadow-stone-900/5 backdrop-blur-xl">
                <Heart className="mb-5 text-stone-700" />
                <h3 className="text-xl font-bold">마음을 적고</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  외로움, 설렘, 평온함, 공기, 빛 같은 감정을 문장으로 남깁니다.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="h-full rounded-[2rem] border border-white/70 bg-white/60 p-7 shadow-lg shadow-stone-900/5 backdrop-blur-xl">
                <Wand2 className="mb-5 text-stone-700" />
                <h3 className="text-xl font-bold">필터로 기억합니다</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  감정은 색감이 되고, 분위기는 톤이 되어 사진 위에 다시 얹힙니다.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section className="relative overflow-hidden bg-stone-950 py-24 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,220,180,0.18),transparent_34%),radial-gradient(circle_at_80%_85%,rgba(210,190,255,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <FadeInSection>
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-stone-400">
                    Future experience
                  </p>
                  <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                    언젠가는,
                    <br />
                    사진이 아주 짧게 움직이도록
                  </h2>
                </FadeInSection>

                <FadeInSection className="mt-8 max-w-2xl" delay={0.1}>
                  <p className="text-base leading-8 text-stone-300 md:text-lg">
                    3초 정도의 짧은 영상은 지금 당장 넣기보다,
                    <br />
                    필터 저장과 갤러리 기능이 안정화된 뒤 확장하는 편이 좋습니다.
                    <br />
                    대신 구조는 처음부터 영상 생성까지 확장 가능하게 설계합니다.
                  </p>
                </FadeInSection>
              </div>

              <FadeInSection delay={0.2}>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <div className="grid gap-5">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <Film className="mb-4 text-stone-300" />
                      <h3 className="font-bold">3초 감정 영상</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-300">
                        필터가 적용된 사진을 짧은 분위기 영상으로 확장
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <Lock className="mb-4 text-stone-300" />
                      <h3 className="font-bold">개인 기록 보호</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-300">
                        사진과 감정 기록은 사용자별로 안전하게 분리
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <ShieldCheck className="mb-4 text-stone-300" />
                      <h3 className="font-bold">보안 중심 설계</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-300">
                        업로드 검증, 접근 제어, API Key 보호를 기본 구조에 포함
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <FadeInSection>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-stone-400">
              That Day Filter
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              지나간 순간을
              <br />
              조금 더 그날답게.
            </h2>
          </FadeInSection>

          <FadeInSection className="mt-8" delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#memory-maker"
                className="rounded-full bg-stone-900 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-700"
              >
                필터 만들기
              </a>

              <Link
                href="/gallery"
                className="rounded-full border border-stone-300 bg-white/70 px-7 py-4 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-md transition hover:bg-white"
              >
                갤러리 보기
              </Link>
            </div>
          </FadeInSection>
        </section>
      </main>
    </div>
  );
}