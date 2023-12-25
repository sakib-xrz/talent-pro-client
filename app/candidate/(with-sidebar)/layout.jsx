import Container from "@/components/shared/Container";
import Sidebar from "./components/Sidebar";

export default function CandidateLayoutWithSidebar({ children }) {
  return (
    <div className="flex justify-center">
      <div className="hidden bg-white md:w-1/5 lg:block">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5">
        <Container> {children}</Container>
      </div>
    </div>
  );
}
