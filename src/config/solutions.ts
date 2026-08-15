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

export type SolutionCaseStudy = {
  client: string;
  problem: string;
  built: string;
  result: string;
  // Set when the cited project is from an adjacent sector rather than this one.
  // The SOP allows that explicitly, provided the page says so honestly.
  adjacentNote?: string;
};

export type Solution = {
  slug: string;
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
    navLabel: "Riad & maison d'hôtes",
    navEmoji: "🏨",
    navNote: "Réservation directe, sans commission",

    seoTitle: "Site Web pour Riad à Marrakech | Digital Studio LF",
    seoDescription:
      "Site web professionnel pour riad à Marrakech. Réservation directe, multilingue, paiement en ligne. Devis gratuit sous 24h.",
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
        a: "Oui, et c'est précisément l'objectif du moteur de réservation. Vous ne quitterez pas les plateformes du jour au lendemain, et ce n'est pas conseillé — elles vous apportent de la visibilité. L'intérêt est de récupérer les voyageurs qui vous cherchent déjà par votre nom, et qui aujourd'hui retournent réserver via une plateforme faute d'alternative.",
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
    navLabel: "Hôtel",
    navEmoji: "🛎️",
    navNote: "Réservation directe et gestion multi-chambres",

    seoTitle: "Site Web pour Hôtel au Maroc | Digital Studio LF",
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
    navLabel: "Restaurant",
    navEmoji: "🍽️",
    navNote: "Menu en ligne, réservation de table",

    seoTitle: "Site Web pour Restaurant à Marrakech | Digital Studio LF",
    seoDescription:
      "Création de site web pour restaurant à Marrakech : menu en ligne, réservation de table, Google Maps et avis. Devis gratuit sous 24h.",
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
    navLabel: "Agence de voyage",
    navEmoji: "🧭",
    navNote: "Circuits, excursions et devis en ligne",

    seoTitle: "Site Web pour Agence de Voyage au Maroc | Digital Studio LF",
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
    navLabel: "Spa & hammam",
    navEmoji: "🧖",
    navNote: "Prise de rendez-vous en ligne",

    seoTitle: "Site Web pour Spa & Hammam à Marrakech | Digital Studio LF",
    seoDescription:
      "Création de site web pour spa et hammam à Marrakech : réservation de soins en ligne, forfaits, galerie. Devis gratuit sous 24h.",
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
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export const SOLUTIONS_BASE = "/fr/solutions";

export function solutionHref(slug: string): string {
  return `${SOLUTIONS_BASE}/${slug}`;
}
