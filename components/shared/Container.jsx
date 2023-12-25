export default function Container({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
      {children}
    </div>
  );
}
