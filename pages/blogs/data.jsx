import { useState, useEffect } from "react";

import Image from "next/legacy/image";
import Typography from "@mui/material/Typography";

export default function Home() {
  return <DataArticle />;
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
    <div className="text-justify">
      {data && (
        <div className="flex flex-col py-10 px-4">
          <div className="flex flex-start justify-center items-center ">
            {/* <Image
              src="/article/more-about-data-science/data-intro.png"
              width={600}
              height={300}
              layout="responsive"
              quality={50}
              alt="data intro"
              priority={true}
            /> */}
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
            <Typography className="leading-8">{data.Introduction}</Typography>

            <h3>The Impact of Data Science on SMEs</h3>
            <Typography className="leading-8">
              {data["The Impact of Data Science on SMEs"]}
            </Typography>

            <div className="grid md:grid-cols-2">
              <div className="flex justify-center items-center">
                <Image
                  src="/article/more-about-data-science/data-case.png"
                  width={300}
                  height={300}
                  alt="data case"
                  layout="fixed"
                  priority={true}
                />
              </div>
              <div>
                <h3 className="py-5">Case Studies</h3>
                <div>
                  <ul className="list-disc pl-10 text-left">
                    <li>
                      <Typography>{data["Case Studies"].case1}</Typography>
                    </li>
                    <li>
                      <Typography>{data["Case Studies"].case2}</Typography>
                    </li>
                    <li>
                      <Typography>{data["Case Studies"].case3}</Typography>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>Tools and Technologies</h3>
            <Typography className="leading-8">
              {data["Tools and Technologies"]}
            </Typography>

            <div className="grid md:grid-cols-2">
              <div>
                <h3 className="py-5">Challenges and Solutions</h3>
                <Typography className="leading-8">
                  {data["Challenges and Solutions"].Description}
                </Typography>
                <div>
                  <ul className="list-disc pl-10 text-left">
                    <li>
                      <Typography>
                        Use free or low-cost tools and platforms.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Partner with universities or hire interns to access
                        talent.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Implement strict data governance policies to ensure
                        privacy and compliance.
                      </Typography>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/article/more-about-data-science/data-solution.png"
                  width={300}
                  height={300}
                  quality={50}
                  alt="data solution"
                  layout="fixed"
                  priority={true}
                />
              </div>
            </div>

            <h3>Best Practices</h3>
            <Typography className="leading-8">
              {data["Best Practices"]}
            </Typography>

            <div className="flex flex-start justify-center items-center">
              {/* <Image
                src="/article/more-about-data-science/data-trend.png"
                width={800}
                height={300}
                layout="responsive"
                quality={50}
                alt="data intro"
                priority={true}
              /> */}
            </div>

            <h3>Future Trends"</h3>
            <Typography className="leading-8">
              {data["Future Trends"]}
            </Typography>

            <h3>Conclusion</h3>
            <Typography className="leading-8">{data.Conclusion}</Typography>

            <h3>References</h3>
            <div>
              <ul className="list-disc pl-10">
                {data.References.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
