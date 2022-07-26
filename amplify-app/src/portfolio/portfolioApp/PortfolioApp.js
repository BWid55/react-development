import styles from "./PortfolioApp.module.css";
import { useState } from "react";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTsnode,
  SiAwsamplify,
  SiGraphql,
} from "react-icons/si";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { RiReactjsLine } from "react-icons/ri";
import {
  AiOutlineMail,
  AiFillPlusSquare,
  AiFillMinusSquare,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { FaNode } from "react-icons/fa";

function PortfolioApp(props) {
  const [bioExpanded, setBioExpanded] = useState(false);

  const bioExpanderHandler = () => {
    setBioExpanded(!bioExpanded);
  };
  const openGratitudesAppHandler = () => {
    props.onClickGratitudesAppButton();
  };
  const openEcommerceMockupHandler = () => {
    props.onClickEcommerceMockupButton();
  };

  const contactInfoElements = [
    { icon: <AiOutlineMail size={25} />, text: "Brendan.Widmer@gmail.com" },
    {
      icon: <FiLinkedin size={25} />,
      text: "linkedin.com/in/brendan-widmer",
    },
    { icon: <FiGithub size={25} />, text: "github.com/BWid55" },
    { icon: <BiMapPin size={25} />, text: "Nashville, TN" },
  ];
  const iconCards = [
    {
      icon: <SiHtml5 size={70} />,
      text: (
        <p>
          HTML 5<br />a markup language used for structuring and presenting
          content
        </p>
      ),
    },
    {
      icon: <SiCss3 size={70} />,
      text: (
        <p>
          CSS 3<br />a style sheet language used for describing how HTML
          elements should be displayed
        </p>
      ),
    },
    {
      icon: <SiSass size={70} />,
      text: (
        <p>
          SCSS
          <br />a preprocessor scripting language that is compiled into CSS
        </p>
      ),
    },
    {
      icon: <SiJavascript size={70} />,
      text: (
        <p>
          JavaScript
          <br />a programming language that is one of the core technologies of
          the web
        </p>
      ),
    },
    {
      icon: <RiReactjsLine size={70} />,
      text: (
        <p>
          React.js
          <br />a front-end JavaScript library for building user interfaces
          based on UI components
        </p>
      ),
    },
    {
      icon: <SiGraphql size={70} />,
      text: (
        <p>
          GraphQL
          <br />a data query and manipulation language for APIs
        </p>
      ),
    },
    {
      icon: <SiTsnode size={70} />,
      text: (
        <p>
          TypeScript
          <br />a strict syntactical superset of JavaScript that adds optional
          static typing to the language
        </p>
      ),
    },
    {
      icon: <FaNode size={70} />,
      text: (
        <p>
          Node.js
          <br />a JavaScript runtime environment that runs on the V8 engine and
          executes JavaScript code outside a web browser
        </p>
      ),
    },
    {
      icon: <SiAwsamplify size={70} />,
      text: (
        <p>
          Amplify
          <br />a set of purpose-built tools that lets frontend web developers
          quickly and easily build full-stack applications
        </p>
      ),
    },
  ];
  const experienceCards = [
    {
      company: "btw.codes",
      jobTitle: "Frontend Web Developer",
      duties: [
        "Make personalized connections with potential clients, requiring excellent interpersonal skills",
        "Create and maintain websites including products, customizations, and particular web pages necessitating exceptional attention to detail",
        "Key responsible party – if something is promised I must deliver (researching and identifying solutions to expand my capabilities)",
      ],
    },
    {
      company: "monq",
      jobTitle: "Frontend Web Developer",
      duties: [
        "Create and maintain website including products, customizations, and web pages",
        "Make requested changes to site including integration of third-party applications and visual adjustments",
        "Complete  other technical duties related to website health including inventory data management, movement of customer data through APIs, and site procedure refinement",
      ],
    },
  ];
  const projectCards = [
    {
      name: "This Portfolio!",
      description:
        "This portfolio and all connected projects, while using different technologies and created separately, are incorporated into the same overall project. The tech listed below is used on this page specifically.",
      tech: ["React", "CSS Modules", "React Icons", "React Scroll"],
      button: null,
    },
    {
      name: "Gratitudes Application",
      description:
        "An app where a user can submit what they are feeling grateful for and retrieve another user's submission. The API and database functionality is hosted on AWS servers.",
      tech: [
        "React",
        "Ant Design",
        "AWS Amplify",
        "AWS Cognito",
        "AWS API Gateway",
        "AWS Lambda",
        "AWS DynamoDB",
      ],
      button: <button onClick={openGratitudesAppHandler}>View Project</button>,
    },
    {
      name: "Headless Ecommerce",
      description:
        "IN PROGRESS: A headless ecommerce website using Shopify as its CMS. This project is functional and will release as the official code source for the store. My favorite code pieces are the cart and the custom text products!",
      tech: [
        "React",
        "React Router",
        "React Spring",
        "React Draggable",
        "React Icons",
        "SCSS",
        "GraphQL",
        "Shopify",
      ],
      button: (
        <button onClick={openEcommerceMockupHandler}>View Project</button>
      ),
    },
  ];

  return (
    <div id="portfolio" className={styles.portfolio}>
      <div className={styles.header}>
        <h1>Portfolio</h1>
      </div>
      <div className={styles.headerInfo}>
        <h2>Brendan Widmer</h2>
        <h3>Frontend Web Developer</h3>
        <p>Build through learning - learn through building</p>
      </div>
      <p className={styles.bio}>
        I have been coding for three years and have been working in and
        passionately pursuing frontend for two!
      </p>
      <div className={`${styles.bioExpand} ${bioExpanded && styles.expanded}`}>
        <p>
          In that time I have developed more than just an excellent body of
          knowledge in modern frontend technology. I have also learned a lot
          about how computers function at their most fundamental level and, more
          importantly, I have bettered my ability to comprehend effectively and
          efficiently, how to communicate my insights and shortcomings in a team
          environment, and how to solve complex problems I have never
          encountered before. I have worked on numerous living projects while{" "}
          <a href="https://btw.codes" target="_blank" rel="noopener noreferrer">
            freelancing <FiExternalLink />
          </a>{" "}
          as well as my professional positions and want to take the skills I
          have to a team that can use them and expand on them — allowing me to
          simultaniously be useful and continue growing.
        </p>
      </div>
      {!bioExpanded && (
        <div className={styles.bioExpanderElement} onClick={bioExpanderHandler}>
          <p>Read more</p>
          <AiFillPlusSquare size={20} />
        </div>
      )}
      {bioExpanded && (
        <div className={styles.bioExpanderElement} onClick={bioExpanderHandler}>
          <p>Show less</p>
          <AiFillMinusSquare size={20} />
        </div>
      )}
      <div className={styles.contactInfo}>
        <div className={styles.contactInfoRestricted}>
          {contactInfoElements.map((element, index) => (
            <div key={index} className={styles.contactInfoElement}>
              {element.icon}
              {element.text}
            </div>
          ))}
        </div>
      </div>
      <h2 id="skills" className={styles.skillsHeader}>
        MY SKILLS
      </h2>
      <div className={styles.skillCards}>
        <div className={styles.skillCardsRestricted}>
          {iconCards.map((card, index) => (
            <label key={index}>
              <input type="checkbox" />
              <div className={styles.card}>
                <div className={styles.front}>
                  {card.icon}
                  <AiOutlineArrowRight
                    size={22.5}
                    className={styles.cardArrow}
                  />
                </div>
                <div className={styles.back}>
                  <span>
                    {card.text}
                    <AiOutlineArrowLeft
                      size={22.5}
                      className={styles.cardArrow}
                    />
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <h2 id="experience" className={styles.experienceHeader}>
        EXPERIENCE
      </h2>
      <div className={styles.experienceCards}>
        {experienceCards.map((experience, index) => (
          <div key={index} className={styles.experienceCard}>
            <h3>
              <span className={styles.companyFirstLetter}>
                {experience.company.charAt(0)}
              </span>
              {experience.company.substring(1)}
            </h3>
            <p>{experience.jobTitle}</p>
            <ul>
              {experience.duties.map((duty, index) => (
                <li key={index}>{duty}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h2 id="projects" className={styles.projectsHeader}>
        PROJECTS
      </h2>
      <div className={styles.projectCards}>
        {projectCards.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className={styles.tech}>
              <ul>
                <li className={styles.projectCardTechIcon}>TECH</li>
                {project.tech.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            {project.button}
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default PortfolioApp;
