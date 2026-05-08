import Link from "next/link";
import Header from "@/components/common/Header";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />

      <main className="mx-auto flex max-w-md flex-col px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">회원가입</h2>
        <p className="mt-2 text-sm text-stone-500">
          That Day Filter에서 나만의 감정 사진 일기를 시작하세요.
        </p>

        <form className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-bold text-stone-700">닉네임</label>
            <input
              type="text"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500"
              placeholder="nickname"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-stone-700">이메일</label>
            <input
              type="email"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-stone-700">비밀번호</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500"
              placeholder="비밀번호"
            />
          </div>

          <button className="mt-6 w-full rounded-2xl bg-stone-900 px-5 py-4 font-bold text-white hover:bg-stone-700">
            회원가입
          </button>

          <p className="mt-5 text-center text-sm text-stone-500">
            이미 계정이 있나요?{" "}
            <Link href="/login" className="font-bold text-stone-900">
              로그인
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}