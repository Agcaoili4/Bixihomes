export default function Newsletter() {
  return (
    <section className="bg-navy py-14 md:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        {/* Text */}
        <div className="max-w-[520px] text-center lg:text-left shrink-0">
          <h2 className="font-heading font-extrabold text-[26px] md:text-[34px] lg:text-[40px] text-white mb-3 leading-tight">
            Subscribe Our Newsletter
          </h2>
          <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
            Stay in touch with us to get the latest news, updates, and exclusive
            offers delivered straight to your inbox.
          </p>
        </div>

        {/* Email Input */}
        <div className="flex w-full lg:flex-1">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 h-[48px] md:h-[54px] px-5 bg-white/10 border border-white/30 font-body text-sm md:text-base text-white placeholder:text-white/50 outline-none focus:border-gold focus:bg-white/15 transition-colors min-w-0"
          />
          <button className="ui-btn ui-btn-primary shrink-0">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
