import React from "react";
import data from "../../data/certifications";

function Certification() {
  return (
    <div className="h-auto py-32 flex flex-col justify-center items-center">
      <div className="w-4/5 grid grid-cols-3 gap-1 justify-center items-center ">
        <div className="h-48 flex flex-col justify-start items-center">
          <p className="w-full text-left text-2xl text bold">Certifications</p>
          <br />
          <ul className="w-full list-disc list-inside ">
            {data.map((item, index) => {
              return (
                <li key={item + index} className="text-xm">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="h-48 flex flex-col justify-start items-center">
          <p className="w-full text-left text-2xl text-bold">Barista Skills</p>
          <br />
          <ul className="w-full list-disc list-inside ">
            <li key="0">Coffee Appreciation (Market Lane Coffee)</li>
            <li key="1">Master Barista - Mk1 & MK2 (CBD College)</li>
            <li key="2">
              Coffee Making Course & Coffee Art Course (Barista Course
              Melbourne)
            </li>
          </ul>
        </div>

        <div className="h-48 flex flex-col justify-start items-center">
          <p className="w-full text-left text-2xl text-bold">Life Skills</p>
          <br />
          <ul className="w-full list-disc list-inside">
            <li key="3" className="text-xm">
              Mental Health First Aid for Tertiary Students
            </li>
            <li className="text-xm">First Aid</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Certification;
