export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Smart Globe LT. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-800">Privacy</a>
            <a href="#" className="hover:text-gray-800">Terms</a>
            <a href="#" className="hover:text-gray-800">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
