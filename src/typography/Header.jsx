function removeSpecials(str) {
  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (lower[i] != upper[i] || lower[i].trim() === "") res += str[i];
  }
  return res.replaceAll(" ", "-");
}

function handleAnchorClick(event) {
  if (event.target.tagName === "A" && event.target.hash) {
    event.preventDefault();
    document
      .getElementById(event.target.hash.slice(1))
      ?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", event.target.hash); // this updates hash in the bar, but does NOT reload component
  }
}

const Header = ({ content, size }) => {
  const headingId = removeSpecials(content.toString());
  const className =
    "font-heading py-6 text-primary scroll-mt-[50px] text-" + size;
  let Tag = "h4";
  if (size === "4xl") Tag = "h1";
  else if (size === "3xl") Tag = "h2";
  else if (size === "2xl") Tag = "h3";
  else if (size === "xl") Tag = "h4";
  return (
    <Tag className={className} id={headingId}>
      <a
        href={"#" + headingId}
        className="pointer"
        rel="noopener noreferrer"
        onClick={handleAnchorClick}
      >
        {content}
      </a>
    </Tag>
  );
};

export default Header;
