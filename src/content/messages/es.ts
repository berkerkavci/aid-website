import type { Messages } from "./en";

/** Textos en español — la estructura es idéntica a `en.ts`. */
export const es: Messages = {
  site: {
    description:
      "Simplificamos las operaciones de TI complejas con monitorización inteligente, automatización y soluciones DevOps, aumentando la eficiencia y garantizando la disponibilidad.",
    footerTagline:
      "AID es una consultora de tecnología e ingeniería centrada en optimizar las operaciones de TI y la infraestructura.",
    offices: { warsaw: "Varsovia, Polonia", ankara: "Ankara, Turquía" },
  },

  common: {
    skipToContent: "Ir al contenido",
    homeLabel: "AID — inicio",
    nav: {
      main: "Navegación principal",
      mobile: "Navegación móvil",
      footer: "Navegación del pie de página",
      onThisPage: "En esta página",
      itServices: "Servicios de TI",
      engineering: "Ingeniería",
      engineeringServices: "Servicios de ingeniería",
      blog: "Blog",
      home: "Inicio",
      contact: "Contacto",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    language: {
      button: "Idioma: {language}. Cambiar idioma",
      menu: "Elija un idioma",
    },
    theme: {
      toggle: "Modo oscuro",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      privacy: "Política de privacidad",
    },
  },

  home: {
    title: "Software e Ingeniería",
    subtitle: "Una empresa, dos servicios clave",
    software: {
      badge: "Soluciones de software",
      description:
        "Simplificamos las operaciones de TI complejas con monitorización inteligente, automatización y soluciones DevOps, aumentando la eficiencia y garantizando la disponibilidad.",
      cta: "Descubra los servicios de TI",
    },
    engineering: {
      badge: "Soluciones de ingeniería",
      description:
        "Simplificamos el diseño mecánico complejo con modelado CAD inteligente, prototipado y soluciones de ingeniería.",
      cta: "Descubra los servicios de ingeniería",
    },
  },

  itServices: {
    meta: {
      title: "Servicios de TI",
      description:
        "Monitorización inteligente, automatización y soluciones DevOps que simplifican las operaciones de TI complejas, aumentan la eficiencia y garantizan la disponibilidad.",
    },
    hero: {
      badge: "Alternativo. Innovador. Diseño.",
      headline: "Su socio en {word}",
      rotatingWords: ["soluciones", "automatización", "software"],
      description:
        "Simplificamos las operaciones de TI complejas con monitorización inteligente, automatización y soluciones DevOps, aumentando la eficiencia y garantizando la disponibilidad.",
      primaryCta: "Contáctenos",
      secondaryCta: "Descubrir",
    },
    sectionNav: {
      title: "Servicios de TI",
      about: "Nosotros",
      services: "Servicios",
      blog: "Centro de conocimiento",
      contact: "Contacto",
    },
    partnersTitle: "Tecnologías con las que trabajamos",
    about: {
      badge: "Nosotros",
      title: "Conózcanos",
      description:
        "Combinamos experiencia en operaciones de TI e ingeniería para ofrecer soluciones inteligentes y escalables. Con oficinas en Polonia y Turquía, atendemos a clientes de todo el mundo optimizando su infraestructura para lograr despliegues más rápidos, decisiones más acertadas y un rendimiento fiable.",
      features: {
        automation: {
          title: "Automatización",
          description:
            "Elimine los cuellos de botella manuales con la automatización de flujos de trabajo, que mejora la velocidad, la precisión y la coherencia de sus operaciones.",
        },
        monitoring: {
          title: "Monitorización y observabilidad",
          description:
            "Obtenga visibilidad total de su infraestructura con comprobaciones proactivas del estado de los sistemas, alertas en tiempo real y paneles intuitivos.",
        },
        devops: {
          title: "Ingeniería DevOps",
          description:
            "Acelere sus ciclos de despliegue y mejore la colaboración entre desarrollo y operaciones con pipelines de CI/CD y orquestación de contenedores.",
        },
      },
    },
    stats: {
      title: "Soluciones sin fronteras",
      description:
        "Trabajamos con empresas de múltiples sectores y países, ofreciendo soluciones de TI e ingeniería a medida que generan resultados reales.",
      experience: "Años de experiencia.",
      clients: "Clientes satisfechos que confían en nosotros.",
      countries: "Países en los que ampliamos nuestra presencia.",
    },
    services: {
      badge: "Servicios",
      title: "Soluciones de TI de nivel empresarial",
      description:
        "Nuestros servicios optimizan las operaciones de TI a gran escala, refuerzan la resiliencia, reducen el riesgo y alinean la tecnología con los objetivos estratégicos.",
      items: {
        automation: {
          title: "Automatización de procesos e infraestructura",
          description:
            "Automatice procesos repetitivos y operaciones de infraestructura para aumentar la eficiencia y reducir los errores manuales.",
        },
        monitoring: {
          title: "Monitorización inteligente y alertas",
          description:
            "Visibilidad en tiempo real del estado de los sistemas con alertas inteligentes, respuestas automatizadas e informes y análisis detallados para tomar decisiones proactivas.",
        },
        configuration: {
          title: "Gestión de la configuración",
          description:
            "Mantenga la integridad de los sistemas con seguimiento automatizado, control de versiones y aplicación de políticas en todos los entornos.",
        },
        itsm: {
          title: "ITSM y panel visual",
          description:
            "Preste y gestione servicios de TI sin fricciones con un panel visual, flujos de gestión de incidencias y SLA alineados con los objetivos del negocio.",
        },
      },
    },
    blog: {
      badge: "Blog",
      title: "Centro de conocimiento",
      description:
        "Contenidos sobre automatización, monitorización y transformación digital, basados en la experiencia práctica.",
      link: "Ver todos los artículos",
    },
    cta: {
      badge: "Contacto",
      title: "Trabajemos juntos",
      description:
        "Convirtamos sus retos de TI en ventajas estratégicas. Contáctenos para empezar a crear soluciones más inteligentes.",
      button: "Contáctenos",
    },
  },

  engineeringServices: {
    meta: {
      title: "Servicios de ingeniería",
      description:
        "Diseño, ingeniería y consultoría de instalaciones MEP (mecánicas, eléctricas y de fontanería) en edificios, con las tecnologías más avanzadas.",
    },
    hero: {
      badge: "Diseño alternativo e innovador",
      headline: "Su socio en {word}",
      rotatingWords: ["ingeniería MEP", "consultoría MEP", "gestión de proyectos"],
      description:
        "AID es una empresa de ingeniería moderna dedicada a ofrecer servicios de diseño y desarrollo de primer nivel para las instalaciones MEP de los edificios (mecánicas, eléctricas y de fontanería), aprovechando las tecnologías más avanzadas.",
      primaryCta: "Contáctenos",
      secondaryCta: "Descubrir",
    },
    sectionNav: {
      title: "Servicios de ingeniería",
      about: "Nosotros",
      services: "Servicios",
      capabilities: "Capacidades",
      blog: "Centro de conocimiento",
      contact: "Contacto",
    },
    about: {
      badge: "Nosotros",
      title: "Conózcanos",
      description:
        "AID fue fundada en 2023 por el ingeniero mecánico (B.Sc.) E. Güher KAVCI como entidad corporativa. Aunque es una empresa reciente, su equipo directivo aporta una amplia experiencia fruto de años de colaboración en el mercado internacional de la construcción. AID ha ganado rápidamente reconocimiento en el sector y su personal clave destaca por su extraordinaria profesionalidad. La empresa es respetada por su profundo conocimiento, su ética y una sólida filosofía de colaboración.",
      features: {
        design: {
          title: "Diseño de instalaciones MEP",
          description:
            "Climatización, fontanería, protección contra incendios e instalaciones de servicios diseñadas según las normas ASHRAE, EN, NFPA y FM, desde el concepto hasta el proyecto de ejecución.",
        },
        coordination: {
          title: "Coordinación 3D y BIM",
          description:
            "Modelos 3D multidisciplinares sin interferencias y planos de taller listos para montar que evitan costosos retrabajos en obra.",
        },
        delivery: {
          title: "Ejecución de proyectos y calidad",
          description:
            "Análisis de costes, documentación de licitación, revisiones de diseño independientes y puesta en marcha para que los proyectos cumplan el presupuesto y funcionen según lo diseñado.",
        },
      },
    },
    stats: {
      title: "Soluciones sin fronteras",
      description:
        "Trabajamos con empresas de múltiples sectores y países, ofreciendo soluciones de ingeniería y diseño a medida que generan resultados reales.",
      experience: "Años de experiencia.",
      clients: "Clientes satisfechos que confían en nosotros.",
      countries: "Países en los que ampliamos nuestra presencia.",
    },
    services: {
      badge: "Servicios",
      title: "Diseño, ingeniería y consultoría de instalaciones MEP en edificios",
      description:
        "Optimizamos el funcionamiento de las instalaciones MEP de los edificios a gran escala: mejoramos la resiliencia y la eficiencia energética, reducimos costes operativos y riesgos, y alineamos la tecnología con los objetivos del proyecto.",
      items: {
        projectEngineering: {
          title: "Ingeniería de proyectos",
          description:
            "Gestión integral de la ingeniería MEP, desde el diseño conceptual hasta la entrega.",
        },
        coordination: {
          title: "Planos de coordinación MEP 3D",
          description:
            "Coordinación 3D multidisciplinar sin interferencias antes de empezar la obra.",
        },
        shopDrawings: {
          title: "Planos de taller MEP 3D",
          description: "Planos detallados y listos para montar para contratistas y fabricantes.",
        },
        costAnalysis: {
          title: "Análisis de costes",
          description:
            "Mediciones y presupuestos precisos que mantienen el proyecto dentro del presupuesto.",
        },
        tender: {
          title: "Documentación de licitación",
          description:
            "Paquetes de licitación completos con planos, mediciones y especificaciones.",
        },
        specifications: {
          title: "Documentación técnica y pliegos",
          description:
            "Especificaciones técnicas claras y alineadas con las normas internacionales.",
        },
        designReview: {
          title: "Revisión independiente del diseño",
          description:
            "Revisiones externas de cumplimiento normativo, eficiencia y constructibilidad.",
        },
        commissioning: {
          title: "Puesta en marcha",
          description:
            "Pruebas y puesta en marcha para verificar que cada sistema funciona según lo diseñado.",
        },
        fireProtection: {
          title: "Diseño de sistemas de protección contra incendios",
          description:
            "Sistemas de extinción y protección contra incendios según las normas NFPA y EN.",
        },
      },
    },
    capabilities: {
      badge: "Referencias",
      title: "Capacidades del equipo MEP de AID",
      standards: {
        title: "Normas de diseño",
        intro:
          "Nuestro equipo tiene experiencia en el diseño de instalaciones mecánicas conforme a las siguientes normas:",
        items: [
          "Normas y manuales de ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)",
          "Normas OBO (Overseas Building Operations)",
          "Publicaciones de la MMO (Cámara de Ingenieros Mecánicos de Turquía)",
          "Normas EN",
          "Códigos de la NFPA (National Fire Protection Association)",
          "Normas de diseño FM (Factory Mutual)",
          "UFC (Unified Facilities Criteria)",
          "Normas BS-EN",
          "Requisitos de diseño USACE AED",
          "Normas ASTM",
        ],
      },
      systems: {
        title: "Especialidades de diseño",
        intro: "Estamos especializados en el diseño de los siguientes sistemas:",
        items: [
          "Calefacción, ventilación y aire acondicionado",
          "Sistemas de extinción de incendios",
          "Almacenamiento y distribución de agua",
          "Redes de saneamiento",
          "Tratamiento de agua",
          "Plantas de tratamiento de aguas residuales",
          "Sistemas de riego",
          "Aire comprimido",
          "Almacenamiento y suministro de combustible",
          "Agua sobrecalentada y vapor",
          "Gases a presión",
          "Gas natural",
          "Procesos industriales",
        ],
      },
    },
    blog: {
      badge: "Blog",
      title: "Centro de conocimiento",
      description:
        "Contenidos prácticos sobre diseño MEP, coordinación 3D, protección contra incendios y puesta en marcha, basados en la experiencia de proyectos reales.",
      link: "Ver todos los artículos",
    },
    cta: {
      badge: "Contacto",
      title: "Trabajemos juntos",
      description:
        "Convirtamos sus retos de instalaciones MEP en soluciones bien coordinadas y construibles. Contáctenos para iniciar su próximo proyecto.",
      button: "Contáctenos",
    },
  },

  blog: {
    meta: {
      title: "Blog",
      description:
        "Contenidos sobre operaciones de TI, automatización y monitorización, y sobre ingeniería de instalaciones MEP, basados en la experiencia práctica.",
    },
    title: "Centro de conocimiento",
    description:
      "Contenidos sobre automatización y monitorización de TI, y sobre diseño e ingeniería MEP, basados en la experiencia práctica.",
    categoryLabel: "Categoría del blog",
    divisions: {
      it: {
        label: "Servicios de TI",
        emptyTitle: "Los artículos de TI están en camino",
        emptyDescription:
          "Estamos preparando nuevos contenidos sobre automatización, monitorización y DevOps.",
        emptyCta: "Descubra los servicios de TI",
      },
      engineering: {
        label: "Ingeniería",
        emptyTitle: "Pronto habrá artículos de ingeniería",
        emptyDescription:
          "Estamos preparando contenidos sobre diseño MEP, coordinación 3D y puesta en marcha. Mientras tanto, descubra nuestros servicios de ingeniería.",
        emptyCta: "Descubra los servicios de ingeniería",
      },
    },
    post: {
      backLink: "Todos los artículos",
      relatedLabel: "Artículos relacionados",
      relatedBadge: "Blog",
      relatedTitle: "Siga leyendo",
      untranslated:
        "Este artículo aún no está disponible en {language}. Está leyendo la versión en inglés.",
      cta: {
        badge: "Contacto",
        title: "Trabajemos juntos",
        description:
          "¿Tiene alguna pregunta sobre este tema o un proyecto en mente? Contáctenos para empezar a crear soluciones más inteligentes.",
        button: "Contáctenos",
      },
    },
  },

  contact: {
    meta: {
      title: "Contacto",
      description:
        "Contacte con AID. Oficinas en Varsovia (Polonia) y Ankara (Turquía): convirtamos sus retos en ventajas estratégicas.",
    },
    intro: {
      badge: "Contacto",
      title: "Trabajemos juntos",
      description:
        "Convirtamos sus retos de TI e ingeniería en ventajas estratégicas. Contáctenos para empezar a crear soluciones más inteligentes.",
    },
    responseTime: "Normalmente respondemos en un día laborable.",
    map: {
      title: "Mapa — oficina de AID en Varsovia",
      show: "Mostrar mapa",
      consent:
        "Carga Google Maps. Google recibe su dirección IP y puede instalar cookies; consulte nuestra <link>Política de privacidad</link>.",
    },
    cards: { office: "Oficina", phone: "Teléfono", mail: "Correo" },
    form: {
      fullName: "Nombre completo",
      fullNamePlaceholder: "Lucía García",
      company: "Empresa",
      companyPlaceholder: "García S.L.",
      email: "Correo electrónico",
      emailPlaceholder: "lucia@empresa.es",
      phone: "Teléfono",
      phonePlaceholder: "+34xxxxxxxxx",
      department: {
        label: "Servicio",
        placeholder: "Seleccione un servicio",
        it: { label: "Servicios de TI", description: "Automatización, monitorización y DevOps" },
        engineering: {
          label: "Ingeniería",
          description: "Diseño MEP, coordinación y puesta en marcha",
        },
      },
      message: "¿Cómo podemos ayudarle?",
      messagePlaceholder: "Describa brevemente su necesidad",
      privacy:
        "He leído la <link>Política de privacidad</link> y acepto que AID trate mis datos para responder a mi consulta.",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      success: {
        title: "¡Gracias!",
        message: "Su mensaje se ha enviado. Normalmente respondemos en un día laborable.",
        again: "Enviar otro mensaje",
      },
      errors: {
        summary: "Revise los campos marcados.",
        failed: "Lo sentimos, no se ha podido enviar su mensaje. Escríbanos a {email}.",
        department: "Elija Servicios de TI o Ingeniería.",
        fullName: "Introduzca su nombre completo.",
        email: "Introduzca una dirección de correo electrónico válida.",
        phone: "Introduzca un número de teléfono válido.",
        message: "Cuéntenos un poco más (al menos 10 caracteres).",
        privacy: "Confirme que ha leído la Política de privacidad.",
      },
    },
  },

  privacy: {
    meta: {
      title: "Política de privacidad",
      description:
        "Cómo trata AID los datos personales de acuerdo con el RGPD y la ley turca de protección de datos (KVKK).",
    },
    badge: "Aviso legal",
    title: "Política de privacidad",
    updated: "Última actualización:",
  },

  notFound: {
    title: "No se ha encontrado esta página",
    metaTitle: "Página no encontrada",
    description: "Es posible que la página que busca se haya movido o ya no exista.",
    back: "Volver al inicio",
  },
};
