const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const SECTION_ITEMS = [
  { key: 'summary', label: 'Professional Summary' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
]

const getDefaultSectionVisibility = () =>
  SECTION_ITEMS.reduce((acc, section) => {
    acc[section.key] = true
    return acc
  }, {})

const getDefaultSectionOrder = () => SECTION_ITEMS.map((section) => section.key)

const TEMPLATE_LIBRARY = {
  engineering: {
    label: 'Engineering',
    tagline: 'Entry-level B.Tech format with practical sections',
    bestFor: 'B.Tech graduates, freshers, software and core roles',
    strengths: [
      'Career objective positioning for early career hiring',
      'Structured technical skill buckets',
      'Projects and internship contributions highlighted',
    ],
    reviewerLens: 'Fundamentals, learning agility, and project execution',
    interviewSignal: 'Strong for campus and early-career shortlisting',
    recommendedColor: '#0f766e',
    recommendedFont: 'sans',
    recommendedDensity: 'compact',
    profile: {
      personal: {
        fullName: 'Your Full Name',
        role: 'B.Tech Computer Science Engineering Graduate',
        email: 'your.email@example.com',
        phone: '+91 98765 43210',
        location: 'Pune, Maharashtra',
        website: '',
        linkedin: 'linkedin.com/in/yourprofile',
        github: 'github.com/yourhandle',
        summary:
          'Motivated and detail-oriented B.Tech graduate in Computer Science Engineering seeking an entry-level Software Development role where I can apply technical skills and contribute to organizational growth.',
      },
      experience: [],
      education: [
        {
          degree: 'Bachelor of Technology (B.Tech) - Computer Science Engineering',
          institution: 'ABC Institute of Technology, XYZ University',
          start: '2021',
          end: '2025',
          description: 'Year of Graduation: 2025 | CGPA: 8.41',
        },
        {
          degree: 'Class XII (CBSE)',
          institution: 'City Senior Secondary School',
          start: '2021',
          end: '2021',
          description: 'Percentage: 89%',
        },
        {
          degree: 'Class X (CBSE)',
          institution: 'City Public School',
          start: '2019',
          end: '2019',
          description: 'Percentage: 92%',
        },
      ],
      skills: [
        { name: 'C++', level: 'Advanced' },
        { name: 'Java', level: 'Advanced' },
        { name: 'Python', level: 'Advanced' },
        { name: 'HTML/CSS/JavaScript', level: 'Advanced' },
      ],
      skillGroups: [
        { title: 'Programming Languages', items: 'C, C++, Java, Python' },
        { title: 'Web Technologies', items: 'HTML, CSS, JavaScript, React' },
        { title: 'Tools and Platforms', items: 'Git, VS Code, Linux, Postman' },
        { title: 'Database', items: 'MySQL, MongoDB' },
        { title: 'Core Subjects', items: 'Data Structures, DBMS, OS, CN' },
      ],
      projects: [
        {
          name: 'Smart Campus Navigation App',
          link: '',
          description:
            'Developed an app to help students navigate campus buildings and labs with shortest-path routing.',
          technologies: 'React, Node.js, MongoDB',
          contribution:
            'Implemented routing logic, backend APIs, and responsive UI screens for map-based search.',
          achievement: '',
        },
        {
          name: 'Placement Analytics Dashboard',
          link: '',
          description:
            'Built a dashboard to analyze placement trends, skill demand, and branch-wise outcomes.',
          technologies: 'Python, Pandas, Power BI',
          contribution: '',
          achievement: 'Reduced manual reporting effort by 60% for the placement cell.',
        },
      ],
      internships: [
        {
          title: 'Software Developer Intern',
          organization: 'TechNova Solutions',
          duration: 'Jan 2025 - Mar 2025',
          description:
            'Worked on bug fixing, API integration, and test automation for an internal HR platform.',
          achievements: 'Improved release test coverage and shortened QA cycle by one sprint.',
        },
      ],
      certifications: [
        { name: 'Data Structures and Algorithms', issuer: 'NPTEL', year: '2024' },
        { name: 'React Fundamentals', issuer: 'Coursera', year: '2024' },
      ],
      achievements: [
        {
          title: 'Hackathon Finalist',
          details: 'Reached top 10 among 500+ teams in National Student Hackfest 2024.',
        },
      ],
      extracurricular: [
        {
          title: 'Coding Club Coordinator',
          details: 'Organized weekly problem-solving sessions and peer mentoring.',
        },
      ],
      memberships: [],
      research: [],
      personalDetails: [
        { title: 'Date of Birth', details: '12 August 2003' },
        { title: 'Languages Known', details: 'English, Hindi, Marathi' },
        { title: 'Hobbies', details: 'Problem solving, cricket, and blogging' },
      ],
    },
  },
  medical: {
    label: 'Medical',
    tagline: 'Clinical-first format with licenses and patient care impact',
    bestFor: 'MBBS/MD/MS/BDS doctors and hospital roles',
    strengths: [
      'Medical registration and certifications highlighted',
      'Clinical experience with patient volume and procedures',
      'Research and memberships sections included',
    ],
    reviewerLens: 'Patient outcomes, procedural confidence, and compliance',
    interviewSignal: 'Strong for hospital and specialty panel review',
    recommendedColor: '#155e75',
    recommendedFont: 'serif',
    recommendedDensity: 'balanced',
    profile: {
      personal: {
        fullName: 'Dr. Your Full Name, MBBS',
        role: 'General Physician',
        email: 'doctor.email@example.com',
        phone: '+91 98765 12345',
        location: 'Mumbai, Maharashtra',
        website: '',
        linkedin: 'linkedin.com/in/doctorprofile',
        github: '',
        medicalRegistrationNumber: 'MMC-2025-123456',
        summary:
          'Compassionate and dedicated medical professional with 5 years of clinical experience in diagnosing and treating patients. Skilled in patient management, emergency care, and clinical procedures.',
      },
      experience: [
        {
          role: 'Resident Doctor',
          company: 'City Care Hospital',
          start: '2022',
          end: 'Present',
          description:
            'Diagnosed and treated 50+ OPD patients daily, assisted in emergency procedures, and managed IPD follow-up workflows.',
        },
        {
          role: 'Junior Doctor',
          company: 'Sunrise Multispeciality Hospital',
          start: '2020',
          end: '2022',
          description:
            'Supported ICU rounds, coordinated with specialists, and improved discharge counseling documentation standards.',
        },
      ],
      education: [
        {
          degree: 'MD in Internal Medicine',
          institution: 'ABC Medical College - XYZ University',
          start: '2019',
          end: '2022',
          description: '',
        },
        {
          degree: 'MBBS',
          institution: 'ABC Medical College - XYZ University',
          start: '2013',
          end: '2019',
          description: '',
        },
      ],
      skills: [
        { name: 'Patient Diagnosis', level: 'Expert' },
        { name: 'Emergency Response', level: 'Advanced' },
        { name: 'Clinical Documentation', level: 'Advanced' },
      ],
      skillGroups: [
        { title: 'Clinical Competencies', items: 'Diagnosis, treatment planning, patient counseling' },
        { title: 'Procedures', items: 'Central line assistance, intubation support, ABG sampling' },
        { title: 'Emergency Care', items: 'Code response, trauma triage, stabilization' },
        { title: 'Systems', items: 'EMR, case documentation, follow-up protocols' },
      ],
      projects: [],
      internships: [
        {
          title: 'MBBS Internship',
          organization: 'Government General Hospital',
          duration: 'Jul 2018 - Jun 2019',
          description:
            'Rotations in Medicine, Surgery, Pediatrics, and OBG with direct patient examination and case documentation.',
          achievements: 'Handled emergency admissions under supervision during night postings.',
        },
      ],
      certifications: [
        {
          name: 'State Medical Council Registration',
          issuer: 'Maharashtra Medical Council',
          year: '2020',
        },
        { name: 'ACLS Certification', issuer: 'AHA', year: '2025' },
        { name: 'BLS Certification', issuer: 'AHA', year: '2025' },
      ],
      achievements: [
        {
          title: 'Hospital Quality Initiative Award',
          details: 'Recognized for contribution to sepsis response optimization project.',
        },
      ],
      extracurricular: [
        {
          title: 'Medical Camp Volunteer',
          details: 'Participated in rural health outreach camps for preventive screening.',
        },
      ],
      memberships: [
        { title: 'Indian Medical Association (IMA)', details: 'Active member' },
      ],
      research: [
        {
          title: 'Clinical Outcome Analysis in Hypertensive Patients',
          source: 'Journal of Community Health',
          year: '2024',
          details: 'Co-authored retrospective study on treatment adherence and outcomes.',
        },
      ],
      personalDetails: [
        { title: 'Languages Known', details: 'English, Hindi, Marathi' },
        { title: 'Availability', details: 'Immediate joining' },
      ],
    },
  },
  academic: {
    label: 'Academic',
    tagline: 'Research-first structure for scholarly profiles',
    bestFor: 'Faculty, Researchers, Postdocs, PhD Candidates',
    strengths: [
      'Publication and research clarity',
      'Teaching and grant-friendly flow',
      'Long-form readable spacing',
    ],
    reviewerLens: 'Research contribution and teaching record',
    interviewSignal: 'Strong for committee and faculty panel evaluation',
    recommendedColor: '#4338ca',
    recommendedFont: 'serif',
    recommendedDensity: 'balanced',
    profile: {
      personal: {
        fullName: 'Prof. Daniel Ortiz',
        role: 'Assistant Professor, Computational Biology',
        email: 'd.ortiz@university.edu',
        phone: '+1 (206) 555-4417',
        location: 'Seattle, WA',
        website: 'danielortizlab.org',
        linkedin: '',
        github: '',
        summary:
          'Computational biologist focused on multi-omics modeling and translational bioinformatics. Published 24 peer-reviewed papers and mentored interdisciplinary graduate teams.',
      },
      experience: [
        {
          role: 'Assistant Professor',
          company: 'Northwest State University',
          start: '2021',
          end: 'Present',
          description:
            'Leads lab of 8 researchers and taught graduate courses in statistical genomics and reproducible research pipelines.',
        },
      ],
      education: [
        {
          degree: 'PhD, Bioinformatics',
          institution: 'University of Michigan',
          start: '2013',
          end: '2018',
          description: 'Dissertation on interpretable machine learning for genomic signatures.',
        },
      ],
      skills: [
        { name: 'R / Bioconductor', level: 'Expert' },
        { name: 'Python', level: 'Expert' },
      ],
      skillGroups: [],
      projects: [
        {
          name: 'Single-Cell Atlas for Immunotherapy Response',
          link: 'https://example.edu/single-cell-atlas',
          description:
            'Coordinated cross-institution dataset integration and analysis workflows to identify predictive biomarkers.',
          technologies: '',
          contribution: '',
          achievement: '',
        },
      ],
      internships: [],
      certifications: [
        { name: 'Responsible Conduct of Research', issuer: 'CITI Program', year: '2024' },
      ],
      achievements: [],
      extracurricular: [],
      memberships: [],
      research: [],
      personalDetails: [],
    },
  },
  creative: {
    label: 'Creative',
    tagline: 'Portfolio-forward storytelling layout',
    bestFor: 'Brand, UI, Motion, Creative Direction',
    strengths: [
      'Visual hierarchy with personality',
      'Project-led narrative',
      'Client-impact storytelling',
    ],
    reviewerLens: 'Creative range and execution quality',
    interviewSignal: 'Strong for portfolio and studio interviews',
    recommendedColor: '#be123c',
    recommendedFont: 'sans',
    recommendedDensity: 'balanced',
    profile: {
      personal: {
        fullName: 'Maya Thompson',
        role: 'Brand and Motion Designer',
        email: 'maya@visualcraft.studio',
        phone: '+1 (310) 555-9071',
        location: 'Los Angeles, CA',
        website: 'mayathompson.studio',
        linkedin: '',
        github: '',
        summary:
          'Multidisciplinary designer combining brand strategy, motion, and digital storytelling for global campaigns and product launches.',
      },
      experience: [
        {
          role: 'Senior Brand Designer',
          company: 'Orbit Creative Studio',
          start: '2021',
          end: 'Present',
          description:
            'Directed visual identity systems for 12 product launches, raising campaign engagement rates by up to 42%.',
        },
      ],
      education: [
        {
          degree: 'BFA, Communication Design',
          institution: 'Parsons School of Design',
          start: '2014',
          end: '2018',
          description: 'Focus in visual systems and motion language.',
        },
      ],
      skills: [
        { name: 'Brand Identity', level: 'Expert' },
        { name: 'After Effects', level: 'Expert' },
      ],
      skillGroups: [],
      projects: [
        {
          name: 'Luma Streaming Rebrand',
          link: 'https://example.design/luma',
          description:
            'Designed cross-platform identity toolkit and launch motion package used in TV, social, and product UI.',
          technologies: '',
          contribution: '',
          achievement: '',
        },
      ],
      internships: [],
      certifications: [
        { name: 'Advanced Motion Design', issuer: 'School of Motion', year: '2023' },
      ],
      achievements: [],
      extracurricular: [],
      memberships: [],
      research: [],
      personalDetails: [],
    },
  },
  corporate: {
    label: 'Corporate',
    tagline: 'Business-focused format with outcomes and leadership',
    bestFor: 'Operations, Finance, HR, Marketing, and strategy roles',
    strengths: [
      'Work experience with quantifiable business impact',
      'Separate internship and leadership emphasis',
      'Skill framework for technical + soft competencies',
    ],
    reviewerLens: 'Decision quality, communication, and measurable impact',
    interviewSignal: 'Strong for analyst to manager-level hiring',
    recommendedColor: '#1d4ed8',
    recommendedFont: 'sans',
    recommendedDensity: 'compact',
    profile: {
      personal: {
        fullName: 'Your Full Name',
        role: 'Business Operations Analyst',
        email: 'your.email@corporate.com',
        phone: '+91 98765 67890',
        location: 'Bengaluru, Karnataka',
        website: '',
        linkedin: 'linkedin.com/in/yourprofile',
        github: '',
        summary:
          'Results-driven and detail-oriented professional with 3 years of experience in Business Operations. Skilled in problem-solving, communication, and data-driven decision-making.',
      },
      experience: [
        {
          role: 'Operations Analyst',
          company: 'GrowthEdge Solutions',
          start: '2022',
          end: 'Present',
          description:
            'Improved monthly reporting accuracy by 22%, coordinated cross-functional execution, and automated KPI dashboards for leadership.',
        },
      ],
      education: [
        {
          degree: 'MBA - Operations and Analytics',
          institution: 'ABC School of Business',
          start: '2020',
          end: '2022',
          description: 'CGPA: 8.6 | Relevant coursework: Finance, Marketing, Data Analytics',
        },
      ],
      skills: [
        { name: 'MS Excel', level: 'Expert' },
        { name: 'Power BI', level: 'Advanced' },
        { name: 'SQL', level: 'Advanced' },
      ],
      skillGroups: [
        { title: 'Technical Skills', items: 'MS Excel, Power BI, SQL, CRM Tools' },
        { title: 'Soft Skills', items: 'Communication, Leadership, Time Management, Teamwork' },
        { title: 'Languages', items: 'English, Hindi' },
      ],
      projects: [],
      internships: [
        {
          title: 'Business Analyst Intern',
          organization: 'ScaleUp Consulting',
          duration: 'May 2021 - Jul 2021',
          description:
            'Conducted market research, prepared financial comparison models, and assisted strategy presentations.',
          achievements: 'Contributed insights used in two client growth roadmaps.',
        },
      ],
      certifications: [
        { name: 'Business Analytics', issuer: 'Coursera', year: '2024' },
        { name: 'Advanced Excel', issuer: 'Udemy', year: '2023' },
      ],
      achievements: [
        {
          title: 'Employee of the Quarter',
          details: 'Recognized for improving process efficiency in Q2 planning cycle.',
        },
      ],
      extracurricular: [
        {
          title: 'Event Coordinator, Management Club',
          details: 'Led cross-campus case study events and speaker sessions.',
        },
      ],
      memberships: [],
      research: [],
      personalDetails: [],
    },
  },
}

export const TEMPLATE_OPTIONS = Object.entries(TEMPLATE_LIBRARY).map(([value, config]) => ({
  value,
  label: config.label,
}))

export const TEMPLATE_DETAILS = TEMPLATE_LIBRARY

export const FONT_OPTIONS = [
  { value: 'sans', label: 'Manrope Sans' },
  { value: 'serif', label: 'IBM Plex Serif' },
  { value: 'mono', label: 'IBM Plex Mono' },
]

export const DENSITY_OPTIONS = [
  { value: 'compact', label: 'Compact' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'spacious', label: 'Spacious' },
]

export const HEADING_STYLE_OPTIONS = [
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'title', label: 'Title Case' },
]

