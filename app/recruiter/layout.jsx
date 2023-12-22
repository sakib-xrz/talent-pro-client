import RecruiterAuthGuardHOC from "@/components/recruiter/RecruiterAuthGuardHOC";
import RecruiterAuthNavbar from "@/components/recruiter/RecruiterAuthNavbar";

export default function RecruiterLayout({ children }) {
  return (
    <RecruiterAuthGuardHOC>
      <RecruiterAuthNavbar />
      <div className="bg-gray-50">
        <div className="min-h-[calc(100vh-5rem)]">{children}</div>
      </div>
    </RecruiterAuthGuardHOC>
  );
}
