import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn, getFileIcon } from "@/lib/utils";

export const dynamic = "force-dynamic";

const features = [
  ["/assets/icons/documents.svg", "Store everything", "Keep documents, images, videos, audio, and more in one secure workspace."],
  ["/assets/icons/search.svg", "Find files fast", "Search your entire cloud and get to the file you need in seconds."],
  ["/assets/icons/grid.svg", "Stay organized", "Browse by file type and sort by name, date, or size."],
  ["/assets/icons/share.svg", "Share easily", "Share files whenever you need to collaborate."],
  ["/assets/icons/download.svg", "Access anywhere", "Your files are available wherever you work."],
  ["/assets/icons/dashboard.svg", "Know your storage", "See exactly how much space your files are using."],
] as const;

const fileTypes = [
  ["/assets/icons/file-document.svg", "Documents", "12"],
  ["/assets/icons/file-image.svg", "Images", "08"],
  ["/assets/icons/file-video.svg", "Videos", "05"],
  ["/assets/icons/file-audio.svg", "Audio", "04"],
  ["/assets/icons/file-other.svg", "Other", "03"],
] as const;

const steps = [
  ["01", "Create your account", "Start your personal Thinkbox workspace in seconds."],
  ["02", "Upload your files", "Bring documents, images, videos, audio, and more into one place."],
  ["03", "Manage everything", "Search, sort, share, download, rename, and organize with ease."],
] as const;

