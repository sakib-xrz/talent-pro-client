import RootNavbar from "@/components/shared/RootNavbar";

export default function layout({ children }) {
  return (
    <div>
      <RootNavbar />
      {children}
    </div>
  );
}
