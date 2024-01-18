export default function TableHead() {
  return (
    <thead>
      <tr className=" bg-white">
        <th className="sticky left-0 truncate bg-white px-4 py-3.5 text-left text-sm font-semibold">
          Applicant Information
        </th>
        <th className="truncate px-4 py-3.5 text-left text-sm font-semibold">
          Applied for
        </th>
        <th className="truncate py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pr-6">
          Applied on
        </th>
        <th className="truncate py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pr-6">
          Phone
        </th>

        <th className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pr-6">
          Resume
        </th>

        <th className="truncate py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pr-6">
          Experience
        </th>

        <th className="truncate py-3.5 pl-4 pr-4 text-center text-sm font-semibold sm:pr-6">
          Expected Salary
        </th>

        <th className="truncate py-3.5 pl-4 pr-4 text-center text-sm font-semibold sm:pr-6">
          Application Status
        </th>
        <th className="truncate bg-white py-3.5 pl-4 pr-4 text-center text-sm font-semibold  sm:pr-6">
          Actions
        </th>
      </tr>
    </thead>
  );
}