const recentFiles = [
  ["document", "pdf", "report.pdf", "2.4 MB"],
  ["image", "png", "vacation.png", "5.1 MB"],
  ["video", "mp4", "project.mp4", "128 MB"],
  ["audio", "mp3", "music.mp3", "8.2 MB"],
] as const;

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect("/dashboard");

  return (
    <main className="landing-page min-h-screen overflow-x-clip bg-white text-light-100">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-56 -top-56 h-[620px] w-[620px] rounded-full bg-brand/[0.055] blur-[120px]" />
        <div className="absolute -bottom-64 -right-56 h-[680px] w-[680px] rounded-full bg-blue/[0.045] blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-light-300/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="shrink-0">
            <Image src="/assets/icons/logo-full-brand.svg" alt="Thinkbox" width={140} height={46} className="h-8 w-auto" priority />
          </Link>
          <nav className="hidden items-center gap-9 md:flex">
            {[["#features", "Features"], ["#how-it-works", "How it works"], ["#preview", "Storage"]].map(([href, label]) => (
              <Link key={href} href={href} className="text-[13px] font-semibold text-light-200 transition-colors hover:text-brand">{label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/sign-in"><Button variant="ghost" className="h-10 rounded-full px-4 text-[13px] font-semibold text-brand hover:bg-brand/5">Log In</Button></Link>
            <Link href="/sign-up"><Button className="!h-10 !rounded-full !bg-brand !px-5 !text-[13px] !font-semibold !text-white !shadow-[0_8px_24px_rgba(0,51,102,0.18)] hover:!bg-brand-100">Get Started</Button></Link>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <section className="relative px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-28">
          <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-brand/10 bg-brand/[0.045] px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-[10px] font-semibold tracking-[0.18em] text-brand">PERSONAL CLOUD STORAGE</span>
            </div>
            <h1 className="animate-fade-up-delay-1 max-w-[850px] text-[48px] font-bold leading-[1.04] tracking-[-0.04em] text-[#17263a] sm:text-[62px] lg:text-[72px]">
              Your files.<br /><span className="text-brand">One beautiful place.</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-7 max-w-[620px] text-[16px] leading-7 text-light-200 sm:text-[18px]">Thinkbox keeps your documents, images, videos, and files organized in one simple personal cloud.</p>
            <div className="animate-fade-up-delay-3 mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Link href="/sign-up" className="w-full sm:w-auto"><Button className="!h-12 !w-full !rounded-full !bg-brand !px-7 !text-[15px] !font-semibold !text-white !shadow-[0_12px_28px_rgba(0,51,102,0.2)] hover:!bg-brand-100 sm:!w-auto">Get Started — It&apos;s Free <span className="ml-2 text-white/70">→</span></Button></Link>
              <Link href="/sign-in" className="w-full sm:w-auto"><Button variant="outline" className="!h-12 !w-full !rounded-full !border-light-200/60 !bg-white !px-7 !text-[15px] !font-semibold !text-brand hover:!border-brand/30 hover:!bg-brand/[0.03] sm:!w-auto">Log In</Button></Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-medium text-light-200"><span>Simple storage</span><span className="size-1 rounded-full bg-light-200/50" /><span>Easy organization</span><span className="size-1 rounded-full bg-light-200/50" /><span>Access anywhere</span></div>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-12 -z-10 h-[500px] w-[900px] -translate-x-1/2 opacity-50" style={{backgroundImage:"linear-gradient(rgba(0,51,102,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,51,102,0.035) 1px, transparent 1px)",backgroundSize:"42px 42px",maskImage:"radial-gradient(ellipse at center, black 10%, transparent 68%)",WebkitMaskImage:"radial-gradient(ellipse at center, black 10%, transparent 68%)"}} />
        </section>

        <section id="preview" className="landing-section scroll-mt-24 px-4 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 text-center"><p className="text-[10px] font-semibold tracking-[0.18em] text-brand">YOUR WORKSPACE</p><h2 className="mt-3 text-[30px] font-bold tracking-[-0.025em] text-[#17263a] sm:text-[38px]">Everything in one place.</h2><p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-6 text-light-200">A clean workspace designed to make managing your files feel effortless.</p></div>
            <div className="relative px-0 sm:px-3 lg:px-8">
              <div className="relative rounded-[30px] border border-light-300 bg-light-400/80 p-2 shadow-[0_30px_90px_rgba(28,53,82,0.13)] sm:p-3 lg:p-4">
                <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-brand/[0.07] via-transparent to-blue/[0.04]" />
                <div className="relative overflow-hidden rounded-[23px] border border-light-300/80 bg-white">
                  <div className="flex h-[58px] items-center justify-between border-b border-light-300/80 px-4 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3"><Image src="/assets/icons/logo-full-brand.svg" alt="Thinkbox" width={105} height={34} className="h-5 w-auto shrink-0" /><span className="hidden rounded-full bg-light-300 px-3 py-1 text-[11px] font-medium text-light-100 sm:inline-flex">All files</span></div>
                    <div className="flex items-center gap-2 sm:gap-3"><div className="hidden h-9 w-[190px] items-center justify-between rounded-full bg-light-400 px-3.5 text-[11px] text-light-200 sm:flex"><span>Search files...</span><span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] shadow-sm">⌘K</span></div><div className="size-8 rounded-full border-2 border-white bg-brand/10 shadow-sm" /></div>
                  </div>
                  <div className="grid min-h-[420px] md:grid-cols-[190px_1fr] lg:grid-cols-[220px_1fr]">
                    <aside className="hidden border-r border-light-300/80 bg-light-400/45 p-4 md:block">
                      <div className="space-y-1.5">{["Dashboard","Documents","Images","Media","Others"].map((item,i)=><div key={item} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium",i===0?"bg-brand/10 text-brand":"text-light-100 hover:bg-light-300")}><span className={cn("size-5 rounded-md",i===0?"bg-brand/15":"bg-light-200/40")} />{item}</div>)}</div>
                      <div className="mt-8 border-t border-light-300/80 pt-5"><div className="flex items-center gap-3 px-3"><span className="size-7 rounded-full bg-brand/10" /><div><p className="text-[11px] font-semibold text-light-100">You</p><p className="text-[9px] text-light-200">Personal space</p></div></div></div>
                    </aside>
                    <div className="min-w-0 p-4 sm:p-6 lg:p-7">
                      <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
                        <div className="min-w-0">
                          <div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] font-medium uppercase tracking-[0.12em] text-light-200">Overview</p><h3 className="mt-1 text-[20px] font-bold text-[#17263a]">Your storage</h3></div><span className="rounded-full bg-brand/5 px-3 py-1.5 text-[10px] font-semibold text-brand">2 GB plan</span></div>
                          <div className="rounded-2xl border border-light-300 bg-light-400/45 p-4 sm:p-5"><div className="flex items-center justify-between gap-4"><div><p className="text-[11px] text-light-200">Storage used</p><p className="mt-1 text-[24px] font-bold tracking-tight text-[#17263a]">1 GB <span className="text-[13px] font-medium text-light-200">of 2 GB</span></p></div><div className="relative size-[68px] shrink-0 rounded-full" style={{ background: "conic-gradient(#003366 0deg 180deg, #e8edf3 180deg 360deg)" }} aria-label="50 percent storage used"><div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-white"><span className="text-[14px] font-bold leading-none text-brand">50%</span><span className="mt-1 text-[7px] font-medium text-light-200">used</span></div></div></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-light-300"><div className="h-full w-1/2 rounded-full bg-brand" /></div></div>
                          <div className="mt-6"><div className="mb-3 flex items-center justify-between"><h4 className="text-[13px] font-bold text-[#17263a]">Recent files</h4><span className="text-[10px] font-semibold text-brand">View all →</span></div><div className="overflow-hidden rounded-2xl border border-light-300/80">{recentFiles.map(([type,ext,name,size],i)=><div key={name} className={cn("flex items-center gap-3 px-3 py-3 sm:px-4",i!==recentFiles.length-1&&"border-b border-light-300/70")}><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-light-400"><Image src={type==="image"?"/assets/images/photo.png":getFileIcon(ext,type)} alt={name} width={26} height={26} className="size-6 object-contain" /></div><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-light-100">{name}</p><p className="text-[9px] text-light-200">{type}</p></div><span className="shrink-0 text-[9px] font-medium text-light-200">{size}</span></div>)}</div></div>
                        </div>
                        <div className="hidden min-h-[100%] rounded-2xl border border-light-300 bg-white p-4 lg:flex lg:flex-col"><div className="flex items-center justify-between"><p className="text-[11px] font-semibold text-light-100">File types</p><span className="text-[9px] text-light-200">32 total</span></div><div className="mt-5 flex-1 space-y-3.5">{fileTypes.slice(0,4).map(([_,label,count],i)=><div key={label}><div className="mb-1.5 flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-medium text-light-100"><span className="size-2 rounded-full bg-brand/60" />{label}</span><span className="text-[9px] text-light-200">{count}</span></div><div className="h-1.5 rounded-full bg-light-300"><div className="h-full rounded-full bg-brand" style={{width:`${[70,48,34,24][i]}%`}} /></div></div>)}</div><div className="mt-6 shrink-0 rounded-xl bg-brand p-3.5 text-white"><p className="text-[9px] font-medium text-white/60">Quick access</p><p className="mt-1 text-[12px] font-semibold">Keep everything together.</p><p className="mt-1 text-[9px] leading-4 text-white/65">Upload and manage your files from one workspace.</p></div></div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2 lg:hidden">{fileTypes.map(([_,label,count])=><div key={label} className="rounded-full bg-brand/[0.06] px-3 py-1.5 text-[9px] font-semibold text-brand">{count} {label}</div>)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-3 top-16 z-20 hidden animate-float-1 rounded-2xl border border-light-300/80 bg-white p-3 shadow-[0_18px_45px_rgba(28,53,82,0.14)] lg:block xl:-left-5"><div className="flex items-center gap-2.5"><div className="flex size-9 items-center justify-center rounded-xl bg-red/10"><Image src={getFileIcon("pdf","document")} alt="PDF" width={24} height={24} className="size-6 object-contain" /></div><div><p className="text-[11px] font-semibold text-light-100">report.pdf</p><p className="text-[9px] text-light-200">Document</p></div></div></div>
              <div className="absolute -right-3 top-24 z-20 hidden animate-float rounded-2xl border border-light-300/80 bg-white p-3 shadow-[0_18px_45px_rgba(28,53,82,0.14)] lg:block xl:-right-5"><div className="flex items-center gap-2.5"><div className="flex size-9 items-center justify-center rounded-xl bg-blue/10"><Image src={getFileIcon("png","image")} alt="Image" width={24} height={24} className="size-6 object-contain" /></div><div><p className="text-[11px] font-semibold text-light-100">photo.png</p><p className="text-[9px] text-light-200">Image</p></div></div></div>
              <div className="absolute -bottom-6 left-[12%] z-20 hidden animate-float-2 rounded-2xl border border-light-300/80 bg-white p-3 shadow-[0_18px_45px_rgba(28,53,82,0.14)] lg:block"><div className="flex items-center gap-2.5"><div className="flex size-9 items-center justify-center rounded-xl bg-red/10"><Image src={getFileIcon("mp4","video")} alt="Video" width={24} height={24} className="size-6 object-contain" /></div><div><p className="text-[11px] font-semibold text-light-100">project.mp4</p><p className="text-[9px] text-light-200">Video</p></div></div></div>
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1000px]"><div className="mb-7"><p className="text-[10px] font-semibold tracking-[0.18em] text-brand">BUILT FOR EVERY FILE TYPE</p><h2 className="mt-2 text-[24px] font-bold tracking-tight text-[#17263a] sm:text-[28px]">One cloud. Everything you need.</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{fileTypes.map(([icon,label,count])=><div key={label} className="group rounded-2xl border border-light-300 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/15 hover:shadow-[0_15px_35px_rgba(28,53,82,0.09)]"><div className="flex items-start justify-between"><div className="flex size-10 items-center justify-center rounded-xl bg-brand/[0.07]"><Image src={icon} alt={label} width={25} height={25} className="size-6 object-contain" /></div><span className="text-[9px] font-semibold text-light-200">{count}</span></div><p className="mt-5 text-[12px] font-semibold text-light-100">{label}</p><p className="mt-1 text-[9px] text-light-200">Files</p></div>)}</div></div></section>

        <section id="features" className="landing-section scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1100px]"><div className="mx-auto mb-11 max-w-[650px] text-center"><p className="text-[10px] font-semibold tracking-[0.18em] text-brand">MADE TO STAY OUT OF YOUR WAY</p><h2 className="mt-3 text-[32px] font-bold tracking-[-0.025em] text-[#17263a] sm:text-[40px]">Your files, without the mess.</h2><p className="mt-3 text-[15px] leading-6 text-light-200">Everything you need to upload, organize, find, and manage your files.</p></div><div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map(([icon,title,description])=><div key={title} className="group relative flex min-h-[190px] overflow-hidden rounded-[24px] border border-light-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/15 hover:shadow-[0_20px_45px_rgba(28,53,82,0.09)]"><div className="absolute -right-12 -top-12 size-32 rounded-full bg-brand/[0.035] blur-2xl transition-colors group-hover:bg-brand/[0.07]" /><div className="relative flex h-full flex-col"><div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/[0.07]"><Image src={icon} alt={title} width={25} height={25} className="size-6 object-contain" /></div><h3 className="mt-6 text-[16px] font-bold text-[#17263a]">{title}</h3><p className="mt-2 max-w-[300px] text-[12px] leading-5 text-light-200">{description}</p></div></div>)}</div></div></section>

        <section id="how-it-works" className="landing-section scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1050px]"><div className="mb-12 text-center"><p className="text-[10px] font-semibold tracking-[0.18em] text-brand">HOW IT WORKS</p><h2 className="mt-3 text-[32px] font-bold tracking-[-0.025em] text-[#17263a] sm:text-[40px]">Simple from the start.</h2></div><div className="relative grid gap-10 md:grid-cols-3 md:gap-5"><div className="absolute left-[16.66%] right-[16.66%] top-[29px] hidden h-px bg-gradient-to-r from-brand/10 via-brand/30 to-brand/10 md:block" />{steps.map(([step,title,desc])=><div key={step} className="relative z-10 text-center"><div className="mx-auto flex size-[60px] items-center justify-center rounded-full border-[6px] border-white bg-brand text-[13px] font-bold text-white shadow-[0_10px_30px_rgba(0,51,102,0.2)]">{step}</div><h3 className="mt-6 text-[15px] font-bold text-[#17263a]">{title}</h3><p className="mx-auto mt-2 max-w-[250px] text-[12px] leading-5 text-light-200">{desc}</p></div>)}</div></div></section>

        <section className="px-5 py-20 sm:px-8 lg:px-10"><div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[32px] bg-brand px-7 py-14 text-center shadow-[0_25px_70px_rgba(0,51,102,0.18)] sm:px-12 sm:py-16"><div className="pointer-events-none absolute -left-24 -top-32 size-[360px] rounded-full bg-white/[0.07] blur-3xl" /><div className="pointer-events-none absolute -bottom-40 -right-24 size-[420px] rounded-full bg-blue/[0.08] blur-3xl" /><div className="relative z-10 mx-auto max-w-[620px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-white/55">READY WHEN YOU ARE</p><h2 className="mt-3 text-[30px] font-bold tracking-[-0.025em] text-white sm:text-[38px]">Ready to organize your files?</h2><p className="mx-auto mt-3 max-w-[500px] text-[14px] leading-6 text-white/65">Bring everything into one simple personal cloud and keep your workspace under control.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/sign-up"><Button className="!h-12 !rounded-full !bg-white !px-7 !text-[14px] !font-semibold !text-brand hover:!bg-light-300">Get Started <span className="ml-2">→</span></Button></Link><Link href="/sign-in"><Button variant="outline" className="!h-12 !rounded-full !border-white/25 !bg-transparent !px-7 !text-[14px] !font-semibold !text-white hover:!border-white/50 hover:!bg-white/10">Log In</Button></Link></div></div></div></section>

        <footer className="border-t border-light-300 bg-light-400/50 px-5 py-9 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4"><Link href="/" className="shrink-0"><Image src="/assets/icons/logo-full-brand.svg" alt="Thinkbox" width={100} height={32} className="h-6 w-auto" /></Link><p className="text-[11px] text-light-200">Personal cloud storage for your files.</p></div><nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">{[["/","Home"],["#features","Features"],["#how-it-works","How it works"],["/sign-in","Log In"],["/sign-up","Sign Up"]].map(([href,label])=><Link key={href} href={href} className="text-[11px] font-medium text-light-200 hover:text-brand">{label}</Link>)}</nav></div><p className="mx-auto mt-7 max-w-[1180px] border-t border-light-300 pt-5 text-center text-[10px] text-light-200">© 2026 Thinkbox. Personal cloud storage.</p></footer>
      </div>
    </main>
  );
}
