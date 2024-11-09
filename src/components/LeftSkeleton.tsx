const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="">
        <div
          className="bg-E-Black rounded-lg m-2"
          style={{ width: "180px", height: "30px" }}
        ></div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
