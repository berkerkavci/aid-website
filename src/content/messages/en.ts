/**
 * English texts — the reference for every other language.
 *
 * Each language has one file in this folder with exactly the same structure.
 * TypeScript checks the other files against this one, so a missing or misspelt
 * key fails the build. Links, icons and images live in `src/content/pages/*.ts`.
 *
 * Placeholders: `{word}` (hero headline), `{language}`, `{email}`; `<link>…</link>`
 * marks the part of a sentence that becomes a link.
 */
export const en = {
  site: {
    description:
      "We simplify complex IT operations with smart monitoring, automation, and DevOps solutions—boosting efficiency and ensuring uptime.",
    footerTagline:
      "AID is a technology and engineering consultancy focused on optimizing IT operations and infrastructure.",
    offices: { warsaw: "Warsaw, Poland", ankara: "Ankara, Turkey" },
  },

  common: {
    skipToContent: "Skip to content",
    homeLabel: "AID — home",
    nav: {
      main: "Main",
      mobile: "Mobile",
      footer: "Footer",
      onThisPage: "On this page",
      itServices: "IT Services",
      engineering: "Engineering",
      engineeringServices: "Engineering Services",
      blog: "Blog",
      home: "Home",
      contact: "Contact Us",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    language: {
      /** Accessible name of the switcher button; {language} = current language. */
      button: "Language: {language}. Change language",
      menu: "Choose a language",
    },
    theme: {
      toggle: "Dark mode",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
    },
  },

  home: {
    title: "Software & Engineering",
    subtitle: "One Company, Two Core Services",
    software: {
      badge: "Software Solutions",
      description:
        "We simplify complex IT operations with smart monitoring, automation, and DevOps solutions—boosting efficiency and ensuring uptime.",
      cta: "Explore IT Services",
    },
    engineering: {
      badge: "Engineering Solutions",
      description:
        "We simplify complex mechanical design with smart CAD modeling, prototyping, and engineering solutions.",
      cta: "Explore Engineering Services",
    },
  },

  itServices: {
    meta: {
      title: "IT Services",
      description:
        "Smart monitoring, automation, and DevOps solutions that simplify complex IT operations, boost efficiency and ensure uptime.",
    },
    hero: {
      badge: "Alternative. Innovative. Design.",
      /** {word} is replaced by the rotating words below. */
      headline: "Your {word} Partner",
      rotatingWords: ["Solution", "Automation", "Software"],
      description:
        "We simplify complex IT operations with smart monitoring, automation, and DevOps solutions—boosting efficiency and ensuring uptime.",
      primaryCta: "Get in touch",
      secondaryCta: "Explore",
    },
    sectionNav: {
      title: "IT Services",
      about: "About",
      services: "Services",
      blog: "Knowledge Hub",
      contact: "Contact",
    },
    partnersTitle: "Technologies we work with",
    about: {
      badge: "About",
      title: "Explore Us",
      description:
        "We combine IT operations and engineering expertise to deliver smart, scalable solutions. With offices in Poland and Turkey, we serve clients around the world by streamlining infrastructure for faster deployments, smarter decisions, and reliable performance.",
      features: {
        automation: {
          title: "Automation",
          description:
            "Eliminate manual bottlenecks with workflow automation that boosts operational speed, accuracy, and consistency.",
        },
        monitoring: {
          title: "Monitoring & Observability",
          description:
            "Gain full visibility into your infrastructure with proactive system health checks, real-time alerts, and intuitive dashboards.",
        },
        devops: {
          title: "DevOps Engineering",
          description:
            "Accelerate your deployment cycles and improve collaboration between development and operations with CI/CD pipelines and container orchestration.",
        },
      },
    },
    stats: {
      title: "Solutions Without Borders",
      description:
        "We work with businesses across multiple industries and countries, delivering tailored IT and engineering solutions that drive real results.",
      experience: "Years of experience.",
      clients: "Happy clients who have trusted us.",
      countries: "Expanding our presence across countries worldwide.",
    },
    services: {
      badge: "Services",
      title: "Enterprise-Grade IT Solutions",
      description:
        "Our services optimize IT operations at scale, enhancing resilience, reducing risk, and aligning technology with strategic goals.",
      items: {
        automation: {
          title: "Process & Infrastructure Automation",
          description:
            "Automate repetitive processes and infrastructure operations to boost efficiency and reduce manual errors.",
        },
        monitoring: {
          title: "Smart Monitoring & Alerts",
          description:
            "Get real-time visibility into system health with intelligent alerts, automated response actions, and in-depth reporting & analysis for proactive decision-making.",
        },
        configuration: {
          title: "Configuration Management",
          description:
            "Maintain system integrity with automated tracking, version control, and policy enforcement across all environments.",
        },
        itsm: {
          title: "ITSM & Board View Dashboard",
          description:
            "Deliver and manage IT services seamlessly using a visual board dashboard, incident workflows, and service SLAs that align with business goals.",
        },
      },
    },
    blog: {
      badge: "Blog",
      title: "Knowledge Hub",
      description:
        "Thoughtful content on automation, monitoring, and digital transformation shaped by hands-on experience.",
      link: "View all articles",
    },
    cta: {
      badge: "Contact",
      title: "Let's Work Together",
      description:
        "Let’s turn your IT challenges into strategic advantages. Connect with us to start building smarter solutions.",
      button: "Contact Us",
    },
  },

  engineeringServices: {
    meta: {
      title: "Engineering Services",
      description:
        "Building MEP (Mechanical, Electrical and Plumbing) system design, engineering and consultancy services delivered with cutting-edge technologies.",
    },
    hero: {
      badge: "Alternative, Innovative Design",
      headline: "Your {word} Partner",
      rotatingWords: ["MEP Engineering", "MEP Consultancy", "Project Management"],
      description:
        "AID is a contemporary engineering firm dedicated to delivering top-tier design and development services for building MEP (Mechanical, Electrical, and Plumbing) systems, leveraging cutting-edge technologies.",
      primaryCta: "Get in touch",
      secondaryCta: "Explore",
    },
    sectionNav: {
      title: "Engineering Services",
      about: "About",
      services: "Services",
      capabilities: "Capabilities",
      blog: "Knowledge Hub",
      contact: "Contact",
    },
    about: {
      badge: "About",
      title: "Explore Us",
      description:
        "AID was founded in 2023 by B.Sc. Mechanical Engineer E. Güher KAVCI as a corporate entity. Although recently established, the management team brings extensive experience from years of collaboration in the international construction market. AID has rapidly earned industry recognition, with key personnel renowned for their outstanding professionalism. The company is respected among peers for its deep expertise, ethical practices, and a strong philosophy of collaborative business.",
      features: {
        design: {
          title: "MEP System Design",
          description:
            "HVAC, plumbing, fire fighting and utility systems engineered to ASHRAE, EN, NFPA and FM standards, from concept to detailed design.",
        },
        coordination: {
          title: "3D Coordination & BIM",
          description:
            "Clash-free, multi-discipline 3D models and installation-ready shop drawings that prevent costly rework on site.",
        },
        delivery: {
          title: "Project Delivery & Quality",
          description:
            "Cost analysis, tender documentation, independent design reviews and commissioning that keep projects on budget and performing as designed.",
        },
      },
    },
    stats: {
      title: "Solutions Without Borders",
      description:
        "We work with businesses across multiple industries and countries, delivering tailored engineering and design solutions that drive real results.",
      experience: "Years of experience.",
      clients: "Happy clients who have trusted us.",
      countries: "Expanding our presence across countries worldwide.",
    },
    services: {
      badge: "Services",
      title: "Building MEP System Design, Engineering & Consultancy Services",
      description:
        "We optimize building MEP system operations at scale, enhancing system resilience, improving energy efficiency, reducing operational costs and risks, and aligning technologies with project objectives.",
      items: {
        projectEngineering: {
          title: "Project Engineering",
          description: "End-to-end MEP engineering management, from concept design to handover.",
        },
        coordination: {
          title: "MEP 3D Coordination Drawings",
          description: "Clash-free, multi-discipline 3D coordination before work starts on site.",
        },
        shopDrawings: {
          title: "MEP 3D Shop Drawings",
          description:
            "Detailed, installation-ready shop drawings for contractors and fabricators.",
        },
        costAnalysis: {
          title: "Cost Analysis",
          description: "Accurate quantity take-offs and cost estimates that keep budgets on track.",
        },
        tender: {
          title: "Tender Documentation Services",
          description: "Complete tender packages with drawings, bills of quantities and specs.",
        },
        specifications: {
          title: "Technical Documentation and Spec Preparation",
          description: "Clear technical specifications aligned with international standards.",
        },
        designReview: {
          title: "Independent Design Review Process",
          description:
            "Third-party design reviews for compliance, efficiency and constructability.",
        },
        commissioning: {
          title: "Commissioning Services",
          description: "Testing and commissioning to verify every system performs as designed.",
        },
        fireProtection: {
          title: "Fire Protection System Design",
          description: "Fire suppression and protection systems designed to NFPA and EN standards.",
        },
      },
    },
    capabilities: {
      badge: "References",
      title: "AID MEP Team Capabilities",
      standards: {
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
      systems: {
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
    },
    blog: {
      badge: "Blog",
      title: "Knowledge Hub",
      description:
        "Practical insights on MEP design, 3D coordination, fire protection and commissioning shaped by hands-on project experience.",
      link: "View all articles",
    },
    cta: {
      badge: "Contact",
      title: "Let's Work Together",
      description:
        "Let’s turn your MEP challenges into well-coordinated, buildable solutions. Connect with us to start your next project.",
      button: "Contact Us",
    },
  },

  blog: {
    meta: {
      title: "Blog",
      description:
        "Insights on IT operations, automation and monitoring, and on building MEP engineering — shaped by hands-on experience.",
    },
    title: "Knowledge Hub",
    description:
      "Thoughtful content on IT automation and monitoring, and on MEP design and engineering, shaped by hands-on experience.",
    categoryLabel: "Blog category",
    divisions: {
      it: {
        label: "IT Services",
        emptyTitle: "IT articles are on their way",
        emptyDescription: "We're preparing new insights on automation, monitoring and DevOps.",
        emptyCta: "Explore IT services",
      },
      engineering: {
        label: "Engineering",
        emptyTitle: "Engineering articles are coming soon",
        emptyDescription:
          "We're preparing insights on MEP design, 3D coordination and commissioning. In the meantime, explore our engineering services.",
        emptyCta: "Explore engineering services",
      },
    },
    post: {
      backLink: "All articles",
      relatedLabel: "Related articles",
      relatedBadge: "Blog",
      relatedTitle: "Keep Reading",
      /** Shown when an article has not been translated yet. */
      untranslated:
        "This article is not yet available in {language}. You are reading the English version.",
      cta: {
        badge: "Contact",
        title: "Let's Work Together",
        description:
          "Have a question about this topic or a project in mind? Connect with us to start building smarter solutions.",
        button: "Contact Us",
      },
    },
  },

  contact: {
    meta: {
      title: "Contact",
      description:
        "Get in touch with AID. Offices in Warsaw, Poland and Ankara, Turkey — let's turn your challenges into strategic advantages.",
    },
    intro: {
      badge: "Contact Us",
      title: "Let's Work Together",
      description:
        "Let’s turn your IT and engineering challenges into strategic advantages. Connect with us to start building smarter solutions.",
    },
    responseTime: "We typically reply within one business day.",
    map: {
      title: "Map — AID office in Warsaw",
      show: "Show map",
      consent:
        "Loads Google Maps. Google receives your IP address and may set cookies — see our <link>Privacy Policy</link>.",
    },
    cards: { office: "Office", phone: "Phone", mail: "Mail" },
    form: {
      fullName: "Full name",
      fullNamePlaceholder: "Jane Smith",
      company: "Company name",
      companyPlaceholder: "Smith",
      email: "Email",
      emailPlaceholder: "jane@company.com",
      phone: "Phone",
      phonePlaceholder: "+0123456789",
      department: {
        label: "Service",
        placeholder: "Select a service",
        it: { label: "IT Services", description: "Automation, monitoring & DevOps" },
        engineering: {
          label: "Engineering",
          description: "MEP design, coordination & commissioning",
        },
      },
      message: "How can we help?",
      messagePlaceholder: "Describe your problem",
      privacy:
        "I have read the <link>Privacy Policy</link> and agree that AID processes my details to respond to my enquiry.",
      submit: "Send message",
      sending: "Sending…",
      success: {
        title: "Thank you!",
        message: "Your message has been sent. We typically reply within one business day.",
        again: "Send another message",
      },
      errors: {
        summary: "Please check the highlighted fields.",
        failed: "Sorry, your message could not be sent. Please e-mail us at {email}.",
        department: "Please choose IT Services or Engineering.",
        fullName: "Please enter your full name.",
        email: "Please enter a valid e-mail address.",
        phone: "Please enter a valid phone number.",
        message: "Please tell us a bit more (at least 10 characters).",
        privacy: "Please confirm that you have read the Privacy Policy.",
      },
    },
  },

  privacy: {
    meta: {
      title: "Privacy Policy",
      description:
        "How AID processes personal data under the GDPR and the Turkish data protection law (KVKK).",
    },
    badge: "Legal",
    title: "Privacy Policy",
    updated: "Last updated",
  },

  notFound: {
    title: "This page could not be found",
    metaTitle: "Page not found",
    description: "The page you are looking for may have been moved or no longer exists.",
    back: "Back to home",
  },
};

export type Messages = typeof en;
