export function TextHeader({ h1, p }) {
  return (
    <div className="container w-full max-w-[90rem] text-center sm:text-justify mx-auto p-6 space-y-1">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {h1}
      </h1>
      <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-400 font-medium">
        {p}
      </p>
    </div>
  );
}
