import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export function BookList({ book, deleteBook, isPrivate }) {
  return (
    <tr className="border-b hover:bg-slate-100 transition-colors">
      {isPrivate && deleteBook && (
        <td className="px-6 py-4 border-r">
          <div className="flex items-center space-x-7">
            <Link
              to={`/book/${book._id}`}
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400"
            >
              <Pencil size={18} />
            </Link>
            <button
              type="button"
              onClick={() => deleteBook(book._id)}
              className="inline-flex items-center  text-red-600 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      )}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {book.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {book.author}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {book.year}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {book.genre}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {book.description}
      </td>
      {!isPrivate && book.userId && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
          {book.userId}
        </td>
      )}
    </tr>
  );
}
