import React from "react";

export default function BlogAuthor({ author, date }) {
  return (
    <div className="flex flex-row gap-5 py-5">
      <p>@{author}</p>
      <p>{date}</p>
    </div>
  );
}
