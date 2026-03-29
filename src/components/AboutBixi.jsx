import { useState } from "react";
import { images } from "../assets/images";

const tabs = [
  { id: "commercial", label: "Commercial", icon: images.commercialIcon },
  { id: "residential", label: "Residential", icon: images.residentialIcon },
  { id: "industrial", label: "Industrial", icon: images.industrialIcon },
];

export default function AboutBixi() {
  const [activeTab, setActiveTab] = useState("commercial");

  return (
    <section className="bg-white ui-section">
      <div className="ui-container">
        {/* Heading */}
        <div className="text-center ui-mb-xl about-bixi-heading" data-reveal>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight">
            About Bixi Homes
          </h2>
          <p className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-center">
            At Bixi Homes, we take care of your home like it&apos;s our own,
            providing exceptional home renovations and quality service.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap items-center justify-center ui-gap-3 md:ui-gap-5 ui-mb-xl"
          data-reveal-group
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-reveal-item
              className={`ui-btn ui-btn-tab ${
                activeTab === tab.id
                  ? "ui-btn-tab-active"
                  : "ui-btn-outline-dark"
              }`}
            >
              <img
                src={tab.icon}
                alt=""
                className="w-6 h-6 md:w-7 md:h-7 object-contain"
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className="flex flex-col md:flex-row ui-gap-8 md:ui-gap-12 items-center"
          data-reveal
        >
          <div className="w-full md:w-[440px] lg:w-[480px] h-[260px] md:h-[360px] lg:h-[400px] shrink-0 overflow-hidden">
            <img
              src={images.storyPhoto}
              alt="Construction work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-extrabold text-2xl md:text-[32px] text-black ui-mb-sm leading-tight">
              Our Story
            </h3>
            <p className="font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed ui-mb-lg">
              At Bixi Homes, we have been delivering quality service in home
              renovations for over 10 years. Our team of experienced
              professionals is dedicated to exceeding your expectations with
              every project we undertake.
            </p>
            <a
              href="#contact"
              className="ui-btn ui-btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
