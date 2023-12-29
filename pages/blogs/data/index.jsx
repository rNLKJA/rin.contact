import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Image from "next/image";

import "@/styles/globals.css";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth={isMobile ? "xs" : "lg"}
      style={{
        width: isMobile ? "100%" : "1100px",
        backgroundColor: "",
      }}
    >
      <Header />
      <DataArticle />
      <Footer />
    </Container>
  );
}

export const DataArticle = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/more-about-data-science.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data && (
        <div className="flex flex-col py-10 px-4">
          <div className="flex flex-start justify-center items-center">
            <Image
              src="/article/more-about-data-science/data-intro.png"
              width={600}
              height={300}
              responsive
              quality={50}
              alt="data intro"
            />
          </div>

          <h2>
            The Transformative Impact of Data Science on Business Efficiency and
            Growth
          </h2>

          <div className="flex flex-start gap-3 py-5">
            <p className="leading-8">@rNLKJA</p>
            <p className="leading-8">29th-Dec-2023</p>
          </div>

          <div className="flex flex-col pb-10 gap-5">
            <p className="leading-8">{data.Introduction}</p>

            <h3>The Impact of Data Science on SMEs</h3>
            <p className="leading-8">
              {data["The Impact of Data Science on SMEs"]}
            </p>

            <div className="grid md:grid-cols-2">
              <div className="flex justify-center items-center">
                <Image
                  src="/article/more-about-data-science/data-case.png"
                  width={300}
                  height={300}
                  alt="data case"
                />
              </div>
              <div>
                <h3 className="py-5">Case Studies</h3>
                <p className="leading-8">
                  <ul className="list-disc pl-10">
                    <li>{data["Case Studies"].case1}</li>
                    <li>{data["Case Studies"].case2}</li>
                    <li>{data["Case Studies"].case3}</li>
                  </ul>
                </p>
              </div>
            </div>

            <h3>Tools and Technologies</h3>
            <p className="leading-8">{data["Tools and Technologies"]}</p>

            <div className="grid md:grid-cols-2">
              <div>
                <h3 className="py-5">Challenges and Solutions</h3>
                <p className="leading-8">
                  {data["Challenges and Solutions"].Description}
                </p>
                <ul class="list-disc pl-10">
                  <li>Use free or low-cost tools and platforms.</li>
                  <li>
                    Partner with universities or hire interns to access talent.
                  </li>
                  <li>
                    Implement strict data governance policies to ensure privacy
                    and compliance.
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/article/more-about-data-science/data-solution.png"
                  width={300}
                  height={300}
                  quality={50}
                  alt="data solution"
                />
              </div>
            </div>

            <h3>Best Practices</h3>
            <p className="leading-8">{data["Best Practices"]}</p>

            <div className="flex flex-start justify-center items-center">
              <Image
                src="/article/more-about-data-science/data-trend.png"
                width={800}
                height={300}
                responsive
                quality={50}
                alt="data intro"
              />
            </div>

            <h3>Future Trends"</h3>
            <p className="leading-8">{data["Future Trends"]}</p>

            <h3>Conclusion</h3>
            <p className="leading-8">{data.Conclusion}</p>

            <h3>References</h3>
            <ul className="list-disc pl-10">
              {data.References.map((ref) => (
                <li>{ref}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
