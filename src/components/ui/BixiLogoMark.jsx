import bixiLogoRaw from "../../assets/downloaded_assets/Logo.svg?raw";

export default function BixiLogoMark({ className = "", animated = true }) {
  return (
    <span
      role="img"
      aria-label="Bixi Homes"
      className={`bixi-logo-mark ${animated ? "is-animated" : "is-static"} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: bixiLogoRaw }}
    />
  );
}
