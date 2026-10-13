import type { Cta, FeatureCard, HeroContent, ListGroup, SectionIntro, Stat } from "@/content/types";

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
    cta: { label: "Scroll for More", href: "#about" },
  } satisfies HeroContent,

  about: {
    intro: {
      badge: "About",
      title: "Explore Us",
      description:
        "AID was founded in 2023 by B.Sc. Mechanical Engineer E. Güher KAVCI as a corporate entity. Although recently established, the management team brings extensive experience from years of collaboration in the international construction market. AID has rapidly earned industry recognition, with key personnel renowned for their outstanding professionalism. The company is respected among peers for its deep expertise, ethical practices, and a strong philosophy of collaborative business.",
    } satisfies SectionIntro,
    // NOTE: These cards are identical to the IT page on the original site.
    // Replace them with engineering-specific highlights when ready.
    features: [
      {
        title: "Automation",
        description:
          "Eliminate manual bottlenecks with workflow automation that boosts operational speed, accuracy, and consistency.",
        image: "/images/features/shape-automation.png",
      },
      {
        title: "Monitoring & Observability",
        description:
          "Gain full visibility into your infrastructure with proactive system health checks, real-time alerts, and intuitive dashboards.",
        image: "/images/features/shape-monitoring.png",
      },
      {
        title: "DevOps Engineering",
        description:
          "Accelerate your deployment cycles and improve collaboration between development and operations with CI/CD pipelines and container orchestration.",
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
      "Project Engineering",
      "MEP 3D Coordination Drawings",
      "MEP 3D Shop Drawings",
      "Cost Analysis",
      "Tender Documentation Services",
      "Technical Documentation and Spec Preparation",
      "Independent Design Review Process",
      "Commissioning Services",
      "Fire Protection System Design",
    ],
  },

  capabilities: {
    intro: {
      badge: "References",
      title: "AID MEP Team Capabilities",
    } satisfies SectionIntro,
    groups: [
      {
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
    cta: { label: "View All", href: "/blog" } satisfies Cta,
  },

  cta: {
    intro: {
      badge: "Contact",
      title: "Let's Work Together",
      description:
        "Let’s turn your IT challenges into strategic advantages. Connect with us to start building smarter solutions.",
    } satisfies SectionIntro,
    button: { label: "Contact Us", href: "/contact" } satisfies Cta,
  },
};
