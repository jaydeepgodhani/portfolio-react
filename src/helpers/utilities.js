import { knowledgeDocs, metadata } from "./metadata";

const weekday = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

const dark = () => {
  document.documentElement.classList.add(DARK);
  localStorage.theme = DARK;
  window.dispatchEvent(new Event("storage"));
};

const light = () => {
  document.documentElement.classList.remove(DARK);
  localStorage.theme = LIGHT;
  window.dispatchEvent(new Event("storage"));
};

export const DARK = "dark";
export const LIGHT = "light";

export function showTime() {
  const time = new Date();
  return (
    weekday[time.getDay()] +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ", Bengaluru"
  );
}

export const themeSwitcher = (mode) => {
  if (!("theme" in localStorage)) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dark();
    } else {
      light();
    }
  } else {
    if (mode === DARK) {
      dark();
    } else {
      light();
    }
  }
};

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array) {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export function getMapOfTags(content) {
  const mapOfTags = {};
  for (const obj of content) {
    for (const tag of obj["tags"]) {
      if (mapOfTags[tag]) {
        mapOfTags[tag] = mapOfTags[tag] + 1;
      } else {
        mapOfTags[tag] = 1;
      }
    }
  }
  return mapOfTags;
}

export function getMapOfPosts(content) {
  const mapOfPosts = new Map();
  for (const obj of content) {
    const year = obj.date.split("-")[0];
    const num = Number(year);
    if (mapOfPosts.has(num)) {
      mapOfPosts.get(num).push(obj);
    } else {
      mapOfPosts.set(num, [obj]);
    }
  }
  return mapOfPosts;
}

export function dateToReadable(date) {
  const dateString = new Date(Date.parse(date)).toDateString();
  const firstIndex = dateString.indexOf(" ");
  const lastIndex = dateString.lastIndexOf(" ");
  return dateString.slice(firstIndex + 1, lastIndex);
}

export function isPostAvailable(sublink, post) {
  let listOfArticles = [];
  if (sublink === 'knowledge') {
    listOfArticles = knowledgeDocs;
  } else if (sublink === 'posts') {
    listOfArticles = metadata;
  }
  let flag = false;
  for (let i = 0; i < listOfArticles.length; i++) {
    if (listOfArticles[i].link === post) {
      flag = true;
      break;
    }
  }
  return flag;
}

export const paragraphs = {
  aboutme: [
    "I am a software engineer based out of Bengaluru. I am currently working at Walmart.",
    "This website is my humble abode on the internet, where I pen my musings in here about software development, specifically JavaScript, TypeScript and web technologies in general.",
    "In the world of AI I still fascinate for Frontend Technology, is that a crime ?",
  ],
};

export const textBlocks = {
  experience: [
    [
      "SDE III, SDE II (2 years), Intern (6 months)",
      "Walmart\nJan20 - Present",
      "Working as Full stack developer as well as Automation Engineer, got Bravo award for exceptional contribution and multiple badges as well.",
    ],
    [
      "Associate Software Engineer",
      "Accenture (1 year)\nOct15 - Oct16",
      "Worked as a Developer, this position involved Data Conversion, Report Generation and Developing Interfaces in Oracle Applications",
    ],
    [
      "Homo Sapien",
      "Earth (30 year)\nJan94 - Present",
      "Living life at fullest. Making mistakes, forming bonds, creating memories along the way.",
    ],
  ],
  corpprojects: [
    [
      "Service Principal\nNov 21...",
      "Service Principal is an identity created for use with applications, hosted services, and automated tools to access Azure resources. We provide a portal and dashboard for application team to directly access service principal without having the deep knowledge of azure portal and even DBA team's intervention which in turn helps both the team to save majority of the time",
      "Tech Stack : Spring Boot, React JS, PostgresDB, Azure Portal, Akeyless",
    ],
    [
      "Firepass\nJune 21...",
      "It is a privileged access management (PAM) system for normal/ emergency time-bound ad-hoc remote access to databases by operational users (privileged, application developers, non-service accounts) to perform certain tasks. It is a mechanism of Authentication and Authorization of user to the database securely and Generates and manages ephemeral database credentials based on Role-Based Ac- cess Controls (RBAC)",
      "Tech Stack : Ansible, Python, Hashicorp Vault, Javascript, Akeyless",
    ],
    [
      "Migration Automation\nMarch 21 - Aug 21",
      "Migration Automation aka DMAAS (Database Migration As A Service) is a automation framework around Attunity tool which offers sql to sql migration and related activities to users and thus minimizing interaction between end user and migration team so that migration team can focus on prioritised complex task and this we saved 1500+ working hours",
      "Tech Stack : Ansible, Python, Attunity, HTML, Javascript",
    ],
  ],
  personalprojects: [
    [
      "Hyperledger Supply Chain (BlockChain)",
      "The project was mainly focused on preventing counterfeiting of drugs by creating fully functional supply chain by using blockchain technology with the help of hyperledger",
      "Tech Stack : Hyperledger Fabric, Node.js, GoLang",
    ],
    [
      "Online Quize using DevOps methodology",
      "This project included creation of web-app in TypeScript and NodeJS and Google Firebase to store the data. Main focus here is to apply the opensource DevOps tools",
      "Tech Stack :Typescript, FireBase, Bootstrap, Git, Jenkins, Docker, Kibana",
    ],
    [
      "SanFrancisco Crime Classification",
      "Trained the model using given dataset that includes Date, Category, DayOfWeek, Latitude, Longitude etc, then predicted the category of crime that occurred, given the time and location only",
      "Tech Stack : Python, Jupyter, Numpy, Pandas, MatPlotLib",
    ],
  ],
};

export const textList = {
  skills: [
    "Programming : ReactJS, Spring Boot, Javascript, Java, PostgresDB",
    "Additional : Akeyless, Hashicorp Vault, Github, Ansible, Docker, Jenkins, Attunity, Photoshop",
  ],
  certifications: [
    "Introduction to Mathematical Thinking by Standford Online",
    "Mathematics for Machine Learning: Linear Algebra by Imperial College London",
    "Prompt Engineering for ChatGPT by Vanderbilt University",
    "Storytelling and influencing: Communicate with impact by Macquarie University",
  ],
  achievements: [
    "Received a Walmart Excellence Award, Bravo Award and Rookie of the Year Award",
    "Graphic Designer in 8BIT IIITB college magazine",
    "Organized Online Gaming event in IIITB college sportfest Spandan-2019 and volunteering in alumni event Sangam-2018",
    "Secured B Grade in Drawing competition conducted by Gujarat state examination board",
    "Core Team Member (Designing) at National Level Event of Human Powered Vehicle Challenge EGVC-2014",
    "Event Organizer in LDCE College Festival Teqnix-2013",
    "CCNA : Completed certified course in HCL Technology",
  ],
};
