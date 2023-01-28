function Table(data) {
  return (
    <>
      <tr>
        <td>{data.index + 1}</td>
        <td>{data.data.companyToApply}</td>
        <td>
          {data?.data?.positionToApply.map((el) => {
            return (
              <>
                <li>{el}</li>
              </>
            );
          })}
        </td>
        <td>{data.data.fullName}</td>
        <td>{data.data.phoneNumber}</td>
      </tr>
    </>
  );
}
export default Table;
