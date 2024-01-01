import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import StageComponent from "@/components/layout/data-science/StageComponent";

const Stage2 = () => {
  const [stageData, setStageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data-science/course_stages.json");
        const data = await response.json();
        const stage2Data = data.find((stage) =>
          stage.title.includes("Stage 1"),
        );
        setStageData(stage2Data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!stageData) {
    return <Typography>Loading Stage 2 Data...</Typography>;
  }

  return <StageComponent stageData={stageData} />;
};

export default Stage2;