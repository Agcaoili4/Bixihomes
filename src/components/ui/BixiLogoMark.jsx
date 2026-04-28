import bixiLogoHero from "../../assets/downloaded_assets/Logo.hero.svg";

export default function BixiLogoMark({ className = "", animated = true }) {
  return (
    <span
      role="img"
      aria-label="Bixi Homes"
      className={`bixi-logo-mark ${animated ? "is-animated" : "is-static"} ${className}`.trim()}
    >
      <img src={bixiLogoHero} alt="" className="bixi-logo-image" />
    </span>
  );
}
