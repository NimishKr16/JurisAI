import { useRouter } from "next/router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebaseConfig";

export default function Login() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Login</h1>
      <button
        onClick={handleLogin}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
