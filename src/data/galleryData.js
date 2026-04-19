import fullHouse001 from "../assets/downloaded_assets/full_house/full_house_001.jpeg";
import fullHouse002 from "../assets/downloaded_assets/full_house/full_house_002.jpeg";
import fullHouse003 from "../assets/downloaded_assets/full_house/full_house_003.jpeg";
import aspenHillTerrace from "../assets/downloaded_assets/roof_detail/Aspen_Hill_Terrace_SW.mp4";
import ramadaDrumheller from "../assets/downloaded_assets/roof_detail/Ramada_Drumheller.mp4";
import roofDetail019 from "../assets/downloaded_assets/roof_detail/roof_detail_019.jpeg";
import roofDetail024 from "../assets/downloaded_assets/roof_detail/roof_detail_024.jpeg";
import roofDetail033 from "../assets/downloaded_assets/roof_detail/roof_detail_033.jpeg";
import roofDetail041 from "../assets/downloaded_assets/roof_detail/roof_detail_041.jpeg";
import roofDetail052 from "../assets/downloaded_assets/roof_detail/roof_detail_052.jpeg";
import roofDetail054 from "../assets/downloaded_assets/roof_detail/roof_detail_054.jpeg";
import roofDetail061 from "../assets/downloaded_assets/roof_detail/roof_detail_061.jpeg";
import roofDetail071 from "../assets/downloaded_assets/roof_detail/roof_detail_071.jpeg";
import roofDetail072 from "../assets/downloaded_assets/roof_detail/roof_detail_072.jpeg";
import roofDetail075 from "../assets/downloaded_assets/roof_detail/roof_detail_075.jpeg";

export const TRADES = [
  "All",
  "Sloped Roofing",
  "Flat Roofing",
  "Siding",
  "Fascia & Gutters",
  "Full Build",
];

const galleryItems = [
  {
    id: 1,
    type: "video",
    trade: "Sloped Roofing",
    title: "Aspen Hill Terrace Project Walkthrough",
    desc: "Featured site video highlighting roof progress, surrounding elevation, and active workmanship at Aspen Hill Terrace.",
    url: aspenHillTerrace,
  },
  {
    id: 2,
    type: "video",
    trade: "Sloped Roofing",
    title: "Ramada Drumheller Roofing Progress",
    desc: "Featured project video from Ramada Drumheller showcasing staging, roof activity, and on-site execution.",
    url: ramadaDrumheller,
  },
  {
    id: 3,
    type: "image",
    trade: "Full Build",
    title: "Full Home Roof Completion",
    desc: "Finished cedar roof installation with full building context and clean edge detailing.",
    url: fullHouse001,
  },
  {
    id: 4,
    type: "image",
    trade: "Full Build",
    title: "Roofline and Facade Integration",
    desc: "Completed roofing aligned with exterior structure and overall home profile.",
    url: fullHouse002,
  },
  {
    id: 5,
    type: "image",
    trade: "Sloped Roofing",
    title: "Large-Scale Roof Progress",
    desc: "On-site crew installation with staged material prep and active shingle placement.",
    url: roofDetail071,
  },
  {
    id: 6,
    type: "image",
    trade: "Sloped Roofing",
    title: "Underlayment Preparation Phase",
    desc: "Surface prep and protection layer setup before final roof system completion.",
    url: roofDetail072,
  },
  {
    id: 7,
    type: "image",
    trade: "Sloped Roofing",
    title: "Shingle Installation Around Skylight",
    desc: "Precision placement around skylight flashing for long-term water protection.",
    url: roofDetail033,
  },
  {
    id: 8,
    type: "image",
    trade: "Sloped Roofing",
    title: "Finished Vent and Ridge Work",
    desc: "Completed roof section with vent alignment and consistent shingle finish.",
    url: roofDetail041,
  },
  {
    id: 9,
    type: "image",
    trade: "Sloped Roofing",
    title: "Mountain Site Roof Completion",
    desc: "Final roof finish with balanced ridge line and clean accessory integration.",
    url: roofDetail052,
  },
  {
    id: 10,
    type: "image",
    trade: "Sloped Roofing",
    title: "Cedar Shingle Installation",
    desc: "Craft-focused cedar roofing with staged material layout and installation workflow.",
    url: roofDetail054,
  },
  {
    id: 11,
    type: "image",
    trade: "Flat Roofing",
    title: "Rural Roof Underlayment",
    desc: "Wide-span roofing prep with synthetic underlayment and secured staging points.",
    url: roofDetail061,
  },
  {
    id: 12,
    type: "image",
    trade: "Sloped Roofing",
    title: "Steep Slope Roofing System",
    desc: "High-slope underlayment setup designed for weather durability and drainage control.",
    url: roofDetail075,
  },
  {
    id: 13,
    type: "image",
    trade: "Sloped Roofing",
    title: "Roof With Architectural Context",
    desc: "Finished roofing surface showcased with surrounding neighborhood and elevation view.",
    url: roofDetail019,
  },
  {
    id: 14,
    type: "image",
    trade: "Siding",
    title: "Exterior Shell Development",
    desc: "Full-house exterior envelope stage showing build progression before final finishes.",
    url: roofDetail024,
  },
  {
    id: 15,
    type: "image",
    trade: "Full Build",
    title: "Full House Renovation Snapshot",
    desc: "Wide framing shot highlighting completed exterior form and structural scale.",
    url: fullHouse003,
  },
];

export default galleryItems;
