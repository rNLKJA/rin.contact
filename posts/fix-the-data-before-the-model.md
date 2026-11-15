---
title: "Fix the Data Before You Touch the Model"
date: "2026-11-07"
tags: ["data-science", "government", "decision-making", "data-governance"]
description: "How I organise data analysis around governance, from workflow mapping to reproducible reports, so the dataset can be trusted before anyone acts on it."
---

Since March, I have organised my data analysis around building a dataset that people can trust. Every figure my branch reports depends on my analysis, so each one must withstand scrutiny before it is acted on. Sound intelligence and decision-making depend on that trust. Because rubbish in means rubbish out, governance comes first. The work must also align with the Police Complaints and Discipline Act 2016 and the Public Sector Act 2009.

The process begins with workflow mapping. Using Visio, I document how each workflow operates and where each data point is recorded. I use the same maps to identify where data integrity is at risk, such as points where a record could be omitted, duplicated or altered as it moves between systems.

From these maps, I assign responsibility for each data point to a specific step in the process. Any missing or incorrect value can then be traced to the step where it originated.

I then document the business requirements, which define the questions each report must answer. I translate these requirements into SQL code that produces identical results each time it runs on the same data. Even where a spreadsheet is the practical solution, Power Query and SharePoint ensure reproducibility and productivity. Power Query records each transformation as a step, so the same process runs again on every refresh. SharePoint keeps the files and their version history in one place.

Before anything is reported, I align the results with the business requirements. Each report is issued with technical and decision documentation, so that it can be reproduced independently.

Together, these steps make each reported figure traceable through the code to its source record, and from that record to the step in the process responsible for it. The workflow maps also show where its integrity could have been compromised. This traceability is how I build trust in our dataset.

That trust must also be maintained over time. We need a proactive monitoring framework that confirms the data keeps working as expected and catches issues before they reach a report.

With that trust established, the analysis can inform decisions. I analyse organisation-wide trends and present them to senior management with practical recommendations. I also advise executives on whether data-dependent proposals are suitable and worth the cost. The same governance work also lays a strong foundation for future forecasting, statistical inference and research.

I lead this work through influence without formal authority, collaborating with all stakeholders to ensure that data capture aligns with business requirements. By the time a recommendation reaches a decision-maker, its quality has already been determined by these earlier steps.
