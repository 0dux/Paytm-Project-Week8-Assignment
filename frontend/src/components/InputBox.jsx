function InputBox({ title, placeholder, onChange, onKeyDown }) {
  return (
    <div>
      <h1 className="font-bold pb-1">{title}</h1>
      <input
        onKeyDown={onKeyDown}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
export default InputBox;
