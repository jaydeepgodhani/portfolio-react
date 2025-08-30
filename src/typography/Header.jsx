import React from "react";

function removeSpecials(str) {
  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (lower[i] != upper[i] || lower[i].trim() === "") res += str[i];
  }
  return res.replaceAll(" ", "-");
}

const Header = ({ content, size }) => {
  const headingId = removeSpecials(content.toString());
  const className =
    "font-heading py-6 text-primary scroll-mt-[80px] animate-fade text-" + size;
  let Tag = "h4";
  if (size === "4xl") Tag = "h1";
  else if (size === "3xl") Tag = "h2";
  else if (size === "2xl") Tag = "h3";
  else if (size === "xl") Tag = "h4";
  return (
    <Tag className={className} id={headingId}>
      <a href={"#" + headingId} className="pointer">
        {content}
      </a>
    </Tag>
  );
};

export default Header;
