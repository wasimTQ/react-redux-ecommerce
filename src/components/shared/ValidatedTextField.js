const ValidatedTextField = ({
  label,
  id,
  minLength,
  register,
  errors,
  type,
  pattern,
  inputPattern,
}) => {
  return (
    <div className="form-field">
      {/* <label htmlFor={id}>{label} </label> */}
      <input
        autoComplete="off"
        pattern={inputPattern}
        className="mb-2"
        id={id}
        type={type}
        placeholder={label}
        {...register(id, {
          required: {
            value: true,
            message: label + " is required",
          },
          minLength: {
            value: minLength,
            message: `Must have atleast ${minLength} characters`,
          },
          pattern:
            type === "email"
              ? {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  message: "Must be a valid email",
                }
              : pattern,
        })}
      />
      <div className="text-red-500">{errors[id] && errors[id].message}</div>
    </div>
  );
};

export default ValidatedTextField;
