import Image from "next/image";

type Props = {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSignIn: (payload: { email: string; password: string }) => void;
  loading: boolean;
  error: string | null;
};

const LoginComp = ({
  email,
  password,
  setEmail,
  setPassword,
  onSignIn,
  loading,
  error,
}: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn({ email, password });
  };

  return (
    <div className="w-1/2 h-[70%] mt-20 flex flex-col items-center">
      <div>
        <Image src="/logo.png" alt="logo" width={120} height={120} />
      </div>
      <form className="w-full mt-8" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border outline-none p-2 w-full mb-4"
          />
        </div>

        <div>
          <label className="mb-2 block">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border outline-none p-2 w-full mb-4"
          />
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className={`w-full px-4 py-2 rounded-md text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#918D92] hover:bg-[#7a767b]"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginComp;