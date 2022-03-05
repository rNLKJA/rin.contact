// import required contact images
import twitterImage from "../img/twitter.png";
import githubImage from "../img/github.png";
import linkedInImage from "../img/linkedIn.png";
import instagram from "../img/instagram.png";

// define the linkItem interface
export interface linkItemProp {
  image: string;
  alt: string;
  href: string;
}

// Please update your link description at here!
export const linkItems: linkItemProp[] = [
  {
    image: githubImage,
    alt: "Github",
    href: "https://github.com/chuangyu-hscy",
  },
  {
    image: linkedInImage,
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/chuangyu-hscy",
  },
  {
    image: instagram,
    alt: "Instagram",
    href: "https://www.instagram.com/chuangyu_hscy/",
  },
  {
    image: twitterImage,
    alt: "Twitter",
    href: "https://twitter.com/chuangyu_hscy",
  },
];
