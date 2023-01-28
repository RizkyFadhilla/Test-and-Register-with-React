let initialState = {
  data: [],
  dataUser: [
    {
      companyToApply: "Brewed Delight",
      positionToApply: ["Backend Developer", "Frontend Developer"],
      fullName: "Udin Sedunia",
      phoneNumber: "+628999928299292",
      password: "123",
      confirmPassword: "123",
    },
  ],
  loading: true,
  loadingDataUser: true,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "companyToApply":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "userList":
      return {
        ...state,
        loadingDataUser: false,
      };
    case "addUserData":
      initialState.dataUser.push(action.payload);
      console.log(state, "reducer");
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default rootReducer;
