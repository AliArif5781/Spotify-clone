const NavbarSkeleton = () => {
  return (
    <div className="login-in-section flex animate-pulse">
      {
        <div className="relative mr-3 group">
          <span className="w-8 h-8 flex items-center justify-center text-white bg-D-Black rounded-full cursor-pointer shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            {/* {data?.display_name.charAt(0)} */}
          </span>
          <div className="bg-gray-900 text-white text-sm rounded shadow-lg absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex">
            <p className="w-auto whitespace-nowrap overflow-hidden text-ellipsis text-center p-2">
              {/* {data?.display_name} */}
            </p>
          </div>
        </div>
      }
    </div>
  );
};

export default NavbarSkeleton;
