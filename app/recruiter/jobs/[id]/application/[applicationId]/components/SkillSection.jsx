import { Badge } from "@/components/ui/badge";

export default function SkillSection({ data }) {
  return (
    <div>
      <div>
        <h2 className="text-base font-semibold text-primary">Skills</h2>
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {data?.skills?.length
            ? data?.skills.map((skill) => (
                <Badge variant="secondary" size="lg" key={skill._id}>
                  {skill.label}
                </Badge>
              ))
            : "No skill added"}
        </div>
      </div>
    </div>
  );
}
