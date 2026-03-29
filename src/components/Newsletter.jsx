export default function Newsletter() {
  return (
    <section className="bg-navy ui-section">
      <div className="ui-container flex flex-col lg:flex-row items-center ui-gap-xl">
        {/* Text */}
        <div className="max-w-[520px] text-center lg:text-left shrink-0">
          <h2 className="font-heading font-extrabold text-[26px] md:text-[34px] lg:text-[40px] text-white ui-mb-xs leading-tight">
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
            className="flex-1 h-[48px] md:h-[54px] ui-input bg-white/10 border border-white/30 font-body text-sm md:text-base text-white placeholder:text-white/50 outline-none focus:border-gold focus:bg-white/15 transition-colors min-w-0"
          />
          <button className="ui-btn ui-btn-primary shrink-0">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
