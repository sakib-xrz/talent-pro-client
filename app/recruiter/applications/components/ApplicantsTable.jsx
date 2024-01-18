import TableBodyData from "./TableBodyData";
import TableHead from "./TableHead";

export default function ApplicantsTable() {
  return (
    <table className="min-w-full divide-y divide-border text-primary shadow">
      <TableHead />
      <tbody className="divide-y divide-border text-primary">
        <TableBodyData />
      </tbody>
    </table>
  );
}
