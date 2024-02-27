import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/shared/Container";

export default function ApplicationForJob({ params: { id } }) {
  const contents = [
    { href: "/recruiter/jobs", label: "Jobs" },
    { href: `/recruiter/jobs/${id}`, label: "Job Details" },
    { href: null, label: "Applicants" },
  ];

  return (
    <Container>
      <Breadcrumb contents={contents} />
    </Container>
  );
}
