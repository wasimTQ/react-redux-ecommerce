import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import User from "../../api/user";
import ValidatedPasswordField from "../../components/shared/ValidatedPasswordField";
import ValidatedTextField from "../../components/shared/ValidatedTextField";
import { AuthenticationContext } from "../../store/context/AuthenticationProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isClicked, setIsClicked] = useState(false);

  const { setAuth, setAlert } = useContext(AuthenticationContext);

  const api = new User();
  const onSubmit = async (data) => {
    setIsClicked(true);
    let res = await api.loginUser({
      email: data.user_email,
      password: data.password,
    });

    setAlert({
      isError: !res.status,
      status: true,
      message: res.msg,
    });

    if (res.status) {
      setAuth(JSON.parse(localStorage.getItem("auth")));
    }

    setIsClicked(false);
  };

  return (
    <div>
      <main className="p-4 bg-white overflow-hidden flex flex-col items-center rounded-2xl rounded-b-none">
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <ValidatedTextField
            label="Email"
            id="user_email"
            type="email"
            minLength={5}
            register={register}
            errors={errors}
          />

          <ValidatedPasswordField
            label="Password"
            id="password"
            minLength={8}
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            className={`text-xl rounded-xl bg-accent text-white px-5 py-2 w-full mt-4 ${
              isClicked ? "opacity-40 cursor-not-allowed" : "opacity-100"
            }`}
          >
            Login
          </button>
        </form>

        <Link to="/register" className="text-center mt-4 mb-6">
          Don't have an account?
        </Link>
      </main>
    </div>
  );
};

export default Login;
