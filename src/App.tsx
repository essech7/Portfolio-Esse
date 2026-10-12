/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, Github, Linkedin, Mail, FileText, 
  ExternalLink, Sparkles, Send, ArrowRight, Code, Briefcase, 
  GraduationCap, Award, Globe, BookOpen, Layers, CheckCircle2 
} from 'lucide-react';

/* =======================================================
   TRANSLATIONS
   ======================================================= */
const I18N: Record<string, Record<string, string>> = {
  fr: {
    dir: 'ltr',
    'a11y.skip': 'Aller au contenu principal',
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.experience': 'Expérience',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.education': 'Formation',
    'nav.certifications': 'Certifications',
    'nav.contact': 'Contact',

    'hero.badge': 'Portfolio — 2026',
    'hero.title': 'Développement Web & E-Business',
    'hero.sub': "Étudiante en E-Business, je possède une expérience pratique en développement web, déploiement de plateformes éducatives, conception de bases de données, gestion e-commerce et communication digitale. Je m'intéresse à la création de solutions numériques qui associent technologie, besoins métier et expérience utilisateur.",
    'hero.btnProjects': 'Voir mes projets',
    'hero.btnCV': 'Télécharger mon CV',
    'hero.btnContact': 'Me contacter',
    'hero.mediaTag': 'Studio',
    'hero.mediaCap': 'Portrait — Tunis',
    'hero.mediaNote': 'Portrait professionnel',

    'about.eyebrow': 'Profil professionnel',
    'about.heading': 'Allier technologie et business.',
    'about.p': "Étudiante en troisième année de Licence E-Business à l'ESSEC Tunis, passionnée par les technologies du web et la digitalisation. Dotée d'expériences concrètes en développement web, création de plateformes éducatives, gestion de projets e-commerce et communication digitale. Rigoureuse, créative et autonome, je mets mes compétences techniques et organisationnelles au service de projets innovants.",
    'about.f1.t': 'Développement Web & IT',
    'about.f1.a': "Développement d'applications web.",
    'about.f1.b': 'Conception de bases de données.',
    'about.f1.c': 'Plateformes éducatives.',
    'about.f1.d': 'Optimisation UI/UX et tests fonctionnels.',
    'about.f2.t': 'E-commerce & Marketing Digital',
    'about.f2.a': "Gestion d'activité en ligne.",
    'about.f2.b': 'Création de contenu produit.',
    'about.f2.c': 'Service client.',
    'about.f2.d': 'Communication digitale et analyse de performance.',
    'about.f3.t': 'Organisation & Support Projet',
    'about.f3.a': 'Coordination administrative.',
    'about.f3.b': "Processus d'inscription et de contact client.",
    'about.f3.c': 'Documentation et planification.',
    'about.f3.d': 'Amélioration des flux de travail numériques.',

    'exp.eyebrow': 'Parcours',
    'exp.heading': 'Expérience professionnelle',
    'exp.sub': 'Expériences concrètes en développement web, e-commerce et coordination administrative.',
    'exp.e1.role': 'Stagiaire Développement Web & IT',
    'exp.e1.org': 'Centre LE PLUS, Morneg',
    'exp.e1.date': 'Juil. 2026 — Août 2026',
    'exp.e1.b1': "Contribution majeure au développement et au déploiement de la plateforme éducative en ligne du centre.",
    'exp.e1.b2': 'Conception et structuration de la base de données pour les cours, les ressources pédagogiques et les comptes étudiants.',
    'exp.e1.b3': "Intégration d'espaces membres sécurisés pour les étudiants, les enseignants et l'administration.",
    'exp.e1.b4': "Améliorations de l'interface et de l'expérience utilisateur.",
    'exp.e1.b5': 'Tests fonctionnels.',
    'exp.e1.b6': "Digitalisation et automatisation des procédures d'inscription et de contact.",
    'exp.e2.role': 'Fondatrice & Gestionnaire E-commerce',
    'exp.e2.org': "Loopi — Accessoires faits main",
    'exp.e2.date': "2025 — Aujourd'hui",
    'exp.e2.b1': "Création, configuration et gestion globale d'une activité d'accessoires en ligne.",
    'exp.e2.b2': 'Production de contenu multimédia, incluant photographie produit et vidéos promotionnelles.',
    'exp.e2.b3': 'Gestion du cycle de vente, du traitement des commandes au service après-vente.',
    'exp.e2.b4': "Analyse des performances commerciales à l'aide d'outils analytiques.",
    'exp.e2.b5': 'Ajustement de la stratégie de marketing digital.',
    'exp.e3.role': 'Assistante Administrative & Communication',
    'exp.e3.org': 'Centre LE PLUS, Morneg',
    'exp.e3.date': 'Juil. 2025 — Août 2025',
    'exp.e3.b1': 'Accueil physique et téléphonique.',
    'exp.e3.b2': "Orientation des clients et assistance à l'inscription.",
    'exp.e3.b3': 'Organisation administrative.',
    'exp.e3.b4': 'Gestion des dossiers étudiants.',
    'exp.e3.b5': 'Planification et mise à jour des emplois du temps.',
    'exp.e3.b6': 'Participation aux campagnes de communication internes.',
    'exp.e3.b7': 'Préparation des supports de cours.',

    'skills.eyebrow': 'Compétences',
    'skills.heading': 'Compétences techniques',
    'skills.sub': "Technologies et outils utilisés dans le cadre académique, professionnel et entrepreneurial.",
    'skills.c1': 'Développement web',
    'skills.c2': 'Outils & productivité',
    'skills.c3': 'Marketing digital & analytique',
    'skills.c3a': 'Tableaux de bord',
    'skills.c3b': 'CMS',
    'skills.c4': 'Développement & livraison',
    'skills.c4a': 'Plateformes éducatives',
    'skills.c4b': 'Bases de données',
    'skills.c4c': 'Optimisation UI/UX',
    'skills.c4d': 'Tests fonctionnels',
    'skills.c4e': 'Automatisation',

    'projects.eyebrow': 'Réalisations',
    'projects.heading': 'Projets sélectionnés',
    'projects.sub': 'Projets académiques, professionnels et personnels. Les descriptions reposent uniquement sur des éléments vérifiables.',
    'projects.mediaTag': 'Visuel',
    'projects.p1.title': 'Plateforme éducative',
    'projects.p1.desc': "Contribution au développement et au déploiement de la plateforme éducative en ligne du Centre LE PLUS : structuration de la base de données, espaces membres pour les étudiants, les enseignants et l'administration, améliorations UI/UX, tests fonctionnels et digitalisation des procédures d'inscription et de contact.",
    'projects.p1.t1': 'Base de données',
    'projects.p1.t2': 'Espaces membres',
    'projects.p1.t3': 'Tests fonctionnels',
    'projects.p1.note': "Contribution au sein de l'équipe du Centre LE PLUS : cette description porte sur mon rôle, et non sur la plateforme dans son ensemble.",
    'projects.p2.desc': "Projet de développement personnel publié sur GitHub. Le dépôt contient le code source, les technologies utilisées et les instructions d'installation.",
    'projects.p2.t1': 'Code source ouvert',
    'projects.p3.desc': "Projet de développement personnel publié sur GitHub. Le dépôt contient le code source, les technologies utilisées et les instructions d'installation.",
    'projects.p3.t1': 'Code source ouvert',
    'projects.visit': 'Visiter le site',

    'edu.eyebrow': 'Formation',
    'edu.heading': 'Parcours académique',
    'edu.d1.t': 'Licence E-Business',
    'edu.d1.m': 'ESSEC Tunis, Tunisie',
    'edu.d1.p': "Cursus axé sur l'e-commerce, le marketing digital, la gestion de projets web et le développement, avec des projets pratiques de création de boutiques en ligne, de SEO et d'optimisation.",
    'edu.d2.t': "Baccalauréat — Sciences de l'informatique",
    'edu.d2.m': 'Session principale 2024',
    'edu.d2.p': 'Mention : Assez bien.',

    'certs.eyebrow': 'Apprentissage continu',
    'certs.heading': 'Certifications & formation continue',
    'certs.sub': 'Les certificats et documents de formation sont regroupés dans un dossier partagé. Chaque certification est listée individuellement uniquement après vérification.',
    'certs.boxTitle': 'Dossier de certificats',
    'certs.p': "Consultez l'ensemble des certificats et attestations obtenus dans le dossier Google Drive partagé.",
    'certs.btn': 'Ouvrir le dossier',

    'langs.eyebrow': 'Communication',
    'langs.heading': 'Langues',
    'langs.ar': 'Arabe',
    'langs.arLvl': 'Langue maternelle',
    'langs.fr': 'Français',
    'langs.frLvl': 'B2 — Avancé',
    'langs.en': 'Anglais',
    'langs.enLvl': 'C2 — Courant',
    'langs.es': 'Espagnol',
    'langs.esLvl': 'B2 — Intermédiaire',

    'contact.eyebrow': 'Contact',
    'contact.heading': 'Échangeons professionnellement.',
    'contact.sub': "Pour des opportunités professionnelles, des projets de développement web et des collaborations digitales, n'hésitez pas à me contacter.",
    'contact.emailLbl': 'E-mail',
    'contact.cvLbl': 'CV',
    'contact.cvVal': 'Consulter mon CV en ligne',
    'form.name': 'Nom',
    'form.email': 'E-mail',
    'form.subject': 'Objet',
    'form.message': 'Message',
    'form.send': 'Envoyer le message',
    'form.note': "Ce formulaire ouvre votre client de messagerie avec le message pré-rempli. Aucune donnée n'est stockée ni envoyée par cette page.",
    'form.required': 'Veuillez remplir tous les champs.',
    'form.opening': 'Ouverture de votre client de messagerie…',

    'footer.tag': 'Développement Web & E-Business — Portfolio professionnel.',
    'footer.copy': '© 2026 Esse Chaouch. Développement Web & E-Business.',
    'footer.loc': 'Tunis, Tunisie'
  },

  en: {
    dir: 'ltr',
    'a11y.skip': 'Skip to main content',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.contact': 'Contact',

    'hero.badge': 'Portfolio — 2026',
    'hero.title': 'Web Development & E-Business',
    'hero.sub': 'An E-Business student with practical experience in web development, educational platform deployment, database design, e-commerce management, and digital communication. Interested in building functional digital solutions that connect technology, business, and user needs.',
    'hero.btnProjects': 'View My Projects',
    'hero.btnCV': 'Download My CV',
    'hero.btnContact': 'Contact Me',
    'hero.mediaTag': 'Studio',
    'hero.mediaCap': 'Portrait — Tunis',
    'hero.mediaNote': 'Professional portrait',

    'about.eyebrow': 'Professional profile',
    'about.heading': 'Combining Technology and Business.',
    'about.p': 'Third-year E-Business student at ESSEC Tunis, passionate about web technologies and digitalization. With hands-on experience in web development, educational platform creation, e-commerce project management and digital communication. Rigorous, creative and autonomous, I put my technical and organizational skills at the service of innovative projects.',
    'about.f1.t': 'Web Development & IT',
    'about.f1.a': 'Web application development.',
    'about.f1.b': 'Database design.',
    'about.f1.c': 'Educational platforms.',
    'about.f1.d': 'UI/UX optimization and functional testing.',
    'about.f2.t': 'E-commerce & Digital Marketing',
    'about.f2.a': 'Online business management.',
    'about.f2.b': 'Product content creation.',
    'about.f2.c': 'Customer service.',
    'about.f2.d': 'Digital communication and performance analysis.',
    'about.f3.t': 'Organization & Project Support',
    'about.f3.a': 'Administrative coordination.',
    'about.f3.b': 'Registration and customer contact processes.',
    'about.f3.c': 'Documentation and scheduling.',
    'about.f3.d': 'Digital workflow improvements.',

    'exp.eyebrow': 'Background',
    'exp.heading': 'Professional Experience',
    'exp.sub': 'Hands-on experience in web development, e-commerce and administrative coordination.',
    'exp.e1.role': 'Web Development & IT Intern',
    'exp.e1.org': 'Centre LE PLUS, Morneg',
    'exp.e1.date': 'Jul. 2026 — Aug. 2026',
    'exp.e1.b1': "Major contribution to the development and deployment of the centre's online educational platform.",
    'exp.e1.b2': 'Design and structuring of the database for courses, educational resources, and student accounts.',
    'exp.e1.b3': 'Integration of secure member areas for students, teachers, and administration.',
    'exp.e1.b4': 'User interface and user experience improvements.',
    'exp.e1.b5': 'Functional testing.',
    'exp.e1.b6': 'Digitalization and automation of registration and contact procedures.',
    'exp.e2.role': 'Founder & E-commerce Manager',
    'exp.e2.org': 'Loopi — Handmade Accessories Brand',
    'exp.e2.date': '2025 — Present',
    'exp.e2.b1': 'Creation, configuration, and overall management of an online accessories business.',
    'exp.e2.b2': 'Production of multimedia content, including product photography and promotional videos.',
    'exp.e2.b3': 'Management of the sales cycle, from order processing to after-sales service.',
    'exp.e2.b4': 'Analysis of commercial performance using analytics.',
    'exp.e2.b5': 'Adjustments to digital marketing strategy.',
    'exp.e3.role': 'Administrative & Communication Assistant',
    'exp.e3.org': 'Centre LE PLUS, Morneg',
    'exp.e3.date': 'Jul. 2025 — Aug. 2025',
    'exp.e3.b1': 'In-person and telephone reception.',
    'exp.e3.b2': 'Customer guidance and registration assistance.',
    'exp.e3.b3': 'Administrative organization.',
    'exp.e3.b4': 'Student file management.',
    'exp.e3.b5': 'Scheduling and timetable updates.',
    'exp.e3.b6': 'Participation in internal communication campaigns.',
    'exp.e3.b7': 'Preparation of course-support materials.',

    'skills.eyebrow': 'Skills',
    'skills.heading': 'Technical Skills',
    'skills.sub': 'Technologies and tools used in academic, professional and entrepreneurial contexts.',
    'skills.c1': 'Web Development',
    'skills.c2': 'Tools & Productivity',
    'skills.c3': 'Digital Marketing & Analytics',
    'skills.c3a': 'Dashboards',
    'skills.c3b': 'CMS',
    'skills.c4': 'Development & Delivery',
    'skills.c4a': 'Educational platforms',
    'skills.c4b': 'Databases',
    'skills.c4c': 'UI/UX optimization',
    'skills.c4d': 'Functional testing',
    'skills.c4e': 'Automation',

    'projects.eyebrow': 'Work',
    'projects.heading': 'Featured Projects',
    'projects.sub': 'Academic, professional and personal projects. Descriptions rely only on verifiable information.',
    'projects.mediaTag': 'Visual',
    'projects.p1.title': 'Educational Platform',
    'projects.p1.desc': "Contribution to the development and deployment of the Centre LE PLUS online educational platform: database structuring, member areas for students, teachers and administration, UI/UX improvements, functional testing and digitalization of registration and contact processes.",
    'projects.p1.t1': 'Database',
    'projects.p1.t2': 'Member areas',
    'projects.p1.t3': 'Functional testing',
    'projects.p1.note': 'Contribution within the Centre LE PLUS team: this describes my role, not the platform as a whole.',
    'projects.p2.desc': 'Personal development project published on GitHub. The repository contains the source code, technologies used and setup instructions.',
    'projects.p2.t1': 'Open source',
    'projects.p3.desc': 'Personal development project published on GitHub. The repository contains the source code, technologies used and setup instructions.',
    'projects.p3.t1': 'Open source',
    'projects.visit': 'Visit website',

    'edu.eyebrow': 'Education',
    'edu.heading': 'Academic Background',
    'edu.d1.t': 'Licence E-Business',
    'edu.d1.m': 'ESSEC Tunis, Tunisia',
    'edu.d1.p': 'Curriculum focused on e-commerce, digital marketing, web project management and development, with practical projects in online store creation, SEO and optimization.',
    'edu.d2.t': 'Baccalauréat — Computer Science',
    'edu.d2.m': 'Main session 2024',
    'edu.d2.p': 'Mention: Assez bien.',

    'certs.eyebrow': 'Continuous learning',
    'certs.heading': 'Certifications & Continuous Learning',
    'certs.sub': 'Certificates and training documents are collected in a shared folder. Individual credentials are listed only once verified.',
    'certs.boxTitle': 'Certificates folder',
    'certs.p': 'Browse all certificates and attestations in the shared Google Drive folder.',
    'certs.btn': 'Open folder',

    'langs.eyebrow': 'Communication',
    'langs.heading': 'Languages',
    'langs.ar': 'Arabic',
    'langs.arLvl': 'Native',
    'langs.fr': 'French',
    'langs.frLvl': 'B2 — Advanced',
    'langs.en': 'English',
    'langs.enLvl': 'C2 — Fluent',
    'langs.es': 'Spanish',
    'langs.esLvl': 'B2 — Intermediate',

    'contact.eyebrow': 'Contact',
    'contact.heading': "Let's Connect Professionally.",
    'contact.sub': 'For professional opportunities, web development projects, and digital collaborations, feel free to get in touch.',
    'contact.emailLbl': 'Email',
    'contact.cvLbl': 'CV',
    'contact.cvVal': 'View my CV online',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.subject': 'Subject',
    'form.message': 'Message',
    'form.send': 'Send Message',
    'form.note': 'This form opens your email client with the message pre-filled. No data is stored or sent by this page.',
    'form.required': 'Please fill in all fields.',
    'form.opening': 'Opening your email client…',

    'footer.tag': 'Web Development & E-Business — Professional portfolio.',
    'footer.copy': '© 2026 Esse Chaouch. Web Development & E-Business.',
    'footer.loc': 'Tunis, Tunisia'
  },

  ar: {
    dir: 'rtl',
    'a11y.skip': 'الانتقال إلى المحتوى الرئيسي',
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.experience': 'الخبرة',
    'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع',
    'nav.education': 'التعليم',
    'nav.certifications': 'الشهادات',
    'nav.contact': 'تواصل',

    'hero.badge': 'ملف مهني — 2026',
    'hero.title': 'تطوير الويب والتجارة الإلكترونية',
    'hero.sub': 'طالبة في مجال التجارة الإلكترونية، أمتلك خبرة عملية في تطوير الويب، ونشر المنصات التعليمية، وتصميم قواعد البيانات، وإدارة المتاجر الإلكترونية، والتواصل الرقمي. أهتم ببناء حلول رقمية عملية تربط بين التقنية واحتياجات الأعمال وتجربة المستخدم.',
    'hero.btnProjects': 'استعرض مشاريعي',
    'hero.btnCV': 'تحميل سيرتي الذاتية',
    'hero.btnContact': 'تواصل معي',
    'hero.mediaTag': 'استوديو',
    'hero.mediaCap': 'صورة شخصية — تونس',
    'hero.mediaNote': 'صورة شخصية مهنية',

    'about.eyebrow': 'الملف المهني',
    'about.heading': 'الجمع بين التقنية والأعمال.',
    'about.p': 'طالبة في السنة الثالثة من إجازة التجارة الإلكترونية في ESSEC تونس، شغوفة بتقنيات الويب والتحول الرقمي. لديّ خبرات ملموسة في تطوير الويب، وإنشاء المنصات التعليمية، وإدارة مشاريع التجارة الإلكترونية، والتواصل الرقمي. دقيقة ومبدعة ومستقلة، أضع مهاراتي التقنية والتنظيمية في خدمة مشاريع مبتكرة.',
    'about.f1.t': 'تطوير الويب وتقنية المعلومات',
    'about.f1.a': 'تطوير تطبيقات الويب.',
    'about.f1.b': 'تصميم قواعد البيانات.',
    'about.f1.c': 'المنصات التعليمية.',
    'about.f1.d': 'تحسين تجربة المستخدم والاختبارات الوظيفية.',
    'about.f2.t': 'التجارة الإلكترونية والتسويق الرقمي',
    'about.f2.a': 'إدارة النشاط التجاري عبر الإنترنت.',
    'about.f2.b': 'إنشاء محتوى المنتجات.',
    'about.f2.c': 'خدمة العملاء.',
    'about.f2.d': 'التواصل الرقمي وتحليل الأداء.',
    'about.f3.t': 'التنظيم ودعم المشاريع',
    'about.f3.a': 'التنسيق الإداري.',
    'about.f3.b': 'عمليات التسجيل والتواصل مع العملاء.',
    'about.f3.c': 'التوثيق والجدولة الزمنية.',
    'about.f3.d': 'تحسين مسارات العمل الرقمية.',

    'exp.eyebrow': 'المسار',
    'exp.heading': 'الخبرة المهنية',
    'exp.sub': 'خبرات عملية في تطوير الويب والتجارة الإلكترونية والتنسيق الإداري.',
    'exp.e1.role': 'متدربة في تطوير الويب وتقنية المعلومات',
    'exp.e1.org': 'مركز LE PLUS، مورناغ',
    'exp.e1.date': 'جويلية 2026 — أوت 2026',
    'exp.e1.b1': 'مساهمة رئيسية في تطوير ونشر المنصة التعليمية الإلكترونية الخاصة بالمركز.',
    'exp.e1.b2': 'تصميم وهيكلة قاعدة البيانات الخاصة بالدورات والموارد التعليمية وحسابات الطلاب.',
    'exp.e1.b3': 'دمج مساحات أعضاء آمنة للطلاب والأساتذة والإدارة.',
    'exp.e1.b4': 'تحسينات على واجهة وتجربة المستخدم.',
    'exp.e1.b5': 'اختبارات وظيفية.',
    'exp.e1.b6': 'رقمنة وأتمتة إجراءات التسجيل والتواصل.',
    'exp.e2.role': 'مؤسِّسة ومديرة تجارة إلكترونية',
    'exp.e2.org': 'Loopi — علامة إكسسوارات مصنوعة يدويًا',
    'exp.e2.date': '2025 — حتى الآن',
    'exp.e2.b1': 'إنشاء وإعداد وإدارة نشاط تجاري للإكسسوارات عبر الإنترنت.',
    'exp.e2.b2': 'إنتاج محتوى متعدد الوسائط، بما في ذلك تصوير المنتجات والفيديوهات الترويجية.',
    'exp.e2.b3': 'إدارة دورة البيع، من معالجة الطلبات إلى خدمة ما بعد البيع.',
    'exp.e2.b4': 'تحليل الأداء التجاري باستخدام أدوات التحليلات.',
    'exp.e2.b5': 'تعديل استراتيجية التسويق الرقمي.',
    'exp.e3.role': 'مساعدة إدارية وتواصل',
    'exp.e3.org': 'مركز LE PLUS، مورناغ',
    'exp.e3.date': 'جويلية 2025 — أوت 2025',
    'exp.e3.b1': 'الاستقبال الحضوري والهاتفي.',
    'exp.e3.b2': 'توجيه العملاء والمساعدة في التسجيل.',
    'exp.e3.b3': 'التنظيم الإداري.',
    'exp.e3.b4': 'إدارة ملفات الطلاب.',
    'exp.e3.b5': 'الجدولة وتحديث المواعيد الدراسية.',
    'exp.e3.b6': 'المشاركة في حملات التواصل الداخلي.',
    'exp.e3.b7': 'إعداد المواد الداعمة للدورات.',

    'skills.eyebrow': 'المهارات',
    'skills.heading': 'المهارات التقنية',
    'skills.sub': 'التقنيات والأدوات المستخدمة في السياقات الأكاديمية والمهنية وريادة الأعمال.',
    'skills.c1': 'تطوير الويب',
    'skills.c2': 'الأدوات والإنتاجية',
    'skills.c3': 'التسويق الرقمي والتحليلات',
    'skills.c3a': 'لوحات المعلومات',
    'skills.c3b': 'أنظمة إدارة المحتوى',
    'skills.c4': 'التطوير والتسليم',
    'skills.c4a': 'المنصات التعليمية',
    'skills.c4b': 'قواعد البيانات',
    'skills.c4c': 'تحسين تجربة المستخدم',
    'skills.c4d': 'الاختبارات الوظيفية',
    'skills.c4e': 'الأتمتة',

    'projects.eyebrow': 'الأعمال',
    'projects.heading': 'مشاريع مختارة',
    'projects.sub': 'مشاريع أكاديمية ومهنية وشخصية. تعتمد الأوصاف على معلومات قابلة للتحقق فقط.',
    'projects.mediaTag': 'مرئي',
    'projects.p1.title': 'منصة تعليمية',
    'projects.p1.desc': 'مساهمة في تطوير ونشر المنصة التعليمية الإلكترونية لمركز LE PLUS: هيكلة قاعدة البيانات، ومساحات أعضاء للطلاب والأساتذة والإدارة، وتحسينات تجربة المستخدم، واختبارات وظيفية، ورقمنة إجراءات التسجيل والتواصل.',
    'projects.p1.t1': 'قاعدة بيانات',
    'projects.p1.t2': 'مساحات الأعضاء',
    'projects.p1.t3': 'اختبارات وظيفية',
    'projects.p1.note': 'مساهمة ضمن فريق مركز LE PLUS: يصف هذا النص دوري، وليس المنصة بأكملها.',
    'projects.p2.desc': 'مشروع تطوير شخصي منشور على GitHub. يحتوي المستودع على الشيفرة المصدرية والتقنيات المستخدمة وتعليمات الإعداد.',
    'projects.p2.t1': 'شيفرة مفتوحة',
    'projects.p3.desc': 'مشروع تطوير شخصي منشور على GitHub. يحتوي المستودع على الشيفرة المصدرية والتقنيات المستخدمة وتعليمات الإعداد.',
    'projects.p3.t1': 'شيفرة مفتوحة',
    'projects.visit': 'زيارة الموقع',

    'edu.eyebrow': 'التعليم',
    'edu.heading': 'المسار الأكاديمي',
    'edu.d1.t': 'إجازة في التجارة الإلكترونية',
    'edu.d1.m': 'ESSEC تونس، تونس',
    'edu.d1.p': 'برنامج دراسي يركز على التجارة الإلكترونية والتسويق الرقمي وإدارة مشاريع الويب والتطوير، مع مشاريع تطبيقية في إنشاء المتاجر الإلكترونية وتحسين محركات البحث.',
    'edu.d2.t': 'شهادة الباكالوريا — علوم الإعلامية',
    'edu.d2.m': 'الدورة الرئيسية 2024',
    'edu.d2.p': 'الملاحظة: حسن.',

    'certs.eyebrow': 'التعلم المستمر',
    'certs.heading': 'الشهادات والتعلم المستمر',
    'certs.sub': 'تُجمع الشهادات ووثائق التدريب في مجلد مشترك. ولا تُدرج أي شهادة بشكل فردي إلا بعد التحقق منها.',
    'certs.boxTitle': 'مجلد الشهادات',
    'certs.p': 'استعرض جميع الشهادات والإفادات في مجلد Google Drive المشترك.',
    'certs.btn': 'فتح المجلد',

    'langs.eyebrow': 'التواصل',
    'langs.heading': 'اللغات',
    'langs.ar': 'العربية',
    'langs.arLvl': 'اللغة الأم',
    'langs.fr': 'الفرنسية',
    'langs.frLvl': 'B2 — متقدم',
    'langs.en': 'الإنجليزية',
    'langs.enLvl': 'C2 — بطلاقة',
    'langs.es': 'الإسبانية',
    'langs.esLvl': 'B2 — متوسط',

    'contact.eyebrow': 'تواصل',
    'contact.heading': 'لنتواصل مهنيًا.',
    'contact.sub': 'للفرص المهنية ومشاريع تطوير الويب والتعاون الرقمي، لا تتردد في التواصل معي.',
    'contact.emailLbl': 'البريد الإلكتروني',
    'contact.cvLbl': 'السيرة الذاتية',
    'contact.cvVal': 'عرض سيرتي الذاتية',
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.subject': 'الموضوع',
    'form.message': 'الرسالة',
    'form.send': 'إرسال الرسالة',
    'form.note': 'يفتح هذا النموذج تطبيق البريد الإلكتروني لديك مع تعبئة الرسالة مسبقًا. لا يتم تخزين أو إرسال أي بيانات من هذه الصفحة.',
    'form.required': 'يرجى تعبئة جميع الحقول.',
    'form.opening': 'جارٍ فتح تطبيق البريد الإلكتروني…',

    'footer.tag': 'تطوير الويب والتجارة الإلكترونية — ملف مهني.',
    'footer.copy': '© 2026 إيسة شاوش. تطوير الويب والتجارة الإلكترونية.',
    'footer.loc': 'تونس، تونس'
  }
};

