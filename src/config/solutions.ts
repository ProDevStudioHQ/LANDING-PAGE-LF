// Sector solution pages (/fr/solutions/*) — content source of truth.
//
// Part 6 of the SOP forbids template-fill pages: "if you could swap 'riad' for
// 'restaurant' and the page still reads fine, it is too generic to rank." The
// SHAPE is shared here; the WORDS are not. Every sector's problems, deliverables
// and FAQ are written from that trade's own vocabulary — a riad owner says
// commission OTA and taux d'occupation, a restaurateur says couverts and
// no-show, a spa says planning des cabines. Reusing one sector's copy with the
// noun swapped would defeat the entire point of building these pages.
//
// caseStudy is deliberately optional and currently unset everywhere. Section 4
// of the template requires a REAL project — client, problem, build, outcome.
// There is no client work available to cite, and the SOP is explicit that a
// number must never be invented, so the section is omitted rather than shipped
// as a placeholder. Fill this in and the section renders itself.

export type SolutionFaq = { q: string; a: string };

export type SolutionPackage = {
  name: string;
  priceMad: string;
  priceUsd: string;
  delay: string;
  items: string[];
  featured: boolean;
};

// A REAL project from the CRM portfolio, linked from the sector page.
//
// This is not the full Section 4 case study — that needs a problem, a build and
// an outcome, which only the studio can supply. It is the honest half that can
// be shipped today: an actual delivered project the visitor can click into and
// see. `adjacent` is set when the project is from a neighbouring sector rather
// than this one, and the page says so plainly. The SOP is explicit that an
// adjacent real project beats a fabricated matching one.
export type SolutionProject = {
  slug: string;
  title: string;
  adjacent?: string;
};

export type SolutionCaseStudy = {
  client: string;
  problem: string;
  built: string;
  result: string;
  // Set when the cited project is from an adjacent sector rather than this one.
  // The SOP allows that explicitly, provided the page says so honestly.
  adjacentNote?: string;
};

// Menu grouping. Past roughly seven items people stop reading a list and start
// scanning it, which means they miss the one that applies to them — so the
// dropdown is grouped rather than a single column of twelve.
export type SolutionGroup =
  | "Tourisme & hospitalité"
  | "Commerce & services"
  | "Professions & formation";

export const SOLUTION_GROUP_ORDER: SolutionGroup[] = [
  "Tourisme & hospitalité",
  "Commerce & services",
  "Professions & formation",
];

export type Solution = {
  slug: string;
  group: SolutionGroup;
  // Navbar / card label — the client's identity, not a service name.
  navLabel: string;
  navEmoji: string;
  // The one-line seller that sits under the nav label.
  navNote: string;

  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  // One-line promise addressing the real problem.
  promise: string;
  breadcrumbLabel: string;

  problemsHeading: string;
  problemsIntro: string;
  problems: { title: string; desc: string }[];

  deliverablesHeading: string;
  deliverablesIntro: string;
  deliverables: { icon: string; label: string; desc: string }[];

  caseStudy?: SolutionCaseStudy;
  featuredProject?: SolutionProject;

  processIntro: string;
  process: { step: string; title: string; desc: string }[];

  pricingIntro: string;
  packages: SolutionPackage[];

  faqs: SolutionFaq[];

  ctaHeading: string;
  ctaBody: string;

  // Related sector slugs, for the internal-linking requirement.
  related: string[];
};

const SHARED_PROCESS = (context: string) => [
  {
    step: "01",
    title: "Appel de découverte",
    desc: `30 minutes pour comprendre ${context}. Gratuit, sans engagement, et sans argumentaire de vente.`,
  },
  {
    step: "02",
    title: "Devis et maquette",
    desc: "Vous recevez un prix fixe, un délai ferme et une maquette de la page d'accueil sous 48 heures. Rien ne commence avant votre accord écrit.",
  },
  {
    step: "03",
    title: "Développement",
    desc: "Nous construisons, vous suivez l'avancement en direct sur un lien de préversion. Vous avez un accès WhatsApp et email tout au long — sans chef de projet intermédiaire.",
  },
  {
    step: "04",
    title: "Mise en ligne et formation",
    desc: "Nous publions le site, vous formons à le modifier vous-même, et restons disponibles 30 jours pour tout ajustement inclus.",
  },
];

