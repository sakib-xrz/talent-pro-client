import CandidateAuthGuardHOC from "@/components/candidate/CandidateAuthGuardHOC";

export default function Layout({ children }) {
  return (
    <CandidateAuthGuardHOC>
      <p>Candidate Navbar</p>
      {children}
      <p>Candidate Footer</p>
    </CandidateAuthGuardHOC>
  );
}
