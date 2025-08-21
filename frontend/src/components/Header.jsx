function Header({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center h-1/5">
      <h1 className="text-black font-extrabold text-4xl mt-4 tracking-wider ">
        {title}
      </h1>
      <p className="mt-4 text-gray-700">{subtitle}</p>
    </div>
  );
}

export default Header;
