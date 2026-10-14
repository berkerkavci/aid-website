import type {
  Cta,
  FeatureCard,
  HeroContent,
  ListGroup,
  SectionIntro,
  SectionLink,
  ServiceCard,
  Stat,
} from "@/content/types";
import { blogDivisionHref } from "@/content/pages/blog";

export const engineeringServicesContent = {
  meta: {
    title: "Engineering Services",
    description:
      "Building MEP (Mechanical, Electrical and Plumbing) system design, engineering and consultancy services delivered with cutting-edge technologies.",
  },

  hero: {
    badge: "Alternative, Innovative Design",
    rotatingWords: ["MEP Engineering", "MEP Consultancy", "Project Management"],
    description:
      "AID is a contemporary engineering firm dedicated to delivering top-tier design and development services for building MEP (Mechanical, Electrical, and Plumbing) systems, leveraging cutting-edge technologies.",
    primaryCta: { label: "Get in touch", href: "/contact?department=engineering" },
    // Jumps to the first section below the hero.
    secondaryCta: { label: "Explore", href: "#about" },
  } satisfies HeroContent,

  /** In-page section bar shown below the hero. */
  sectionNav: {
    title: "Engineering Services",
    links: [
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "capabilities", label: "Capabilities" },
      { id: "blog", label: "Knowledge Hub" },
      { id: "contact", label: "Contact" },
    ] satisfies SectionLink[],
  },

  about: {
    intro: {
      badge: "About",
      title: "Explore Us",
      description:
        "AID was founded in 2023 by B.Sc. Mechanical Engineer E. Güher KAVCI as a corporate entity. Although recently established, the management team brings extensive experience from years of collaboration in the international construction market. AID has rapidly earned industry recognition, with key personnel renowned for their outstanding professionalism. The company is respected among peers for its deep expertise, ethical practices, and a strong philosophy of collaborative business.",
    } satisfies SectionIntro,
    features: [
      {
        title: "MEP System Design",
        description:
          "HVAC, plumbing, fire fighting and utility systems engineered to ASHRAE, EN, NFPA and FM standards, from concept to detailed design.",
        image: "/images/features/shape-automation.png",
      },
      {
        title: "3D Coordination & BIM",
        description:
          "Clash-free, multi-discipline 3D models and installation-ready shop drawings that prevent costly rework on site.",
        image: "/images/features/shape-monitoring.png",
      },
      {
        title: "Project Delivery & Quality",
        description:
          "Cost analysis, tender documentation, independent design reviews and commissioning that keep projects on budget and performing as designed.",
        image: "/images/features/shape-devops.png",
      },
    ] satisfies FeatureCard[],
  },

  stats: {
    intro: {
      title: "Solutions Without Borders",
      description:
        "We work with businesses across multiple industries and countries, delivering tailored engineering and design solutions that drive real results.",
    } satisfies SectionIntro,
    items: [{ value: "15+", label: "Years of experience." }] satisfies Stat[],
  },

  services: {
    intro: {
      badge: "Services",
      title: "Building MEP System Design, Engineering & Consultancy Services",
      description:
        "We optimize building MEP system operations at scale, enhancing system resilience, improving energy efficiency, reducing operational costs and risks, and aligning technologies with project objectives.",
    } satisfies SectionIntro,
    items: [
      {
        title: "Project Engineering",
        description: "End-to-end MEP engineering management, from concept design to handover.",
        icon: "clipboard",
        tint: "blue",
      },
      {
        title: "MEP 3D Coordination Drawings",
        description: "Clash-free, multi-discipline 3D coordination before work starts on site.",
        icon: "cube",
        tint: "pink",
      },
      {
        title: "MEP 3D Shop Drawings",
        description: "Detailed, installation-ready shop drawings for contractors and fabricators.",
        icon: "ruler",
        tint: "yellow",
      },
      {
        title: "Cost Analysis",
        description: "Accurate quantity take-offs and cost estimates that keep budgets on track.",
        icon: "calculator",
        tint: "green",
      },
      {
        title: "Tender Documentation Services",
        description: "Complete tender packages with drawings, bills of quantities and specs.",
        icon: "file-text",
        tint: "blue",
      },
      {
        title: "Technical Documentation and Spec Preparation",
        description: "Clear technical specifications aligned with international standards.",
        icon: "files",
        tint: "pink",
      },
      {
        title: "Independent Design Review Process",
        description: "Third-party design reviews for compliance, efficiency and constructability.",
        icon: "magnifying-glass",
        tint: "yellow",
      },
      {
        title: "Commissioning Services",
        description: "Testing and commissioning to verify every system performs as designed.",
        icon: "wrench",
        tint: "green",
      },
      {
        title: "Fire Protection System Design",
        description: "Fire suppression and protection systems designed to NFPA and EN standards.",
        icon: "fire-extinguisher",
        tint: "blue",
      },
    ] satisfies ServiceCard[],
  },

  capabilities: {
    intro: {
      badge: "References",
      title: "AID MEP Team Capabilities",
    } satisfies SectionIntro,
    groups: [
      {
        title: "Design Standards",
        intro:
          "The personnel is experienced in designing mechanical systems in accordance with the standards following:",
        items: [
          "American Society of Heating, Refrigerating and Air Conditioning Engineers (ASHRAE) Standards and Handbooks",
          "Overseas Building Operations (OBO) Standards",
          "MMO (Turkey Chamber of Mechanical Engineers) Publications",
          "EN Standards",
          "National Fire Protection Association (NFPA) Codes",
          "Factory Mutual (FM) design standards",
          "Unified Facilities Criteria (UFC)",
          "BS-EN Standards",
          "USACE AED Design Requirements",
          "ASTM standards",
        ],
      },
      {
        title: "System Design Expertise",
        intro: "We are specialized at the following system designs:",
        items: [
          "Heating, Ventilation, Air-Conditioning systems",
          "Fire Fighting Systems",
          "Water Storage and Distribution systems",
          "Sewer Systems",
          "Water Treatment Systems",
          "Waste Water Treatment Plants",
          "Irrigation Systems",
          "Compressed Air Systems",
          "Fuel Storage and Supply Systems",
          "Superheated Water and Steam Systems",
          "Pressurized Gas Systems",
          "Natural Gas Systems",
          "Industrial Processes",
        ],
      },
    ] satisfies ListGroup[],
  },

  blog: {
    intro: {
      badge: "Blog",
      title: "Knowledge Hub",
      description:
        "Practical insights on MEP design, 3D coordination, fire protection and commissioning shaped by hands-on project experience.",
      link: { label: "View all articles", href: blogDivisionHref("engineering") },
    } satisfies SectionIntro,
    limit: 3,
  },

  cta: {
    intro: {
      badge: "Contact",
      title: "Let's Work Together",
      description:
        "Let’s turn your MEP challenges into well-coordinated, buildable solutions. Connect with us to start your next project.",
    } satisfies SectionIntro,
    button: { label: "Contact Us", href: "/contact?department=engineering" } satisfies Cta,
  },
};
