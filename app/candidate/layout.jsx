import CandidateAuthGuardHOC from "@/components/candidate/CandidateAuthGuardHOC";
import CandidateAuthNavbar from "@/components/candidate/CandidateAuthNavbar";

export default function CandidateLayout({ children }) {
  return (
    <CandidateAuthGuardHOC>
      <CandidateAuthNavbar />
      <div className="bg-gray-50">
        <div className="min-h-[calc(100vh-5rem)]">{children}</div>
      </div>
    </CandidateAuthGuardHOC>
  );
}