export const DEFAULT_SETTINGS = {
  defaultTemplate: 'engineering',
  defaultThemeColor: '#0f766e',
  themeMode: 'light',
  defaultFontFamily: 'sans',
  defaultDensity: 'balanced',
  defaultHeadingStyle: 'uppercase',
  defaultShowPhoto: true,
}

const withIds = (items) =>
  items.map((item) => ({
    ...item,
    id: createId(),
  }))

const resolveTemplateKey = (templateValue) =>
  TEMPLATE_LIBRARY[templateValue] ? templateValue : 'engineering'

export const createTemplateProfile = (templateValue) => {
  const resolvedTemplate = resolveTemplateKey(templateValue)
  const template = TEMPLATE_LIBRARY[resolvedTemplate]

  return {
    template: resolvedTemplate,
    themeColor: template.recommendedColor,
    fontFamily: template.recommendedFont,
    layout: {
      density: template.recommendedDensity,
      headingStyle: 'uppercase',
      showPhoto: resolvedTemplate !== 'engineering',
    },
    personal: {
      ...template.profile.personal,
      photo: '',
    },
    experience: withIds(template.profile.experience),
    education: withIds(template.profile.education),
    skills: withIds(template.profile.skills),
    skillGroups: withIds(template.profile.skillGroups),
    projects: withIds(template.profile.projects),
    internships: withIds(template.profile.internships),
    certifications: withIds(template.profile.certifications),
    achievements: withIds(template.profile.achievements),
    extracurricular: withIds(template.profile.extracurricular),
    memberships: withIds(template.profile.memberships),
    research: withIds(template.profile.research),
    personalDetails: withIds(template.profile.personalDetails),
    sectionVisibility: getDefaultSectionVisibility(),
    sectionOrder: getDefaultSectionOrder(),
  }
}

