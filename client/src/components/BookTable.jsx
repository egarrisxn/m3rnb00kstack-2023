import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PlusIcon } from "lucide-react";
import { BookList } from "./BookList";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5050";

export function BookTable({ isPrivate, onDataFetch }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `${apiUrl}/api/books/all`;
        let options = {};

        if (isPrivate) {
          if (!user || !user.token) {
            console.error("User is not authenticated");
            return;
          }
          url = `${apiUrl}/api/books/list`;
          options = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
        }

        const response = await fetch(url, options);

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();

        setBooks(data);
        if (onDataFetch) onDataFetch(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isPrivate, user, onDataFetch]);

  const deleteBook = async (id) => {
    if (!isPrivate || !user || !user.token) return;

    try {
      const response = await fetch(`${apiUrl}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mx-auto p-8">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center mx-auto p-8">
        Error: {error}
      </div>
    );

  return (
    <div className="mt-4 container dark:shadow-slate-100/10 max-w-[84rem] w-full mx-auto p-6 bg-white text-black rounded-3xl border shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900">
          {isPrivate ? "Your List" : "All Books"}
        </h2>
        {isPrivate && (
          <div className="mb-4">
            <Link
              to="/book"
              className="inline-flex items-center pl-2.5 pr-3 sm:pl-3.5 sm:pr-5 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="size-3.5 sm:size-4" />{" "}
              <span className="ml-1 sm:ml-1.5">Book</span>
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {isPrivate && (
                <th className="px-6 py-3 text-left border-r text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Edit
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Description
              </th>
              {!isPrivate && (
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Added By
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {books.map((book) => (
              <BookList
                book={book}
                deleteBook={isPrivate ? deleteBook : null}
                isPrivate={isPrivate}
                key={book._id || book.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
