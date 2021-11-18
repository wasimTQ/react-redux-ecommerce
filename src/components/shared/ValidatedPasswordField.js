const ValidatedPasswordField = ({
    label,
    id,
    minLength,
    register,
    errors,
    type,
    pattern,
  }) => {
    return (
      <div className="form-field">
        {/* <label htmlFor={id}>{label} </label> */}
        <input
          autoComplete="off"
          className="mb-2"
          id={id}
          type={type || 'password'}
          placeholder={label}
          {...register(id, {
            required: {
              value: true,
              message: label + ' is required',
            },
            minLength: {
              value: minLength,
              message: `Must have atleast ${minLength} characters`,
            },
            pattern: pattern,
          })}
        />
        <div className="text-red-500">{errors[id] && errors[id].message}</div>
      </div>
    );
  };
  
  export default ValidatedPasswordField;
  