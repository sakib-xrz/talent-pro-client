"use client";

import Container from "@/components/shared/Container";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";

// const tableColumns = [
//   {
//     title: <p className="text-center">#</p>,
//     renderer: (_, rowIndex) => (
//       <p className="text-center font-semibold">{rowIndex + 1}</p>
//     ),
//   },
//   {
//     title: "Person",
//     renderer: (data) => (
//       <div className="flex items-center gap-2">
//         <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-100">
//           <Image
//             src={"/public/empty/application-empty.svg"}
//             width={48}
//             height={48}
//             alt="user-image"
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div>
//           <p className="font-semibold">
//             {data?.candidate?.first_name && data?.candidate?.last_name
//               ? `${
//                   data?.candidate?.first_name + " " + data?.candidate?.last_name
//                 }`
//               : "Not Set"}
//           </p>
//           <p className="font-medium lowercase first-letter:uppercase">
//             {data?.candidate_details?.gender || "Not Set"},{" "}
//           </p>
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: "Applied for",
//     renderer: (data) => (
//       <p className="whitespace-normal">{data?.job?.title || "N/A"}</p>
//     ),
//   },
//   {
//     title: "Contact Information",
//     renderer: (data) => (
//       <div onClick={(e) => e.stopPropagation()}>
//         {data?.candidate?.email ? (
//           <Link
//             href={`mailto:${data?.candidate?.email}`}
//             className="hover:text-primary-500 line-clamp-1"
//           >
//             {data?.candidate?.email}
//           </Link>
//         ) : (
//           <p className="line-clamp-1">Email Not Set</p>
//         )}
//         {data?.candidate?.phone ? (
//           <Link
//             href={`tel:${data?.candidate?.phone}`}
//             className="hover:text-primary-500 line-clamp-1"
//           >
//             {data?.candidate?.phone}
//           </Link>
//         ) : (
//           <p className="line-clamp-1">Phone Not Set</p>
//         )}
//       </div>
//     ),
//   },
//   // {
//   //   title: "Address",
//   //   renderer: (data) => (
//   //     <p className="w-[240px] whitespace-normal">
//   //       {data?.candidate?.addresses?.length
//   //         ? getFormattedAddress2(data?.candidate?.addresses[0], [
//   //             "label",
//   //             "house/street",
//   //             "post",
//   //           ])
//   //         : "N/A"}
//   //     </p>
//   //   ),
//   // },
//   {
//     title: "Video Screening",
//     renderer: (data) => (
//       <CheckCircleIcon
//         className={`mx-auto h-5 w-5 ${
//           data?.is_video_screen_test_exists
//             ? "text-primary-500"
//             : "text-gray-300"
//         } text-center`}
//       />
//     ),
//   },
//   {
//     title: "Experience",
//     renderer: (data) =>
//       data?.total_experience_in_year
//         ? `${parseInt(data?.total_experience_in_year) + " "} years`
//         : "N/A",
//   },
//   {
//     title: "Expected Salary",
//     renderer: (data) => (
//       <p>
//         ৳
//         {parseInt(
//           data?.candidate_details?.desired_salary_min,
//         ).toLocaleString() || 0}{" "}
//         - ৳
//         {parseInt(
//           data?.candidate_details?.desired_salary_max,
//         ).toLocaleString() || 0}
//       </p>
//     ),
//   },
// ];

export default function RecruiterApplications() {
  return (
    <Container>
      <div className="space-y-4">
        <PageTitleWithButton title={"All Applicants"} />
        {/* <DataTable
          cols={tableColumns}
          data={data}
          wrapperClassName="max-h-[calc(100vh-200px)] whitespace-nowrap font-medium"
          theadClassName="sticky top-0 bg-gray-100 z-10"
        /> */}
      </div>
    </Container>
  );
}
