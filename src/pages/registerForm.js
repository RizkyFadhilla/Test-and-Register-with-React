import { companyToApplyTrigger } from "../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addDataUser } from "../stores/actions";
import "./register.css";
function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { data, loading } = useSelector((state) => state);
  const [input, setInput] = useState({
    companyToApply: "",
    positionToApply: [],
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState({
    companyToApply: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;
    let newObj = {
      ...input,
    };
    newObj[name] = value;
    if (name === "fullName") {
      let split = value.split(" ");
      let validate = {
        ...validation,
      };
      let cekSymbol = value.match(/[|\\/~^:,;?!&%$@*+]/);
      if (cekSymbol) {
        validate = {
          ...validation,
          fullName:
            "Must be a text with a minimum of 3 character of 2 words representing First Name and Last Name",
        };
      } else {
        if (split.length < 2) {
          validate = {
            ...validation,
            fullName:
              "Must be a text with a minimum of 3 character of 2 words representing First Name and Last Name",
          };
        } else {
          split.forEach((element) => {
            if (element.length <= 3) {
              validate = {
                ...validation,
                fullName:
                  "Must be a text with a minimum of 3 character of 2 words representing First Name and Last Name",
              };
            } else {
              validate = {
                ...validation,
                fullName: "",
              };
            }
          });
        }
      }
      setValidation(validate);
    }
    if (name === "password") {
      let validate = {
        ...validation,
      };
      validate = {
        ...validation,
        password: "Looks good! Don't worry, we won't tell anyone.",
      };
      setValidation(validate);
    }
    if (name === "confirmPassword") {
      let validate = {
        ...validation,
      };
      if (newObj["password"] !== newObj["confirmPassword"]) {
        validate = {
          ...validation,
          confirmPassword: "Password doesnt match",
        };
      } else {
        validate = {
          ...validation,
          confirmPassword: "Looks good!",
        };
      }
      setValidation(validate);
    }
    if (name === "companyToApply") {
      let validate = {
        ...validation,
      };
      validate = {
        ...validation,
        companyToApply: "Looks good!",
      };
      setValidation(validate);
    }
    setInput(newObj);
  }
  function checkbox(event) {
    let value = event.target.value;
    let newObj = {
      ...input,
    };
    if (event.target.checked) {
      newObj["positionToApply"].push(value);
    } else if (!event.target.checked) {
      newObj["positionToApply"] = newObj["positionToApply"].filter(
        (el) => el !== value
      );
    }
    setInput(newObj);
  }
  function toggleAll(event) {
    let name = event.target.name;
    let newObj = {
      ...input,
    };
    let checkboxes = document.getElementsByName(name);
    if (event.target.checked) {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
      }
      newObj["positionToApply"] = [
        "Backend Developer",
        "Frontend Developer",
        "Quality Assurance",
        "Devops",
      ];
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
      newObj["positionToApply"] = [];
    }
    setInput(newObj);
  }
  function phoneHandler(event) {
    let value = event.target.value;
    let newObj = {
      ...input,
    };
    newObj["phoneNumber"] = value;

    let cek = value.split("");
    let validate = {
      ...validation,
    };
    let condition = cek.every((el) => !isNaN(el));
    if (cek.length <= 11 || !condition) {
      validate = {
        ...validation,
        phoneNumber: "Must Be a Mobile Number with minimum of 11 digits",
      };
    } else if (cek.length > 11 && condition) {
      validate = {
        ...validation,
        phoneNumber: "",
      };
    }
    setInput(newObj);
    setValidation(validate);
  }
  function showOrdHidePassword(event, name) {
    if (name === "password") {
      let a = document.getElementsByName(name);
      if (a[0].type === "password") {
        a[0].type = "text";
      } else {
        a[0].type = "password";
      }
    } else {
      let a = document.getElementsByName(name);
      if (a[0].type === "password") {
        a[0].type = "text";
      } else {
        a[0].type = "password";
      }
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    if (
      validation.fullName !== "" ||
      validation.phoneNumber !== "" ||
      validation.password !==
        "Looks good! Don't worry, we won't tell anyone." ||
      validation.confirmPassword !== "Looks good!" ||
      validation.companyToApply !== "Looks good!"
    ) {
      Swal.fire({
        icon: "error",
        title: "Please cek the error",
      });
    } else {
      if (input.positionToApply.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Please fill the position",
        });
      } else {
        dispatch(addDataUser(input))
          .then((result) => {
            Swal.fire({
              icon: "success",
              title: "Submit Success",
            });
          })
          .then(() => {
            navigate("/");
          });
      }
    }
  }

  useEffect(() => {
    dispatch(companyToApplyTrigger());
  }, [dispatch]);
  if (loading) {
    <h1>Please Wait</h1>;
  }
  return (
    <div>
      <div>
        <main style={{ backgroundColor: "whitesmoke" }}>
          <form onSubmit={submitHandler}>
            <h1>Join Us!</h1>
            <div>
              <label>Company To Apply :</label>
              <br />
              <select
                aria-label="Default select example"
                value={input.companyToApply}
                name="companyToApply"
                onChange={changeHandler}
              >
                <option selected disabled value="">
                  Open this select menu
                </option>
                {data?.map((el) => {
                  return <option value={el}>{el}</option>;
                })}
              </select>
            </div>
            <br />
            <p style={{ color: "green" }}>{validation.companyToApply}</p>
            <br />
            <label htmlFor="floatingInput">Position To Apply</label>
            <br />
            <div>
              <input
                type="checkbox"
                id="floatingInput"
                value="Backend Developer"
                name="PositionToApply"
                onChange={checkbox}
              />
              Backend Developer
              <br />
              <input
                type="checkbox"
                id="floatingInput"
                value="Frontend Developer"
                name="PositionToApply"
                onChange={checkbox}
              />
              Frontend Developer
              <br />
              <input
                type="checkbox"
                id="floatingInput"
                value="Quality Assurance"
                name="PositionToApply"
                onChange={checkbox}
              />
              Quality Assurance
              <br />
              <input
                type="checkbox"
                id="floatingInput"
                value="Devops"
                name="PositionToApply"
                onChange={checkbox}
              />
              Devops
              <br />
              <input
                type="checkbox"
                id="floatingInput"
                value="Check All"
                name="PositionToApply"
                onChange={toggleAll}
              />
              Check All
            </div>
            <br />
            <label htmlFor="floatingPassword">Full Name</label>
            <br />
            <div>
              <input
                type="text"
                id="floatingPassword"
                name="fullName"
                placeholder="Full Name"
                value={input.fullName}
                onChange={changeHandler}
              />
            </div>
            <br />
            <p style={{ color: "red" }}>{validation.fullName}</p>
            <br />
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="phoneNumber"
                value={input.phoneNumber}
                onChange={phoneHandler}
              />
              <br />
              <p style={{ color: "red" }}>{validation.phoneNumber} </p>
              <br />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={changeHandler}
              />
            </div>
            <input
              type="checkbox"
              onClick={(e) => showOrdHidePassword(e, "password")}
            />
            Show Password
            <br />
            {validation.password}
            <br />
            <div>
              <label>Confirm Password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={input.confirmPassword}
                onChange={changeHandler}
              />
            </div>
            <input
              type="checkbox"
              onClick={(e) => showOrdHidePassword(e, "confirmPassword")}
            />
            Show Password
            <br />
            {validation.confirmPassword}
            <br />
            <div>
              <input type="submit" value={"Register"} />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
export default RegisterForm;
