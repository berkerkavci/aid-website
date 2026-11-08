import type { Messages } from "./en";

/** Textes en français — la structure est identique à `en.ts`. */
export const fr: Messages = {
  site: {
    description:
      "Nous simplifions les opérations IT complexes grâce à la supervision intelligente, l'automatisation et des solutions DevOps — pour plus d'efficacité et une disponibilité garantie.",
    footerTagline:
      "AID est un cabinet de conseil en technologie et en ingénierie spécialisé dans l'optimisation des opérations IT et des infrastructures.",
    offices: { warsaw: "Varsovie, Pologne", ankara: "Ankara, Turquie" },
    logoStory:
      "Les trois formes de notre logo se lisent d'abord comme des chevrons de code : ils représentent nos services IT. Vues comme des couches, elles incarnent Alternative, Innovative et Design et s'élèvent comme un bâtiment pour notre ingénierie MEP.",
  },

  common: {
    skipToContent: "Aller au contenu",
    homeLabel: "AID — accueil",
    nav: {
      main: "Navigation principale",
      mobile: "Navigation mobile",
      footer: "Navigation du pied de page",
      onThisPage: "Sur cette page",
      itServices: "Services IT",
      engineering: "Services MEP",
      engineeringServices: "Services MEP",
      blog: "Blog",
      home: "Accueil",
      contact: "Contact",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    language: {
      button: "Langue : {language}. Changer de langue",
      menu: "Choisir une langue",
    },
    theme: {
      toggle: "Mode sombre",
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
    },
  },

  home: {
    title: "Services MEP et IT",
    subtitle: "Une entreprise, deux expertises",
    software: {
      badge: "Services IT",
      description:
        "Nous simplifions les opérations IT complexes grâce à la supervision intelligente, l'automatisation et des solutions DevOps — pour plus d'efficacité et une disponibilité garantie.",
      cta: "Découvrir les services IT",
    },
    engineering: {
      badge: "Services MEP",
      description:
        "Nous simplifions les systèmes complexes du bâtiment grâce à une conception MEP intelligente, une coordination BIM sans conflit et des solutions d'ingénierie de bureau d'études de bout en bout.",
      cta: "Découvrir les services MEP",
    },
  },

  itServices: {
    meta: {
      title: "Services IT",
      description:
        "Supervision intelligente, automatisation et solutions DevOps qui simplifient les opérations IT complexes, améliorent l'efficacité et garantissent la disponibilité.",
    },
    hero: {
      headline: "Votre partenaire en {word}",
      rotatingWords: ["solutions", "automatisation", "logiciel"],
      description:
        "Nous simplifions les opérations IT complexes grâce à la supervision intelligente, l'automatisation et des solutions DevOps — pour plus d'efficacité et une disponibilité garantie.",
      primaryCta: "Nous contacter",
      secondaryCta: "Découvrir",
    },
    sectionNav: {
      title: "Services IT",
      about: "À propos",
      services: "Services",
      blog: "Centre de ressources",
      contact: "Contact",
    },
    partnersTitle: "Les technologies avec lesquelles nous travaillons",
    about: {
      badge: "À propos",
      title: "Qui sommes-nous",
      description:
        "Nous associons expertise en opérations IT et en ingénierie pour proposer des solutions intelligentes et évolutives. Avec des bureaux en Pologne et en Turquie, nous accompagnons des clients du monde entier en optimisant leurs infrastructures pour des déploiements plus rapides, des décisions plus éclairées et des performances fiables.",
      features: {
        automation: {
          title: "Automatisation",
          description:
            "Éliminez les goulets d'étranglement manuels grâce à l'automatisation des flux de travail, qui gagne en rapidité, en précision et en cohérence.",
        },
        monitoring: {
          title: "Supervision et observabilité",
          description:
            "Bénéficiez d'une visibilité complète sur votre infrastructure grâce à des contrôles proactifs, des alertes en temps réel et des tableaux de bord clairs.",
        },
        devops: {
          title: "Ingénierie DevOps",
          description:
            "Accélérez vos cycles de déploiement et renforcez la collaboration entre développement et exploitation grâce aux pipelines CI/CD et à l'orchestration de conteneurs.",
        },
      },
    },
    stats: {
      title: "Des solutions sans frontières",
      description:
        "Nous travaillons avec des entreprises de nombreux secteurs et pays, en livrant des solutions IT et d'ingénierie sur mesure qui produisent des résultats concrets.",
      experience: "Années d'expérience.",
      clients: "Clients satisfaits qui nous font confiance.",
      countries: "Pays où nous étendons notre présence.",
    },
    services: {
      badge: "Services",
      title: "Des solutions IT de niveau entreprise",
      description:
        "Nos services optimisent les opérations IT à grande échelle, renforcent la résilience, réduisent les risques et alignent la technologie sur vos objectifs stratégiques.",
      items: {
        automation: {
          title: "Automatisation des processus et de l'infrastructure",
          description:
            "Automatisez les processus répétitifs et les opérations d'infrastructure pour gagner en efficacité et réduire les erreurs manuelles.",
        },
        monitoring: {
          title: "Supervision intelligente et alertes",
          description:
            "Suivez l'état de vos systèmes en temps réel grâce à des alertes intelligentes, des actions de réponse automatisées et des rapports détaillés pour décider de manière proactive.",
        },
        configuration: {
          title: "Gestion de configuration",
          description:
            "Préservez l'intégrité de vos systèmes grâce au suivi automatisé, au contrôle de version et à l'application des règles dans tous les environnements.",
        },
        itsm: {
          title: "ITSM et tableau de bord visuel",
          description:
            "Fournissez et gérez vos services IT en toute fluidité grâce à un tableau visuel, des workflows d'incidents et des SLA alignés sur vos objectifs métier.",
        },
      },
    },
    blog: {
      badge: "Blog",
      title: "Centre de ressources",
      description:
        "Des contenus réfléchis sur l'automatisation, la supervision et la transformation numérique, nourris par l'expérience du terrain.",
      link: "Voir tous les articles",
    },
    cta: {
      badge: "Contact",
      title: "Travaillons ensemble",
      description:
        "Transformons vos défis IT en avantages stratégiques. Contactez-nous pour commencer à bâtir des solutions plus intelligentes.",
      button: "Nous contacter",
    },
  },

  engineeringServices: {
    meta: {
      title: "Services MEP",
      description:
        "Conception, ingénierie et conseil pour les lots techniques du bâtiment (MEP : génie climatique, électricité et plomberie), avec les technologies les plus récentes.",
    },
    hero: {
      headline: "Votre partenaire en {word}",
      rotatingWords: ["ingénierie MEP", "conseil MEP", "gestion de projet"],
      description:
        "AID est un bureau d'ingénierie moderne qui s'appuie sur les technologies les plus récentes pour offrir des services de conception de haut niveau pour les lots techniques du bâtiment (MEP : génie climatique, électricité et plomberie).",
      primaryCta: "Nous contacter",
      secondaryCta: "Découvrir",
    },
    sectionNav: {
      title: "Services MEP",
      about: "À propos",
      services: "Services",
      capabilities: "Systèmes et normes",
      references: "Références",
      blog: "Centre de ressources",
      contact: "Contact",
    },
    about: {
      badge: "À propos",
      title: "Qui sommes-nous",
      description:
        "AID a été fondée en 2023 par E. Güher KAVCI, ingénieur en mécanique (B.Sc.), en tant que société. Bien que récente, son équipe de direction possède une vaste expérience acquise au fil d'années de collaboration sur le marché international de la construction. AID s'est rapidement fait un nom dans le secteur, et ses collaborateurs clés sont reconnus pour leur grand professionnalisme. L'entreprise est respectée pour son expertise approfondie, son éthique et une forte culture de la collaboration.",
      features: {
        design: {
          title: "Conception des lots techniques",
          description:
            "Génie climatique, plomberie, protection incendie et réseaux conçus selon les normes ASHRAE, EN, NFPA et FM, de l'esquisse à l'étude d'exécution.",
        },
        coordination: {
          title: "Synthèse 3D et BIM",
          description:
            "Maquettes 3D multidisciplinaires sans conflit et plans d'atelier prêts à poser, pour éviter des reprises coûteuses sur chantier.",
        },
        delivery: {
          title: "Pilotage de projet et qualité",
          description:
            "Analyse des coûts, dossiers d'appel d'offres, revues de conception indépendantes et mise en service pour tenir le budget et garantir les performances prévues.",
        },
      },
    },
    stats: {
      title: "Des solutions sans frontières",
      description:
        "Nous travaillons avec des entreprises de nombreux secteurs et pays, en livrant des solutions d'ingénierie et de conception sur mesure qui produisent des résultats concrets.",
      experience: "Années d'expérience.",
      clients: "Clients satisfaits qui nous font confiance.",
      countries: "Pays où nous étendons notre présence.",
    },
    services: {
      badge: "Services",
      title: "Conception, ingénierie et conseil pour les lots techniques du bâtiment",
      description:
        "Nous optimisons l'exploitation des installations techniques du bâtiment à grande échelle : résilience des systèmes, efficacité énergétique, réduction des coûts et des risques, et technologies alignées sur les objectifs du projet.",
      items: {
        projectEngineering: {
          title: "Ingénierie de projet",
          description: "Pilotage complet de l'ingénierie MEP, de l'esquisse à la réception.",
        },
        coordination: {
          title: "Plans de synthèse MEP 3D",
          description:
            "Synthèse 3D multidisciplinaire sans conflit avant le démarrage du chantier.",
        },
        shopDrawings: {
          title: "Plans d'atelier MEP 3D",
          description: "Plans détaillés, prêts à poser, pour les entreprises et les fabricants.",
        },
        costAnalysis: {
          title: "Analyse des coûts",
          description: "Métrés et estimations précis pour maîtriser le budget.",
        },
        tender: {
          title: "Dossiers d'appel d'offres",
          description: "Dossiers complets avec plans, quantitatifs et cahiers des charges.",
        },
        specifications: {
          title: "Documentation technique et cahiers des charges",
          description:
            "Des spécifications techniques claires, conformes aux normes internationales.",
        },
        designReview: {
          title: "Revue de conception indépendante",
          description:
            "Vérification externe de la conformité, de l'efficacité et de la constructibilité.",
        },
        commissioning: {
          title: "Mise en service",
          description:
            "Essais et mise en service pour vérifier que chaque système fonctionne comme prévu.",
        },
        systemDesign: {
          title: "Conception des systèmes MEP",
          description:
            "Génie climatique, plomberie et protection incendie, de l'esquisse à l'étude d'exécution.",
        },
      },
    },
    capabilities: {
      title: "Les systèmes que nous concevons, les normes que nous appliquons",
      standards: {
        title: "Normes de conception",
        intro:
          "Notre équipe a l'expérience de la conception d'installations mécaniques conformément aux normes suivantes :",
        items: [
          "Normes et manuels de l'ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)",
          "Normes OBO (Overseas Building Operations)",
          "Publications de la MMO (Chambre des ingénieurs mécaniciens de Turquie)",
          "Normes EN",
          "Codes de la NFPA (National Fire Protection Association)",
          "Normes de conception FM (Factory Mutual)",
          "UFC (Unified Facilities Criteria)",
          "Normes BS-EN",
          "Exigences de conception USACE AED",
          "Normes ASTM",
        ],
      },
      systems: {
        title: "Expertise en conception de systèmes",
        intro: "Nous sommes spécialisés dans la conception des systèmes suivants :",
        items: [
          "Chauffage, ventilation et climatisation",
          "Systèmes d'extinction incendie",
          "Stockage et distribution d'eau",
          "Réseaux d'assainissement",
          "Traitement de l'eau",
          "Stations d'épuration des eaux usées",
          "Systèmes d'irrigation",
          "Air comprimé",
          "Stockage et alimentation en combustible",
          "Eau surchauffée et vapeur",
          "Gaz sous pression",
          "Gaz naturel",
          "Procédés industriels",
        ],
      },
    },
    references: {
      badge: "Références",
      title: "Une expertise éprouvée sur des projets critiques",
      description:
        "Ingénierie et conception MEP pour des projets diplomatiques, de défense et gouvernementaux sur quatre continents.",
      statusLabel: "Statut du projet",
      status: { completed: "Terminés", ongoing: "En cours" },
      columns: { project: "Projet", location: "Lieu", endUser: "Utilisateur final" },
    },
    blog: {
      badge: "Blog",
      title: "Centre de ressources",
      description:
        "Des contenus pratiques sur la conception MEP, la synthèse 3D, la protection incendie et la mise en service, nourris par l'expérience de projets réels.",
      link: "Voir tous les articles",
    },
    cta: {
      badge: "Contact",
      title: "Travaillons ensemble",
      description:
        "Transformons vos défis techniques en solutions bien coordonnées et réalisables. Contactez-nous pour lancer votre prochain projet.",
      button: "Nous contacter",
    },
  },

  blog: {
    meta: {
      title: "Blog",
      description:
        "Des contenus sur les opérations IT, l'automatisation et la supervision, ainsi que sur l'ingénierie des lots techniques du bâtiment — nourris par l'expérience du terrain.",
    },
    title: "Centre de ressources",
    description:
      "Des contenus réfléchis sur l'automatisation et la supervision IT, ainsi que sur la conception et l'ingénierie MEP, nourris par l'expérience du terrain.",
    categoryLabel: "Catégorie du blog",
    divisions: {
      it: {
        label: "Services IT",
        emptyTitle: "Les articles IT arrivent bientôt",
        emptyDescription:
          "Nous préparons de nouveaux contenus sur l'automatisation, la supervision et le DevOps.",
        emptyCta: "Découvrir les services IT",
      },
      engineering: {
        label: "Services MEP",
        emptyTitle: "Les articles d'ingénierie arrivent bientôt",
        emptyDescription:
          "Nous préparons des contenus sur la conception MEP, la synthèse 3D et la mise en service. En attendant, découvrez nos services d'ingénierie.",
        emptyCta: "Découvrir les services d'ingénierie",
      },
    },
    post: {
      backLink: "Tous les articles",
      relatedLabel: "Articles similaires",
      relatedBadge: "Blog",
      relatedTitle: "À lire aussi",
      untranslated:
        "Cet article n'est pas encore disponible en {language}. Vous lisez la version anglaise.",
      cta: {
        badge: "Contact",
        title: "Travaillons ensemble",
        description:
          "Une question sur ce sujet ou un projet en tête ? Contactez-nous pour commencer à bâtir des solutions plus intelligentes.",
        button: "Nous contacter",
      },
    },
  },

  contact: {
    meta: {
      title: "Contact",
      description:
        "Contactez AID. Bureaux à Varsovie (Pologne) et à Ankara (Turquie) — transformons vos défis en avantages stratégiques.",
    },
    intro: {
      badge: "Contact",
      title: "Travaillons ensemble",
      description:
        "Transformons vos défis IT et d'ingénierie en avantages stratégiques. Contactez-nous pour commencer à bâtir des solutions plus intelligentes.",
    },
    responseTime: "Nous répondons généralement sous un jour ouvré.",
    photo: {
      alt: "Échange avec un visiteur lors d'un événement professionnel",
      caption: "Varsovie · Ankara",
    },
    map: {
      title: "Carte — bureau d'AID à Varsovie",
      show: "Afficher la carte",
      consent:
        "Charge Google Maps. Google reçoit votre adresse IP et peut déposer des cookies — voir notre <link>politique de confidentialité</link>.",
    },
    cards: { office: "Bureau", phone: "Téléphone", mail: "E-mail" },
    form: {
      fullName: "Nom complet",
      fullNamePlaceholder: "Marie Dupont",
      company: "Entreprise",
      companyPlaceholder: "Dupont SAS",
      email: "E-mail",
      emailPlaceholder: "marie@entreprise.fr",
      phone: "Téléphone",
      phonePlaceholder: "+33xxxxxxxxx",
      department: {
        label: "Service",
        placeholder: "Choisissez un service",
        it: { label: "Services IT", description: "Automatisation, supervision et DevOps" },
        engineering: {
          label: "Services MEP",
          description: "Conception MEP, synthèse et mise en service",
        },
      },
      message: "Comment pouvons-nous vous aider ?",
      messagePlaceholder: "Décrivez brièvement votre besoin",
      privacy:
        "J'ai lu la <link>politique de confidentialité</link> et j'accepte qu'AID traite mes données pour répondre à ma demande.",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      success: {
        title: "Merci !",
        message: "Votre message a bien été envoyé. Nous répondons généralement sous un jour ouvré.",
        again: "Envoyer un autre message",
      },
      errors: {
        summary: "Veuillez vérifier les champs signalés.",
        failed: "Désolé, votre message n'a pas pu être envoyé. Écrivez-nous à l'adresse {email}.",
        department: "Veuillez choisir Services IT ou Services MEP.",
        fullName: "Veuillez saisir votre nom complet.",
        email: "Veuillez saisir une adresse e-mail valide.",
        phone: "Veuillez saisir un numéro de téléphone valide.",
        message: "Veuillez en dire un peu plus (10 caractères minimum).",
        privacy: "Veuillez confirmer avoir lu la politique de confidentialité.",
      },
    },
  },

  privacy: {
    meta: {
      title: "Politique de confidentialité",
      description:
        "Comment AID traite les données personnelles conformément au RGPD et à la loi turque sur la protection des données (KVKK).",
    },
    badge: "Mentions légales",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour :",
  },

  notFound: {
    title: "Cette page est introuvable",
    metaTitle: "Page introuvable",
    description: "La page que vous recherchez a peut-être été déplacée ou n'existe plus.",
    back: "Retour à l'accueil",
  },
};