export const solutions: Solution[] = [
  /* ─────────────────────────── RIAD ─────────────────────────── */
  {
    slug: "site-web-riad-marrakech",
    group: "Tourisme & hospitalité",
    navLabel: "Riad & maison d'hôtes",
    navEmoji: "🏨",
    navNote: "Réservation directe, sans commission",

    seoTitle: "Création Site Web Riad Marrakech | Digital Studio LF",
    seoDescription:
      "Création de site web pour riad à Marrakech. Réservation directe, multilingue, paiement en ligne. Devis gratuit sous 24h. Studio basé à Marrakech.",
    h1: "Création de site web pour riad à Marrakech",
    eyebrow: "Riads & Maisons d'Hôtes",
    promise:
      "Recevez des réservations directes et arrêtez de verser une commission sur des clients qui vous cherchaient déjà.",
    breadcrumbLabel: "Site web pour riad",

    problemsHeading: "Ce que nous entendons des propriétaires de riads",
    problemsIntro:
      "Si vous vous reconnaissez dans deux de ces situations, une page vitrine ne suffira pas.",
    problems: [
      {
        title: "La commission OTA ronge la marge",
        desc: "Booking et Expedia prélèvent une part significative de chaque réservation — souvent 15 à 18 %. Sur une basse saison déjà tendue, c'est la différence entre un mois rentable et un mois blanc.",
      },
      {
        title: "Les voyageurs vous trouvent sur Instagram, sans pouvoir réserver",
        desc: "Vos photos circulent, votre lien en bio renvoie vers une page qui ne prend pas de réservation. Le voyageur repart chercher votre riad sur une plateforme — et vous repayez une commission.",
      },
      {
        title: "Le site actuel n'est pas en anglais, ou casse sur mobile",
        desc: "Vos clients viennent de France, d'Espagne et du Royaume-Uni, et réservent depuis leur téléphone. Un site uniquement en français qui s'affiche mal sur mobile écarte une grande partie de votre clientèle avant même le premier contact.",
      },
      {
        title: "Aucun moyen d'encaisser un acompte",
        desc: "Sans acompte, vous bloquez des chambres pour des réservations qui ne se confirment jamais. Votre taux d'occupation réel est inférieur à votre planning.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de riad",
    deliverablesIntro:
      "Pas une brochure en ligne. Un outil qui remplit vos chambres.",
    deliverables: [
      {
        icon: "🌍",
        label: "Site multilingue FR / EN / ES / AR",
        desc: "Chaque langue a ses propres URLs et balises hreflang, pour que Google serve la bonne version selon le pays du voyageur.",
      },
      {
        icon: "📅",
        label: "Moteur de réservation directe",
        desc: "Calendrier de disponibilités, sélection des chambres par date, confirmation automatique par email.",
      },
      {
        icon: "💳",
        label: "Acompte en ligne",
        desc: "Encaissement par carte via une passerelle marocaine (CMI, Payzone), ou virement bancaire là où la monétique n'est pas encore en place.",
      },
      {
        icon: "🖼️",
        label: "Galeries photo rapides",
        desc: "Un riad se vend par l'image. Formats modernes et chargement progressif : vos photos restent superbes sans ralentir la page.",
      },
      {
        icon: "📍",
        label: "Google Maps et avis intégrés",
        desc: "Votre emplacement dans la médina et vos avis affichés sur la page, au moment exact où le voyageur hésite.",
      },
      {
        icon: "💬",
        label: "Bouton de réservation WhatsApp",
        desc: "Beaucoup de voyageurs préfèrent écrire avant de réserver. Un bouton direct vers votre WhatsApp lève ce frein.",
      },
      {
        icon: "🔎",
        label: "Fiche Google Business configurée",
        desc: "Mise en place et optimisation de votre fiche, pour apparaître dans le pack local quand on cherche un riad dans votre quartier.",
      },
    ],

    featuredProject: {
      slug: "atlas-mountains-adventures",
      title: "Atlas Mountains Adventures",
      adjacent:
        "Projet du secteur voisin — un opérateur touristique, pas un riad. Nous préférons vous montrer une réservation en ligne que nous avons réellement livrée plutôt qu'un exemple inventé.",
    },

    processIntro:
      "De la première conversation à la mise en ligne, en 7 à 21 jours selon la formule.",
    process: SHARED_PROCESS("votre riad, votre clientèle et votre taux d'occupation actuel"),

    pricingIntro:
      "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Riad",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Présentation du riad et des chambres",
          "Galerie photo optimisée",
          "Formulaire de demande de réservation",
          "Google Maps et avis",
          "Français + anglais",
          "Référencement local de base",
        ],
        featured: false,
      },
      {
        name: "Réservation Directe",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Moteur de réservation avec calendrier",
          "Acompte en ligne ou virement",
          "Confirmations automatiques par email",
          "4 langues (FR / EN / ES / AR)",
          "Tableau de bord des réservations",
        ],
        featured: true,
      },
      {
        name: "Plateforme Sur Mesure",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Toute la réservation directe, plus :",
          "Plusieurs établissements",
          "Tarification par saison",
          "Synchronisation des calendriers",
          "Rapports et statistiques",
          "Intégrations sur demande",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un riad ?",
        a: "Entre 2 500 et 12 000 MAD selon les fonctionnalités. Un site vitrine avec galerie et formulaire démarre à 2 500 MAD ; un site avec moteur de réservation et acompte en ligne démarre à 7 000 MAD. Le prix est fixé par écrit avant le début du projet.",
      },
      {
        q: "Puis-je recevoir des réservations directes sans Booking.com ?",
        a: "Oui, c'est précisément l'objectif du moteur de réservation directe que nous intégrons à votre site de riad. Vous ne quitterez pas les plateformes du jour au lendemain, et ce n'est pas conseillé — elles vous apportent de la visibilité. L'intérêt est de récupérer les voyageurs qui vous cherchent déjà par votre nom, et qui aujourd'hui retournent réserver via une plateforme faute d'alternative.",
      },
      {
        q: "Le site sera-t-il en plusieurs langues ?",
        a: "Français et anglais au minimum, car ce sont vos deux plus gros marchés. L'espagnol et l'arabe sont ajoutés selon votre clientèle. Chaque langue a ses propres URLs, ce qui permet à Google de proposer la bonne version à chaque voyageur.",
      },
      {
        q: "Comment accepter les paiements en ligne au Maroc ?",
        a: "Par une passerelle marocaine comme CMI ou Payzone, qui permet d'encaisser en dirhams sur un compte bancaire marocain. Le contrat monétique s'ouvre auprès de votre banque ; nous prenons en charge l'intégration technique une fois ce contrat obtenu. Là où ce n'est pas encore en place, nous mettons en place l'acompte par virement.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "7 à 14 jours pour un site vitrine, 14 à 21 jours avec moteur de réservation et paiement. Le délai est convenu à l'avance et tenu.",
      },
      {
        q: "Qui gère le site après la livraison ?",
        a: "Vous, si vous le souhaitez : nous vous formons à modifier les textes, les photos et les tarifs vous-même. Les 30 premiers jours d'ajustements sont inclus. Au-delà, vous pouvez souscrire une maintenance mensuelle ou nous solliciter à la demande.",
      },
      {
        q: "Mes photos sont très lourdes. Le site sera-t-il lent ?",
        a: "Non. Les photos sont converties en formats modernes (WebP/AVIF) et redimensionnées automatiquement selon l'écran. Vos galeries restent nettes tout en s'affichant vite, y compris sur un mobile en 4G — ce qui compte, car la majorité de vos visiteurs réservent depuis leur téléphone.",
      },
    ],

    ctaHeading: "Parlons de votre riad",
    ctaBody:
      "Consultation gratuite de 30 minutes, sans engagement. Nous regardons votre situation actuelle et vous disons ce qui est réaliste — en français, anglais ou arabe.",
    related: ["site-web-hotel-maroc", "site-web-spa-marrakech", "site-web-agence-voyage-maroc"],
  },

  /* ─────────────────────────── HÔTEL ─────────────────────────── */
  {
    slug: "site-web-hotel-maroc",
    group: "Tourisme & hospitalité",
    navLabel: "Hôtel",
    navEmoji: "🛎️",
    navNote: "Réservation directe et gestion multi-chambres",

    seoTitle: "Création de Site Web pour Hôtel au Maroc | Digital Studio LF",
    seoDescription:
      "Création de site web pour hôtel au Maroc : moteur de réservation, tarification par saison, multilingue, paiement en ligne. Devis gratuit sous 24h.",
    h1: "Création de site web pour hôtel au Maroc",
    eyebrow: "Hôtels",
    promise:
      "Un canal de réservation qui vous appartient, avec la tarification et les disponibilités que vous maîtrisez.",
    breadcrumbLabel: "Site web pour hôtel",

    problemsHeading: "Les blocages propres à l'hôtellerie",
    problemsIntro:
      "Un hôtel n'a pas les mêmes contraintes qu'une maison d'hôtes : le volume, les catégories de chambres et la saisonnalité changent tout.",
    problems: [
      {
        title: "La parité tarifaire vous enferme",
        desc: "Les plateformes imposent des contraintes de prix, et sans canal direct crédible vous n'avez aucun levier de négociation. Un site qui convertit vous redonne ce levier.",
      },
      {
        title: "Les catégories de chambres sont illisibles en ligne",
        desc: "Standard, supérieure, suite, vue jardin : si le voyageur ne comprend pas la différence en dix secondes, il réserve la moins chère — ou ne réserve pas du tout.",
      },
      {
        title: "Les tarifs changent par saison, le site non",
        desc: "Haute saison, basse saison, événements, longs séjours. Un site statique où les prix sont écrits en dur devient faux quinze jours après la mise en ligne.",
      },
      {
        title: "Aucune visibilité sur l'origine des réservations",
        desc: "Sans tableau de bord, vous ne savez pas ce que le canal direct rapporte réellement — donc vous ne savez pas s'il vaut la peine d'être développé.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site d'hôtel",
    deliverablesIntro:
      "Conçu pour du volume, plusieurs catégories de chambres et une tarification qui bouge.",
    deliverables: [
      {
        icon: "🛏️",
        label: "Catalogue de chambres structuré",
        desc: "Chaque catégorie a sa page : photos, superficie, équipements, capacité et tarif. Le voyageur compare sans quitter le site.",
      },
      {
        icon: "📅",
        label: "Moteur de réservation multi-chambres",
        desc: "Disponibilités par catégorie, séjours multiples, options et suppléments, confirmation automatique.",
      },
      {
        icon: "📈",
        label: "Tarification par saison",
        desc: "Vous définissez vos périodes et vos prix depuis un tableau de bord. Le site suit, sans intervention technique.",
      },
      {
        icon: "💳",
        label: "Paiement et acompte en ligne",
        desc: "Passerelles marocaines (CMI, Payzone) pour l'encaissement en dirhams, solutions internationales pour la clientèle étrangère.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / EN / ES / AR",
        desc: "URLs distinctes et hreflang par langue, pour capter la recherche dans le pays d'origine du voyageur.",
      },
      {
        icon: "📊",
        label: "Tableau de bord des réservations",
        desc: "Volume, origine, panier moyen et taux de conversion du canal direct. De quoi arbitrer entre direct et plateformes sur des chiffres.",
      },
    ],

    featuredProject: {
      slug: "aurum-luxury-exotic-car-rental-website",
      title: "AURUM — Luxury & Exotic Car Rental",
      adjacent:
        "Projet du secteur voisin — de la location haut de gamme, pas un hôtel. La mécanique est la même : disponibilités en temps réel, réservation en ligne et clientèle internationale.",
    },

    processIntro:
      "De la première conversation à la mise en ligne, en 14 à 35 jours selon la formule.",
    process: SHARED_PROCESS(
      "votre établissement, vos catégories de chambres et votre répartition actuelle entre direct et plateformes"
    ),

    pricingIntro:
      "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Hôtel",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Pages par catégorie de chambre",
          "Galeries et équipements",
          "Formulaire de demande",
          "Google Maps et avis",
          "Français + anglais",
          "Référencement local",
        ],
        featured: false,
      },
      {
        name: "Réservation Directe",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Moteur multi-chambres",
          "Tarification par saison",
          "Paiement et acompte en ligne",
          "4 langues",
          "Tableau de bord des réservations",
        ],
        featured: true,
      },
      {
        name: "Plateforme Sur Mesure",
        priceMad: "25 000 MAD",
        priceUsd: "$2 500",
        delay: "35–60 jours",
        items: [
          "Toute la réservation directe, plus :",
          "Plusieurs établissements",
          "Synchronisation des calendriers",
          "Offres et forfaits packagés",
          "Rapports avancés",
          "Intégrations PMS sur demande",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un hôtel au Maroc ?",
        a: "Entre 7 000 et 25 000 MAD selon la taille de l'établissement et les fonctionnalités. Un site vitrine avec pages par catégorie démarre à 7 000 MAD ; un site avec moteur de réservation et tarification saisonnière démarre à 12 000 MAD.",
      },
      {
        q: "Le site peut-il gérer plusieurs catégories de chambres ?",
        a: "Oui. Chaque catégorie a sa propre page, ses photos, sa capacité et son tarif, et le moteur de réservation gère les disponibilités séparément pour chacune. C'est la différence principale avec un site de maison d'hôtes.",
      },
      {
        q: "Puis-je modifier mes tarifs par saison moi-même ?",
        a: "Oui, depuis un tableau de bord. Vous définissez vos périodes et vos prix, et le site applique automatiquement le bon tarif selon les dates choisies par le voyageur. Aucune intervention technique n'est nécessaire.",
      },
      {
        q: "Le site se synchronise-t-il avec Booking.com ?",
        a: "C'est possible via un channel manager, à condition que vous en utilisiez déjà un. Nous connectons le site à votre outil existant plutôt que d'en imposer un nouveau. Si vous n'en avez pas, nous pouvons vous conseiller mais l'abonnement reste à votre charge.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "14 à 21 jours pour un site vitrine, 21 à 35 jours avec moteur de réservation. Le délai dépend surtout de la rapidité à laquelle vous nous fournissez photos et descriptifs de chambres.",
      },
      {
        q: "Qui gère le site après la livraison ?",
        a: "Vous, après une formation incluse à la prise en main. Les 30 premiers jours d'ajustements sont couverts. Au-delà, une maintenance mensuelle est disponible, ou une intervention à la demande.",
      },
    ],

    ctaHeading: "Parlons de votre établissement",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous votre nombre de chambres et votre répartition actuelle entre direct et plateformes — nous vous dirons ce qui est réaliste.",
    related: ["site-web-riad-marrakech", "site-web-spa-marrakech", "site-web-restaurant-marrakech"],
  },

  /* ─────────────────────────── RESTAURANT ─────────────────────────── */
  {
    slug: "site-web-restaurant-marrakech",
    group: "Tourisme & hospitalité",
    navLabel: "Restaurant",
    navEmoji: "🍽️",
    navNote: "Menu en ligne, réservation de table",

    seoTitle: "Création Site Web Restaurant Marrakech | Digital Studio",
    seoDescription:
      "Création de site web pour restaurant à Marrakech : menu en ligne, réservation de table, Google Maps et avis. Devis gratuit sous 24h. Studio basé à Marrakech.",
    h1: "Création de site web pour restaurant à Marrakech",
    eyebrow: "Restaurants",
    promise:
      "Un menu que l'on consulte sans télécharger un PDF, et une table que l'on réserve sans appeler.",
    breadcrumbLabel: "Site web pour restaurant",

    problemsHeading: "Ce qui fait perdre des couverts",
    problemsIntro:
      "La plupart des restaurants de Marrakech n'ont pas de site — et ceux qui en ont un perdent souvent des clients à cause des mêmes détails.",
    problems: [
      {
        title: "Le menu est un PDF illisible sur téléphone",
        desc: "Le client zoome, fait défiler, abandonne. Un menu en PDF est la première cause de départ d'un site de restaurant, et c'est aussi invisible pour Google : vos plats ne ressortent dans aucune recherche.",
      },
      {
        title: "Réserver oblige à téléphoner",
        desc: "Un touriste étranger n'appellera pas un numéro marocain depuis son forfait. S'il ne peut pas réserver en ligne ou par WhatsApp, il choisit le restaurant d'à côté qui le permet.",
      },
      {
        title: "Vous êtes invisible sur Google Maps",
        desc: "La recherche « restaurant près de moi » se joue dans le pack local. Sans fiche Google optimisée ni site cohérent, vous n'y apparaissez pas, quelle que soit la qualité de votre cuisine.",
      },
      {
        title: "Les horaires et le menu ne sont jamais à jour",
        desc: "Un plat retiré de la carte il y a six mois figure encore en ligne. Le client arrive, ne le trouve pas, et repart avec une mauvaise impression avant même de s'asseoir.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de restaurant",
    deliverablesIntro: "Simple à consulter pour le client, simple à mettre à jour pour vous.",
    deliverables: [
      {
        icon: "📖",
        label: "Menu en ligne, pas en PDF",
        desc: "Chaque plat est une vraie page web : lisible sur téléphone, traduisible, et indexable par Google. Vos spécialités deviennent des portes d'entrée de recherche.",
      },
      {
        icon: "🪑",
        label: "Réservation de table",
        desc: "Formulaire de réservation avec créneaux et nombre de couverts, confirmation automatique, et rappel par email pour limiter les no-shows.",
      },
      {
        icon: "💬",
        label: "Réservation WhatsApp",
        desc: "Le canal que vos clients locaux utilisent déjà. Un bouton, une conversation, une table réservée.",
      },
      {
        icon: "📍",
        label: "Google Maps et avis",
        desc: "Fiche Google Business configurée et avis affichés sur le site — les deux leviers qui décident la recherche « restaurant près de moi ».",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / EN / ES / AR",
        desc: "À Marrakech, votre salle est internationale. Le menu et les informations pratiques suivent la langue du visiteur.",
      },
      {
        icon: "✏️",
        label: "Mise à jour en autonomie",
        desc: "Vous changez un plat, un prix ou vos horaires en deux minutes depuis votre téléphone, sans nous appeler et sans frais.",
      },
    ],

    // Exact sector match — no adjacency caveat needed.
    featuredProject: {
      slug: "dar-zahra-modern-moroccan-restaurant",
      title: "Dar Zahra — Modern Moroccan Restaurant",
    },

    processIntro: "De la première conversation à la mise en ligne, en 7 à 21 jours.",
    process: SHARED_PROCESS("votre restaurant, votre carte et le profil de votre clientèle"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Restaurant",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Menu en ligne complet",
          "Photos et ambiance",
          "Horaires et accès",
          "Google Maps et avis",
          "Bouton WhatsApp",
          "Français + anglais",
        ],
        featured: true,
      },
      {
        name: "Réservation de Table",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Réservation avec créneaux",
          "Confirmations et rappels",
          "Gestion des couverts",
          "4 langues",
          "Tableau de bord des réservations",
        ],
        featured: false,
      },
      {
        name: "Restaurant & Commande",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Toute la réservation, plus :",
          "Commande en ligne",
          "Paiement ou paiement à la livraison",
          "Zones et frais de livraison",
          "Codes promo",
          "Rapports de ventes",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un restaurant à Marrakech ?",
        a: "Entre 2 500 et 12 000 MAD. Un site vitrine avec menu en ligne, photos et bouton WhatsApp démarre à 2 500 MAD ; la réservation de table démarre à 7 000 MAD ; la commande en ligne avec paiement à 12 000 MAD.",
      },
      {
        q: "Puis-je mettre à jour ma carte moi-même ?",
        a: "Oui, en deux minutes depuis votre téléphone. Vous modifiez un plat, un prix ou vos horaires sans nous contacter et sans frais. C'est le point sur lequel les sites de restaurants échouent le plus souvent, donc nous le traitons en priorité.",
      },
      {
        q: "Pourquoi ne pas simplement mettre mon menu en PDF ?",
        a: "Parce qu'un PDF est illisible sur téléphone et invisible pour Google. Un menu en pages web permet à vos plats de ressortir dans les recherches — quelqu'un qui cherche « meilleur tajine Marrakech » peut atterrir directement sur votre carte, ce qu'un PDF ne permettra jamais.",
      },
      {
        q: "Le site gère-t-il la réservation de table ?",
        a: "Oui, à partir de la formule à 7 000 MAD : créneaux horaires, nombre de couverts, confirmation automatique et rappel par email la veille pour limiter les no-shows. Le client peut aussi réserver par WhatsApp s'il préfère.",
      },
      {
        q: "Et la livraison ou la commande en ligne ?",
        a: "Disponible dans la formule à 12 000 MAD, avec paiement en ligne ou paiement à la livraison, zones de livraison et frais par zone. Vous gardez la main sur vos commandes plutôt que de dépendre uniquement d'une plateforme qui prélève une commission.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "7 à 14 jours pour un site vitrine avec menu, 14 à 21 jours avec réservation. Le délai dépend surtout de la disponibilité de vos photos et de votre carte à jour.",
      },
    ],

    ctaHeading: "Parlons de votre restaurant",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous votre type de cuisine et votre clientèle — nous vous dirons ce qui vaut la peine d'être construit, et ce qui ne l'est pas.",
    related: ["site-web-riad-marrakech", "site-web-hotel-maroc", "site-web-spa-marrakech"],
  },

  /* ─────────────────────────── AGENCE DE VOYAGE ─────────────────────────── */
  {
    slug: "site-web-agence-voyage-maroc",
    group: "Tourisme & hospitalité",
    navLabel: "Agence de voyage",
    navEmoji: "🧭",
    navNote: "Circuits, excursions et devis en ligne",

    seoTitle: "Création Site Web Agence de Voyage Maroc | Digital Studio",
    seoDescription:
      "Création de site web pour agence de voyage au Maroc : catalogue de circuits, demande de devis, réservation d'excursions. Devis gratuit sous 24h.",
    h1: "Création de site web pour agence de voyage au Maroc",
    eyebrow: "Agences de Voyage & Tour-Opérateurs",
    promise:
      "Un catalogue de circuits que l'on parcourt seul, et des demandes de devis qui arrivent qualifiées.",
    breadcrumbLabel: "Site web pour agence de voyage",

    problemsHeading: "Ce qui ralentit une agence réceptive",
    problemsIntro:
      "Le métier se joue sur la qualité des demandes reçues, pas sur leur nombre.",
    problems: [
      {
        title: "Chaque demande arrive vide",
        desc: "« Bonjour, combien pour le désert ? » Sans dates, ni nombre de personnes, ni budget. Vous passez trois échanges à qualifier avant de pouvoir chiffrer quoi que ce soit.",
      },
      {
        title: "Les circuits ne sont visibles nulle part",
        desc: "Vos programmes existent en PDF ou dans des échanges WhatsApp. Un voyageur qui cherche « excursion Merzouga 3 jours » ne vous trouvera jamais, parce que rien n'est indexable.",
      },
      {
        title: "Vous dépendez entièrement des plateformes",
        desc: "GetYourGuide et Viator vous apportent du volume et prélèvent leur part. Sans canal direct, vous n'avez aucune marge de manœuvre sur vos prix ni sur la relation client.",
      },
      {
        title: "Rien ne rassure sur votre sérieux",
        desc: "Un voyageur étranger s'apprête à virer plusieurs milliers de dirhams à une agence qu'il ne connaît pas. Sans licence affichée, avis visibles et conditions claires, il choisit une agence qui les montre.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site d'agence de voyage",
    deliverablesIntro: "Structuré pour être trouvé, conçu pour qualifier.",
    deliverables: [
      {
        icon: "🗺️",
        label: "Catalogue de circuits",
        desc: "Une page par circuit : itinéraire jour par jour, durée, inclusions et exclusions, tarif par personne. Chaque page vise sa propre recherche.",
      },
      {
        icon: "📝",
        label: "Formulaire de devis qualifiant",
        desc: "Dates, nombre de voyageurs, budget, centres d'intérêt. La demande arrive complète — vous chiffrez au premier échange au lieu du quatrième.",
      },
      {
        icon: "🎟️",
        label: "Réservation d'excursions",
        desc: "Pour les produits à date fixe et prix fixe, réservation et acompte directement en ligne, sans passer par une plateforme.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / EN / ES",
        desc: "Vos marchés sont francophone, anglophone et hispanophone. Chaque langue a ses propres pages de circuits, indexées séparément.",
      },
      {
        icon: "🛡️",
        label: "Éléments de réassurance",
        desc: "Licence, avis clients, conditions d'annulation et moyens de paiement affichés clairement — ce qui décide un voyageur qui hésite à réserver depuis l'étranger.",
      },
      {
        icon: "💬",
        label: "WhatsApp et rappel",
        desc: "Le canal privilégié pour ce métier. Bouton direct, et demande de rappel pour les voyageurs qui préfèrent la voix.",
      },
    ],

    // Exact sector match — a Moroccan tour operator.
    featuredProject: {
      slug: "atlas-mountains-adventures",
      title: "Atlas Mountains Adventures",
    },

    processIntro: "De la première conversation à la mise en ligne, en 14 à 35 jours.",
    process: SHARED_PROCESS("votre agence, vos circuits phares et vos marchés d'origine"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Agence",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Jusqu'à 10 circuits détaillés",
          "Formulaire de devis qualifiant",
          "Éléments de réassurance",
          "Google Maps et avis",
          "Français + anglais",
          "Référencement des circuits",
        ],
        featured: true,
      },
      {
        name: "Catalogue & Réservation",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Circuits illimités",
          "Réservation d'excursions en ligne",
          "Acompte par carte ou virement",
          "3 langues",
          "Tableau de bord des demandes",
        ],
        featured: false,
      },
      {
        name: "Plateforme Sur Mesure",
        priceMad: "25 000 MAD",
        priceUsd: "$2 500",
        delay: "35–60 jours",
        items: [
          "Tout le catalogue, plus :",
          "Espace agent et revendeurs",
          "Tarification par marché",
          "Gestion des disponibilités guides",
          "CRM voyageurs intégré",
          "Rapports et statistiques",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour une agence de voyage au Maroc ?",
        a: "Entre 7 000 et 25 000 MAD. Un site vitrine avec dix circuits détaillés et formulaire de devis démarre à 7 000 MAD ; un catalogue illimité avec réservation en ligne démarre à 12 000 MAD.",
      },
      {
        q: "Puis-je vendre mes excursions directement en ligne ?",
        a: "Oui, à partir de la formule à 12 000 MAD, pour les produits à date et prix fixes. Le voyageur réserve et verse un acompte sans passer par une plateforme. Pour les circuits sur mesure, le formulaire de devis reste plus adapté — on ne réserve pas un voyage privé de dix jours comme un billet.",
      },
      {
        q: "Comment recevoir des demandes mieux qualifiées ?",
        a: "Par un formulaire qui demande les dates, le nombre de voyageurs, le budget approximatif et les centres d'intérêt avant l'envoi. Vous recevez une demande exploitable et chiffrez dès le premier échange, au lieu d'user trois allers-retours à poser les mêmes questions.",
      },
      {
        q: "Chaque circuit aura-t-il sa propre page ?",
        a: "Oui, et c'est l'essentiel du référencement pour ce métier. Un voyageur cherche « circuit désert Merzouga 3 jours », pas « agence de voyage ». Une page par circuit permet de viser ces recherches précises, ce qu'une page unique ne fera jamais.",
      },
      {
        q: "En combien de langues ?",
        a: "Français, anglais et espagnol dans la formule catalogue — les trois marchés principaux du réceptif marocain. Chaque langue a ses propres URLs pour être indexée séparément.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "14 à 21 jours pour un site vitrine, 21 à 35 jours pour un catalogue avec réservation. Le délai dépend surtout du temps que vous mettez à nous fournir les descriptifs de circuits.",
      },
    ],

    ctaHeading: "Parlons de votre agence",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous vos circuits phares et vos marchés — nous vous dirons ce qui mérite une page dédiée.",
    related: ["site-web-riad-marrakech", "site-web-hotel-maroc", "site-web-restaurant-marrakech"],
  },

  /* ─────────────────────────── SPA & HAMMAM ─────────────────────────── */
  {
    slug: "site-web-spa-marrakech",
    group: "Tourisme & hospitalité",
    navLabel: "Spa & hammam",
    navEmoji: "🧖",
    navNote: "Prise de rendez-vous en ligne",

    seoTitle: "Création Site Web Spa & Hammam Marrakech | Digital Studio",
    seoDescription:
      "Création de site web pour spa et hammam à Marrakech : réservation de soins en ligne, forfaits, galerie. Devis gratuit sous 24h. Studio basé à Marrakech.",
    h1: "Création de site web pour spa et hammam à Marrakech",
    eyebrow: "Spas & Hammams",
    promise:
      "Des créneaux qui se remplissent en ligne, y compris quand vous êtes en cabine.",
    breadcrumbLabel: "Site web pour spa & hammam",

    problemsHeading: "Ce qui coûte des créneaux vides",
    problemsIntro:
      "Un spa vend du temps. Chaque créneau non vendu est définitivement perdu — il ne se rattrape pas le lendemain.",
    problems: [
      {
        title: "Le téléphone sonne quand vous êtes en soin",
        desc: "Vous ne pouvez pas répondre pendant un massage, et le client n'appelle pas deux fois. La réservation en ligne capte ces demandes que vous perdez aujourd'hui sans même les voir.",
      },
      {
        title: "La carte des soins est confuse",
        desc: "Hammam traditionnel, gommage, massage argan, forfait duo : sans durée ni prix clairs par prestation, le visiteur ne se projette pas et n'ose pas réserver.",
      },
      {
        title: "Les touristes réservent avant d'arriver",
        desc: "Une grande partie de vos clients planifient leurs soins depuis l'étranger, avant même de poser leurs valises. S'ils ne peuvent pas réserver en ligne, ils réservent chez le spa de leur hôtel.",
      },
      {
        title: "Le planning des cabines se gère sur un carnet",
        desc: "Doubles réservations, créneaux oubliés, praticienne assignée à deux clientes. Un planning en ligne supprime cette catégorie d'erreurs entièrement.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de spa",
    deliverablesIntro: "Visuel, rassurant, et réservable en trois clics.",
    deliverables: [
      {
        icon: "🗓️",
        label: "Réservation de soins en ligne",
        desc: "Choix de la prestation, de la durée et du créneau, avec confirmation automatique. Les créneaux occupés disparaissent en temps réel.",
      },
      {
        icon: "💆",
        label: "Carte des soins structurée",
        desc: "Chaque soin a sa page : déroulé, durée, prix, bienfaits. Le visiteur sait exactement ce qu'il réserve.",
      },
      {
        icon: "🎁",
        label: "Forfaits et bons cadeaux",
        desc: "Forfaits duo, journées complètes et bons cadeaux vendus en ligne — un revenu qui ne dépend pas du remplissage du jour.",
      },
      {
        icon: "👥",
        label: "Planning par cabine et praticienne",
        desc: "Les disponibilités tiennent compte du nombre de cabines et des praticiennes présentes, ce qui rend les doubles réservations impossibles.",
      },
      {
        icon: "🖼️",
        label: "Galerie qui donne envie",
        desc: "Un spa se vend par l'atmosphère. Photos haute qualité en formats modernes, superbes et rapides à charger.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / EN / ES / AR",
        desc: "Votre clientèle est locale et internationale. Chaque langue a ses pages de soins, indexées séparément.",
      },
    ],

    featuredProject: {
      slug: "aurum-luxury-exotic-car-rental-website",
      title: "AURUM — Luxury & Exotic Car Rental",
      adjacent:
        "Projet du secteur voisin — pas un spa. Ce qu'il partage avec le vôtre : une réservation par créneaux, des disponibilités à jour et une clientèle qui réserve avant d'arriver.",
    },

    processIntro: "De la première conversation à la mise en ligne, en 7 à 21 jours.",
    process: SHARED_PROCESS("votre établissement, votre carte de soins et votre nombre de cabines"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Spa",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Carte des soins complète",
          "Galerie photo",
          "Horaires et accès",
          "Demande de rendez-vous",
          "Google Maps et avis",
          "Français + anglais",
        ],
        featured: false,
      },
      {
        name: "Réservation en Ligne",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Réservation par soin et créneau",
          "Planning cabines et praticiennes",
          "Confirmations et rappels",
          "4 langues",
          "Tableau de bord des rendez-vous",
        ],
        featured: true,
      },
      {
        name: "Spa & Forfaits",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Toute la réservation, plus :",
          "Bons cadeaux vendus en ligne",
          "Forfaits et abonnements",
          "Paiement ou acompte en ligne",
          "Fidélité et codes promo",
          "Rapports de fréquentation",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un spa à Marrakech ?",
        a: "Entre 2 500 et 12 000 MAD. Un site vitrine avec carte des soins et galerie démarre à 2 500 MAD ; la réservation en ligne avec planning de cabines démarre à 7 000 MAD ; les bons cadeaux et forfaits à 12 000 MAD.",
      },
      {
        q: "Le site gère-t-il les disponibilités par cabine ?",
        a: "Oui, à partir de la formule à 7 000 MAD. Les créneaux proposés tiennent compte du nombre de cabines et des praticiennes présentes, ce qui rend les doubles réservations impossibles. C'est la principale source d'erreurs sur un carnet papier.",
      },
      {
        q: "Puis-je vendre des bons cadeaux en ligne ?",
        a: "Oui, dans la formule à 12 000 MAD. Le client achète, reçoit un bon avec code unique, et vous le validez à l'arrivée. C'est un revenu encaissé à l'avance, indépendant du remplissage du jour — particulièrement utile en basse saison.",
      },
      {
        q: "Mes clients étrangers pourront-ils réserver avant d'arriver au Maroc ?",
        a: "Oui, c'est précisément l'intérêt. Une grande partie des soins se planifient avant le départ, depuis l'étranger. Le site est multilingue et la réservation fonctionne sans appel téléphonique international, qui est le principal frein aujourd'hui.",
      },
      {
        q: "Puis-je modifier ma carte de soins moi-même ?",
        a: "Oui, en autonomie : ajouter un soin, changer une durée ou un prix se fait en quelques minutes depuis votre téléphone, sans frais et sans nous contacter.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "7 à 14 jours pour un site vitrine, 14 à 21 jours avec réservation en ligne. Le délai dépend surtout de la disponibilité de vos photos et de votre carte de soins à jour.",
      },
    ],

    ctaHeading: "Parlons de votre spa",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous votre nombre de cabines et votre carte de soins — nous vous dirons ce qui remplira vos créneaux.",
    related: ["site-web-riad-marrakech", "site-web-hotel-maroc", "site-web-restaurant-marrakech"],
  },

  /* ─────────────────────────── IMMOBILIER ─────────────────────────── */
  {
    slug: "site-web-agence-immobiliere-maroc",
    group: "Commerce & services",
    navLabel: "Agence immobilière",
    navEmoji: "🏠",
    navNote: "Annonces, recherche et demandes de visite",

    seoTitle: "Création Site Web Agence Immobilière Maroc | Digital Studio",
    seoDescription:
      "Création de site web pour agence immobilière au Maroc : portail d'annonces, recherche par critères, demandes de visite. Devis gratuit sous 24h.",
    h1: "Création de site web pour agence immobilière au Maroc",
    eyebrow: "Agences Immobilières",
    promise:
      "Un portail d'annonces qui vous appartient, où vos biens ne sont pas noyés parmi ceux de vos concurrents.",
    breadcrumbLabel: "Site web agence immobilière",

    problemsHeading: "Ce qui coûte des mandats",
    problemsIntro:
      "Le métier se joue sur la qualité des contacts, et sur le fait de ne pas dépendre entièrement des portails.",
    problems: [
      {
        title: "Vos biens sont noyés sur les portails",
        desc: "Sur Avito ou Mubawab, votre annonce est affichée à côté de dix biens similaires, dont ceux de vos concurrents directs. Vous payez pour la visibilité et vous la partagez avec eux.",
      },
      {
        title: "Les demandes arrivent sans critères",
        desc: "« Bonjour, c'est disponible ? » Sans budget, ni quartier, ni type de bien recherché. Vous passez vos journées à qualifier au téléphone au lieu de faire visiter.",
      },
      {
        title: "Mettre à jour les annonces prend un temps fou",
        desc: "Un bien vendu reste en ligne des semaines. Un prix baissé n'est pas répercuté. Chaque portail se met à jour séparément, à la main, et personne n'a le temps.",
      },
      {
        title: "Rien ne distingue votre agence",
        desc: "Le vendeur qui choisit à qui confier son mandat regarde votre sérieux. Sans site propre, ni biens vendus présentés, ni équipe visible, vous êtes une agence parmi d'autres.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site d'agence immobilière",
    deliverablesIntro: "Un portail à votre nom, alimenté sans effort.",
    deliverables: [
      {
        icon: "🔍",
        label: "Recherche par critères",
        desc: "Type de bien, quartier, budget, surface, nombre de pièces. Le visiteur trouve en trois clics ce qu'il cherche, au lieu de faire défiler une liste.",
      },
      {
        icon: "🏘️",
        label: "Fiches de biens complètes",
        desc: "Galerie, plan, superficie, charges, quartier et points d'intérêt. Chaque bien a sa propre page, indexée séparément par Google.",
      },
      {
        icon: "📝",
        label: "Demande de visite qualifiante",
        desc: "Budget, financement, délai de projet et créneaux de disponibilité. Vous appelez des contacts déjà qualifiés.",
      },
      {
        icon: "⚙️",
        label: "Gestion des annonces en autonomie",
        desc: "Ajouter un bien, changer un prix ou marquer une vente prend deux minutes depuis votre téléphone — sans nous appeler et sans frais.",
      },
      {
        icon: "🗺️",
        label: "Carte interactive",
        desc: "Les biens situés sur une carte par quartier. C'est le premier réflexe d'un acheteur qui ne connaît pas encore la ville.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / EN / AR",
        desc: "Une part importante de l'immobilier marocain se vend à des acheteurs étrangers et à la diaspora. Chaque langue a ses propres pages.",
      },
    ],

    featuredProject: {
      slug: "dar-atlas-immobilier",
      title: "Dar Atlas Immobilier",
    },

    processIntro: "De la première conversation à la mise en ligne, en 14 à 35 jours.",
    process: SHARED_PROCESS("votre agence, votre portefeuille de biens et vos quartiers de prédilection"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Agence",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Jusqu'à 30 biens en ligne",
          "Recherche par critères",
          "Demande de visite",
          "Présentation de l'agence",
          "Français + anglais",
          "Référencement local",
        ],
        featured: false,
      },
      {
        name: "Portail d'Annonces",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Biens illimités",
          "Carte interactive par quartier",
          "Espace de gestion des annonces",
          "Alertes email aux acheteurs",
          "3 langues (FR / EN / AR)",
        ],
        featured: true,
      },
      {
        name: "Plateforme Sur Mesure",
        priceMad: "25 000 MAD",
        priceUsd: "$2 500",
        delay: "35–60 jours",
        items: [
          "Tout le portail, plus :",
          "Espace propriétaires et mandants",
          "CRM acheteurs intégré",
          "Rapprochement automatique bien / acheteur",
          "Gestion multi-agences",
          "Rapports et statistiques",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour une agence immobilière au Maroc ?",
        a: "Entre 7 000 et 25 000 MAD. Un site vitrine avec 30 biens et recherche par critères démarre à 7 000 MAD ; un portail d'annonces illimitées avec espace de gestion démarre à 12 000 MAD.",
      },
      {
        q: "Puis-je ajouter et retirer des biens moi-même ?",
        a: "Oui, en deux minutes depuis votre téléphone. Ajouter un bien, modifier un prix ou marquer une vente se fait sans nous contacter et sans frais. C'est le point où les sites d'agence échouent le plus souvent : quand la mise à jour est pénible, le site devient faux en quelques semaines.",
      },
      {
        q: "Le site remplace-t-il Avito ou Mubawab ?",
        a: "Non, et ce n'est pas l'objectif. Les portails vous apportent du volume. Votre site sert à convertir les vendeurs qui évaluent votre sérieux avant de confier un mandat, et les acheteurs qui vous cherchent par votre nom après avoir vu une annonce ailleurs.",
      },
      {
        q: "Chaque bien aura-t-il sa propre page ?",
        a: "Oui, avec sa galerie, sa description, son quartier et son prix. C'est ce qui permet à une recherche comme « appartement à vendre Guéliz 3 chambres » de tomber sur votre bien plutôt que sur une page de liste générique.",
      },
      {
        q: "Puis-je gérer plusieurs agents ou plusieurs agences ?",
        a: "Oui, dans la formule sur mesure à 25 000 MAD : chaque agent gère son portefeuille, avec des droits séparés et des statistiques par agent ou par agence.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "14 à 21 jours pour un site vitrine, 21 à 35 jours pour un portail complet. Le délai dépend surtout du temps nécessaire pour rassembler photos et descriptifs de biens.",
      },
    ],

    ctaHeading: "Parlons de votre agence",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous votre volume de biens et vos quartiers — nous vous dirons ce qui vaut la peine d'être construit.",
    related: [
      "site-web-location-voiture-maroc",
      "site-web-riad-marrakech",
      "site-web-hotel-maroc",
    ],
  },

  /* ─────────────────────── LOCATION DE VOITURE ─────────────────────── */
  {
    slug: "site-web-location-voiture-maroc",
    group: "Commerce & services",
    navLabel: "Location de voiture",
    navEmoji: "🚗",
    navNote: "Réservation de flotte et disponibilités",

    seoTitle: "Création Site Web Location Voiture Maroc | Digital Studio",
    seoDescription:
      "Création de site web pour agence de location de voiture au Maroc : réservation en ligne, gestion de flotte, livraison aéroport. Devis gratuit sous 24h.",
    h1: "Création de site web pour agence de location de voiture au Maroc",
    eyebrow: "Location de Véhicules",
    promise:
      "Une réservation en ligne qui tient compte de votre flotte réelle, disponible pendant que vous êtes sur la route.",
    breadcrumbLabel: "Site web location de voiture",

    problemsHeading: "Ce qui fait perdre des réservations",
    problemsIntro:
      "Le client réserve souvent depuis l'étranger, plusieurs semaines avant d'arriver — ou depuis le hall de l'aéroport, dans la minute.",
    problems: [
      {
        title: "Les demandes arrivent par WhatsApp, à toute heure",
        desc: "Vous répondez quand vous pouvez, entre deux livraisons de véhicules. Pendant ce temps le client a déjà réservé ailleurs. Ce n'est pas un problème de réactivité, c'est un problème de canal.",
      },
      {
        title: "Aucune visibilité sur la disponibilité réelle",
        desc: "Le client demande une catégorie que vous n'avez plus. Vous proposez autre chose, il refuse. Un calendrier de flotte à jour supprime entièrement cet échange.",
      },
      {
        title: "Les conditions ne sont claires nulle part",
        desc: "Caution, âge minimum, permis accepté, kilométrage, assurance, carburant. Le client étranger hésite parce qu'il ne sait pas à quoi il s'engage — et l'hésitation le renvoie vers un loueur international.",
      },
      {
        title: "Vous êtes comparé aux grandes enseignes",
        desc: "Face à un loueur international, votre avantage est le prix, la souplesse et la livraison à l'hôtel ou à l'aéroport. Si le site ne le dit pas, la comparaison se fait uniquement sur la marque.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de location de voiture",
    deliverablesIntro: "Conçu pour réserver un véhicule précis, à une date précise.",
    deliverables: [
      {
        icon: "🚙",
        label: "Catalogue de flotte",
        desc: "Une page par véhicule ou par catégorie : photos, boîte, carburant, places, bagages et tarif journalier selon la durée.",
      },
      {
        icon: "📅",
        label: "Réservation avec disponibilités",
        desc: "Le client choisit ses dates, voit ce qui est réellement libre, et réserve. Les véhicules déjà loués n'apparaissent plus.",
      },
      {
        icon: "✈️",
        label: "Livraison aéroport et hôtel",
        desc: "Lieu de prise en charge et de restitution sélectionnables, avec supplément automatique le cas échéant. C'est votre avantage sur les grandes enseignes — encore faut-il l'afficher.",
      },
      {
        icon: "💳",
        label: "Acompte en ligne",
        desc: "Encaissement par carte via une passerelle marocaine, ou acompte à la réservation avec solde au retrait du véhicule.",
      },
      {
        icon: "📋",
        label: "Conditions affichées clairement",
        desc: "Caution, âge minimum, permis, kilométrage, assurance et carburant, visibles avant la réservation. Moins d'hésitation, moins de litiges au comptoir.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / EN / ES / AR",
        desc: "Vos clients réservent depuis la France, l'Espagne et le Royaume-Uni avant d'arriver. Chaque langue a ses propres pages.",
      },
    ],

    featuredProject: {
      slug: "aurum-luxury-exotic-car-rental-website",
      title: "AURUM — Luxury & Exotic Car Rental",
    },

    processIntro: "De la première conversation à la mise en ligne, en 14 à 35 jours.",
    process: SHARED_PROCESS("votre agence, la taille de votre flotte et vos lieux de prise en charge"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Location",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Catalogue de la flotte",
          "Tarifs par durée",
          "Conditions de location",
          "Demande de réservation",
          "Français + anglais",
          "Référencement local",
        ],
        featured: false,
      },
      {
        name: "Réservation en Ligne",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Disponibilités en temps réel",
          "Acompte ou paiement en ligne",
          "Livraison aéroport et hôtel",
          "4 langues",
          "Tableau de bord des réservations",
        ],
        featured: true,
      },
      {
        name: "Plateforme Sur Mesure",
        priceMad: "25 000 MAD",
        priceUsd: "$2 500",
        delay: "35–60 jours",
        items: [
          "Toute la réservation, plus :",
          "Gestion de flotte et entretiens",
          "Tarification par saison",
          "Contrats et états des lieux",
          "Plusieurs agences ou dépôts",
          "Rapports d'utilisation",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour une agence de location de voiture au Maroc ?",
        a: "Entre 7 000 et 25 000 MAD. Un site vitrine avec catalogue de flotte et tarifs démarre à 7 000 MAD ; la réservation en ligne avec disponibilités en temps réel démarre à 12 000 MAD.",
      },
      {
        q: "Le site connaît-il la disponibilité réelle de mes véhicules ?",
        a: "Oui, à partir de la formule à 12 000 MAD. Chaque véhicule a son calendrier : dès qu'il est loué, il disparaît des résultats pour ces dates. Cela supprime l'aller-retour où vous proposez un véhicule que vous n'avez plus.",
      },
      {
        q: "Puis-je proposer la livraison à l'aéroport ?",
        a: "Oui, le lieu de prise en charge et de restitution est sélectionnable à la réservation, avec supplément automatique si vous en appliquez un. C'est souvent votre principal avantage face aux loueurs internationaux, donc il est mis en avant plutôt que caché dans les conditions.",
      },
      {
        q: "Comment encaisser la caution et l'acompte ?",
        a: "L'acompte se règle en ligne par carte via une passerelle marocaine (CMI, Payzone). La caution reste généralement gérée au comptoir, par empreinte de carte ou en espèces selon votre politique — le site l'affiche clairement avant la réservation pour éviter les litiges au retrait.",
      },
      {
        q: "Puis-je ajouter ou retirer un véhicule moi-même ?",
        a: "Oui, depuis votre tableau de bord, en quelques minutes. Ajouter un véhicule, changer un tarif ou sortir une voiture de la flotte pendant un entretien se fait sans nous contacter.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "14 à 21 jours pour un site vitrine, 21 à 35 jours avec réservation en ligne. Le délai dépend surtout de la disponibilité des photos de votre flotte.",
      },
    ],

    ctaHeading: "Parlons de votre agence",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous la taille de votre flotte et vos lieux de prise en charge — nous vous dirons ce qui est réaliste.",
    related: [
      "site-web-agence-voyage-maroc",
      "site-web-agence-immobiliere-maroc",
      "site-web-riad-marrakech",
    ],
  },

  /* ─────────────────────────── DENTISTE ─────────────────────────── */
  {
    slug: "site-web-dentiste-maroc",
    group: "Professions & formation",
    navLabel: "Dentiste & cabinet médical",
    navEmoji: "🦷",
    navNote: "Prise de rendez-vous, information patients",

    seoTitle: "Création Site Web Dentiste Maroc | Digital Studio LF",
    seoDescription:
      "Création de site web pour cabinet dentaire au Maroc : prise de rendez-vous en ligne, présentation des soins, accès et horaires. Devis gratuit sous 24h.",
    h1: "Création de site web pour dentiste au Maroc",
    eyebrow: "Cabinets Dentaires & Médicaux",
    promise:
      "Un cabinet que l'on trouve, que l'on comprend, et où l'on prend rendez-vous sans appeler pendant vos consultations.",
    breadcrumbLabel: "Site web pour dentiste",

    problemsHeading: "Ce qui fait perdre des patients",
    problemsIntro:
      "Un cabinet ne se vend pas comme un commerce. Il se choisit sur la confiance, la proximité et la simplicité de la prise de rendez-vous.",
    problems: [
      {
        title: "Le secrétariat ne peut pas répondre en consultation",
        desc: "Les appels arrivent pendant les soins. Le patient qui tombe sur un répondeur ne rappelle pas toujours — il appelle le cabinet suivant sur Google.",
      },
      {
        title: "On ne vous trouve pas sur Google Maps",
        desc: "« Dentiste près de moi » et « dentiste Guéliz » se jouent dans le pack local. Sans fiche Google complète et sans site cohérent, vous n'y apparaissez pas, quelle que soit votre réputation.",
      },
      {
        title: "Le patient ne sait pas ce que vous pratiquez",
        desc: "Implantologie, orthodontie, pédodontie, urgences : si ce n'est écrit nulle part, le patient qui cherche précisément ce soin ne saura pas que vous le proposez.",
      },
      {
        title: "Les informations pratiques sont introuvables",
        desc: "Horaires, adresse exacte, étage, parking, mutuelles acceptées, conduite à tenir en cas d'urgence. Ce sont les questions qui occupent votre secrétariat toute la journée.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de cabinet dentaire",
    deliverablesIntro:
      "Sobre, rassurant, et conforme aux règles de communication de la profession.",
    deliverables: [
      {
        icon: "🗓️",
        label: "Prise de rendez-vous en ligne",
        desc: "Le patient choisit un motif et un créneau disponible, avec confirmation et rappel automatiques. Les appels pendant les consultations diminuent nettement.",
      },
      {
        icon: "🦷",
        label: "Présentation des soins",
        desc: "Une page par type de soin, expliquée simplement : déroulé, durée, suites. Chaque page vise la recherche correspondante.",
      },
      {
        icon: "📍",
        label: "Google Maps et fiche optimisée",
        desc: "Configuration de votre fiche Google Business et intégration de la carte, pour apparaître sur « dentiste près de moi » dans votre quartier.",
      },
      {
        icon: "ℹ️",
        label: "Informations pratiques complètes",
        desc: "Horaires, accès, étage, parking, mutuelles et conduite à tenir en urgence. Autant de questions que votre secrétariat cesse de traiter au téléphone.",
      },
      {
        icon: "👩‍⚕️",
        label: "Présentation de l'équipe",
        desc: "Parcours, diplômes et spécialités des praticiens. C'est ce que regarde un patient qui hésite entre deux cabinets.",
      },
      {
        icon: "🔒",
        label: "Conforme et sobre",
        desc: "Communication informative, sans promesse de résultat ni comparaison — dans le respect des règles déontologiques qui encadrent la publicité des professions de santé.",
      },
    ],

    featuredProject: {
      slug: "lunetier-luxury-optician-morocco",
      title: "Lunetier — Luxury Optician Morocco",
      adjacent:
        "Projet du secteur voisin — un opticien, pas un cabinet dentaire. Même logique : une profession de santé, une clientèle locale, et une prise de contact qui doit inspirer confiance avant tout.",
    },

    processIntro: "De la première conversation à la mise en ligne, en 7 à 21 jours.",
    process: SHARED_PROCESS("votre cabinet, vos spécialités et l'organisation de votre secrétariat"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Cabinet",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Présentation du cabinet et de l'équipe",
          "Pages par type de soin",
          "Horaires, accès et parking",
          "Google Maps et fiche Google",
          "Formulaire de contact",
          "Français + arabe",
        ],
        featured: true,
      },
      {
        name: "Rendez-vous en Ligne",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Prise de rendez-vous par motif",
          "Agenda par praticien",
          "Confirmations et rappels",
          "Gestion des urgences",
          "3 langues (FR / AR / EN)",
        ],
        featured: false,
      },
      {
        name: "Cabinet Sur Mesure",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le rendez-vous en ligne, plus :",
          "Espace patient sécurisé",
          "Documents et ordonnances",
          "Plusieurs cabinets ou praticiens",
          "Rappels de suivi automatiques",
          "Statistiques de fréquentation",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un cabinet dentaire au Maroc ?",
        a: "Entre 2 500 et 12 000 MAD. Un site vitrine avec présentation des soins, horaires et fiche Google démarre à 2 500 MAD ; la prise de rendez-vous en ligne avec agenda par praticien démarre à 7 000 MAD.",
      },
      {
        q: "La publicité est-elle autorisée pour un dentiste au Maroc ?",
        a: "La communication des professions de santé est encadrée : un site informatif présentant le cabinet, les praticiens, les soins pratiqués et les informations pratiques est la norme, tandis que la publicité comparative ou les promesses de résultat ne le sont pas. Nous construisons sur ce principe, mais la conformité finale relève de votre Ordre — validez le contenu auprès de lui avant la mise en ligne.",
      },
      {
        q: "Les patients peuvent-ils prendre rendez-vous en ligne ?",
        a: "Oui, à partir de la formule à 7 000 MAD. Le patient choisit un motif de consultation et un créneau réellement disponible, et reçoit confirmation et rappel automatiques. C'est ce qui réduit le plus les appels pendant vos consultations.",
      },
      {
        q: "Comment apparaître sur « dentiste près de moi » ?",
        a: "Par une fiche Google Business complète et un site cohérent avec elle : même nom, même adresse, même téléphone. C'est ce couple qui décide le pack local, davantage que le site seul. La configuration de la fiche est incluse dès la première formule.",
      },
      {
        q: "Le site peut-il gérer plusieurs praticiens ?",
        a: "Oui, avec un agenda par praticien à partir de la formule à 7 000 MAD, et une gestion multi-cabinets dans la formule à 12 000 MAD.",
      },
      {
        q: "Les données des patients sont-elles protégées ?",
        a: "Le site est servi en HTTPS et les formulaires sont chiffrés en transit. Pour l'espace patient de la formule sur mesure, l'accès est authentifié et les documents sont stockés de façon sécurisée. Nous ne stockons jamais de données médicales sans une architecture validée avec vous au préalable.",
      },
    ],

    ctaHeading: "Parlons de votre cabinet",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous vos spécialités et l'organisation de votre secrétariat — nous vous dirons ce qui allégera vraiment votre téléphone.",
    related: [
      "site-web-avocat-maroc",
      "site-web-spa-marrakech",
      "site-web-agence-immobiliere-maroc",
    ],
  },

  /* ─────────────────────── SALLE DE SPORT ─────────────────────── */
  {
    slug: "site-web-salle-de-sport-maroc",
    group: "Commerce & services",
    navLabel: "Salle de sport & coach",
    navEmoji: "🏋️",
    navNote: "Abonnements, planning des cours",

    seoTitle: "Création Site Web Salle de Sport Maroc | Digital Studio LF",
    seoDescription:
      "Création de site web pour salle de sport et coach au Maroc : abonnements en ligne, planning des cours, inscription. Devis gratuit sous 24h. Basé à Marrakech.",
    h1: "Création de site web pour salle de sport au Maroc",
    eyebrow: "Salles de Sport & Coachs",
    promise:
      "Des abonnements qui se vendent en ligne et un planning que vos membres consultent sans vous appeler.",
    breadcrumbLabel: "Site web salle de sport",

    problemsHeading: "Ce qui freine les inscriptions",
    problemsIntro:
      "Une salle vit de l'abonnement récurrent. Chaque friction entre l'intention et le paiement coûte un membre.",
    problems: [
      {
        title: "Il faut se déplacer pour s'inscrire",
        desc: "Le prospect motivé un dimanche soir doit attendre lundi et passer à la salle. L'élan retombe. L'inscription en ligne capte exactement ce moment de décision.",
      },
      {
        title: "Le planning des cours circule sur WhatsApp",
        desc: "Une image envoyée dans un groupe, remplacée chaque semaine, introuvable trois jours plus tard. Vos membres demandent les horaires en boucle et vos coachs répondent à leur place.",
      },
      {
        title: "Les tarifs ne sont affichés nulle part",
        desc: "Le prospect qui ne trouve pas le prix suppose que c'est cher, ou appelle pour demander. Vous perdez ceux qui n'appellent pas — c'est-à-dire la majorité.",
      },
      {
        title: "Aucun suivi des abonnements qui expirent",
        desc: "Un membre dont l'abonnement se termine sans relance ne revient souvent jamais. Réactiver un ancien membre coûte bien moins cher qu'en recruter un nouveau.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de salle de sport",
    deliverablesIntro: "Vendre l'abonnement et retenir le membre.",
    deliverables: [
      {
        icon: "💳",
        label: "Abonnements en ligne",
        desc: "Formules mensuelles, trimestrielles et annuelles, réglées en ligne ou avec acompte. L'inscription se termine sans passer par la salle.",
      },
      {
        icon: "🗓️",
        label: "Planning des cours",
        desc: "Cours collectifs par jour, coach et niveau, mis à jour en deux minutes. Fini l'image WhatsApp remplacée chaque semaine.",
      },
      {
        icon: "🔔",
        label: "Relance des abonnements",
        desc: "Rappel automatique avant expiration. Un membre relancé à temps se réabonne bien plus souvent qu'un membre recontacté un mois trop tard.",
      },
      {
        icon: "🏷️",
        label: "Tarifs affichés clairement",
        desc: "Formules, durées et ce qui est inclus, visibles sans appeler. Vous filtrez les prospects hors budget avant qu'ils prennent votre temps.",
      },
      {
        icon: "👤",
        label: "Espace membre",
        desc: "Réservation de cours, suivi de l'abonnement et historique des séances — utile surtout pour les cours à places limitées.",
      },
      {
        icon: "📍",
        label: "Google Maps et avis",
        desc: "« Salle de sport près de moi » se joue dans le pack local. Fiche Google configurée et avis affichés sur le site.",
      },
    ],

    featuredProject: {
      slug: "gym-landing-page-morocco",
      title: "Gym Landing Page Morocco",
    },

    processIntro: "De la première conversation à la mise en ligne, en 7 à 21 jours.",
    process: SHARED_PROCESS("votre salle, vos formules d'abonnement et vos cours collectifs"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Landing Page Salle",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Présentation de la salle",
          "Formules et tarifs",
          "Planning des cours",
          "Formulaire d'inscription",
          "Google Maps et avis",
          "Français + arabe",
        ],
        featured: true,
      },
      {
        name: "Abonnements en Ligne",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Toute la landing page, plus :",
          "Vente d'abonnements en ligne",
          "Paiement ou acompte",
          "Relances avant expiration",
          "Espace membre",
          "Tableau de bord des inscriptions",
        ],
        featured: false,
      },
      {
        name: "Plateforme Sur Mesure",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tous les abonnements, plus :",
          "Réservation de cours à places limitées",
          "Plusieurs salles ou coachs",
          "Suivi de fréquentation",
          "Programmes et coaching en ligne",
          "Statistiques de rétention",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour une salle de sport au Maroc ?",
        a: "Entre 2 500 et 12 000 MAD. Une landing page avec formules, tarifs et planning démarre à 2 500 MAD ; la vente d'abonnements en ligne avec espace membre démarre à 7 000 MAD.",
      },
      {
        q: "Puis-je vendre des abonnements directement en ligne ?",
        a: "Oui, à partir de la formule à 7 000 MAD, avec paiement complet ou acompte à l'inscription. C'est ce qui capte le prospect décidé un dimanche soir, qui autrement attendra lundi et changera d'avis.",
      },
      {
        q: "Comment mettre à jour le planning des cours ?",
        a: "En quelques minutes depuis votre téléphone, sans nous contacter et sans frais. Le planning devient une vraie page consultable plutôt qu'une image envoyée sur WhatsApp et introuvable trois jours après.",
      },
      {
        q: "Les membres peuvent-ils réserver une place en cours collectif ?",
        a: "Oui, dans la formule à 12 000 MAD, avec un nombre de places par créneau. C'est utile dès que vos cours affichent complet et que vous devez gérer des listes d'attente.",
      },
      {
        q: "Le site relance-t-il les abonnements qui expirent ?",
        a: "Oui, à partir de la formule à 7 000 MAD : un rappel automatique part avant l'échéance. Réactiver un membre existant coûte nettement moins cher que d'en recruter un nouveau, et c'est la fonction la plus rentable de la formule.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "7 à 14 jours pour une landing page, 14 à 21 jours avec les abonnements en ligne. Le délai dépend surtout de vos photos et de votre grille tarifaire à jour.",
      },
    ],

    ctaHeading: "Parlons de votre salle",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous vos formules et votre nombre de membres — nous vous dirons ce qui fera le plus de différence.",
    related: [
      "site-web-spa-marrakech",
      "site-web-dentiste-maroc",
      "site-web-artisan-maroc",
    ],
  },

  /* ─────────────────────── ARTISAN & COMMERCE ─────────────────────── */
  {
    slug: "site-web-artisan-maroc",
    group: "Commerce & services",
    navLabel: "Artisan & commerce local",
    navEmoji: "🛍️",
    navNote: "Vitrine et vente à l'international",

    seoTitle: "Création Site Web Artisan Maroc | Digital Studio LF",
    seoDescription:
      "Création de site web pour artisan et commerce local au Maroc : vitrine, boutique en ligne, vente à l'international. Devis gratuit sous 24h. Basé à Marrakech.",
    h1: "Création de site web pour artisan au Maroc",
    eyebrow: "Artisans & Commerces Locaux",
    promise:
      "Votre savoir-faire visible au-delà du souk, et vendable à des clients qui ne viendront jamais à Marrakech.",
    breadcrumbLabel: "Site web pour artisan",

    problemsHeading: "Ce qui limite un atelier",
    problemsIntro:
      "L'artisanat marocain se vend cher à l'étranger et bon marché sur place. La différence tient souvent au canal, pas au produit.",
    problems: [
      {
        title: "Vous vendez uniquement à qui passe devant",
        desc: "Votre chiffre dépend du passage et de la saison touristique. Une basse saison ou une année creuse pour le tourisme se répercute directement, sans amortisseur.",
      },
      {
        title: "Les intermédiaires captent la marge",
        desc: "Bazars, revendeurs et plateformes achètent votre travail et le revendent plusieurs fois le prix. Sans canal direct, vous n'avez ni la relation client ni la marge.",
      },
      {
        title: "Instagram génère des messages, pas des commandes",
        desc: "Vos photos plaisent, on vous écrit, et chaque vente demande dix messages pour convenir du prix, du transport et du paiement. Cela ne passe pas à l'échelle.",
      },
      {
        title: "L'expédition à l'étranger paraît insurmontable",
        desc: "Frais de port, douane, délais, retours. Tant que ce n'est pas cadré et affiché, chaque client étranger doit être rassuré individuellement — et beaucoup abandonnent avant.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site d'artisan",
    deliverablesIntro: "Montrer le savoir-faire, puis rendre l'achat évident.",
    deliverables: [
      {
        icon: "🧵",
        label: "Vitrine du savoir-faire",
        desc: "Vos pièces, votre atelier, votre technique. C'est l'histoire qui justifie le prix face à une production industrielle — et elle ne se raconte pas sur une fiche produit de plateforme.",
      },
      {
        icon: "🛒",
        label: "Boutique en ligne",
        desc: "Catalogue avec variantes (taille, couleur, matière), panier et commande. Paiement en ligne ou à la livraison selon le marché visé.",
      },
      {
        icon: "🌍",
        label: "Vente à l'international",
        desc: "Prix en MAD, EUR ou USD selon le visiteur, frais de port par zone, et conditions d'expédition affichées clairement.",
      },
      {
        icon: "📦",
        label: "Expédition cadrée",
        desc: "Transporteurs intégrés, délais annoncés et suivi de commande. Le client étranger sait à quoi s'attendre avant de payer.",
      },
      {
        icon: "📸",
        label: "Photos qui vendent",
        desc: "Vos images sont votre argument principal. Formats modernes, chargement rapide, zoom sur la matière et le détail.",
      },
      {
        icon: "💬",
        label: "Commande sur mesure",
        desc: "Formulaire de demande pour les pièces personnalisées, avec dimensions, matière et délai — au lieu de dix allers-retours en messages privés.",
      },
    ],

    featuredProject: {
      slug: "powerfuel-nutrition-morocco",
      title: "PowerFuel Nutrition Morocco",
      adjacent:
        "Projet du secteur voisin — une marque de nutrition, pas un atelier d'artisanat. Ce qu'il partage avec le vôtre : une boutique en ligne marocaine, avec paiement local et logistique nationale.",
    },

    processIntro: "De la première conversation à la mise en ligne, en 7 à 30 jours.",
    process: SHARED_PROCESS("votre atelier, vos produits et les marchés que vous visez"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Vitrine Artisan",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Présentation de l'atelier",
          "Galerie de pièces",
          "Demande de devis sur mesure",
          "Google Maps et avis",
          "Bouton WhatsApp",
          "Français + anglais",
        ],
        featured: false,
      },
      {
        name: "Boutique en Ligne",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Toute la vitrine, plus :",
          "Catalogue avec variantes",
          "Panier et commande",
          "Paiement en ligne ou à la livraison",
          "Frais de port par zone",
          "3 langues (FR / EN / AR)",
        ],
        featured: true,
      },
      {
        name: "Boutique Internationale",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Toute la boutique, plus :",
          "Multi-devises (MAD / EUR / USD)",
          "Transporteurs internationaux",
          "Suivi de commande client",
          "Codes promo et campagnes email",
          "Rapports de ventes",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un artisan au Maroc ?",
        a: "Entre 2 500 et 12 000 MAD. Une vitrine avec galerie et demande de devis démarre à 2 500 MAD ; une boutique en ligne avec paiement démarre à 7 000 MAD ; la vente internationale multi-devises à 12 000 MAD.",
      },
      {
        q: "Puis-je vendre à l'étranger depuis le Maroc ?",
        a: "Oui, et c'est souvent là que se trouve la marge. Le site gère plusieurs devises, les frais de port par zone et les conditions d'expédition. L'encaissement international passe par une passerelle adaptée, que nous mettons en place avec vous selon votre situation bancaire.",
      },
      {
        q: "Je n'ai que quelques pièces uniques. Une boutique a-t-elle du sens ?",
        a: "Pas nécessairement. Pour des pièces uniques ou du sur-mesure, une vitrine avec demande de devis convertit souvent mieux qu'un panier — et coûte moins cher. Nous vous le dirons franchement plutôt que de vous vendre la formule supérieure.",
      },
      {
        q: "Comment gérer l'expédition ?",
        a: "Nous intégrons les transporteurs que vous utilisez déjà pour le national, et les solutions internationales pour l'export, avec délais et frais affichés avant le paiement. Le choix du transporteur reste le vôtre.",
      },
      {
        q: "Puis-je ajouter des produits moi-même ?",
        a: "Oui, en quelques minutes depuis votre téléphone : ajouter une pièce, changer un prix ou marquer un article vendu se fait sans nous contacter et sans frais.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "7 à 14 jours pour une vitrine, 14 à 21 jours pour une boutique. Le délai dépend surtout de la qualité et du nombre de photos de vos pièces.",
      },
    ],

    ctaHeading: "Parlons de votre atelier",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous ce que vous fabriquez et à qui vous vendez — nous vous dirons si une boutique en ligne vaut le coup, ou si une vitrine suffit.",
    related: [
      "site-web-salle-de-sport-maroc",
      "site-web-agence-immobiliere-maroc",
      "site-web-restaurant-marrakech",
    ],
  },

  /* ─────────────────────── AVOCAT & PROFESSION LIBÉRALE ─────────────────────── */
  {
    slug: "site-web-avocat-maroc",
    group: "Professions & formation",
    navLabel: "Avocat & profession libérale",
    navEmoji: "⚖️",
    navNote: "Domaines d'intervention, prise de contact",

    seoTitle: "Création Site Web Avocat Maroc | Digital Studio LF",
    seoDescription:
      "Création de site web pour cabinet d'avocat au Maroc : domaines d'intervention, présentation du cabinet, prise de contact. Devis gratuit sous 24h.",
    h1: "Création de site web pour avocat au Maroc",
    eyebrow: "Cabinets d'Avocats & Professions Libérales",
    promise:
      "Un cabinet que l'on trouve au moment précis où l'on en a besoin, et dont on comprend le domaine en dix secondes.",
    breadcrumbLabel: "Site web pour avocat",

    problemsHeading: "Ce qui coûte des dossiers",
    problemsIntro:
      "Un client cherche un avocat rarement, sous pression, et souvent en urgence. Il choisit ce qu'il comprend vite et ce qui le rassure.",
    problems: [
      {
        title: "Vos domaines d'intervention sont invisibles",
        desc: "Droit des affaires, droit de la famille, droit du travail, immobilier. Le justiciable cherche son problème précis, pas « avocat ». S'il ne voit pas son cas, il passe au cabinet suivant.",
      },
      {
        title: "Le bouche-à-oreille ne suffit plus",
        desc: "Une recommandation reste le premier canal, mais elle est presque toujours vérifiée en ligne avant l'appel. Sans rien à trouver, la recommandation perd de sa force.",
      },
      {
        title: "Rien n'explique comment se passe un premier rendez-vous",
        desc: "Le client n'ose pas appeler parce qu'il ignore ce que ça coûte, ce qu'il doit apporter et à quoi il s'engage. L'incertitude est ce qui retarde le plus la prise de contact.",
      },
      {
        title: "Le cabinet ne se distingue pas",
        desc: "Parcours, langues de travail, expérience sectorielle : ce sont les éléments qui départagent deux cabinets aux yeux d'un client, et ils ne figurent nulle part.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site de cabinet d'avocat",
    deliverablesIntro:
      "Sobre, clair, et conforme aux règles de communication de la profession.",
    deliverables: [
      {
        icon: "📚",
        label: "Pages par domaine d'intervention",
        desc: "Une page par matière, expliquée dans les mots du client. C'est ce qui permet d'être trouvé sur une recherche précise plutôt que sur « avocat Marrakech ».",
      },
      {
        icon: "👔",
        label: "Présentation du cabinet",
        desc: "Parcours, barreau, langues de travail et expérience sectorielle des associés. Les éléments qui départagent réellement deux cabinets.",
      },
      {
        icon: "📞",
        label: "Prise de contact cadrée",
        desc: "Formulaire indiquant la nature du dossier et son degré d'urgence, pour préparer le premier échange et filtrer les demandes hors compétence.",
      },
      {
        icon: "ℹ️",
        label: "Le premier rendez-vous expliqué",
        desc: "Comment il se déroule, ce qu'il faut apporter, ce qui est confidentiel. Lever cette incertitude est ce qui déclenche le plus d'appels.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / AR / EN",
        desc: "Le droit marocain se pratique en français et en arabe, et la clientèle internationale attend l'anglais. Chaque langue a ses propres pages.",
      },
      {
        icon: "🔒",
        label: "Sobre et confidentiel",
        desc: "Communication informative, sans démarchage ni promesse de résultat, dans le respect des règles déontologiques. Aucune donnée sensible n'est collectée par le site.",
      },
    ],

    featuredProject: {
      slug: "lunetier-luxury-optician-morocco",
      title: "Lunetier — Luxury Optician Morocco",
      adjacent:
        "Projet du secteur voisin — un opticien, pas un cabinet d'avocat. Le point commun : une profession réglementée, une clientèle locale, et un site dont le rôle est d'inspirer confiance avant de vendre quoi que ce soit.",
    },

    processIntro: "De la première conversation à la mise en ligne, en 7 à 21 jours.",
    process: SHARED_PROCESS("votre cabinet, vos domaines d'intervention et votre clientèle type"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine Cabinet",
        priceMad: "2 500 MAD",
        priceUsd: "$250",
        delay: "7–14 jours",
        items: [
          "Présentation du cabinet",
          "Jusqu'à 5 domaines d'intervention",
          "Parcours des associés",
          "Formulaire de contact",
          "Google Maps et accès",
          "Français + arabe",
        ],
        featured: true,
      },
      {
        name: "Cabinet Complet",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Domaines illimités",
          "Prise de rendez-vous en ligne",
          "Espace publications et actualités",
          "3 langues (FR / AR / EN)",
          "Référencement par domaine",
        ],
        featured: false,
      },
      {
        name: "Cabinet Sur Mesure",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le cabinet complet, plus :",
          "Espace client sécurisé",
          "Partage de documents",
          "Suivi de dossier",
          "Plusieurs bureaux ou associés",
          "Statistiques de fréquentation",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour un cabinet d'avocat au Maroc ?",
        a: "Entre 2 500 et 12 000 MAD. Un site vitrine avec cinq domaines d'intervention et présentation des associés démarre à 2 500 MAD ; un cabinet complet avec prise de rendez-vous et publications démarre à 7 000 MAD.",
      },
      {
        q: "La publicité est-elle autorisée pour un avocat au Maroc ?",
        a: "La communication des avocats est encadrée par les règles de la profession : un site informatif présentant le cabinet, les associés et les domaines d'intervention est admis, tandis que le démarchage et les promesses de résultat ne le sont pas. Nous construisons sur ce principe, mais la conformité finale relève de votre barreau — faites valider le contenu avant la mise en ligne.",
      },
      {
        q: "Pourquoi une page par domaine d'intervention ?",
        a: "Parce qu'un client cherche son problème, pas votre métier. « Litige prud'homal Marrakech » ou « divorce par consentement mutuel Maroc » sont des recherches précises ; une page dédiée peut y répondre, une page « nos compétences » générique ne le fera jamais.",
      },
      {
        q: "Le site peut-il accueillir un espace client ?",
        a: "Oui, dans la formule sur mesure à 12 000 MAD : accès authentifié, partage de documents et suivi de dossier. L'architecture et les règles de conservation sont définies avec vous avant tout développement, compte tenu du secret professionnel.",
      },
      {
        q: "Puis-je publier des articles juridiques ?",
        a: "Oui, à partir de la formule à 7 000 MAD. C'est un levier efficace pour ce métier : un article utile sur une question fréquente attire précisément les clients concernés, et démontre votre compétence mieux qu'une page de présentation.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "7 à 14 jours pour un site vitrine, 14 à 21 jours pour un cabinet complet. Le délai dépend surtout du temps nécessaire pour rédiger et valider les textes de vos domaines d'intervention.",
      },
    ],

    ctaHeading: "Parlons de votre cabinet",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous vos domaines et votre clientèle type — nous vous dirons ce qui mérite une page dédiée.",
    related: [
      "site-web-dentiste-maroc",
      "site-web-ecole-maroc",
      "site-web-agence-immobiliere-maroc",
    ],
  },

  /* ─────────────────────── ÉCOLE & FORMATION ─────────────────────── */
  {
    slug: "site-web-ecole-maroc",
    group: "Professions & formation",
    navLabel: "École & centre de formation",
    navEmoji: "🎓",
    navNote: "Programmes et inscriptions en ligne",

    seoTitle: "Création Site Web École & Formation Maroc | Digital Studio",
    seoDescription:
      "Création de site web pour école et centre de formation au Maroc : présentation des programmes, inscription en ligne, espace élèves. Devis gratuit sous 24h.",
    h1: "Création de site web pour école au Maroc",
    eyebrow: "Écoles & Centres de Formation",
    promise:
      "Des programmes que les parents comprennent sans vous appeler, et des inscriptions qui se font en ligne.",
    breadcrumbLabel: "Site web pour école",

    problemsHeading: "Ce qui ralentit les inscriptions",
    problemsIntro:
      "Les familles comparent plusieurs établissements en même temps, souvent le soir, sur téléphone.",
    problems: [
      {
        title: "Les programmes ne sont détaillés nulle part",
        desc: "Contenu, durée, niveau requis, débouchés et tarifs. Sans ces informations, le parent appelle pour les obtenir — ou appelle l'école d'à côté qui les affiche.",
      },
      {
        title: "Le dossier d'inscription est un parcours papier",
        desc: "Retirer un formulaire, le remplir, le rapporter avec les pièces. Chaque déplacement est une occasion d'abandonner, surtout en période de rentrée.",
      },
      {
        title: "Le secrétariat répond aux mêmes questions toute la journée",
        desc: "Tarifs, dates de rentrée, pièces à fournir, horaires. Autant de temps qui n'est pas consacré aux familles déjà inscrites.",
      },
      {
        title: "Rien ne rassure sur la qualité",
        desc: "Équipe pédagogique, accréditations, résultats, locaux. C'est ce que les parents cherchent en priorité, et c'est souvent ce qui manque le plus.",
      },
    ],

    deliverablesHeading: "Ce que comprend un site d'école",
    deliverablesIntro: "Informer complètement, puis rendre l'inscription simple.",
    deliverables: [
      {
        icon: "📘",
        label: "Une page par programme",
        desc: "Contenu, durée, niveau requis, débouchés et tarif. Chaque programme vise sa propre recherche plutôt que d'être noyé dans une brochure.",
      },
      {
        icon: "📝",
        label: "Inscription ou préinscription en ligne",
        desc: "Formulaire complet avec dépôt des pièces justificatives. La famille termine la démarche depuis chez elle, le soir, quand elle en a le temps.",
      },
      {
        icon: "👩‍🏫",
        label: "Équipe pédagogique et accréditations",
        desc: "Parcours des enseignants, agréments et partenariats. C'est le premier critère de confiance pour un parent qui hésite.",
      },
      {
        icon: "📅",
        label: "Calendrier et informations pratiques",
        desc: "Rentrées, périodes d'inscription, horaires, transport et cantine. Les questions qui occupent votre secrétariat cessent d'arriver par téléphone.",
      },
      {
        icon: "🔐",
        label: "Espace élèves et parents",
        desc: "Supports de cours, emplois du temps, annonces et suivi — derrière un accès sécurisé.",
      },
      {
        icon: "🌍",
        label: "Multilingue FR / AR / EN",
        desc: "L'enseignement marocain est multilingue et votre communication doit l'être aussi. Chaque langue a ses propres pages.",
      },
    ],

    processIntro: "De la première conversation à la mise en ligne, en 14 à 35 jours.",
    process: SHARED_PROCESS("votre établissement, vos programmes et votre calendrier d'inscription"),

    pricingIntro: "Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.",
    packages: [
      {
        name: "Site Vitrine École",
        priceMad: "7 000 MAD",
        priceUsd: "$700",
        delay: "14–21 jours",
        items: [
          "Une page par programme",
          "Équipe pédagogique",
          "Calendrier et informations pratiques",
          "Formulaire de préinscription",
          "Google Maps et accès",
          "Français + arabe",
        ],
        featured: true,
      },
      {
        name: "Inscription en Ligne",
        priceMad: "12 000 MAD",
        priceUsd: "$1 200",
        delay: "21–35 jours",
        items: [
          "Tout le site vitrine, plus :",
          "Inscription complète en ligne",
          "Dépôt des pièces justificatives",
          "Paiement des frais ou acompte",
          "Suivi des dossiers",
          "3 langues (FR / AR / EN)",
        ],
        featured: false,
      },
      {
        name: "Portail Élèves",
        priceMad: "25 000 MAD",
        priceUsd: "$2 500",
        delay: "35–60 jours",
        items: [
          "Toute l'inscription, plus :",
          "Espace élèves et parents",
          "Supports de cours et emplois du temps",
          "Annonces et messagerie",
          "Plusieurs sites ou filiales",
          "Statistiques et rapports",
        ],
        featured: false,
      },
    ],

    faqs: [
      {
        q: "Combien coûte un site web pour une école au Maroc ?",
        a: "Entre 7 000 et 25 000 MAD. Un site vitrine avec une page par programme et préinscription démarre à 7 000 MAD ; l'inscription complète en ligne avec dépôt de pièces démarre à 12 000 MAD ; un portail élèves à 25 000 MAD.",
      },
      {
        q: "Les familles peuvent-elles s'inscrire entièrement en ligne ?",
        a: "Oui, à partir de la formule à 12 000 MAD : formulaire complet, dépôt des pièces justificatives et paiement des frais d'inscription ou d'un acompte. Cela supprime les déplacements qui font abandonner les dossiers en période de rentrée.",
      },
      {
        q: "Pourquoi une page par programme ?",
        a: "Parce qu'un parent cherche une formation précise, pas une école. « Formation comptabilité Marrakech » ou « école primaire bilingue Guéliz » sont des recherches distinctes, et seule une page dédiée peut y répondre.",
      },
      {
        q: "Peut-on avoir un espace pour les élèves et les parents ?",
        a: "Oui, dans la formule portail à 25 000 MAD : accès sécurisé aux supports, emplois du temps, annonces et suivi. Les accès sont séparés entre élèves, parents et enseignants.",
      },
      {
        q: "Pouvons-nous mettre à jour les programmes nous-mêmes ?",
        a: "Oui, en autonomie : ajouter un programme, modifier un tarif ou changer une date de rentrée se fait en quelques minutes, sans nous contacter et sans frais. C'est indispensable pour un établissement dont le calendrier bouge chaque année.",
      },
      {
        q: "Combien de temps pour créer le site ?",
        a: "14 à 21 jours pour un site vitrine, 21 à 35 jours avec l'inscription en ligne. Le délai dépend surtout du temps nécessaire pour rassembler et valider les descriptifs de programmes.",
      },
    ],

    ctaHeading: "Parlons de votre établissement",
    ctaBody:
      "Consultation gratuite de 30 minutes. Dites-nous vos programmes et votre calendrier d'inscription — nous vous dirons ce qui allégera le plus votre secrétariat.",
    related: [
      "site-web-avocat-maroc",
      "site-web-dentiste-maroc",
      "site-web-salle-de-sport-maroc",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export const SOLUTIONS_BASE = "/fr/solutions";

export function solutionHref(slug: string): string {
  return `${SOLUTIONS_BASE}/${slug}`;
}

// Solutions bucketed by group, in a fixed display order. Empty groups are
// dropped so removing the last sector from a group doesn't leave a stray
// heading behind.
export function solutionsByGroup(): { group: SolutionGroup; items: Solution[] }[] {
  return SOLUTION_GROUP_ORDER.map((group) => ({
    group,
    items: solutions.filter((s) => s.group === group),
  })).filter((g) => g.items.length > 0);
}
