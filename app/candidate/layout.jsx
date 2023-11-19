import CandidateAuthGuardHOC from "@/components/candidate/CandidateAuthGuardHOC";
import CandidateAuthNavbar from "@/components/candidate/CandidateAuthNavbar";

export default function Layout({ children }) {
  return (
    <CandidateAuthGuardHOC>
      <CandidateAuthNavbar />
      <div className="bg-gray-50">
        <div className="mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-4 sm:px-8">
          {children}
        </div>
      </div>
    </CandidateAuthGuardHOC>
  );
}
