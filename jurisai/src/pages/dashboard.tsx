import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../firebaseConfig"; // Import your Firebase config

export default function Dashboard() {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {user && (
        <div className="mt-4 text-center">
          <p>Welcome, {user.displayName || "User"}!</p>
          <img
            src={user.photoURL || "/favicon.ico"}
            alt="Profile"
            className="w-16 h-16 rounded-full mt-2"
          />
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
