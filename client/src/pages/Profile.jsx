import { ProfileHeader } from "../components/ProfileHeader";
import { BookTable } from "../components/BookTable";

export function ProfilePage() {
  return (
    <>
      <div className="container w-full max-w-[90rem] text-center sm:text-justify mx-auto p-6 space-y-1">
        <ProfileHeader />
        <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-400 font-medium">
          Start adding books to your list now!
        </p>
      </div>
      <BookTable isPrivate={true} />
    </>
  );
}
