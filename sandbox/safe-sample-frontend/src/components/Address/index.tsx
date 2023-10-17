/**
 * Address Component
 * @param props 
 */
const Address = (props: any) =>{

  const {
    address
  } = props;

  return(
    <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      ContractWallet address:&nbsp;
      <code className="font-mono font-bold text-green-300">
        {address}
      </code>
    </p>
  );
};

export default Address;