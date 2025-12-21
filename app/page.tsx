import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSlideShow from '@/components/HeroSlideShow';
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">

      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-5xl bg-slate-950/70 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between transition-all hover:bg-slate-950/80">

          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              U
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
              BRACU<span className="text-indigo-400">CMS</span>
            </span>
          </div>



          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider">
              Log in
            </Link>
            <Link
              href="/login"
              className="bg-white text-slate-950 hover:bg-indigo-50 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5">

        <HeroSlideShow />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-slate-900/50 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            The New Standard
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 drop-shadow-2xl">
            Club Management, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">
              reimagined.
            </span>
          </h1>

          <p className="text-lg text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-md">
            BRACU CMS provides the infrastructure for student organizations to scale.
            Approvals, finances, and event planning—unified in one workspace.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 hover:shadow-[0_0_50px_rgba(79,70,229,0.6)]">
              Start Now <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all backdrop-blur-md">
              View Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
