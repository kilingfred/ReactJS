import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface LoginFormProps {
  startGame: () => void;
}

export default function LoginForm({ startGame }: LoginFormProps) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch({ type: "setLogin", payload: data});
    startGame();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={startGame}>
            Play as Guest
          </button>
        </div>
      </form>
    </>
  );
}
