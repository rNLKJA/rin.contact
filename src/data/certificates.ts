// define the ts types for certificate item
export interface certificate {
  title: string;
  authLink: string;
  issueDate: string;
}

// define certificates array, certificate should sort in an descending order
// you should put things which are the newest and most relevant to your
// required job at the top!
export const certificates: certificate[] = [
  {
    title: "Google Project Management",
    authLink: "",
    issueDate: "IN PROGRESS",
  },
  {
    title: "Artificial Intelligence Specialization",
    authLink: "",
    issueDate: "IN PROGRESS",
  },
  {
    title: "Agile with Atlassian Jira",
    authLink:
      "https://www.coursera.org/account/accomplishments/certificate/M55XTFHKHJH4",
    issueDate: "2021 - 11",
  },
  {
    title: "Google Data Analytics",
    authLink:
      "https://www.credly.com/badges/1574e63e-3bce-4b5e-9eaa-f5f85b0b4848?source=linked_in_profile",
    issueDate: "2021 - 06",
  },
  {
    title: "Probability and Statistics for Business and Data Science",
    authLink:
      "https://www.linkedin.com/in/chuangyu-hscy/details/certifications/",
    issueDate: "2020 - 11",
  },
  {
    title: "Mental Health First Aid for Tertiary Students Blended Course",
    authLink:
      "https://www.linkedin.com/in/chuangyu-hscy/details/certifications/",
    issueDate: "2019 - 22",
  },
];
