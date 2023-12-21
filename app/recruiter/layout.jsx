import RecruiterAuthGuardHOC from "@/components/recruiter/RecruiterAuthGuardHOC";

export default function RecruiterLayout({ children }) {
  return (
    <RecruiterAuthGuardHOC>
      <div className="bg-gray-50">
        <div className="min-h-[calc(100vh-5rem)]">{children}</div>
      </div>
    </RecruiterAuthGuardHOC>
  );
}
