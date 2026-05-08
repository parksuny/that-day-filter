import { FilterResult } from "@/types/photo";

export function getFilterStyle(text: string): FilterResult {
  const value = text.toLowerCase();

  if (
    value.includes("슬픔") ||
    value.includes("외로") ||
    value.includes("비") ||
    value.includes("우울") ||
    value.includes("sad") ||
    value.includes("rain")
  ) {
    return {
      name: "Soft Rain Blue",
      css: "contrast(0.95) saturate(0.8) brightness(0.92) hue-rotate(180deg)",
      description: "푸른빛과 낮은 채도로 조용하고 차분한 분위기를 표현합니다.",
    };
  }

  if (
    value.includes("행복") ||
    value.includes("따뜻") ||
    value.includes("설렘") ||
    value.includes("기쁨") ||
    value.includes("happy") ||
    value.includes("warm")
  ) {
    return {
      name: "Warm Memory",
      css: "contrast(1.05) saturate(1.25) brightness(1.08) sepia(0.18)",
      description: "따뜻한 색감과 부드러운 대비로 행복한 기억처럼 보이게 합니다.",
    };
  }

  if (
    value.includes("밤") ||
    value.includes("집중") ||
    value.includes("차분") ||
    value.includes("고요") ||
    value.includes("night") ||
    value.includes("focus")
  ) {
    return {
      name: "Midnight Focus",
      css: "contrast(1.12) saturate(0.9) brightness(0.82) hue-rotate(210deg)",
      description: "어두운 톤과 깊은 대비로 밤의 집중감을 표현합니다.",
    };
  }

  if (
    value.includes("몽환") ||
    value.includes("꿈") ||
    value.includes("흐릿") ||
    value.includes("dream")
  ) {
    return {
      name: "Dream Blur",
      css: "contrast(0.98) saturate(1.15) brightness(1.03) blur(0.4px) hue-rotate(25deg)",
      description: "몽환적인 색감과 약한 흐림으로 꿈같은 분위기를 표현합니다.",
    };
  }

  return {
    name: "Neutral Diary Tone",
    css: "contrast(1.02) saturate(1.05) brightness(1)",
    description: "입력한 감정이 강하지 않을 때 자연스럽고 일기 같은 색감을 유지합니다.",
  };
}