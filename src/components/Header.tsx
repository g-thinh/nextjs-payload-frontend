import Link from "next/link";
import { useAuth } from "src/providers/AuthProvider";

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex justify-between p-4 text-white bg-gray-800">
      <span>Frontend</span>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {user ? (
            <p>Hello, {user?.name}</p>
          ) : (
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/profile">My Profile</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
