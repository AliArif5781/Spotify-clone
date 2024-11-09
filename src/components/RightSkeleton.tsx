const PlaylistSkeleton = () => {
  return (
    <div
      className={`rightSection h-full overflow-y-auto w-full mx-4 rounded-xl p-4 bg-E-Black`}
    >
      <div className="mb-6 animate-pulse">
        <div className="flex">
          <div className="bg-gray-300 h-[250px] w-[300px] rounded-lg m-5"></div>
          <div className="flex items-center h-[270px] w-full px-10">
            <div className="flex-col">
              <div className="bg-gray-300 h-7 w-32 mb-2 rounded"></div>
              <div className="bg-gray-300 h-10 w-full mb-4 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="min-w-full text-lg text-left text-E-White px-5">
          <thead>
            <tr className="text-md text-gray-500 uppercase ">
              <th
                scope="col"
                className="px-6 py-3 bg-gray-300 h-4 rounded"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-300 h-4 rounded"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-300 h-4 rounded"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-300 h-4 rounded"
              ></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-400">
                <td className="px-6 py-4">
                  <div className="bg-gray-300 h-4 w-8 rounded"></div>
                </td>
                <td className="px-6 py-4 flex items-center">
                  <div className="bg-gray-300 h-[60px] w-[60px] rounded-lg"></div>
                  <div className="flex-col px-5">
                    <div className="bg-gray-300 h-4 w-32 mb-1 rounded"></div>
                    <div className="bg-gray-300 h-4 w-24 rounded"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-300 h-4 w-24 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-300 h-4 w-16 rounded"></div>
                </td>
              </tr>
            ))}
            {Array.isArray([]) && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-gray-500 text-sm">
                  <div className="bg-gray-300 h-4 w-full rounded"></div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistSkeleton;
