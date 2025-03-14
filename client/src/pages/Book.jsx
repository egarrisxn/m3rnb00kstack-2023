import { BookForm } from "../components/BookForm";

export function BookPage() {
  return (
    <>
      <div className="container w-full max-w-6xl text-center sm:text-justify mx-auto p-6 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Here is where you can add your book to our list.
        </h1>
        <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-400 font-medium">
          Add as many books as your heart desires!
        </p>
      </div>
      <div className="p-4">
        <BookForm />
      </div>
    </>
  );
}
