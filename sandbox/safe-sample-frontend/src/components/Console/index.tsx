/**
 * Console component
 */
const Console = (props: any) => {

  const {
    events
  } = props;

  return(
    <div className="overflow-scroll col-start-2 col-span-2 row-span-2 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <div className="w-[1000px]">
        <div className="block whitespace-pre-wrap justify-center ">
          <pre>{events.join(`\n`)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Console;