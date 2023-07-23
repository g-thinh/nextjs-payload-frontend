import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "src/providers/AuthProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <h1>Profile</h1>
      {user && <p>{user.name}</p>}
      {user && <p>{user.email}</p>}
    </div>
  );
}
