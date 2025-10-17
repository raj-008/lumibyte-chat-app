import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <>
      <header className="bg-white dark:bg-neutral-800">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12 pl-2 sm:pl-5 text-lg">
            <div className="block text-blue-500 font-bold">Chat with Assistant 🤖</div>
          </div>
          <div>
            <DarkModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
