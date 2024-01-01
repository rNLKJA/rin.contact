import Container from "@mui/material/Container";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function StageComponent({ stageData }) {
  return (
    <Container className="flex flex-col gap-2">
      <Typography variant="h4" component="h1" gutterBottom>
        {stageData.title}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        {stageData.completion}
      </Typography>
      <Typography variant="body1" paragraph>
        This stage focuses on establishing a solid foundation in mathematical
        concepts and data analysis techniques that are essential for advanced
        problem-solving in data science. Here are the key areas of study and
        their outcomes:
      </Typography>

      {stageData.details.map((detail, index) => (
        <Link
          key={index}
          href={detail.link}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
          className="flex flex-col gap-5"
        >
          <Typography variant="h5" component="h3" className="link-hover">
            {detail.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {detail.content}
          </Typography>
        </Link>
      ))}
    </Container>
  );
}
