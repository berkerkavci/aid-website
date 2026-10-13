import type {
  Cta,
  FeatureCard,
  HeroContent,
  PartnerLogo,
  SectionIntro,
  SectionLink,
  ServiceCard,
  Stat,
} from "@/content/types";

export const itServicesContent = {
  meta: {
    title: "IT Services",
    description:
      "Smart monitoring, automation, and DevOps solutions that simplify complex IT operations, boost efficiency and ensure uptime.",
  },

  hero: {
    badge: "Alternative. Innovative. Design.",
    rotatingWords: ["Solution", "Automation", "Software"],
    description:
      "We simplify complex IT operations with smart monitoring, automation, and DevOps solutions—boosting efficiency and ensuring uptime.",
    primaryCta: { label: "Get in touch", href: "/contact" },
    // Jumps to the first section below the hero.
    secondaryCta: { label: "Explore", href: "#about" },
  } satisfies HeroContent,

  /** In-page section bar shown below the hero. */
  sectionNav: {
    title: "IT Services",
    links: [
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "blog", label: "Knowledge Hub" },
      { id: "contact", label: "Contact" },
    ] satisfies SectionLink[],
  },

  partnersTitle: "Technologies we work with",
  partners: [
    { name: "UiPath", src: "/images/partners/uipath.png", width: 97, height: 36 },
    { name: "Dynatrace", src: "/images/partners/dynatrace.png", width: 201, height: 36 },
    { name: "Amazon Web Services", src: "/images/partners/aws.png", width: 60, height: 36 },
    { name: "n8n", src: "/images/partners/n8n.png", width: 135, height: 36 },
    { name: "OpenText", src: "/images/partners/opentext.png", width: 169, height: 32 },
    {
      name: "Microsoft Power Automate",
      src: "/images/partners/power-automate.png",
      width: 124,
      height: 36,
    },
    { name: "SolarWinds", src: "/images/partners/solarwinds.png", width: 159, height: 36 },
  ] satisfies PartnerLogo[],

  about: {
    intro: {
      badge: "About",
      title: "Explore Us",
      description:
        "We combine IT operations and engineering expertise to deliver smart, scalable solutions. With offices in Poland and Turkey, we serve clients around the world by streamlining infrastructure for faster deployments, smarter decisions, and reliable performance.",
    } satisfies SectionIntro,
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
        "We work with businesses across multiple industries and countries, delivering tailored IT and engineering solutions that drive real results.",
    } satisfies SectionIntro,
    items: [
      { value: "10+", label: "Years of experience." },
      { value: "50+", label: "Happy clients who have trusted us." },
      { value: "15+", label: "Expanding our presence across countries worldwide." },
    ] satisfies Stat[],
  },

  services: {
    intro: {
      badge: "Services",
      title: "Enterprise-Grade IT Solutions",
      description:
        "Our services optimize IT operations at scale, enhancing resilience, reducing risk, and aligning technology with strategic goals.",
    } satisfies SectionIntro,
    items: [
      {
        title: "Process & Infrastructure Automation",
        description:
          "Automate repetitive processes and infrastructure operations to boost efficiency and reduce manual errors.",
        icon: "robot",
        tint: "blue",
      },
      {
        title: "Smart Monitoring & Alerts",
        description:
          "Get real-time visibility into system health with intelligent alerts, automated response actions, and in-depth reporting & analysis for proactive decision-making.",
        icon: "bell",
        tint: "pink",
      },
      {
        title: "Configuration Management",
        description:
          "Maintain system integrity with automated tracking, version control, and policy enforcement across all environments.",
        icon: "gear",
        tint: "yellow",
      },
      {
        title: "ITSM & Board View Dashboard",
        description:
          "Deliver and manage IT services seamlessly using a visual board dashboard, incident workflows, and service SLAs that align with business goals.",
        icon: "user-switch",
        tint: "green",
      },
    ] satisfies ServiceCard[],
  },

  blog: {
    intro: {
      badge: "Blog",
      title: "Knowledge Hub",
      description:
        "Thoughtful content on automation, monitoring, and digital transformation shaped by hands-on experience.",
      link: { label: "View all articles", href: "/blog" },
    } satisfies SectionIntro,
    limit: 3,
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
