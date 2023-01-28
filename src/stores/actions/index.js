// let data = [
//   {
//     companyToApply: "Brewed Delight",
//     positionToApply: ["Backend Developer", "Frontend Developer"],
//     fullName: "Udin Sedunia",
//     phoneNumber: "+628999928299292",
//     password: "123",
//     confirmPassword: "123",
//   },
// ];
const addData = (payload) => {
  return {
    type: "addUserData",
    payload: payload,
  };
};
export const companyToApplyTrigger = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "companyToApply",
        payload: [
          "Brewed Delight",
          "Noah's Coffee",
          "Royal Coffee",
          "Cup of Magic",
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const userList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "userList",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addDataUser = (input) => {
  return async (dispatch) => {
    try {
      let newObj = {
        ...input,
      };
      let number = newObj.phoneNumber;
      newObj.phoneNumber = `+62${number}`;
      dispatch(addData(newObj));
    } catch (error) {
      console.log(error);
    }
  };
};
