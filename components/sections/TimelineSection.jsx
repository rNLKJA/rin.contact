import React, { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const CAREER = [
  {
    year: "2026",
    org: "South Australia Police",
    orgDesc: "SA's state police force — evidence-based policing and integrity governance.",
    role: "ASO7 Senior Data Analyst",
    team: "Professional & Ethical Standards Branch",
    period: "Mar 2026 – Present",
    location: "Adelaide, SA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Coat_of_arms_of_the_South_Australia_Police.svg",
    tag: "Government · Analytics",
    summary:
      "Anchored in first-principles thinking and strategic planning, I develop analytical models and statistical frameworks that translate SAPOL's complex policing data into authoritative, decision-ready intelligence for the Ethical and Professional Standards Branch.",
    bullets: [
      "Applying first-principles thinking to break complex data challenges to their core, then rebuilding structured analytical roadmaps from the ground up.",
      "Providing expert strategic advisory to senior leadership on data and reporting proposals, driving evidence-based recommendations.",
      "Establishing core data as the single source of truth for management information, strategic planning, and parliamentary reporting.",
      "Governing end-to-end analytics solutions across IAPro and connected systems with a continuous improvement mindset.",
      "Collaborating with EPSB leadership, the Intelligence and Probity Unit, enterprise architects, and cross-organisational working groups.",
    ],
    tools: ["IAPro", "Python", "Statistical modelling"],
    current: true,
  },
  {
    year: "2025",
    org: "Consumer and Business Services (CBS), Attorney-General's Department SA",
    orgDesc: "SA government agency protecting consumers across tobacco, building work, and product safety.",
    role: "ASO4 Intelligence & Coordination Officer",
    team: "Prevention Team — Compliance & Enforcement",
    period: "Jan 2025 – Mar 2026",
    location: "Adelaide, SA",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEbZveHn7HVCQ/company-logo_200_200/company-logo_200_200/0/1630651674988/attorney_generals_logo?e=2147483647&v=beta&t=V5cMKtM1QRUW0fqwpysEvD4iHxPO5FmaPoXIJpNQs5c",
    tag: "Government · Intelligence",
    summary:
      "Using strategic thinking to design risk-based intelligence frameworks and compliance schedules — then applying statistical analysis to make those frameworks data-driven. Built Consumer and Business Services' analytics capability from scratch, turning fragmented multi-source data into dashboards and GIS maps used by Senior Management and the Minister's Office.",
    bullets: [
      "Designed risk-based intelligence frameworks and operational schedules for tobacco, building work, and product safety compliance — guided by strategic thinking rather than routine cycles.",
      "Developed repeatable SOPs and data validation frameworks so institutional intelligence is no longer trapped in spreadsheets or any individual's memory.",
      "Established data-sharing MOUs with SAPOL, ITEC, and federal agencies — the first of their kind within the team.",
      "Applied regression analysis, time series decomposition, and multivariate pattern detection to inspections data, identifying non-compliance trends earlier.",
      "Built Power BI dashboards and GIS visualisations used directly by Senior Management and the Minister's Office.",
      "Supported investigations through metadata inspection and network mapping to strengthen evidentiary confidence.",
    ],
    tools: ["Power BI", "Python", "GIS", "Time series", "Regression"],
  },
  {
    year: "2025",
    org: "University of Melbourne — Psychiatry",
    orgDesc: "World-class research university, Psychiatry dept pioneering digital mental health tools.",
    role: "RA.1 Research Assistant — MoodQ",
    team: "Psychiatry Department",
    period: "Aug 2024 – Feb 2026",
    location: "Parkville, VIC",
    logo: "https://yt3.googleusercontent.com/wD1YaCDSytQDbDcSAkR21j8IQTl9lyC6LDr3p5ZC2yGX-RzU1ayGmn6swOS_LLzMKpvyA--UJQY=s176-c-k-c0x00ffffff-no-rj-mo",
    tag: "Research · Mobile Dev",
    summary:
      "Led full-stack development of MoodQ, a mental health mobile app — migrating from Uniapp to Expo React Native, building the clinician dashboard, and managing the AWS infrastructure across 18 months before a successful handover to a professional team.",
    bullets: [
      "Migrated application from Uniapp to Expo React Native, improving performance across iOS and Android.",
      "Built clinician frontend dashboard for structured patient data management.",
      "Reduced hosting costs by ~$500/month through deliberate AWS RDS + LightSail choices.",
      "Maintained GDPR-compliant data protection and configured CI/CD pipelines.",
      "Successfully transitioned the production-ready application to a professional development team.",
    ],
    tools: ["Expo", "React Native", "AWS", "Node.js", "CI/CD"],
  },
  {
    year: "2024",
    org: "WEHI",
    orgDesc: "One of the world's leading biomedical research institutes — genomics, immunology, and disease research.",
    role: "Software Engineer Intern (Data Science)",
    team: "Bioinformatics",
    period: "Feb 2024 – Jul 2024",
    location: "Parkville, VIC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRIgIQHaq6ZhUDwJUqfFa5xZJ9Tn5f6YLBA&s",
    tag: "Bioinformatics · Open Source",
    summary:
      "Automated flow cytometry analysis pipelines using cloud and HPC, developed test infrastructure to improve research reproducibility, and contributed to the open-source celseq2 workflow toolkit.",
    bullets: [
      "Automated flow cytometry data analysis using cloud and HPC, reducing manual processing overhead.",
      "Developed test infrastructure that improved reproducibility of genomics research outcomes.",
      "Contributed to the open-source celseq2 toolkit, extending benefit to the broader scRNA-seq community.",
    ],
    tools: ["Python", "Cloud HPC", "celseq2", "Git"],
  },
  {
    year: "2023",
    org: "CSIRO",
    orgDesc: "Australia's national science agency — research at the frontier of climate, agriculture, and technology.",
    role: "Data Science Industrial Consultant",
    team: "Climate & Earth Systems",
    period: "Feb 2023 – Nov 2023",
    location: "Melbourne, VIC",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/CSIRO_Logo.svg/120px-CSIRO_Logo.svg.png?_=20210607115415",
    tag: "Climate Science · ML",
    summary:
      "Collaborated with Dr. Vassili Kitsios on climate-economic research, developing AR time series models to quantify how ENSO patterns could amplify commodity price volatility and food security-induced conflict risk.",
    bullets: [
      "Developed AutoRegressive time series models with rolling window forecasting for ENSO-commodity analysis.",
      "Delivered insights connecting climate change patterns to global food security risk.",
      "Bridged communication between University of Melbourne faculty and CSIRO research leadership.",
    ],
    tools: ["Python", "AR time series", "Rolling window", "Statistical modelling"],
  },
  {
    year: "2022",
    org: "CSL (CSL Behring)",
    orgDesc: "Global biotech leader headquartered in Melbourne — life-saving plasma-derived therapies.",
    role: "Data Analyst · Agile Leader",
    team: "Research & Development",
    period: "Feb 2022 – Jun 2022",
    location: "Melbourne, VIC",
    logo: "https://s3-symbol-logo.tradingview.com/csl--600.png",
    tag: "Biotech · Agile",
    summary:
      "Applied Python automation and unsupervised clustering (T-SNE, DBSCAN, UMAP) to HPLC laboratory data, reducing processing time and improving confidence in medical research data quality.",
    bullets: [
      "Reduced HPLC result processing time through a purpose-built Python automation script.",
      "Applied T-SNE, DBSCAN, and UMAP to identify hidden patterns in complex medical datasets.",
      "Led Agile ceremonies, supporting the team's delivery rhythm across the project lifecycle.",
    ],
    tools: ["Python", "Scikit-learn", "T-SNE", "DBSCAN", "UMAP"],
  },
];

const UNIMELB_LOGO = "https://yt3.googleusercontent.com/wD1YaCDSytQDbDcSAkR21j8IQTl9lyC6LDr3p5ZC2yGX-RzU1ayGmn6swOS_LLzMKpvyA--UJQY=s176-c-k-c0x00ffffff-no-rj-mo";
const TRINITY_LOGO = "https://media.licdn.com/dms/image/v2/C560BAQHbsXv7y0802A/company-logo_200_200/company-logo_200_200/0/1630627937392/trinityunimelb_logo?e=2147483647&v=beta&t=L-l1ISC0casA8uKqb1QYyFZWMyfe9n8A_tuT_MyOG_c";

const EDUCATION = [
  {
    year: "2023–2024",
    org: "University of Melbourne",
    orgDesc: "One of Australia's leading research universities, consistently ranked among the world's top 50.",
    role: "Master of Data Science",
    period: "Feb 2023 – Jul 2024",
    location: "Parkville, VIC",
    logo: UNIMELB_LOGO,
    tag: "Postgraduate · AQF Level 9",
    summary:
      "A rigorous programme spanning statistical learning, cloud computing, Bayesian methods, and applied data science, culminating in a year-long capstone research project with CSIRO. WAM: 74.833.",
    noBorder: true,
    bullets: [
      "Statistics: Statistical Machine Learning (H3) · Statistical Modelling for Data Science (H2B) · Bayesian Statistical Learning (H3) · Multivariate Statistics for Data Science (H1) · Computational Statistics & Data Science",
      "Computing: Advanced Database Systems (H2A) · Cluster and Cloud Computing · Natural Language Processing (H2A)",
      "Capstone: Data Science Project Pt 1 & 2 (MAST90106/07) — H1, conducted in partnership with CSIRO",
      "Industry: Science & Technology Internship at CSIRO (H1) · Communicating Science at Work (H1)",
    ],
  },
  {
    year: "2019–2022",
    org: "University of Melbourne",
    orgDesc: "The same world-class institution — undergraduate programme built strong mathematical and computational foundations.",
    role: "Bachelor of Science — Data Science",
    period: "Jun 2019 – Jul 2022",
    location: "Parkville, VIC",
    logo: UNIMELB_LOGO,
    tag: "Undergraduate · AQF Level 7",
    summary:
      "Three years building mathematical, statistical, and computational foundations across data science, machine learning, algorithms, and software engineering. WAM: 71.000.",
    noBorder: true,
    bullets: [
      "Computing: Foundations of Computing · Foundations of Algorithms · Algorithms & Data Structures · Elements of Data Processing · Database Systems · Web Information Technologies · Artificial Intelligence",
      "Data Science & ML: Machine Learning (H2A) · Applied Data Science (H2A) · Modern Applied Statistics (H2B)",
      "Mathematics & Statistics: Calculus 2 · Linear Algebra · Probability · Statistics · Discrete Maths & Operations Research · Linear Statistical Models · Techniques in Operations Research",
      "Capstone: IT Project — COMP30022 (H2B), collaborative software engineering",
      "Breadth: Positive Leadership & Careers (H2B) · Business Negotiations (H2B) · Principles of Finance · Principles of Marketing",
    ],
  },
  {
    year: "2018–2019",
    org: "Trinity College, University of Melbourne",
    orgDesc: "Residential college affiliated with the University of Melbourne, providing foundation studies for international students.",
    role: "Foundation Studies Programme",
    period: "Mar 2018 – May 2019",
    location: "Parkville, VIC",
    logo: TRINITY_LOGO,
    tag: "Foundation",
    summary:
      "Completed a university pathway foundation programme, building academic English and discipline breadth in preparation for the Bachelor of Science at the University of Melbourne.",
    noBorder: true,
    bullets: [
      "Subjects: Mathematics 1 & 2 · Economics · Psychology · Drama · Literature · History · English for Academic Purposes",
    ],
  },
  {
    year: "2014–2017",
    org: "Anshun No. 2 Senior High School",
    orgDesc: "安顺市第二高级中学 — senior high school in Anshun, Guizhou, China.",
    role: "Senior High School Certificate (Gaokao)",
    period: "Sep 2014 – Jul 2017",
    location: "Anshun, Guizhou, China",
    logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExMVFRUVFx8XFxgWFxgYGxoYHh0YFyEgHyAeICggGR8lGxsaITEhJSkrLi8uFyAzODMvNyotLisBCgoKDg0OGxAQGy8lICUtLS0tLS8uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgUHAgMEAQj/xABREAACAQMCAgcEAwoLBgQHAAABAgMABBESIQUxBgcTIkFRYRRxgZEyQqEWI1JUYnKSscHSJDNTVXOClJWistEVNEOTwvBEY4PTFyWjs8Ph4v/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAA6EQACAQIEAwUGBQQCAgMAAAAAAQIDEQQSITEFQVETImFxkTJSgZKhsRQjQsHRM1Ni8BXhJENygvH/2gAMAwEAAhEDEQA/ALxoAoAoAoAoAoAoAoAoAoAoDzNAGaXAZoAzS4DNAe0AUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUBourtI1LSOqKPrMQo+Zrlzqi27JCnxTrLsotkZ5j/5a7fpNgH4ZqEqsUbqXDa9TW1l4izxHrXm/4VqqA7q0rM2Vzg7AKPAjIY4I8eVQdbojXT4TF+1L0IWbrIv2ORJGm2MJGMe/vajn41W60jVHhVBLW/qcb9OuIE59rYegSL9yo9rPqWrh+GX6fuCdOuIg59rc+hSL9ynaz6h8Pw/u/c6oesa/UgmVHx4NGuD79OD6bEc6kq0iqXC6D2TJqy615xvJao65ALIzJjPhuGGdiRuM4qSrc2jNPhMf0yt5oZeGdZ1nJgP2kJP8ouR81JA+OKsVWLMdXhteGqV/IbbO+jlXVFIkinxRgw+YqxNMxSjKLs0dNdIhQBQBQBQBQBQBQBQBQBQBQBQBQBQBQBQHBxbi8NsnaTSKi+p5nyAG5PoK42luTp051HaCuV10g6yLhk12kDJDq0ieRScnfkPog7eJPuFUyqu10j1qHDYKWWrLXoV1f8QlnbXNI0rebHPyHJfhiqJScnqexTpU6atBWJfonFakye0q0hYLFFFGCXZnYZcYG2gDn+UdvOVNRe5kxrqpLs9Obf7Eh0phCW66UijVJGiVSxmkMRZpFw5yEIbtA6qcjKAnwqdRWiZ8HPNWbbbe/RXFCs57BM9HZIEZjc2clwhG2gyKVPwIBB9fKrYJc0Y8Tml/TqJP4GvjkGp2khs5reHA2dZWAPLJZhtk+Ga5JdEdw87RyzmpS8yLB9M+h8agjU9hssUUW0rLEiJPAzuqyyd1I5SMrrjdCxZSFVpAe9jnvWhJZTyKkpdrFZrtPTTqhYuljB+9s7Lj66BGB8tmYH35+AqhnqU89u+kn4HtneSQtrikeNvwkYqfjjmPQ0i2tjlSlCorSVx66PdaMqYW6Xtl/DTCv7yPot8NNXRrPmeXX4UnrSdn0LO4LxyC6TXDIHHiOTL6MDup99aE09jxqtKdJ2mrEjmulZ7QBQBQBQBQBQBQBQBQBQBQBQHhNAIXTHrFjgJittMso2LZzGh9cfTPoPifCqp1VHY9LCcPlV709EVPxLiMtxIZJpGdz4sdh6DkFHoMCsrk5PU96nShSjaCJzgVmozGXDq7aC2vNus5XMY7PIF05YDn3AATk6ci6CsYMTUk3dK1vmtz8iN46moQ3GuR+3Vie10hg0bmMjC7AYC4HhnFQqcmasLK2anZK1tvFXObg7xLPGZ94g2ZBgtlQCcYHPOw+PlUINJ3ZZXU3TahuMskqNHbtL2UQic61YB2WHAkWNYxH2aO4Zj3QpwEyTg1e2rJs8uEZKUlG7uvr1+ApXEut2fSE1MW0ryXJJ0j0GcD0FUN3dz2YRcYqN9kiUh6VXqRiJbqVY1GFAIBA/Oxq92+3hUlUlbczvBUJSzOJoueO3MkZjkuJnQ81eRmBxvvk770c5c2ShhqUZKUYq5r4Vp1uX092GVlDAEFxE+gYOxOvBA33Fcha+oxObKsvVfcnrloXWOGHTO0jqEiDSJzGWZhGUSLSxPNWzhm5Amrnleh58Y1YScpaW5/a3UXuJpGJpBCxaIMQjNjJXz28M5wfLFUStfQ9Og5Spxctyf4J2NrA1zIbeeR0DRRPDJJoYMy5LHCJvkHnkpgHztjaKuYMRKdap2cbpJ6u/7Hl1wyOX77M0sMzkvMzLGYIyTkD6jKxHKJS7gYyM5o4p6s5DETp92CUktuv++IvWd3JC4kikZHHJlOD/8AsehGPSqk3HY9GdONSOWS9S1OiHWSkhWK7xHIdlkGyMeW/wCAT8vdyrTTq5tGeFiuGyh3qeq+pYqtmrjyj2gCgCgCgCgCgCgCgCgCgPCaAqvpr03ed/ZLJtmOhpAwXWeWlD4AnbVnc4A9c9SpyiezhMCox7Wr6ChY9HGeDWoMkrtpjjjePuY3Jlye6xAIWP6RI+FQVPS/M3TxkVUy7RW7/j+SC/78qqaNydzptL1ow6jBWRdLA5xturDyZW3B8N/Amuxk4lVWlGbTe6/2x39Irt5exkJGh4yyqqqoSTViUYUDJMgL5O5DjepVHezKMJTUM0ed/Vcjg4bBK8gECNJIDkBE1keRIwQPeeWM+FRinfQ0VZ04R/MdkN/DOrq+kVhJ2cIdg7GRtb6hr3wuRvrbOTmrY0pW1PNqcSoRknBNtaeBO2nVJH/xbqQn/wAtFT/NqqfYIzS4vP8ATFEjH1W2Q5tO3vdR+pRUlSiVPilfw9D1+q2yPJpx/wCoP2rR0os4uKV+q9DguuqSLfsrmVT4a1Rx/h0mouguRdHi9RbpEPP0E4hbpIkDxSrIMNpwkmORC6x3dQ2OG3AxUezlFaMt/HYerJOomregk3dlJbuFnhZCCO7IrKGwckA/WBG2VPjzqqzi9T1YVYVY9yX8jK3HAxWRblBLHgRCSJ47eFcEERRxh9bgbZfGx2yeVymnzPN/DTWmV252d2/PocnSCRBbobfLQTSMzO5YlZlySiq38UuH1g7swfvHYio1GsuhbhYvtfzNJJK3l1FuqT0rm+9spItHao0etNa6xjKee/8A2MjzrsotblcKsJ3yu9h56IdMJrFltr0N2RVSur6cSsARnx04+qd1+yr41HF2keVicHCunUob/ct6GUMoZSCCMgg5BFaDxGmnZmdDgUAUAUAUAUAUAUB4TQFV9ZfTQktaW7YHKZx5/gKf8x+HnWerU5I9nh2Cu+0mvJCDwaJGkCuMk7KudIc8tGrI0MQe63INpzsTVUEr6nqYnMqby/Hw/wB5jXBhX7/filKl30hWVzmOO5U4JjbVqilxgo+W+sKuPJ9tW/UtvFc1+6I7pRaxyBJ1mg7ZowZ0EirqfQrh0U798Eg5xkrnHeqFSN9TVg6sodxp25P9hf4fYSTuI4Y2kc8lUeHmTyUepIFVRi5bHoVasKazTdizejnVcoCvePrPPsoyQg97bFuQ5YHvrRCjpqeJiOJttqkrX58x0mubSxiAYxW8Y5AYXPuA3Y+4E1d3YnnRVSvLS7Yvt0+MxIsLKe68nI7KM/1jn7QKh2l/ZRp/BKH9aaj9WAbjcp2FnbL5NqkcfLKn7Kd9j/w4+9L6GR6PcWbc8VVfRbaMj7a5ln1Cr4Zf+v6ng6OcVXlxYNjwa2jx/rXcs+p118M//V9QYcbiPOzuF8u9G5/Uop30c/8AEn7yfqY/d3JB/v1jPbjxkTEsY97DGPhmmdrdHfwSn/Smn9GT9nxGzv4yEaKdCO8hAOPzkbdfiKknFmaVOrQlrdMT+knVcjZezbs259m5JQ+5uafaPdVc6Kex6GH4pKOlVXXXp/JW99DPb67aZGjyyuVYcyoZQynkRhiMrkHbyrO04qzPYpyp1mqkd7W//TgxnbGc7Y339Nt96it9C6WxZN3xF5H1yIkl0oV/YpJYxHAAf4xWcaVk06fverI1knVso03679DwFTstNI+9Z3fgJXSayaK4YNKJi4EmvUGJ1Z2YrtqBBBxtsCMA4FNSNmevg5qVLRWtoNPVt0yNuwtp2+8se4x/4bHw/MJ+R9DtZSq8mYeI4JSXaQWvMuMGtJ4J7QBQBQBQBQBQAaASusXpSbeMQQn+Ezd1cblFJ06sfhE7KPPfwqupPKrLc34HC9rLPP2VuVZedGZ4oGnlAj0sqmNye07xKhsY5Eq25O+knfxzum0rs9qni6U6ipw18SIeMgAkEBhkEgjI5ZB8d9sjyqGqNaknexMXHHW1Iww4I1SKw2LspjlX82VQrMBtqOeYzU3UMUcHHVPR8v29Dp4D0dl4jO5iGiIN3nbvBF+qu2NbBcDAxtgnG2eqLmxWxMcLTUXrIuHhXCrbh8B06Y0UapJHIy3q7fs5DwArSoqKPn6tWpiJ66voL8nSW6v2MfDU7OEHDXcwwPL72pG594PqF51HM5aR9TQqFOir1nd+6v3JDhHQK3Ru1uC13Oeck51b+inYDyzkjzoqa3erIVMbUayw7q6Ia1QAYAwB4VYYz3FAc3Er5II2kkOlV5n1JwB7ySB8a43YlCLk7I4ujHHEvIEmXYkDWmc6H0hiufHGRv61yMsyuidajKlNxkSxFSKrAVoFoKvGuglrM3aRg20w3EsB0EH1A2P2H1qDgnsa6eMqQWV95dGRY45e8OOm/X2i35C6iXvL/SL/AN+9jUc0o+0WdjSr60tJe6+fkxkvbK14jAM6Zo23R1O6nllW5qR4j4EeFT0kjNGdXDz00ZU/HeAT8Kl7RcSIwKxTFcmNjyJHJZANg3LfIwdhncXTPcpYiGMjklo+nUUW3575OTnck88nzPrVLd9WemlZWR7GhJCqCSTgADJJOwAA5kmiQbSV2dp4NcdosRgkEjglUZCpYAEnGrGQADUsr2sVfiKWVyUlYs3qr6WdsgtZWy6LmJicl0HhnxK/aPca0Up3VjwuI4XJLtIbMsUVceYe0AUAUAUAUBH8d4qltBJNIe6i5x4k8gB6k4A99ck7K5OlTdSahHmUC1+Li7Et4TokkHalTjSh27ueQUY+C1jvmlqfUdk6VBxp72LT4rEtxLNaSwmTsESZFVmzcQaSFUvrXEgl1YLNjc+prS7PRngRcqcVVi97ryYkdL+FxRzt296XyuqFI4S+mI50LnUsaKOWF8s+NUzir6s9TB1pyh3IebvuRvRDozJfTaFysa4Msn4I8hnmx8PLmfIwpwcmacZilQj4vYuqea24da5OIoYhgDxJ8h4sxPxJyTWvSKPm0qmIqdWxKvbOe+ikvrwGO2iRpYLXBOrSpIaQAgtnHLIO/gM6q7OXee3Q3KcKD7KnrJ6OX8DFwXpvYGGPM0UJ0DMbdzQcDKjYDAO22x8KlGpG25RUwWIUn3W/Ek4+ltieV5bf85P9alnj1Knhay3i/Q3x9IbRuV1bnHlKh/bXcyIOjUW8X6HFd9NLFCVa6jyASQCW5Y22zuc7Dx8K45xXMsjhK8tVFlZ9Pem3tmYYlXsBpYMysHLjBzvjTjdcYOck+WM9SrfRHs4HAOl35+0cXQfpYbKTSVUwyPmU4JfGAARj8Hc4xvqPpiNOpl0Lcbgu3V09VsWpadO7B9P8JRSwyA4ZSN8YORsd9hzPhWntIvmeHLBV47xZJydILVed1APfKg/bUsy6lKpVH+l+hok6WWI53lsP/Wj/ANa5nj1JrDVntF+hwX/Tjh4Rj7TFJ3T3F75b02B51x1IW3LIYKu5JKLFXhnD7iCCPiNgvdlQPcWYBCN5mMbkEY8OeMjbCVBKyzR9DTKUJydGs9tFL+R24TxO34jbalAeOQaXRhuD4qw8D6+4jwqxNSRhq06lCpZ6Pkynum/RRrGUYy0EhPZseYPPQ35QHj4gZ8DWWpTy7bH0OBxqrxtLf7+JDWFnrdU16JHwYQdg7aioGrPcYkYU4wTtkbGoxi2aKtVRjdq65/7zG7h504Vn1SmLsJAs/wB/jZsFtyGZEL9xwQVjbcEAuBoWh49RZrtKyvdaaMg+LcTj7dLm2aVJg+oho0jEekIqqApIIABB5ZGxqqcle6PQoUZum6c0nHz6l3dF+Mrd2yTLtqGGXnpYbEfP7MVqi7q589XoujUcHyJaulIUAUAUAUBUfW/xzXKlop7sffk9XP0R8FJP9YVnrS5HucJw9k6r8kV1Wc9omp+JBLWKOKZ+2ZjJM6s4KKqmOOMNsSAjOSAcAtirJStGyMMKGarKcopRWi8+bNU2q8uUjhTBYRwxIcd1URU3x4DSzH0zXH33oShlw1FuT6tl38G4bDw6005CpGC8sjbajjLMfly8AAPCtcUoo+cq1Z16t+b2Frgdm3FJxe3KkWsZItIW+t5yMPHccvhyGWglmd3tyNNWSw0Oyh7T9p/sdPWR0rFtE0Ebff5FwMfURtQLZ88AgepBpVqZVY5gMI6s1J+yil6yH04UOBigCuHQoAoAoAxXQFDlgriBb3Vd0rWSJLOUntYwRGfwo1Axv+Eo2x4hQfOtdGeZWe6PneIYR059pHZ/c29JuGvYTHiVovc/8XCNg6ZyXHgGHMn4/hZ7JZXmXxIUKirx7Go9f0vp4DJcQwcRtMZ1xTKCCOYPgR5MrfIjFT0kjLGU8PUvs0UpxaW6tHa0d9JjygZVUMYySw0yY1hDqJwGxuR51kk5R7p9FRp0a67W2+/n5HDDxeZJxcrIRMMHXtzChNxyOVG+eeSedRzO9+Ze8PTdPs2tDjlkLMWO5YlifMk5J+dcbvuWxjlVlsPPVNxzsrk27HuT/R9JFBI/SXI+C1dRlrZnlcUw+aHaLdfYuatR4AUAUAUBovrkRxvIxwqKWPuAyaHYq7SPn88MvbyR5hbTO0jFydBA38AzYUgDA5+FYsspO9j6iNahQioZlp8ToHQm8Ay6RRf0s8S+fkxrvZsi+I0b2V38DEdGVX+N4hYp+ZK0zfoqo/XXVT6s68bKWsKcn9Dpg4zbWOGsy80wZS88iaF7MEFkjQ7jVjBJ3wdj5dTjHYpnRrYj+rouS8eVxj61ekGtvZEP3tAHnx9Zz3o4/T8I/DHKp1p/pM3DcN/7JLXl+7E2fpZesug3LqgGkLHpiAA2AGgAgY251S6ktrnpxwVBO+X7kMxySTuTuSdyT+2oM0qKSsjyuHQoAoAoDt4Lwx7meOCMd52xnwVeZY+gGT9njUoxu7FGIrKjTc2buknB2tLh4G307o34SHOk/rB9VNdnHK7EcLXVampr4kZUDSFAFAFAApc44pqzJqy6WXsQ0pcyafJyJBjy74O3pU1Ul1Ms8FQk75f2Gnqv4/2Uwt2OIrgnQPCOYYyo8lcbgeeBzzV1KXI8/iWGvHOt1v4rqRvFuOW95NMt6HjZZWEM8Q1aIwSoR0+suRqyN8seXjGUoybzFtLD1aMYyo63SumRx6NRt/FcQsn/AKR2gb9FlOPnUezvszR+NkvbpyX1M/uJuyMxiGb+inib9bCu9lI4uI0r63XwOSbgN7bFZGtplKEMGCFgCDkElMgbjzqOSSd7Fn4mjWTgpLX4F98E4gLiCOZeUihseRxuPgcj4VsTuj5epBwk4vkd1dIBQHhNAJXTvpwlqDDEA9wRyO6x+ILeZ8QvxOPGqpUUdOZ6GDwMq7zPSJUnEOOXM5zLcSv6FyF/RGFHyrM5yfM96GFowXdiiN7Mc8D5VG5etFYyrgN9nGC41DKr33/MXc/PZR6sKnHcrqu0bddC2ejHQqK4tBLeIWmuGM7MGZWXXuoGDsNODg5+kRWiME494+frYydOrak9FoKvSnoHJbF5I43kt1BbWJowyqBqYspjHLf6JPL1qudK2xvw3EO1tGT73kR3R7oq94SYo3CBtLSNLGFBwpxgIWJ0sDsMetI082xbiMc6PtWv0sxxHVHH+NSf8tf9an2C6mH/AJip7q+oHqjj/GpP+Wv+tOwXU5/y9T3UJ3SDopJabyxOULBVdZYypJzgY0BgcDxFVyp5dzfh8a62kbX6WZIdGegT3SrIweGF11K5kRiwIyCqheR9SKlGlfUpr8SdJ5VZteZNcS4bFwWCSSOQyXNwOyiZgAUXmxGPAbE+ZCCpNKkrmenUnjqijLSK1Zq4Hax8Zto45pGS5tO6XADM8R5E555IGTzypP1qR/MjqdqyngajcF3ZHB0h6upLcF4w88arliHRGXGScqy4IAGcgk+lRlSsW0eKOekrL1IXgfRmS7LdhC5CnSzNNGqq3PB7hb5A1GMM2xpxGLdH2mr9LMdF6pI/xp/0F/1qxUV1PP8A+Yqe6vqe/wDwjj/GpP8Alr/rTsF1O/8AL1PdX1FPpJ0Oks8s6O0WrAkWWPG52ypTKk+W4HnUJU8psw+P7bRWT8n/ACb+jPQeS6KOYnjgY57QzR5K7g6VEZJOR44pGlfyI4niCpLKn3vIc+OdX8EdnJ7KjLOmJUcsWcvH3gNzgZGRtjc1a6aS0POpY6pKqnUd09GvBlScQOp+0Aws330eXeJ1Ae5ww9wFZZb3PoKLtHL00OaoouMTGPIfKu3OHfYcYuITmKeWP0V2x+j9E/EVJTa2ZTPD0pq0or0LV6BdPFuCtvPhJ/qtsFl8dvwX8cePh5Vpp1VLR7ng43AOl346r7D8DVp5x7QEJ0w437JayTDBYDSgPIudhn0HP3A1GcsquX4aj2tRQPnyeVnZndizMSzMeZJ3JrC227n1sYKCyrZGFcJGLSAcyB8a6gdvDuGTTkCGKSXPLQpI+LfRHxIqSi3simpiKdP2mONx0S7BbS0chp76YGbG4WCPDsg+JDE+JTyAq7IklHqeX+MdVyqraK083oXGigDA2A5VoPDITpy2OH3ZH8g/+Uioz9lmjBr8+C8UV/1RWUjzNKZH7KLICCRgplYAZKDuthM8/Ty2oop7np8VlGKUUtXzLdFaTxAoCveuZ8WsI85x/wDbkqmv7J6nCl+a/I3dVtq8Vo1xNKxVx3A0jFY4YwQMA7JvqzjwC12krR1K+ITjKtlgtvqytOmHHje3LS79mO7EDnZB448Cx7x94HhVFSWZntYPD9hTtz5mjo1xlrO4SdcnTs6j60ZxqX38iPVRXIyyu5PE0FWpuP8Aty2OsBDccP8AaLaZl7Ne2BSRkDxFe8Dp+l3dwD4j31pqJuN0eBgmoV1Cot9CK6lW+93I/LQ/MN/pUKGxo4uvzI+RZdXnkhQFWdcFjIpjnWR+yfEUkfaNp1jLKQn0dwGBPovrVFZPc9jhU4tuDWu9xs6tX1cNgPPZx8pHFTp+yjFjlavLzGY1YZCo26LLNNfWIwjwye02rHlokA1IfJPoD0Iz55z5L3ieysU6cadZbNWfwEnifB57ckTQyR48WU6fgw7p+Bqlwa5HrU8RSqK8ZL1I9ZAeRB+NRLzKuA9ViCCCQQcgg4II3BB8CD411aEZJNWZfvQLjxvLRXcgyIezkx+EPH4qQ3xrbTlmVz5XGUOxquK25DHUzKIHXJGfYkYfRWdS3u0yKP8AERVVZd09LhTSr/AQG4JDbJHJevJrkXWttEAH0+BkdtowfLGr5GqckY2cj1PxNStJxoLRfqZqbpBEu0PD7RQORmVrhvm5G/wrnaJaJEvwk37dST8tDMdM7ofQ7CL+jt4h+sGnas5/x1Lm2/iWL1VcRnuIp5Z5WkPaBF1YAAChjgKABkt5eFX0pNrU8jiVKFKoowVtDYQZePfk21pkeju2PtVvsru8yPs4PxlL7DsKsMJBdPDjh13/AELD5jFRlszTg/68PNCr1LAdhcHbPbDPnjQuPhz299V0NjZxb+pHyLIq48oKAr3rl1G3gVRktcAAAZJOhwAPUk4qmtsvM9PhTSqSk+SIPpnxFrSxt+GAjtDGDcaeQHPT/WbOfMA7d6o1HliomjB0VWryrva+hXlZj2goB/6vuK9tbz8MdgO1jfsC24BYHUu2Dz743z9L0rRSldZWePxChkmq8V0uTXU5E0Yu43Uq6SKGB5hgGBHryqdFNJpmbiklNwkuaLIq48sKAQuuED2Jc4z2y428dL/LbNVVvZPR4W/z15Ep1ZNnhsH9cfKRxXafsoqx6tXkNJqwxiPxb71xy0k/GIJIT/UzJ+vT9lVPSaN1O8sJNdGn+xu6z7yeG1SWCVo2SVQxXG6sGGCCCD3tPhXajajdHOH04TrZZq5WJ6Z3RGHMMv8ASW8J/UorP2rPafDqV9Lr4mH3RxtnteH2bg8zGjQN+khP6qdouaH4OS9io19TfbcEgvNXsTPHMqlvZpu9qAxns5Bz9zDPw3ruWMtjjxFWg12yur7r9x16lkIguCQQDKAMgjcIM/sFW0FozzeKyTqRs+RYtWnlWOXi/DkuInhkGVcYP6wfeDg/CutXJxk4O6ZRPT2YtxC5J8HCD0Cqqj9X21jqvvH0+Ailh4+JAVUbQrpwunqhTFhn8KVz8tK/srXR9k+a4priH5I1cBulXinFZZGCJGIVLuQqqNHiTsBkeNFbMxWj/wCPSS53HtGyMjcHlVp54q9YnE4lsbqMuvadmBoB7w1sEUkcwCfH0NQqNKLNeChJ14NLmQnVA6x2dxI7qqiYliSAFUIm5PgMeJ8qhRVomrircqyS6FiRyBlDKQQRkEbgg7gjzFXHlPQ1e2J2nZa17TTr0ZGrRnGrHPGds1y52ztm5ET0skhijW6nGfZiZI123kKmNR7zqwPInPhXJWWrLsPGc59nH9WhQnEL15pXmkOXkYsx/YPQDAHoBWKUrts+rpU404qEeRzE1wndADnlRi6Ztt52jdXRiroQykeBByKJ21RGcFOLjLZ7l89DbuK5RryMaZJwqzKOQkj1D35wRueaha2wakro+UxNOdOXZy5bE494gdYy6h2BZUJGogYyQOZAyM++p3KMrtc3M2NzyocETrSnSXhokjdXQyoVZWDBtyNiDg7En4Gqa2sD0eGpxxCT6M3dVvEovYYIi6iTXKoQsNTEMZDgczhWU7cs1Km04keIwkq8ny0+w7E1YYBG6W3Mcl1wqeNldfaWjDIwYd7CkZG3Nd/carlq0zdhk1TqxfS/1OzrSj1cNm9DGflIlKq7rOcPdsRH4lGViPqQoCX6ISlb61Yc+2QfBjoP2MaspvvIy4yKdCS8C/eEcNSBNCDALM59Wdi5PzPyxWxHys5ubuztrpE8NAfPnTpSOI3QP8pn5qpH2EViq+0z6rAO+HiRnDuHTTtphieU+OhSQPeeS/E1FQb2L6lanTV5OxNfcusO99dRQeJijImnPppXKr+cSRVip23Zk/GSnpRhfxexLdHumAjvYEgQx2h0wdkx1HdjiRvASa2ySM7ZG+xEo1O8rbGevgW6Mpzd573/AGO3ja6ZeOqeTJAwz4jA/wBcVJ7yKaTWWg/FiU3EZBp/hNzjAzpuJCQcDOBkct/njO2TTmfU9VUYtO8FfyNRmLs+uWRu6AS0rHUVIIBJB1DOSAeWc+G/N92dyZUnGK36GKzaUZVkkAbIZVchW22yBsw55B8xvS7SsTcLyTaXobxxCQBMXNxjA1BZ3GPQDbGw5chkDNLvqVqlF3vFeiOzgMMtzdJEtxcB2GnWJHZsA5PezsoXJ3yMj1FTjeUrXZTiHGlRzOK9CT6xONB3SziZmhtRpLMxYvKBglid2K7jPmW9KVZX7qKuHYfLF1ZLV7eCE6qj1CyeqXo6SxvZBhACsOfrE7M/uAyo89TeQrRRjzZ4fE8Tf8qPx/g6etfo92ipfQjUFTTLp3zH9JXGOYGTk+RB5LXasLq6IcMxSg3Snz28yrazHvDV1fceFvOYpCRBc/e5NyNLHuqwI+jz0k+RB+rVtKdnY8/iGG7SnnjuvsaOlFnLaXXZG4uGIXuu8jhtLZAIbP0SQCcY5Ecxmk04vcYRxrUr5V6EenEZCT/CbkDBxm4kBJw2M7nmR+zO+RC7b3Ze6MFa0VfyRy9uTGFZ5Cq/RQuSgOTuFOyjScbDOSd6Xuizs7SukvQz7Upo0SSDGr6MhBVjldiANOQFyRnI+QbbHMua+ZL0OmLiEhbBurgDz9ocb4PqcDI9eYruZ33K5UYpXyr0Grgb6oODJnc3kr+vdkYn9f21bHaJ51dfmV//AIr9jPpj0wPt7xOnaWsWYXizjXkYdvzgSQvlp8NWQnUtK3I7hsDeipp2lumQR6NxTnNjdRyZ5QznsZh6DPdk94wKhkUvZZqWLnS0rQ+K2IbifCp7c4nheLy1DY+5h3T8Cag4NcjXTxFOp7MrnT0UUm9tQP5eP7GB/ZSn7SIYzShLyPosVuPkj2gPDQFVdYMVnbXTTSRm5nmAYRM2mJAqhNTgDLZxsp2ODyxmqKuVO73PXwLr1YZIvLFc+YncR6VXUw0GTso/CKAdkgHlhdyPQk1Q6jZ6lPBUYO9rvq9SEAqBqVkSHR+2Mt1bxqMlpk+QYMx+Cgn4VOCvJFOJko0ZN9B+6aI68SljWAzreWqgosgiJKtzDEEbBOX5XpWiV83meNhcsqCeazjLpcg/ubf+ap/7dF+5UMn+Jq/Ev+8vlYfc2/8ANU/9ui/cpk/xH4l/3V8rD7nH/mqf+3Q/uUyf4/UfiX/eXysPubf+ap/7dF+5TJ/iPxL/ALy+VkuQnC7NpxC0F5cAxRo8omKKDktkKANsNjz0DNSaUFdGdZ8VVUHK8VztYr/h1hLO2mGN5W8dALY/OPJfeSKos5bHszrU6a7zSLF6L9WByJL4jHMQqc5/PYf5V+ZG1XQoe8ePieKN92lp4mXWD03jEbWlow3GiSRMaVXkUQjmcbEjkNhvy7UqJaIjgcBKUu0qHN1d9N0iVbS6OIxtFIeSj8B/JfI8gNjjArlOp+mRPH4B37Wn8UdvSnq0Dky2RVc7mE7IfHuH6v5p28sCuzpJ6orw3E3BZauq68yt+KcLmtzpuIniJ2742Pub6LfAmqHGS3PZpV6dX2WPXDWTidlh4mmu7MaQolETSRnGDqKsM4HiPpL4aqui1OOurPJqqWErd12jLwuRf3OP/NU/9ui/crmT/H6l/wCJf95fKw+5t/5qn/t0P7ldyf4/UfiX/eXysPubf+ap/wC3RfuVzJ/j9R+Jf91fKw+5t/5qn/t0X7lMn+I/FP8AvL5WSfRmBjxCyt2t2txaJNMEaVZiRITliVAA7+Bj0qUV3krbFGIaVCdTNmzNLa2wq9NbUx390pB3lLjPiH++A/4vsNU1FaTPSwMlKhG3kQhGedQNZMcM6T3UA0pMWTxjl++xkeWls4H5pFSVSSMtTB0Z62s+q0GvoWLO7uo3WIWtxEe00Icwygc8Kd0YA5wvv3wcXQcW78zzcWq1Gm4t5ov1Rby1oPFPaA1XUwRGdjhVBYn0Aya4zqV3Y+beK8Qa4mknf6UjaseQ8B7gMD4VhlJt3Pr6FJU6agjmUZIABJOwAGST6AbmucyxtJXbJuHopcaQ8wS2jP17lxF8lPfJ9NNWKk+ZkljqW0byfgrjV1d+xR3qxxs88zI2JiuiMEDJWND3iSobvHwG3M1ZTyKVkYMe8ROlmmrR6cyW63bAFba5aNZFikMbq5IUrJjGojcDUoGR+FU6sb2Zn4bN3lTTtdfYUvYbb8X4P/eDfv1XZdF6mrPP3p/Ieew234vwf+8D/wC5TKui9Rnn70/lD2G2/F+D/wB4H9+mWPh6jPP3p/KSvR3o5bTyEva8N7GMapWhunlKjBIyA+ACQd22wDUowTey9SivXnGNlKV31Vhn4rxvg7sJJnt5mRdK90zYHPYKGA38h+qpuUOZRSoYu1opq/wI++60baNdNtA74G2QIk/aw/RqLrRWxfDhVaT/ADHb6iVxrpfeXx7LJCvsIYAe96HGWf3cvSqnUlPRHo0sFQw6zS5c3/Ay9GehCWy+2cQKqIhrEROQpHIvjZmzjCDO/nyFkaSWsjFisfKq+yo8+fXy6GzpB0Qiv4/beHsuqTvPGTgM3j/RyeYOxPluSlBTV4kcNjZ4d9lWWiFPhHSa94exiBZQvOCZSQPcDgqOeNJwfWqlOUNGehVwuHxKzL1X8Dtw7rUgcabm3dM8yuJU+Rw3wwatVZPc82fCqq1pu/0JHhvHODCTtont4ZCCC2gwEg4yDkKDyHPyFSU4bopqYfF2yyTaXxF/pPwC1RxNFbcOaCYa1kmuni1McsdPe0sPEafA8tq5KMd7L1LaFao1lcpXXJK5Cew234vwf+8D+/UMsei9TRnn70/lD2G2/F+D/wB4N/7lMq6L1GefvT+UBY234vwf+8G/fplXReozz96fyDN1TcPUzXVwsccaAiBFjJZMjDOVY7sDhDnO+fLFSpLVsz8RqPLGDd+bv/Bp6zmsnulimMkUoiB7dF1qAS2FkQd4jYnK7jPlSplvZk+H9vGDlT1V9v4E+TonOQXgMd0g+tbuHI96bOD6YNVOm+Wp6McdTvad4vxRBSIVJVgVYc1YEEe8HcVW1bc2RkpK6NlpctFIkqHDxsGU+o/Z4EeRNdTadzlSmqkXF8z6R4ReiaGOZeUiK4+IBrcnfU+OnHJJx6HXXSJx8YshNBLCTgSoyZ8tQK/trjV0ThLJJS6FB8E6PvNNJHIexWBWadiM6FXnt4knl8TviskaetmfT1sUoU1KOrlsb36TGIFLGMWyHbXs07jzeQ5x+auw8DTtEtIkI4PP3qzzP6IgZpWdi7szsebMSzH4neq7t7m2EFFWjodvAbh47qB4/piVNI8yWC6f6wJX41Km+8inExUqMk9rFzXvErbiKXNhqKTAMpRwAQynZlwSGAYA7H34rW7STifNwhUoONa2hWvDrmJY9Fw3DYJIyY2WeyLvle6SWXZj6+dUq2zt6HrVc+a8FNp66S0On220/GOD/wB3vXe74ehX+b0n8xnFcWrMFWfhDMxCqBw+QkknAAHiSad3w9DjlUirtT+YYOlPCriO0SztLZS03euXt4lhjIG2kZIG+3M/RXfnU5qSVooz4arTlW7SrLba+oq2fVxfvjMccX9JIv8A0aqpVGTPSnxShG9m38Bm4X1TqN7i4LfkxLpHxZsk/ACrVQXMw1OLSelONvuSNxxzhnC1KQIrS8isXfc/nyEnHuJz5Cu5oQ0RRChicW7yvbqyvOOdILriUyoQTk4igjyQD5/lHHNjsBnkM1RKTm7I9ijhqWFjm59WYcL4rd8MuGUAowx2kT/RYeB2+x1+0bUUnBipRpYyGZepYlp0n4dxJBHdIiSeCzYGD+RIMfrB9KvVSM9zyKmFxGFeaG3VHHxTqojbvW87J+TIO0X4EYI95zUXQT2LafFqi/qK4sXnVtfp9FI5R/5cgB+Thf11B0WbocUoPe6+AydDeFXPYSWN3a4UZkt2mjSaNH3yCASCMnUN/F9xtVkFK1mjz8ZVpdoqtKXnbQhrt7eJ2jkm4SroxVlPD3BBGxqPdvbT0LoyqTjmip2/+Rp9ttPxjhH93vTu+HoS/N92fzGi/voBGxibhkz7AJFYEOSSF2LbAjOfh41x2W1vQspqbl3lNLq5FgcLvbfhVtb2srZmfHcQZZpHO/oo1HSGYgbVapKKSZ5lSFTFVJVIrRfZFV9Mrl5L65aQYYSlceSr3F+agH41mm7yPewUFGhFLmQ8blSGUlWHJlJBHuI3FQv0NMoxkrNXJ2LpO7gR3iLdxcvvm0qDllJB3gffnPpU1O+jMcsEo96i8r+jNXHuB9iYWiYyxXK64SRhzuBoYDbWMqDjmTypKFtuZLD4rNGWdWcdy9ejVkYLWCFvpRxIh8dwoB+2ti2Pma089SUlzZJ10rCgIfiXAIpDM2nDTxGKQjHeHJSfMrvg+p9McaRZGrKNvBnz5d2zRO0bjDIxVveDisMo2dmfXU5qpFSXM1xoWIVQWJOAACSSfAAbk+lcWuhKUlFXY2QxJwsCSTTJfkZji2ZbcEY1uRsz45KP/wCqtXcWu55spSxjyx0hzfN+CFi3vpI5VnVj2qv2gYnctnJz553z5gmq1Jp3N8qUJU8nKxY3SnXBJFxK3leCC8VPaDGiOVJGVbSwIOc48Nx5tWiSt3l8TxMPapF0JK8o7XMBxeY7i+4gQdwRwxCP8ldzeL9A6aWjhH5v+yX4XxR4YZbye7uZYogVEc1tHbl5DjGnuhjknA5DJ9KknZXbKJ0+0mqUIpN9HcjJ+tz8Czz+dNj9SGq+38DTHg7e8iLvOtO7b+LjhjH5rOfmSB9lc7Z8kaI8JpL2m2LfEOkN5dHRJPLJq5RrsD6aEADfI1XmnI1wwuHoq9kvMmuBdXVzKNUwFtENyXGXx6IOW2fpEY8jU40W9zPX4nTh3Yav6DNZ3NpaRvFaR3aSHum4NlLKx9RkKPcMafQ1beMdEedPtqzUptNdMwT39tcwiG9ju52H0ZvYZY3X1yoPxwMHxBrl4vRnIxqUpZqbS8MyF3jXVzcINdsRcxHcYGmQD1U7N8N/yarlRa2PQocUpvSorfYX7HjV3aNojmlhK842zgf1HGB8qgpTjzNUsPQrK9k/IZbLrSvF/jEhkH5rI3zBx/hqarSMk+E0n7LaJSDrcP17PH5s2fsKD9dTVfqUS4O+UyVvOMNdWyXtvc3ECfQkiigjuGD58QQW8txtgqcCpXzLMmZVT7Ko6U4pvq3YiP8Aas/49xH+7E/crmbxfoXdmvcj83/Zl0Vjkvbr2maeSe1s+9G0kcceqXAb6KDHd+lvv9HzNciszvfQliJKjTyRSUpb2ey/7K94rxN7mZ7hydUjaue6j6oHlpGB8Kzzld3PZo0Y06aguW/j1GQlOKKuSsfEFXTk7JdADA35LL+v3fRt0qeZh72Dl1pv6CnPCyMyOpV1OGVhgg+RFUtNOzPRhNTSlHY8jjLEKoyzEBR5k7AfOiV9DspKKcnyL/4R0YjiW21qGa2jKpncKzY1sPNiRz8BW5RSSR8lUrylKT6sYBUigKAKAKAqDrV6PMLpJ4kLe0EIQoye1AwP0lA/RNZ60dbo9zhmKioOE3t9iLmlThYMcZV79hiSXZltgR9BM7M+ObHln4VF2p+ZdGMsXLNLSHJdRSdiSSSSSckkkkk+JJ3J9TVO56SSirIzt4GkZURSzuQqqOZJ8KJX0E5qEXJ7Iv7g1jFJYJbMySosQgk0nI1INDYI5EMD6jArcknGx8lUnKNVzWjvcruHgc0F2tlJLflXP3iSC5MaCIcywIIGgYyBjw23XNKjaWXU9OVaNSn2sVG/NNXdxn6X9ELm6WGGKZFghUfxru7s+MamODqIHjn6zGp1IOWiMmExUKLc5Ru2Qlv1SNzku1x5JESfmW/ZUFQ6s1z4v7sDcehVnAN4L67YeAGgf/j2+JrqpRXUqfEK1TTMookLLiTwoVt+DXEGfrRiEN8yDk+/NTTtsiqdNTd51U/O5DXNrcyMWeHjRY89NzCg/RRAo+AqLvvZl0HCKspQ9Gav9nT/AMjxz+2J/pXLPx9SXaR96Hyv+A/2bP8AyPHP7Yn+lct5+o7SPvQ+V/wbILO5Rgyw8byOWbqJh8mUg/EVJXXUjKUGrOUPlZN3HE5ZYwlxwi4uMfWmEBP+EAD4AVJtvdFEKcYO8aqXqR33HWc4/wB1v7NifLWM/wD1Nvl8Kj2cXysXLH16f6lI1T9UpO8d2MeTxHP2MMfKouh0ZbHi7XtRJfoZ0OubKSQNLE8EqYcK0isGwcMu2x3Izkcx5CpwpuPPQzYzF066TytNC5xLgs7XfsME1+W5vLNcs8fYnYtpUDPiuCdyCPUQcW3ZXNFOtGNPtaij4K2tyxhYwWlmYQyxRLGV1OQBlttTHzLHPvNXWSR5jnOrUzPVlAXlk8DtDKul4zpYevp5gjBB8QRWKSaep9ZTqRqRU47P7moHFcJySejGu1vU4iqwXLBLsDTBcHYSeUcvmTyVuefXZrU1NWe/U82dOWFlnp6x5rp4o7erjo07XzGZCvspyytt983C+8c2yPIeBqVKHe15FfEMXHsUoP2i6K0ngBQBQBQBQHLxJwkbSEA9mpcZ8wCfhtnf1oSitbHzSzliWO5YlifMnc/aa89u+p9lGOVKPTQ6OHWEk8ixRIXdvAbAAcyTyVR4k11JvYjVqxpRzSen+6EvPexWitFav2kzDTLdDkFPNIPIHxk5nw8MTbUdEZIU54h56ukeUf3f8G3oL0qawlwQWgkI7RR4HkHUeYGxHiB6ClOpldmMdg+3jmXtL6lucZsLXiNuEdkdHAaNlIyDjZl9f17g1qdpI+epTqUJ3W63Kn4hwBbKQQ3NnHLqbEdwZ5YI3HhnB0qR4g4x6jvHPlyuzR7cKqrRc4St4WTOj/YkP4haf3qf36ll8PqVds/efyEhwPoxayyaJLKALoZh2XEHlcsBkAKHzv5+ldjC/L6lVXEzirxk/jFI7OB8XlmupbF4BDbJZuotH07YCYLuRqBKvuc43B5712M25WZCth4QoqrF3d9zRdTexG0gtBBZG6QSS3BInAJ20iR86lX5d5cYzXH3bJEqUFWU6lTvZbabGu1kS/W6S6igup7XvRzB/ZxKmoqdToQMbZB5d4eWT1PNdPkKsPw+WcNFLk9bGzpB0iktLn2O3uI7SGCFBp7Lte/gMeSM5OGG5/BydzvyUmpWTO0MPGpS7SUczb62J2xaOT2O7ne2mkCSj2susYV890BGC6jjIOVypU+ZqxcmZKilFyppNeBD8W4hxWF4IVvoZprj+LWONOWPpklMBfHPkD5Gq5Oa0uaqUMNOMpODSW+pj0s4fBJcs/s1pOxVQ8hvxAWcDByisPLGSM7V2cbu9vqRw03GFrtf/W5Ef7Eh/ELT+9T+/UMvh9TR2z95/IcltwVLqVra2sYlkBGuZbmaaOMeJO+gnmAN8kHA2OOZb6JfUtlU7KCqTldcllSuWx0b4NbcPhMasgIGuV2KqWIGSx8gBnbkB8TWiKUVY8WtVnXnma8iren/AEvN7J2ceRbodhy7Rvwj6eQ9cnflnqVMzsj3cBguxWeXtM4LTiMU8a292SpQaYbnGTGPBJBzeL15rny5cUlLSRZOjOjJ1KPxj18vEjOKcNkt5OzlXBxlSDlXU8mRuTKfP9RquUWnqaKNeFVXTONhXEWtXVj6N6M3HbWsM+MNLEjN6kqPnW6LvFM+PrwyVHHoyVqRUFAFAFAFAcnF4DJBLGObxso95Uj9tcexKLtJM+a0ibITB1E6dPjqzjHvztWHwPss6y5uW4wcbl9kQ2MezED2uQc3cjV2YP8AJpnGPrHOfHNknl7q+Jhw8XXl28tv0rp4i7VJ6AE0ODF0rtVhgsbdlHbRwtJJkd5e2ftFUnzXf3fGrp91JGDCfmVKlTk3ZfAYOgfSIXH/AMvvcTRyDERk3IYDOknn4ZVs5BGM7jEqc83dkZcdhey/OpadTfxjoFLalpLWGC7iP/DuIw8ifmkFdYx659Cd666VtUiFPHRq2jVk4vqn9yD4bfjOoR8It5EO6yw3MUin4E748j41yL15Itq0rqyc5LzTQymS3HEbi+N7YmKaAxqpmy2opCneQDOMoc4OcfZPTNmuZe+6EaKi7p32Oe4u4p7e3hS44SHizqgcZgbfYozrrTbmo8+e25tNWujsYSpzlKUZ2fPn8eposJILWO4Ju+HSXNwVDR6m9nSIEkoNCknIJHIYwOeN+JKN9iVVVK2VKMsqvrz8yS4rxd5ZZXtOJ8PMUiaWScojRggA4IXU/oW23xg1Ju7umiuEIwilUhJNc1zIpHtIbWG1W64dcBZTJMbguwBOF+9hRudORknw9doaKKV0WyVadSVTLJXWlv3JFp4lvri+9tsSDAY7Ve21aW0oq6lUZC5DZ05OHNS0zZrorSk6SoqEr3u9BYu7mONQRHwWQk4CRQ3DsT5AbD5kVBvyNkINuzc14tqxNcI6Dz3ml7i3t7KIb4hi0Sv79RYoPfv+TyNdVNy3VimpjYUbqnJyfi9EbOnPHVslHD7D7zgAyun0hqGQueesjBLHfBXHPbtSWXuxOYLDPEN1q2vQWuhMCyvdQYXtrm2dYmbGTIO/pzz7wBz+bVdPW6NmOWRQmtovVC4fUEHyOxHv9aqPQunqgrgGDgF2JlWwnPcdsQOecEzcsfkMe6y/lZ86tg7rKzDiKfZvt6e/NdV/JBXELRsyONLISrDyIOCPnULNOxsjNSipLZn0P0StWisreNxhkiUMPI4GR862wVopM+SrzU6spLmyXqRSFAFAFAFAFAInSjoAJJhdWzKkwdZCjA9m7KQ2cjdCSBkgEHyyc1VKkm7noUMc4U3Snqregr9Z3RiRJGvVGY5SDKOfZvgDPLdDjn4E+oqurT/UbuG4uLXZS3Wwg1QeuMHQ2wRpHuJh/B7Re1k/Kb6iDzLMOXpjxqymub5GLG1WoqnH2pafDmRHE7955pJpPpyMWPp4AD0AAUegFQlK7uaaVNU4KC5HV0Zt2ku7dUOD2yNnyCESMfgqk/CuwV5IrxclGjJvoWnwPrNtZWKzfeDk6HY5jZcnBLfUOMEhhj1rVGrFnhVeG1oLMtRh4twG1vFBljSTI7rg4bHo674+OKk4xluZaderRfdbQsP0Amh/3K8KrnPZzxRyj4MV7v6JqHZtbM1/joz/AKsL+KbRDXvCeNJyWCX+ijtT/njU/ZULTXQ0Qq4KW918X/JHv/tkbG3b4Wtu36kIrn5nQtSwXvfVniHjB2Fu3xtbcfrQCn5gccF731ZIWfC+Nv8AUhj9ZI7Qf5UY/ZXUqhVOpgo7Nv4smYugVxN/vl53fGO3ijjHxYKM/Fan2be7KPx0If0oa9W2xm4L0ZtLQZiiVSBvI3efH5zbgegwKmoRjsZKuJq1vblcgukfWTbW+Vh/hEg/AOEHvfkfcufXFQlVSZoocNq1Vd6IrHpkh9tmbOoSsJUb8KOQBlI9AO7/AFaz1F3mz3MC/wAhLpp8eZFWtw0bpJGdLowZT5MDke8eY8RUIuzuX1IKcHF8yf6ZWyv2d9EMRXYJZf5OcfTX4kE+uGNW1FfvIyYKbjehLeP26i3VJvHXq26MPPMty2VhhfUDjd3XcBfQHGT6Y88X0YO9zyuI4uMIOmt2OHCOgWbp7u7ZWdpDIsSA6FOcjJONZG3gBkZ3q2NPvOTPNnjpdkqUNFzHsCrTAe0AUAUAUAUAUAUBhLEGBVgCCMEEZBB2wR40C01RTPT7oM1rqngBa35svMxftKevMePnWWpTa1R7+C4gprJUdn1ODpIptbS2scaXkHtVx56mysanz0hT8VBrk9IqPxLMN+dVlWey0QrVSemT0A9mtGk5TXgMcfmluDh29C7YQegJFWruxvzMEvz66j+mOr8yMtuHs8UsoIAixkHm2ck489KgsfIVFRbVzRUrxjJQfM32HFLmzciKV4TsSoIK7gNupyucHxGa7mlEhKjSxCu43G/hnWvOu00Mco80JjPyOoE/KrFX6mCfCYv2JW8xjs+tS0b+MSeM+qhh/hJP2VYq0TJPhddbWZIxdYvD2/45HvilH/TXVUj1KXw/EL9ISdYnDx/4gn3RSn/pp2keoXD8Q/0kfd9almv0Fmk9yBR/jIP2VHt4FseF13vZEBf9ak7nTbW6qTyLlpW/RXT+s1Htm9kaocKhHWpIV769u70AzXAYOxEcbuI1cg4wqgBdj3dTYGds5zUO9Lc1QjQoPuxvbnuRPEbQwytGTnTjBwVypAZTg7jKkHHgcjwqEo2ZspVVVgpIlY/4TZlec1mCy+b2pOWHr2THI/JYgVP2o+KMz/Jr3/TPfwf/AH9yCqk2jT0OX2iO4sDv2qGaH8mePHy1LsfRT51dT1WVnm438qca65aPyZv6E9B3uyJJg0duD7mk9F8h5t8t9x2FK+5zGcQjTWWnqy67W1SNFRFCqo0qqjAAHgK1Hzzbk7s3UOBQBQBQBQBQBQBQBQBQHjLnnQFSdc9mRNby7aWjMew5MpLbn1DbD8lqzV1sz3OETVpR+Ii8JsTPPFCDjtXVMjwBO5+AyfhVMVdo9WtU7OnKfRG7pDfia4d1GIxiOJRyWJO6gHlsM+9jUpu7IYWn2dJJ7vV+bOe0vWRkOxCMWCkDSdQCuD5hkGk+lRUmidSjGad+Z3X3EUnUhu65KtkoqqGwQ+GTLt2jHWdQAGPHapykpGanQlSd1qvr/vkdJ0SXEEbssqISzyLo76AayoC40qFQhVbBy5OFyAOvVpPUri5QpynFWb2XT/s28P4DC8Cv2kjMQWzo0MQM90JqYaz2UyjfGWHPFdVNNXIVMXVhOzRxQ8OjlhaZcRKF7peZZF1B41IOlNanS42I8QeRqOW6uX/iJQqKEu95LwZknDYhPJCTqbEYiy5RXd1Q4L6DpOW7uoAHkT5lBZmiEsRU7KM/U6U4SvbCLsT2RUD2jEhyzx4DAluy/jWUBcbFcE5zUsqTtbQj28pU+0za32/3UwN5B7OiwyNA7Y1MclmCNIcP2K6hkSKRsc9lucgGl01oOzq9q3OOZfTXzNV/xpHdS0fbGMKEkZihYgDUXUZ1hpAz4yD32yTmuOouhZSws4xetk91uR11xGWQYeRmAJbB5ZJZidue7NjPLOBgbVW5NmmnRhT1itTLhHETbzJMozoOSv4S8mU+jKSPjXYys7jEUlVpuBs6QWAguZYl3RWyn9GwDp/gYD4UnGzsRw1V1KSk9+fw0GnqgsC960nhFGf0n7o/w66sorW5h4tUtTUerLmRABgDA9K1Hz5lQBQBQBQBQBQBQBQBQBQBQBQEN0p4Cl5A0LnB5o3irDkfXyI8iajKOZWZdQryo1FNFSWfBLzh13HM9vJIsT5LRKZFZTlTjG4OCdmxv6VnUHGWqPdqYmliaTipJN9dDo430AlAM1n99hbvKmkxyIpOw0sBkDl4Hlt40lRe6IYfiUPYqaPryE2aJkYq6sjDmrAqR8DvVLTW56cZxkrp38jChM7I7eIRCWV3AZmVRGqse4EZmOpgNta4HjvuPGaikrszzq1HPJBLq7nZxLhEkCBi7bMdOlJQvckdAQ+NKtlWcAkEZ8zXZRcdbldKvGtJrL9umpjPDdyfTMj6oe1wzFiYgw3wTv3sNjnuDS0mhGeHp7aWdvibbWzuAFmWfs+20xhg8oLatKqCUUhRjT9IjltnFEpb3ISrUb5HG9jW/Aplgkdw6CMn72ysM4MalhnH4Z3x/wAM0yvKySxNJ1VFJarc6V4RCot5DJgOyFllGEIKRSMA6/QPfZRqwMoe8Kl2aVmVPFVHmjl26EHcQ6HZCQSjFcjkcEjI9DjNUtWZvpvNFMxjQsQqgsx5AAkn3AbmiVzspKKu9Bu4N1e3Eg13A7CEbtkFpCo3OEXcZGeeD6GrY0W9WebX4nTistPVnnGeF3XELt5IbaRI9kjMiGJVRQFBOoDHngZIzjG1dnGU5XsKFejhqKUpa76Fp9Duji2UAjB1Ox1SPy1NjG3kANgP9a0QjlVjxcTiHXnmZP1IzhQBQBQBQBQBQBQBQBQBQBQBQBQBQBQHBxTg8FwumaJJB4agCR7jzHwrjSe5OnVnTd4uwncU6qrd8mGSSE+RxIo+Bw3+Kq3Riz0KXFa0fa1ICTq7v4MiGSCVchsMFzqAxkLIjKrYwNQI+yodlNbM0/8AIUKntpp7aEHxHovxAFXmtXkCgA6SrlhqLkNoYsSWdsn8on1qEozvqi+licKk1GVrmV5acQZWElpNqY5V0hKFO9E+2hfOJME7jHOu9/oRh+FTTUl4rqbYYb8lm9hl7Ux9nrEcqDB1AllGEY94sMjZt/cWa+qOSWGtldTS9+X33MbHgPE3MhjtmQSSNI+pURdRDqRpkPeUhyMEHw8s0UZ6kqlbB6Xd7KxJxdXXEJyDNJEgONi2dOBpACIAgwNgAcV3spPdlX/I4en/AE4k/wAL6qYEwZ5ZJT5KBGv7W+2pqiuZmq8Vqy0ikvuOXC+BW9uMQQpH6gbn3sdz8TVqilsefUrVKj77bJKulYUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUAUB5poAxQBigACgPaAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKA//Z",
    tag: "Secondary",
    summary:
      "Completed the Chinese Senior High School curriculum and sat the National College Entrance Examination (Gaokao), which led to selection for overseas university pathway study.",
    bullets: [
      "Subjects: Mathematics · Physics · Chemistry · Biology · Chinese Literature · English",
    ],
  },
];

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-12 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border ${
          item.current
            ? "bg-[#FF3C3C] border-[#FF3C3C]"
            : "bg-white border-[#3D3D3D]"
        }`}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start gap-4">
        {item.logo && (
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`w-9 h-9 overflow-hidden flex items-center justify-center bg-white ${
                (item.noBorder || (item.org && item.org.includes("CSIRO"))) ? "" : "border border-[#E0E0E0]"
              }`}
              style={{ borderRadius: "22%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt={`${item.org} logo`}
                width={36}
                height={36}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs tracking-widest uppercase text-[#7A7A7A]">
              {item.period}
            </span>
            {item.tag && (
              <span className="border border-[#E0E0E0] px-2 py-0.5 text-xs tracking-wider uppercase text-[#7A7A7A]">
                {item.tag}
              </span>
            )}
            {item.current && (
              <span className="border border-[#FF3C3C] px-2 py-0.5 text-xs tracking-wider uppercase text-[#FF3C3C]">
                Current
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold leading-tight">{item.role}</h3>
          <p className="text-sm text-[#3D3D3D] mb-1">{item.org}</p>
          {item.orgDesc && (
            <p className="text-xs text-[#7A7A7A] mb-3 italic">{item.orgDesc}</p>
          )}

          <p className="text-sm text-[#3D3D3D] leading-relaxed mb-3">
            {item.summary}
          </p>

          {/* Expandable detail */}
          {item.bullets && (
            <>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="text-xs tracking-widest uppercase text-[#7A7A7A] hover:text-black
                           transition-colors duration-200 flex items-center gap-1 mb-3"
                aria-expanded={expanded}
              >
                {expanded ? "— Less" : "+ Details"}
              </button>

              {expanded && (
                <div className="animate-fade-in">
                  <ul className="space-y-1.5 mb-3">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[#3D3D3D]">
                        <span className="text-[#FF3C3C] flex-shrink-0 mt-0.5" aria-hidden="true">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {item.tools && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          className="border border-[#E0E0E0] px-2 py-0.5 text-xs text-[#7A7A7A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const [ref, inView] = useInView();
  const [tab, setTab] = useState("career");

  useEffect(() => {
    const handler = (e) => setTab(e.detail.tab);
    window.addEventListener("timeline-tab", handler);
    return () => window.removeEventListener("timeline-tab", handler);
  }, []);

  const items = tab === "career" ? CAREER : EDUCATION;

  return (
    <section id="timeline" className="py-24" aria-label="Career timeline">
      {/* Section header */}
      <div
        ref={ref}
        className={`mb-16 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">
          02 — Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Career Path
        </h2>
        <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
          A path built on curiosity across government intelligence, biomedical
          research, climate science, and software engineering — always looking
          for where data can make a genuine difference.
        </p>

        {/* Tab switcher */}
        <div className="flex gap-0 mt-8 border border-[#E0E0E0] w-fit">
          {["career", "education"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
                tab === t
                  ? "bg-[#FF3C3C] text-white border-[#FF3C3C]"
                  : "bg-white text-[#7A7A7A] hover:text-[#FF3C3C]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="timeline-line" aria-hidden="true" />
        <div className="pl-0">
          {items.map((item, i) => (
            <TimelineItem key={`${tab}-${i}`} item={item} index={i} isEdu={tab === "education"} />
          ))}
        </div>
      </div>
    </section>
  );
}