export default function App() {
  const [lang, setLang] = useState<'fr' | 'en' | 'ar'>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('ec_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }

    const savedLang = localStorage.getItem('ec_lang') as 'fr' | 'en' | 'ar' | null;
    if (savedLang && I18N[savedLang]) {
      setLang(savedLang);
      document.documentElement.setAttribute('lang', savedLang);
      document.documentElement.setAttribute('dir', I18N[savedLang].dir);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('ec_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const changeLang = (newLang: 'fr' | 'en' | 'ar') => {
    setLang(newLang);
    localStorage.setItem('ec_lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', I18N[newLang].dir);
    setMobileMenuOpen(false);
  };

  const t = (key: string) => {
    const dict = I18N[lang] || I18N.fr;
    return dict[key] || I18N.fr[key] || key;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus(t('form.required'));
      return;
    }
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    const href = `mailto:assosach@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus(t('form.opening'));
    window.location.href = href;
  };

  return (
    <div className="min-h-screen relative selection:bg-purple-500 selection:text-white transition-colors duration-500">
      
      {/* =======================================================
         ATMOSPHERIC AMBIENT GLOWS & ETHEREAL BUTTERFLIES / SPARKLES
         ======================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Ambient background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-400/20 dark:bg-purple-900/20 blur-[120px] animate-ambient" />
        <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-300/20 dark:bg-indigo-950/30 blur-[140px] animate-ambient" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-pink-300/15 dark:bg-purple-800/15 blur-[100px] animate-ambient" style={{ animationDelay: '6s' }} />

        {/* Floating Purple Butterflies */}
        <div className="absolute top-[18%] left-[8%] animate-float opacity-80">
          <div className="relative w-8 h-8 flex items-center justify-center transform -rotate-12">
            <div className="absolute w-5 h-6 bg-gradient-to-tr from-purple-500 to-indigo-400 dark:from-purple-400 dark:to-pink-400 rounded-full animate-flutter origin-right shadow-lg shadow-purple-500/30" />
            <div className="absolute w-5 h-6 bg-gradient-to-tl from-purple-500 to-indigo-400 dark:from-purple-400 dark:to-pink-400 rounded-full animate-flutter origin-left shadow-lg shadow-purple-500/30" />
            <div className="w-1.5 h-6 bg-purple-900 dark:bg-purple-200 rounded-full z-10" />
          </div>
        </div>

        <div className="absolute top-[52%] right-[12%] animate-float-delayed opacity-75">
          <div className="relative w-7 h-7 flex items-center justify-center transform rotate-45">
            <div className="absolute w-4 h-5 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full animate-flutter origin-right shadow-md shadow-pink-500/30" />
            <div className="absolute w-4 h-5 bg-gradient-to-tl from-purple-400 to-pink-400 rounded-full animate-flutter origin-left shadow-md shadow-pink-500/30" />
            <div className="w-1 h-5 bg-purple-900 dark:bg-purple-200 rounded-full z-10" />
          </div>
        </div>

        <div className="absolute top-[80%] left-[15%] animate-float opacity-70" style={{ animationDuration: '9s' }}>
          <div className="relative w-6 h-6 flex items-center justify-center transform rotate-12">
            <div className="absolute w-3.5 h-4 bg-gradient-to-tr from-indigo-400 to-purple-500 rounded-full animate-flutter origin-right" />
            <div className="absolute w-3.5 h-4 bg-gradient-to-tl from-indigo-400 to-purple-500 rounded-full animate-flutter origin-left" />
            <div className="w-1 h-4 bg-purple-900 dark:bg-purple-200 rounded-full z-10" />
          </div>
        </div>

        {/* Tiny Golden Sparkles */}
        <div className="absolute top-[24%] right-[28%] animate-sparkle text-amber-300 dark:text-amber-200">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute top-[45%] left-[10%] animate-sparkle text-amber-300 dark:text-amber-200" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-[70%] right-[35%] animate-sparkle text-amber-300 dark:text-amber-200" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-[12%] left-[42%] animate-sparkle text-amber-300 dark:text-amber-200" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <a className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-purple-900 focus:text-white" href="#main">
        {t('a11y.skip')}
      </a>

      {/* =======================================================
         NAVIGATION
         ======================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#120A24]/75 border-b border-purple-200/40 dark:border-purple-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-purple-950 dark:text-purple-100">
              Esse Chaouch
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            <a href="#hero" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.home')}</a>
            <a href="#about" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.about')}</a>
            <a href="#experience" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.experience')}</a>
            <a href="#skills" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.skills')}</a>
            <a href="#projects" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.projects')}</a>
            <a href="#education" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.education')}</a>
            <a href="#certifications" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.certifications')}</a>
            <a href="#contact" className="px-3.5 py-2 text-sm font-medium text-purple-900/80 dark:text-purple-200/80 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">{t('nav.contact')}</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-purple-100/60 dark:bg-purple-950/60 px-2.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60 text-xs font-bold">
              <button 
                onClick={() => changeLang('fr')} 
                className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'fr' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-800 dark:text-purple-300 hover:text-purple-600'}`}
              >
                FR
              </button>
              <span className="text-purple-300 dark:text-purple-700">/</span>
              <button 
                onClick={() => changeLang('en')} 
                className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'en' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-800 dark:text-purple-300 hover:text-purple-600'}`}
              >
                EN
              </button>
              <span className="text-purple-300 dark:text-purple-700">/</span>
              <button 
                onClick={() => changeLang('ar')} 
                className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'ar' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-800 dark:text-purple-300 hover:text-purple-600'}`}
              >
                AR
              </button>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label="Basculer le thème"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100/60 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 text-purple-800 dark:text-purple-200 hover:scale-105 transition-all shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" /> : <Moon className="w-4 h-4 text-purple-700" />}
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-purple-100/60 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 text-purple-800 dark:text-purple-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-[#120A24]/95 backdrop-blur-xl border-b border-purple-200 dark:border-purple-900 py-6 px-8 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.home')}</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.about')}</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.experience')}</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.skills')}</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.projects')}</a>
            <a href="#education" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.education')}</a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.certifications')}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-purple-900 dark:text-purple-100">{t('nav.contact')}</a>
          </div>
        )}
      </header>

      <main id="main" className="relative z-10">

        {/* =======================================================
           HERO SECTION
           ======================================================= */}
        <section id="hero" className="py-24 lg:py-32 relative overflow-hidden border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-200/50 dark:bg-purple-900/40 border border-purple-300/50 dark:border-purple-700/55 text-xs font-semibold text-purple-900 dark:text-purple-200 mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-purple-950 dark:text-white leading-[1.08] mb-6">
                Esse Chaouch
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-purple-700 dark:text-purple-300 mt-3 italic">
                  {t('hero.title')}
                </span>
              </h1>

              <p className="text-lg text-purple-900/80 dark:text-purple-200/85 leading-relaxed max-w-2xl mb-10">
                {t('hero.sub')}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a 
                  href="#projects" 
                  className="px-7 py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
                >
                  <span>{t('hero.btnProjects')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href="https://docs.google.com/document/d/165RlJprNtPwHrrq8D-zE3S7PCoWAPuWh/edit?usp=drivesdk&ouid=114899326173397345324&rtpof=true&sd=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl ethereal-card text-purple-950 dark:text-purple-100 font-semibold text-sm tracking-wide hover:border-purple-500 transition-all flex items-center gap-2.5 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{t('hero.btnCV')}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-purple-200/40 dark:border-purple-900/40 w-full text-sm font-semibold text-purple-900/80 dark:text-purple-300">
                <a href="https://www.linkedin.com/in/esse-chaouch?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-200 transition-colors">
                  <Linkedin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/essech7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-200 transition-colors">
                  <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>GitHub</span>
                </a>
                <a href="mailto:assosach@gmail.com" className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-200 transition-colors">
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>assosach@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden ethereal-card p-3 shadow-2xl group">
                <div className="absolute inset-3 rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-300 to-indigo-200 dark:from-purple-950 dark:to-indigo-900">
                  <img
                    src="https://drive.google.com/thumbnail?id=1JwM07uIl_uwj1-ZDptx1zO_W5-faTNrl&sz=w1200"
                    alt="Portrait of Esse Chaouch"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs font-bold uppercase tracking-widest bg-purple-600/80 backdrop-blur-md px-3 py-1 rounded-full">
                      {t('hero.mediaTag')}
                    </span>
                    <p className="text-lg font-serif font-medium mt-2">{t('hero.mediaCap')}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-purple-900/60 dark:text-purple-300/60 mt-4 tracking-wide font-medium">
                {t('hero.mediaNote')}
              </p>
            </div>

          </div>
        </section>

        {/* =======================================================
           ABOUT SECTION
           ======================================================= */}
        <section id="about" className="py-28 relative border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>01</span>
                <span>/</span>
                <span>{t('about.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white mb-6">
                {t('about.heading')}
              </h2>
              <p className="text-base sm:text-lg text-purple-900/80 dark:text-purple-200/85 leading-relaxed">
                {t('about.p')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-800 dark:text-purple-200 mb-6">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-purple-950 dark:text-white mb-4">
                  {t('about.f1.t')}
                </h3>
                <ul className="space-y-3 text-sm text-purple-900/80 dark:text-purple-200/80">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f1.a')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f1.b')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f1.c')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f1.d')}</span>
                  </li>
                </ul>
              </div>

              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-800 dark:text-purple-200 mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-purple-950 dark:text-white mb-4">
                  {t('about.f2.t')}
                </h3>
                <ul className="space-y-3 text-sm text-purple-900/80 dark:text-purple-200/80">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f2.a')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f2.b')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f2.c')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f2.d')}</span>
                  </li>
                </ul>
              </div>

              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-800 dark:text-purple-200 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-purple-950 dark:text-white mb-4">
                  {t('about.f3.t')}
                </h3>
                <ul className="space-y-3 text-sm text-purple-900/80 dark:text-purple-200/80">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f3.a')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f3.b')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f3.c')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 shrink-0" />
                    <span>{t('about.f3.d')}</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================
           EXPERIENCE SECTION
           ======================================================= */}
        <section id="experience" className="py-28 relative bg-purple-50/50 dark:bg-[#180E30]/50 border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>02</span>
                <span>/</span>
                <span>{t('exp.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                {t('exp.heading')}
              </h2>
              <p className="text-base text-purple-900/80 dark:text-purple-200/80">
                {t('exp.sub')}
              </p>
            </div>

            <div className="space-y-8">
              
              {/* Exp 1 */}
              <div className="ethereal-card p-8 sm:p-10 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    {t('exp.e1.date')}
                  </span>
                  <h4 className="text-lg font-bold text-purple-950 dark:text-white">
                    {t('exp.e1.org')}
                  </h4>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-2xl font-serif font-normal text-purple-950 dark:text-white mb-6">
                    {t('exp.e1.role')}
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-purple-900/80 dark:text-purple-200/85">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e1.b1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e1.b2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e1.b3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e1.b4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e1.b5')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e1.b6')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="ethereal-card p-8 sm:p-10 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    {t('exp.e2.date')}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-purple-950 dark:text-white">
                      {t('exp.e2.org')}
                    </h4>
                    <a href="https://www.instagram.com/by.loopi/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                      @by.loopi
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-2xl font-serif font-normal text-purple-950 dark:text-white mb-6">
                    {t('exp.e2.role')}
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-purple-900/80 dark:text-purple-200/85">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e2.b1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e2.b2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e2.b3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e2.b4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e2.b5')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Exp 3 */}
              <div className="ethereal-card p-8 sm:p-10 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    {t('exp.e3.date')}
                  </span>
                  <h4 className="text-lg font-bold text-purple-950 dark:text-white">
                    {t('exp.e3.org')}
                  </h4>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-2xl font-serif font-normal text-purple-950 dark:text-white mb-6">
                    {t('exp.e3.role')}
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-purple-900/80 dark:text-purple-200/85">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b5')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b6')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span>{t('exp.e3.b7')}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================
           SKILLS SECTION
           ======================================================= */}
        <section id="skills" className="py-28 relative border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>03</span>
                <span>/</span>
                <span>{t('skills.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                {t('skills.heading')}
              </h2>
              <p className="text-base text-purple-900/80 dark:text-purple-200/80">
                {t('skills.sub')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">A /</span>
                  <h3 className="text-xl font-bold text-purple-950 dark:text-white">{t('skills.c1')}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Python', 'Java', 'C#'].map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-sm font-semibold text-purple-900 dark:text-purple-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">B /</span>
                  <h3 className="text-xl font-bold text-purple-950 dark:text-white">{t('skills.c2')}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['Canva', 'Google Workspace', 'Microsoft Office Suite', 'Trello', 'Asana'].map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-sm font-semibold text-purple-900 dark:text-purple-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">C /</span>
                  <h3 className="text-xl font-bold text-purple-950 dark:text-white">{t('skills.c3')}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['Google Analytics', 'Google Search Console', t('skills.c3a'), t('skills.c3b')].map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-sm font-semibold text-purple-900 dark:text-purple-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ethereal-card p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">D /</span>
                  <h3 className="text-xl font-bold text-purple-950 dark:text-white">{t('skills.c4')}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[t('skills.c4a'), t('skills.c4b'), t('skills.c4c'), t('skills.c4d'), t('skills.c4e')].map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-sm font-semibold text-purple-900 dark:text-purple-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================
           PROJECTS SECTION
           ======================================================= */}
        <section id="projects" className="py-28 relative bg-purple-50/50 dark:bg-[#180E30]/50 border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>04</span>
                <span>/</span>
                <span>{t('projects.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                {t('projects.heading')}
              </h2>
              <p className="text-base text-purple-900/80 dark:text-purple-200/80">
                {t('projects.sub')}
              </p>
            </div>

            <div className="space-y-12">
              
              {/* Project 1 */}
              <div className="ethereal-card p-8 sm:p-12 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden bg-purple-200/50 dark:bg-purple-950/50 relative border border-purple-300/40 dark:border-purple-800/40">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-200/90 text-purple-950 font-bold text-xs uppercase tracking-wider">
                    {t('projects.mediaTag')}
                  </div>
                  <svg viewBox="0 0 1000 800" className="w-full h-full object-cover opacity-85" aria-hidden="true">
                    <rect width="1000" height="800" fill="#E2D9FF"/>
                    <g stroke="#5B21B6" strokeWidth={1.5} opacity=".25">
                      <line x1="0" y1="200" x2="1000" y2="200"/>
                      <line x1="0" y1="400" x2="1000" y2="400"/>
                      <line x1="0" y1="600" x2="1000" y2="600"/>
                      <line x1="250" y1="0" x2="250" y2="800"/>
                      <line x1="500" y1="0" x2="500" y2="800"/>
                      <line x1="750" y1="0" x2="750" y2="800"/>
                    </g>
                    <rect x="150" y="200" width="700" height="400" fill="#8B3EE4" opacity=".25" rx="12"/>
                    <rect x="200" y="260" width="600" height="70" fill="#5B21B6" opacity=".35" rx="8"/>
                  </svg>
                </div>

                <div className="lg:col-span-6 flex flex-col items-start">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">01 /</span>
                  <h3 className="text-3xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                    {t('projects.p1.title')}
                  </h3>
                  <p className="text-purple-900/80 dark:text-purple-200/85 leading-relaxed mb-4 text-sm sm:text-base">
                    {t('projects.p1.desc')}
                  </p>
                  <blockquote className="border-s-2 border-amber-300 ps-4 text-xs sm:text-sm text-purple-900/70 dark:text-purple-300/80 italic mb-6">
                    {t('projects.p1.note')}
                  </blockquote>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">{t('projects.p1.t1')}</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">{t('projects.p1.t2')}</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">UI/UX</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">{t('projects.p1.t3')}</span>
                  </div>
                  <a 
                    href="https://a-zedinfo.tn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all"
                  >
                    <span>{t('projects.visit')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="ethereal-card p-8 sm:p-12 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden bg-purple-200/50 dark:bg-purple-950/50 relative border border-purple-300/40 dark:border-purple-800/40 order-1 lg:order-2">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-200/90 text-purple-950 font-bold text-xs uppercase tracking-wider">
                    {t('projects.mediaTag')}
                  </div>
                  <svg viewBox="0 0 1000 800" className="w-full h-full object-cover opacity-85" aria-hidden="true">
                    <rect width="1000" height="800" fill="#E2D9FF"/>
                    <circle cx="500" cy="400" r="240" fill="#8B3EE4" opacity=".25"/>
                    <circle cx="500" cy="400" r="120" fill="#5B21B6" opacity=".35"/>
                  </svg>
                </div>

                <div className="lg:col-span-6 flex flex-col items-start order-2 lg:order-1">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">02 /</span>
                  <h3 className="text-3xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                    Aether
                  </h3>
                  <p className="text-purple-900/80 dark:text-purple-200/85 leading-relaxed mb-6 text-sm sm:text-base">
                    {t('projects.p2.desc')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">GitHub</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">{t('projects.p2.t1')}</span>
                  </div>
                  <a 
                    href="https://github.com/essech7/Aether" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl ethereal-card text-purple-950 dark:text-purple-100 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-purple-500 transition-all shadow-sm"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="ethereal-card p-8 sm:p-12 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden bg-purple-200/50 dark:bg-purple-950/50 relative border border-purple-300/40 dark:border-purple-800/40">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-200/90 text-purple-950 font-bold text-xs uppercase tracking-wider">
                    {t('projects.mediaTag')}
                  </div>
                  <svg viewBox="0 0 1000 800" className="w-full h-full object-cover opacity-85" aria-hidden="true">
                    <rect width="1000" height="800" fill="#E2D9FF"/>
                    <rect x="200" y="200" width="150" height="400" fill="#8B3EE4" opacity=".3" rx="8"/>
                    <rect x="425" y="150" width="150" height="450" fill="#8B3EE4" opacity=".45" rx="8"/>
                    <rect x="650" y="280" width="150" height="320" fill="#5B21B6" opacity=".35" rx="8"/>
                  </svg>
                </div>

                <div className="lg:col-span-6 flex flex-col items-start">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">03 /</span>
                  <h3 className="text-3xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                    Habit Tracker
                  </h3>
                  <p className="text-purple-900/80 dark:text-purple-200/85 leading-relaxed mb-6 text-sm sm:text-base">
                    {t('projects.p3.desc')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">GitHub</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-xs font-semibold text-purple-900 dark:text-purple-200">{t('projects.p3.t1')}</span>
                  </div>
                  <a 
                    href="https://github.com/essech7/Habit-Tracker" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl ethereal-card text-purple-950 dark:text-purple-100 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-purple-500 transition-all shadow-sm"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================
           EDUCATION SECTION
           ======================================================= */}
        <section id="education" className="py-28 relative border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>05</span>
                <span>/</span>
                <span>{t('edu.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white">
                {t('edu.heading')}
              </h2>
            </div>

            <div className="space-y-6">
              
              <div className="ethereal-card p-8 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3 text-purple-700 dark:text-purple-300 font-serif font-bold text-lg">
                  2024 — 2026
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-2xl font-serif font-normal text-purple-950 dark:text-white mb-2">
                    {t('edu.d1.t')}
                  </h3>
                  <div className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-4">
                    {t('edu.d1.m')}
                  </div>
                  <p className="text-purple-900/80 dark:text-purple-200/85 leading-relaxed">
                    {t('edu.d1.p')}
                  </p>
                </div>
              </div>

              <div className="ethereal-card p-8 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3 text-purple-700 dark:text-purple-300 font-serif font-bold text-lg">
                  2023 — 2024
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-2xl font-serif font-normal text-purple-950 dark:text-white mb-2">
                    {t('edu.d2.t')}
                  </h3>
                  <div className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-4">
                    {t('edu.d2.m')}
                  </div>
                  <p className="text-purple-900/80 dark:text-purple-200/85 leading-relaxed">
                    {t('edu.d2.p')}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================
           CERTIFICATIONS SECTION
           ======================================================= */}
        <section id="certifications" className="py-28 relative bg-purple-50/50 dark:bg-[#180E30]/50 border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>06</span>
                <span>/</span>
                <span>{t('certs.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                {t('certs.heading')}
              </h2>
              <p className="text-base text-purple-900/80 dark:text-purple-200/80">
                {t('certs.sub')}
              </p>
            </div>

            <div className="ethereal-card p-10 sm:p-12 rounded-3xl shadow-lg bg-gradient-to-tr from-purple-700 to-purple-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-purple-500/30">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
                  {t('certs.boxTitle')}
                </h3>
                <p className="text-purple-200 max-w-xl text-sm sm:text-base leading-relaxed">
                  {t('certs.p')}
                </p>
              </div>
              <a 
                href="https://drive.google.com/drive/folders/1vqDzCV43iCFJcMy21uXxHurw8ewZIAE9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-amber-200 hover:bg-amber-100 text-purple-950 font-bold text-xs uppercase tracking-widest shadow-xl transition-all transform hover:-translate-y-0.5 shrink-0 flex items-center gap-2"
              >
                <span>{t('certs.btn')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

        {/* =======================================================
           LANGUAGES SECTION
           ======================================================= */}
        <section id="languages" className="py-28 relative border-b border-purple-200/30 dark:border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>07</span>
                <span>/</span>
                <span>{t('langs.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white">
                {t('langs.heading')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="ethereal-card p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest">{t('langs.ar')}</span>
                <span className="text-lg font-serif font-semibold text-purple-950 dark:text-white">{t('langs.arLvl')}</span>
              </div>

              <div className="ethereal-card p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest">{t('langs.fr')}</span>
                <span className="text-lg font-serif font-semibold text-purple-950 dark:text-white">{t('langs.frLvl')}</span>
              </div>

              <div className="ethereal-card p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest">{t('langs.en')}</span>
                <span className="text-lg font-serif font-semibold text-purple-950 dark:text-white">{t('langs.enLvl')}</span>
              </div>

              <div className="ethereal-card p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest">{t('langs.es')}</span>
                <span className="text-lg font-serif font-semibold text-purple-950 dark:text-white">{t('langs.esLvl')}</span>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================
           CONTACT SECTION
           ======================================================= */}
        <section id="contact" className="py-28 relative bg-purple-50/50 dark:bg-[#180E30]/50">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-4">
                <span>08</span>
                <span>/</span>
                <span>{t('contact.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-purple-950 dark:text-white mb-4">
                {t('contact.heading')}
              </h2>
              <p className="text-base text-purple-900/80 dark:text-purple-200/80">
                {t('contact.sub')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-5 space-y-4">
                <a href="mailto:assosach@gmail.com" className="ethereal-card p-6 rounded-2xl flex items-center gap-4 group hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1">{t('contact.emailLbl')}</span>
                    <span className="text-sm font-semibold text-purple-950 dark:text-white">assosach@gmail.com</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/esse-chaouch?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="ethereal-card p-6 rounded-2xl flex items-center gap-4 group hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1">LinkedIn</span>
                    <span className="text-sm font-semibold text-purple-950 dark:text-white">in/esse-chaouch</span>
                  </div>
                </a>

                <a href="https://github.com/essech7" target="_blank" rel="noopener noreferrer" className="ethereal-card p-6 rounded-2xl flex items-center gap-4 group hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1">GitHub</span>
                    <span className="text-sm font-semibold text-purple-950 dark:text-white">github.com/essech7</span>
                  </div>
                </a>

                <a href="https://docs.google.com/document/d/165RlJprNtPwHrrq8D-zE3S7PCoWAPuWh/edit?usp=drivesdk&ouid=114899326173397345324&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="ethereal-card p-6 rounded-2xl flex items-center gap-4 group hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-200/70 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1">{t('contact.cvLbl')}</span>
                    <span className="text-sm font-semibold text-purple-950 dark:text-white">{t('contact.cvVal')}</span>
                  </div>
                </a>
              </div>

              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="ethereal-card p-8 sm:p-10 rounded-3xl shadow-sm space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
                      {t('form.name')}
                    </label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-purple-300 dark:border-purple-700 py-3 text-purple-950 dark:text-white focus:outline-none focus:border-purple-600 transition-colors text-base"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
                      {t('form.email')}
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-purple-300 dark:border-purple-700 py-3 text-purple-950 dark:text-white focus:outline-none focus:border-purple-600 transition-colors text-base"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
                      {t('form.subject')}
                    </label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border-b border-purple-300 dark:border-purple-700 py-3 text-purple-950 dark:text-white focus:outline-none focus:border-purple-600 transition-colors text-base"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
                      {t('form.message')}
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-purple-300 dark:border-purple-700 py-3 text-purple-950 dark:text-white focus:outline-none focus:border-purple-600 transition-colors text-base resize-none"
                      required 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs uppercase tracking-widest shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t('form.send')}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-purple-900/60 dark:text-purple-300/60 leading-relaxed">
                    {t('form.note')}
                  </p>

                  {formStatus && (
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300" role="status">
                      {formStatus}
                    </p>
                  )}
                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* =======================================================
         FOOTER
         ======================================================= */}
      <footer className="bg-purple-950 text-purple-100 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-purple-800/60">
            <div>
              <div className="font-serif text-2xl font-bold mb-3">Esse Chaouch</div>
              <p className="text-purple-300/80 text-sm max-w-md">{t('footer.tag')}</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-semibold">
              <a href="#about" className="text-purple-300 hover:text-white transition-colors">{t('nav.about')}</a>
              <a href="#experience" className="text-purple-300 hover:text-white transition-colors">{t('nav.experience')}</a>
              <a href="#projects" className="text-purple-300 hover:text-white transition-colors">{t('nav.projects')}</a>
              <a href="#contact" className="text-purple-300 hover:text-white transition-colors">{t('nav.contact')}</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-purple-400 tracking-wider">
            <span>{t('footer.copy')}</span>
            <span>{t('footer.loc')}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