export const getTemplateTitle = (templateValue) => {
  const resolvedTemplate = resolveTemplateKey(templateValue)
  return `${TEMPLATE_LIBRARY[resolvedTemplate].label} Resume`
}

export const createStarterResume = (title = 'Untitled Resume', settings = DEFAULT_SETTINGS) => {
  const createdAt = new Date().toISOString()
  const templateValue = resolveTemplateKey(settings.defaultTemplate)
  const profile = createTemplateProfile(templateValue)

  return {
    id: createId(),
    title,
    template: templateValue,
    themeColor: settings.defaultThemeColor || profile.themeColor,
    fontFamily: settings.defaultFontFamily || profile.fontFamily,
    layout: {
      ...profile.layout,
      density: settings.defaultDensity || profile.layout.density,
      headingStyle: settings.defaultHeadingStyle || profile.layout.headingStyle,
      showPhoto:
        typeof settings.defaultShowPhoto === 'boolean'
          ? settings.defaultShowPhoto
          : profile.layout.showPhoto,
    },
    createdAt,
    updatedAt: createdAt,
    personal: profile.personal,
    experience: profile.experience,
    education: profile.education,
    skills: profile.skills,
    skillGroups: profile.skillGroups,
    projects: profile.projects,
    internships: profile.internships,
    certifications: profile.certifications,
    achievements: profile.achievements,
    extracurricular: profile.extracurricular,
    memberships: profile.memberships,
    research: profile.research,
    personalDetails: profile.personalDetails,
    sectionVisibility: profile.sectionVisibility,
    sectionOrder: profile.sectionOrder,
  }
}

