import { BookTable } from "../components/BookTable";

export function BooksPage() {
  return (
    <>
      <div className="container w-full max-w-[90rem] text-center sm:text-justify mx-auto p-6 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Here is where you will find all the books we have stored.
        </h1>
        <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-400 font-medium">
          Please help us add more books to the list!
        </p>
      </div>
      <BookTable isPrivate={false} />
    </>
  );
}
