function BottomWarning({ text, link, to }) {
  return (
    <>
      {text}{" "}
      <a href={to} className="text-blue-500 hover:underline">
        {link}
      </a>
    </>
  );
}

export default BottomWarning;