export const createExperienceItem = () => ({
  id: createId(),
  role: '',
  company: '',
  start: '',
  end: '',
  description: '',
})

export const createEducationItem = () => ({
  id: createId(),
  degree: '',
  institution: '',
  start: '',
  end: '',
  description: '',
})

export const createSkillItem = () => ({
  id: createId(),
  name: '',
  level: 'Intermediate',
})

export const createSkillGroupItem = () => ({
  id: createId(),
  title: '',
  items: '',
})

export const createProjectItem = () => ({
  id: createId(),
  name: '',
  link: '',
  description: '',
  technologies: '',
  contribution: '',
  achievement: '',
})

export const createInternshipItem = () => ({
  id: createId(),
  title: '',
  organization: '',
  duration: '',
  description: '',
  achievements: '',
})

export const createCertificationItem = () => ({
  id: createId(),
  name: '',
  issuer: '',
  year: '',
})

export const createAchievementItem = () => ({
  id: createId(),
  title: '',
  details: '',
})

export const createExtracurricularItem = () => ({
  id: createId(),
  title: '',
  details: '',
})

export const createMembershipItem = () => ({
  id: createId(),
  title: '',
  details: '',
})

export const createResearchItem = () => ({
  id: createId(),
  title: '',
  source: '',
  year: '',
  details: '',
})

export const createPersonalDetailItem = () => ({
  id: createId(),
  title: '',
  details: '',
})
