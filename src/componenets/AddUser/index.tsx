import { useForm } from "react-hook-form";
import styles from "./addUser.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { changeUserAsync, getUserAsync, setUserAsync } from "../../helpers/Api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../helpers/Types";

export type FormValues = {
  name: string;
  surname: string;
  age: number;
  salary: number;
};

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Must be more than three letters")
    .max(60, "Must be less than sixty letters"),
  surname: yup
    .string()
    .required("Surname is required")
    .matches(/^[A-Za-z]+$/i, "invalid surname"),
  age: yup
    .number()
    .typeError("Age is required")
    .required("Age is required")
    .min(10, "You must be at least 10 years")
    .max(70, "You must be at most 70 years"),
  salary: yup
    .number()
    .typeError("Salary is required")
    .required("Salary is required")
    .positive("Salary must be a positive number"),
});

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAdd = (data: Partial<FormValues>) => {
    id
      ? changeUserAsync({ data, id }).then(() => navigate("/users"))
      : setUserAsync(data).then(() => reset());
  };

  useEffect(() => {
    if (id) {
      getUserAsync(id)
        .then((user: IUser) => {
          reset({
            name: user.name,
            surname: user.surname,
            age: user.age,
            salary: user.salary,
          });
        })
        .catch(() => navigate("/users"));
    }
  }, [id]);

  return (
    <div className={styles.addUserWrapper}>
      <form onSubmit={handleSubmit(handleAdd)} noValidate>
        <input placeholder="Name" type="text" {...register("name")} />
        <span style={{ color: "red" }}>{errors.name?.message}</span>
        <input type="text" placeholder="Surname" {...register("surname")} />
        <span style={{ color: "red" }}>{errors.surname?.message}</span>
        <input type="number" placeholder="Age" {...register("age")} />
        <span style={{ color: "red" }}>{errors.age?.message}</span>
        <input type="number" placeholder="Salary" {...register("salary")} />
        <span style={{ color: "red" }}>{errors.salary?.message}</span>
        <button disabled={!isValid}>Save</button>
      </form>
    </div>
  );
};
