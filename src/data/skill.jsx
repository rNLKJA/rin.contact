import {
  DiPython,
  DiDatabase,
  DiSpark,
  DiCreativecommonsBadge,
  DiMysql,
  DiVim,
  DiVisualstudio,
  DiBootstrap,
} from "react-icons/di";
import {
  SiJupyter,
  SiPandas,
  SiNumpy,
  SiRstudio,
  SiPlotly,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiDjango,
  SiGithub,
  SiGithubactions,
  SiGoogletagmanager,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNotion,
  SiSlack,
  SiGooglecloud,
  SiMicrosoftoffice,
  SiArtixlinux,
} from "react-icons/si";
import { BsFillFileSpreadsheetFill } from "react-icons/bs";
import { AiFillProject } from "react-icons/ai";
import { RiDiscussFill } from "react-icons/ri";
import { BiStats } from "react-icons/bi";
import { GiMeshNetwork } from "react-icons/gi";
import { MdOutlineAnalytics } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
import { GiSpiderWeb } from "react-icons/gi";

const img_size = 70;
const skill_data = {
  core_skills: [
    {
      name: "Python",
      img: <DiPython size={img_size} />,
    },
    {
      name: "Jupyter",
      img: <SiJupyter size={img_size} />,
    },
    {
      name: "Visualization",
      img: <SiPlotly size={img_size} />,
    },
    { name: "Analytics", img: <MdOutlineAnalytics size={img_size} /> },
    // { name: "Problem Solving", img: <TbReportAnalytics size={img_size} /> },
    { name: "Git", img: <SiGithub size={img_size} /> },
    { name: "CI/CD", img: <SiGithubactions size={img_size} /> },
  ],
  db_skills: [
    {
      name: "DBMS/SQL",
      img: <DiMysql size={img_size} />,
    },
    { name: "MongoDB", img: <SiMongodb size={img_size} /> },
    { name: "Firebase", img: <SiFirebase size={img_size} /> },
    { name: "ERD", img: <DiDatabase size={img_size} /> },
  ],
  ds_skills: [
    {
      name: "R",
      img: <SiRstudio size={img_size} />,
    },
    {
      name: "S/S",
      img: <BsFillFileSpreadsheetFill size={img_size} />,
    },
    {
      name: "Pandas",
      img: <SiPandas size={img_size} />,
    },
    {
      name: "Numpy",
      img: <SiNumpy size={img_size} />,
    },
    { name: "PySpark", img: <DiSpark size={img_size} /> },
    { name: "Statistics", img: <BiStats size={img_size} /> },
    { name: "ML", img: <GiMeshNetwork size={img_size} /> },
    { name: "Scraper", img: <GiSpiderWeb size={img_size} /> },
  ],
  critical_skills: [],
  fs_skills: [
    { name: "React.js", img: <SiReact size={img_size} /> },
    { name: "HTML", img: <SiHtml5 size={img_size} /> },
    { name: "CSS", img: <SiCss3 size={img_size} /> },
    { name: "BootStrap", img: <DiBootstrap size={img_size} /> },
    { name: "JavaScript", img: <SiJavascript size={img_size} /> },
    { name: "Node.js", img: <SiNodedotjs size={img_size} /> },
    { name: "Django", img: <SiDjango size={img_size} /> },
  ],
  project_soft_skills: [
    { name: "Leadership", img: <SiGoogletagmanager size={img_size} /> },
    { name: "Creativity", img: <DiCreativecommonsBadge size={img_size} /> },
    { name: "Negotiation", img: <RiDiscussFill size={img_size} /> },
    { name: "Agile", img: <AiFillProject size={img_size} /> },
    { name: "Notion", img: <SiNotion size={img_size} /> },
    { name: "Slack", img: <SiSlack size={img_size} /> },
  ],
  program_skills: [
    { name: "Linux", img: <SiArtixlinux size={img_size} /> },
    { name: "Vim", img: <DiVim size={img_size} /> },
    { name: "VScode", img: <DiVisualstudio size={img_size} /> },
    { name: "Office", img: <SiMicrosoftoffice size={img_size} /> },
    { name: "G-Cloud", img: <SiGooglecloud size={img_size} /> },
  ],
};

export default skill_data;
