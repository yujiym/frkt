
/**
 * Button component
 * @returns 
 */
const Button = (porps: any) => {

  const {
    name,
    onClickFunction
  } = porps;

  return (
    <button
      type="button"
      onClick={onClickFunction}
      className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {name}
    </button>
  );
}

export default Button;