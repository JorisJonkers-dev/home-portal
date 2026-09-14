export default {
  nav: {
    about: 'Over mij',
    experience: 'Ervaring',
    projects: 'Projecten',
    skills: 'Vaardigheden',
    contact: 'Contact',
    myApps: 'Mijn Apps',
    admin: 'Beheer',
    account: 'Account',
    login: 'Inloggen',
    logout: 'Uitloggen',
  },
  hero: {
    subtitle: 'Medior Software Engineer',
    name: 'Joris Jonkers',
    degree: 'BSc',
    tagline:
      'Ik bouw robuuste en schaalbare software, van zelfgehoste infrastructuur tot gepolijste gebruikersapplicaties. Gepassioneerd over clean architecture, developer experience en het leveren van duurzame oplossingen.',
    cta: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'E-mail',
    },
    scroll: 'Scroll om te ontdekken',
  },
  about: {
    title: 'Over mij',
    intro:
      'Een gemotiveerde software-ingenieur en MSc-student die op zoek is naar betekenisvolle uitdagingen om bij te dragen aan de maatschappij en professioneel te groeien.',
    body: 'Sterk gericht op samenwerken in teamverband, waarbij ik aan de universiteit consequent de leiding heb genomen over projecten en projectpartners heb gemotiveerd om de beste resultaten te behalen. Geïnvesteerd in de groei richting projectmanagement door de toepassing van Agile-principes met een voorkeur voor Kanban.',
    location: 'Enschede, Nederland',
    languages: 'Nederlands (moedertaal), Engels (vloeiend)',
    education: 'Opleidingen',
    educationEntries: [
      {
        period: '2024 - Heden',
        institution: 'University of Twente',
        degree: 'MSc Software Technology',
      },
      {
        period: '2020 - 2024',
        institution: 'University of Twente',
        degree: 'BSc Technical Computer Science',
      },
      {
        period: '2010 - 2016',
        institution: 'Oscar Romero',
        degree: 'VWO NT/NG',
      },
    ],
  },
  experience: {
    title: 'Ervaring',
    subtitle: 'Waar ik heb gewerkt en wat ik heb opgeleverd.',
    entries: [
      {
        role: 'Medior Software Engineer',
        company: 'Nedap N.V.',
        period: 'Juni 2025 - Heden',
        description:
          'Werkzaam aan de migratie van de ONS Plannen & Roosteren zorglogistiekapplicatie van single-tenant naar multi-tenant architectuur, en van bare-metal infrastructuur naar container-orkestratie met Nomad. Verbetert CI/CD-pipelines, onderhoudt Docker-images en voert reguliere Ruby on Rails-ontwikkeltaken uit.',
        technologies: ['Ruby on Rails', 'Nomad', 'Docker', 'CI/CD'],
      },
      {
        role: 'Junior Software Ingenieur',
        company: 'DynaLynx B.V.',
        period: 'Mei 2022 - Juli 2025',
        description:
          'Software van een transportbedrijf doorontwikkeld en gerefactord, inclusief integraties met overheidsportalen voor wet- en regelgeving. Filtersnelheid verbeterd, testdekking vergroot en dataserialisatie geoptimaliseerd met JSON:API. Een React Native-applicatie door elf versies geüpdatet en bijgedragen aan UI-ontwerp en bedrijfslogica voor een chemo-medicatiemengmachine.',
        technologies: ['Ruby on Rails', 'Angular', 'React Native', '.NET', 'Aurelia'],
      },
      {
        role: 'Secretaris & Commissaris Externe Zaken',
        company: 'ESA Blueshell',
        period: 'September 2024 - September 2025',
        description:
          'Sponsorbenaderingsproces vernieuwd met webscraping en gerichte mailcampagnes, wat heeft geleid tot contact met meer dan 100 bedrijven. Verantwoordelijk voor officiële communicatie, notulen en maandelijkse nieuwsbrieven. Sinds april 2024 ook de primaire ontwikkelaar van de full-stack verenigingswebsite, gebouwd met Spring Boot 4 (Kotlin) en Vue.js 3 (TypeScript) en uitgerold op een k3s-cluster met Flux CD en Kustomize.',
        technologies: ['Spring Boot', 'Kotlin', 'Vue.js', 'k3s', 'Traefik'],
      },
    ],
  },
  projects: {
    title: 'Projecten',
    subtitle: 'Dingen die ik heb gebouwd of momenteel aan bouw.',
    status: {
      'in-progress': 'in ontwikkeling',
      'parked': 'geparkeerd',
    },
    entries: {
      'homelab-platform': {
        title: 'Homelab Platform',
        description:
          'Een k3s-cluster op NixOS over zeven nodes verdeeld over twee locaties — een cloud-VPS in Frankfurt en zes machines in het thuisnetwerk — waarbij alle state vanuit git wordt gereconcilieerd door Flux CD en Kustomize. Traefik verzorgt ingress met Let’s Encrypt en forward-auth, MetalLB en cert-manager regelen load balancing en certificaten, Vault projecteert secrets via de Vault Secrets Operator, en Longhorn en Garage leveren block- en objectopslag. De hele fleet is end-to-end observeerbaar: Alloy verzamelt, Loki en Tempo bewaren logs en traces, Pyroscope profileert, Gatus bewaakt elke route en Grafana Operator rendert de dashboards. Host-inventaris is de bron van waarheid voor nodes, rollen en labels; Flux-modulepacks en NixOS-modules zijn gedeelde, versiebeheerde artefacten in plaats van kopieën per repo.',
      },
      'deployment': {
        title: 'Deployment Model & Compiler',
        description:
          'Een service deployen op de estate betekent intent schrijven, geen manifests. De configuratie is een getypeerd model — service-intent per domein, een resolved deployment die als pure functie van gepinde inputs wordt afgeleid, en een deliverable set van gerenderde Flux- en Kustomize-bestanden — gevalideerd tegen JSON Schema’s en vastgelegd met een onveranderlijke image lock. Het schema-pakket is de compiler die de estate vandaag rendert; deploy-kit is de opvolger: hetzelfde drielaagse model uitgeschreven als specificatie, met een decision record achter elke regel, en de compiler die daarheen wordt overgebracht. Collection specs voor third-party en platformservices staan in een eigen bron-van-waarheid-repository.',
      },
      'agents': {
        title: 'Agent Platform',
        description:
          'Een zelfgehost agentplatform rond Hermes Agent, draaiend als langlopende in-cluster gateway met een webdashboard, bring-your-own-key tegen OpenRouter. Skills en MCP-servers worden gegenereerd vanuit één registry, zodat een toevoeging tegelijk de gateway en de workstation bereikt, en de modelcatalogus is een volledig gegenereerd manifest van elk tool-calling model dat de provider aanbiedt. Een eerder runner-platform — een Kotlin- en Spring-orchestratie-API, een Vue-workspace-UI en runner-pods per workspace — is geparkeerd op nul replicas, overbodig gemaakt door dit platform en intact gehouden in plaats van verwijderd.',
      },
      'knowledge': {
        title: 'Kennissysteem',
        description:
          'Een knowledge base die in de eerste plaats een git-repository is: notities worden geschreven in Obsidian, in-cluster in de browser of op de desktop via LiveSync, en via MCP aan agents aangeboden als lees- en schrijftools. Een Kotlin- en Spring-API beheert persistentie, zoeken en het MCP-oppervlak op PostgreSQL en RabbitMQ; een Python-ingestworker verbruikt berichten, schrijft notities en werkt metadata bij. Retrieval en verrijking draaien ernaast als in-cluster services — LightRAG, Ollama en Hindsight — zodat agents dezelfde vault bevragen die een mens bewerkt.',
      },
      'auth': {
        title: 'Auth Platform',
        description:
          'Eén identiteit voor alles op het domein: een Kotlin- en Spring authorization server voor login, sessie, profiel, TOTP MFA, wachtwoordreset, e-mailbevestiging en OAuth2/OIDC, waarbij Traefik forward-auth hem voor elke interne route zet. De autorisatievocabulaire wordt vanuit één model gepubliceerd als gegenereerde TypeScript- en Kotlin-constanten, zodat geen enkele consumer een rol- of permissiestring kopieert. Een Vue-frontend verzorgt de login- en accountflows, en dit portaal gebruikt dezelfde sessie om de applicatie-launcher van de estate te worden.',
      },
      'backup-dr': {
        title: 'Backup & Disaster Recovery',
        description:
          'Backups zijn geplande jobs met een bijbehorende verify-stap, geen map vol dumps. Vault maakt raft-snapshots, PostgreSQL logische dumps en RabbitMQ exporteert zijn definities, elk met een eigen CronJob, terwijl de backup-, restore- en verify-scripts in een gedeeld platformartefact staan dat op eigen paden van de aanroeper werkt. Een run is pas klaar als de verify-script zegt dat het archief terug te zetten is, en de restore-pad wordt op dezelfde manier geoefend als de backup gepland is.',
      },
      'tooling': {
        title: 'Estate Tooling',
        description:
          'Conventies zijn repositories, geen documenten. Elke repo start vanuit een template met de gedeelde branch-ruleset, de enige verplichte check `Pipeline Complete` en release-please-versiebeheer; CI- en release-workflows, Gradle-conventionplugins, een OpenAPI-clientplugin, contract-driftchecks en de Renovate-preset worden één keer gepubliceerd en per tag geconsumeerd. Gedeelde Kotlin- en Vue-commons worden als echte pakketten geleverd, contract-drift breekt de build in plaats van de runtime, hele-stack integratietests gaten een deploy-pull-request tegen dezelfde gepinde images die hij gaat releasen, en de estate is samengesteld als een dev workspace van submodules zodat een cross-repo wijziging één pull request is.',
      },
      'esa-blueshell': {
        title: 'ESA Blueshell Website',
        description:
          'Full-stack platform voor de grootste studentenesportsvereniging van Nederland: ledenadministratie, evenementbeheer, contributies en online inschrijvingen. Uitgerold op een k3s-cluster met Flux CD en Kustomize, achter Traefik met Let’s Encrypt TLS, plus Stalwart voor e-mail.',
      },
    },
  },
  skills: {
    title: 'Vaardigheden',
    subtitle: 'Talen, frameworks en tools waar ik mee werk.',
    categories: {
      languages: 'Programmeertalen',
      frameworks: 'Frameworks',
      platform: 'Platform',
      infrastructure: 'Infrastructuur',
      observability: 'Observability',
      agents: 'Agents & AI',
      delivery: 'Build & Delivery',
      soft: 'Persoonlijke Vaardigheden',
    },
  },
  contact: {
    title: 'Neem contact op',
    subtitle: 'Of het nu gaat om een projectidee, samenwerking of gewoon een gesprek, neem gerust contact op.',
    email: 'info@jorisjonkers.dev',
    cta: 'Stuur een e-mail',
  },
  theme: {
    light: 'Licht',
    dark: 'Donker',
    system: 'Systeem',
  },
  language: {
    en: 'English',
    nl: 'Nederlands',
  },
  footer: {
    built: 'Gebouwd met Vue.js, Spring Boot & Kotlin — uitgerold met Flux CD op k3s',
    source: 'Broncode',
  },
}
