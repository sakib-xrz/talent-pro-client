import Sidebar from "./components/Sidebar";

export default function CandidateLayoutWithSidebar({ children }) {
  return (
    <div className="flex justify-center">
      <div className="hidden bg-white md:w-1/5 lg:block">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5">
        <div className="mx-auto my-10 max-w-7xl px-4 sm:px-8 lg:my-14">
          {children}
        </div>
      </div>
    </div>
  );
}
