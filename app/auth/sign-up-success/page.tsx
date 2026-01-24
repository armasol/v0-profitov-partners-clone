export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#0a0a0a]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://profitov.partners/static/img/home-bg-desktop.jpg')",
          backgroundPosition: "center center",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-12">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
          <h1 className="mb-4 text-3xl font-black uppercase tracking-wider text-white">Check Your Email</h1>
          <p className="mb-8 text-white/70">
            We've sent you a confirmation email. Please click the link in the email to verify your account and complete
            your registration.
          </p>
          <a
            href="/"
            className="inline-block rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
