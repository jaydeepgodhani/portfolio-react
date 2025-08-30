import React from 'react';

function removeSpecials(str) {
  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (lower[i] != upper[i] || lower[i].trim() === "") res += str[i];
  }
  return res.replaceAll(" ", "-");
}

const Header = ({ content }) => {
  const headingId = removeSpecials(content.toString());
  return (
    <h4 className="font-heading text-xl py-6 text-primary scroll-mt-[80px]" id={headingId}>
      <a href={"#" + headingId} className="pointer">
        {content}
      </a>
    </h4>
  );
}

export default Header