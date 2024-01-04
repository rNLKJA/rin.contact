import React from "react";
import { Fade } from "react-awesome-reveal";
import { Box, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import BlogAuthor from "@/components/specific/blogAuthor";

export default function BlogContent() {
  return (
    <Fade triggerOnce duration={1500} direction="left">
      <Box className="flex flex-col text-justify gap-4">
        <Typography variant="h4" component="h1">
          Intermediate SQL for Data Scientists: Enhancing Your Analysis Skills
        </Typography>

        <BlogAuthor author="rNLKJA" date="4th-Jan-2024" />
        <Typography paragraph className="leading-8">
          In this blog post, we delve into the world of intermediate SQL
          concepts, a pivotal tool in any data scientist's arsenal. SQL, or
          Structured Query Language, is instrumental for interacting with
          relational databases and executing sophisticated data analysis tasks.
          Whether you're just starting or looking to polish your skills,
          mastering these intermediate concepts will substantially boost your
          ability to manipulate and interpret data.
        </Typography>

        <Typography variant="h5" component="h2">
          Statistical Measures: Unveiling Patterns and Trends
        </Typography>
        <Typography paragraph className="leading-8">
          Data scientists often need to compute various statistical measures to
          understand the data's characteristics better. SQL serves this need
          with built-in functions for numerical data analysis. Functions like
          <strong> SUM()</strong>, <strong> AVG()</strong>,{" "}
          <strong> STDDEV()</strong>, <strong> VARIANCE()</strong>, and{" "}
          <strong> CORR()</strong> are essential tools in your arsenal. These
          functions help you uncover insights, revealing underlying patterns and
          trends that might not be immediately apparent.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`SELECT AVG(salary) 
FROM employees 
WHERE department = 'Sales';`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2">
          Grouping and Filtering Data: Gaining Deeper Insights
        </Typography>
        <Typography paragraph className="leading-8">
          When working with large datasets, it is often necessary to group data
          based on specific criteria. SQL's <strong>GROUP BY</strong> clause
          allows you to group rows based on one or more columns. This is useful
          for performing aggregate functions like <strong>SUM()</strong>,{" "}
          <strong>AVG()</strong>, and <strong>COUNT()</strong> on subsets of
          data. Additionally, the <strong>HAVING</strong> clause enables you to
          filter these grouped rows based on conditions you define, allowing for
          a more refined analysis.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`SELECT department, COUNT(*) 
FROM employees 
GROUP BY department
HAVING COUNT(*) {">"} 10;`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2">
          Joining and Filtering Data: Creating Comprehensive Datasets
        </Typography>
        <Typography paragraph className="leading-8">
          In real-world scenarios, data is often spread across multiple tables.
          SQL's <strong>JOIN</strong> operation allows you to merge rows from
          two or more tables based on related columns. This is useful for
          retrieving data that is spread across multiple tables and performing
          analysis on a comprehensive dataset.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`SELECT employees.name, departments.name 
FROM  employees 
INNER JOIN departments 
ON employees.department_id = departments.id`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2">
          Data Munging: Preparing Your Data for Analysis
        </Typography>
        <Typography paragraph className="leading-8">
          Data munging involves transforming and reformatting data to make it
          suitable for analysis. SQL provides powerful string and numeric
          functions to manipulate and transform data. You can use string
          functions like <strong>CONCAT()</strong>, <strong>SUBSTRING()</strong>
          , <strong>REPLACE()</strong>, and <strong>UPPER()/LOWER()</strong> to
          reformat character data. Numeric functions like{" "}
          <strong>ROUND()</strong>, <strong>TRUNC()</strong>, and{" "}
          <strong>CAST()</strong> allow you to reformat and manipulate numeric
          data.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`SELECT CONCAT(first_name, ' ', last_name) AS full_name 
FROM employees;`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2" className="leading-8">
          Filtering and Aggregation: Enhancing Data Analysis
        </Typography>
        <Typography paragraph>
          SQL offers various techniques for filtering and aggregating data. The
          <strong>HAVING</strong> clause allows you to find subgroups based on
          aggregated values. Subqueries can be used to retrieve column values or
          create temporary result sets. Additionally, the{" "}
          <strong>ROLLUP</strong> and <strong>CUBE</strong> operators enable you
          to create subtotals and total across dimensions, providing a deeper
          level of analysis.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`SELECT department, SUM(salary) 
FROM employees 
GROUP BY department WITH ROLLUP;`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2">
          Window Functions and Ordered Data: Calculating Advanced Metrics
        </Typography>
        <Typography paragraph className="leading-8">
          Window functions are a powerful feature in SQL that allow you to
          perform calculations on a set of rows related to the current row. This
          is useful for calculating moving averages, running totals, and
          rankings. By using the <strong>ORDER BY</strong> clause, you can
          specify the ordering of the rows and apply window functions to the
          ordered data.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`SELECT name, salary, 
    AVG(salary) OVER (PARTITION BY department) AS
            avg_department_salary 
FROM employees;`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2">
          Common Table Expressions (CTEs): Organizing Complex Queries
        </Typography>
        <Typography paragraph>
          Common Table Expressions (CTEs) are a valuable tool for breaking down
          complex queries into smaller, more manageable parts. With CTEs, you
          can create temporary named result sets that can be referenced within a
          query. This allows for better organization and readability of your SQL
          code. CTEs can also be used for recursive queries, which are
          particularly useful when dealing with hierarchical or recursive data
          structures.
        </Typography>
        <Box
          component="pre"
          sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
        >
          <SyntaxHighlighter language="sql" style={docco}>
            {`WITH recursive_cte AS 
(
    SELECT id, name 
    FROM employees 
    WHERE manager_id IS NULL 
    UNION ALL 
    SELECT e.id, e.name 
    FROM employees e
    INNER JOIN recursive_cte rcte ON e.manager_id = rcte.id
) 
SELECT *
FROM recursive_cte;`}
          </SyntaxHighlighter>
        </Box>

        <Typography variant="h5" component="h2">
          Conclusion: Empowering Your Data Analysis Journey
        </Typography>
        <Typography paragraph>
          Through this exploration of intermediate SQL concepts, we've equipped
          you with the tools to enhance your data analysis capabilities
          significantly. These techniques are foundational for any data
          scientist looking to leverage SQL's full potential. By embracing these
          concepts, you'll be well on your way to transforming raw data into
          meaningful insights, driving informed decisions, and unlocking new
          opportunities.
        </Typography>
      </Box>
    </Fade>
  );
}
