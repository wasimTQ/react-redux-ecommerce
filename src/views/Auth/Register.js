import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import User from "../../api/user";
import ValidatedTextField from "../../components/shared/ValidatedTextField";
import { AuthenticationContext } from "../../store/context/AuthenticationProvider";

const Register = () => {
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
    console.log(data);
    const res = await api.registerUser({
      name: data.user_name,
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
      <main className="p-4 overflow-hidden flex flex-col items-center">
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <ValidatedTextField
            label="Name"
            id="user_name"
            minLength={4}
            register={register}
            errors={errors}
          />

          <ValidatedTextField
            label="Email"
            id="user_email"
            type="email"
            minLength={4}
            register={register}
            errors={errors}
          />
          <ValidatedTextField
            label="Password"
            id="password"
            minLength={8}
            register={register}
            errors={errors}
            type="password"
          />

          <button
            type="submit"
            className={`text-xl rounded-xl bg-accent text-secondary px-5 py-2 w-full mt-4 ${
              isClicked ? "opacity-40 cursor-not-allowed" : "opacity-100"
            }`}
          >
            Sign up
          </button>
        </form>

        <Link to="/login" className="text-center mt-4 mb-6">
          Already have an account?
        </Link>
      </main>
    </div>
  );
};

export default Register;
