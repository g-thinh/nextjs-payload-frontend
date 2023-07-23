import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "src/providers/AuthProvider";

export default function SigninPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onHandleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login({ email, password });
      router.push("/profile");
    } catch (e) {
      console.error(e);
      setError("There was an error");
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      <form
        onSubmit={onHandleLogin}
        className="flex flex-col max-w-xl gap-4 p-4 border-2 border-gray-500 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase">Email</label>
          <input
            className="border-[1px] border-gray-200 p-2 rounded-sm"
            placeholder="dev@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase">Password</label>
          <input
            className="border-[1px] border-gray-200 p-2 rounded-sm"
            placeholder="passw0rd"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <div>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md bg-slate-900"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
