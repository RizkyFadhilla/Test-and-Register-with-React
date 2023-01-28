import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userList } from "../stores/actions";
import './table.css'
function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataUser, loadingDataUser } = useSelector((state) => state);
  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);
  function goToRegister() {
    navigate("/register");
  }
  if (loadingDataUser) {
    return <h1>Please Wait</h1>;
  }
  console.log(dataUser, "ini di data user");
  return (
    <div>
      <h1>ini user List</h1>
      <button onClick={goToRegister}>go to Register</button>
      <br />
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Company To Apply</th>
            <th>Position To Apply</th>
            <th>Full Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {dataUser?.map((el, index) => {
            console.log(el);
            return (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.companyToApply}</td>
                  <td>{el.positionToApply}</td>
                  <td>{el.fullName}</td>
                  <td>{el.phoneNumber}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default UserList;
