function Button({ title, onClick }) {
  return (
    <button onClick={onClick} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
      {title}
    </button>
  );
}
export default Button;
