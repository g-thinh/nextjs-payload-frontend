import { AuthGuard } from "src/components/AuthGuard";
import { useAuth } from "src/providers/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div>
        <h1>Profile</h1>
        {user && <p>{user.name}</p>}
        {user && <p>{user.email}</p>}
      </div>
    </AuthGuard>
  );
}
