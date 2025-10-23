import { Badge } from "@/components/ui/badge";

const education_data = [
  {
    timeline: "2021 - 2024",
    institution: "Model College, Thakurli, Mumbai",
    degree: "Bachelor of Science",
    field: "Information Technology",
    score: "CGPA: 8.55",
    badges: ["Information Technology", "Computer Science", "Networking", "Database Systems"],
  },
  {
    timeline: "2019 - 2021",
    institution: "Model College, Thakurli, Mumbai",
    degree: "HSC",
    field: "Commerce Stream",
    score: "Percent: 87.33%",
    badges: ["Mathematics", "Accounts", "Economics", "Information Technology"],
  },
  {
    timeline: "2019",
    institution: "Omkar English Medium School, Dombivli, Mumbai",
    degree: "SSC",
    score: "Percent: 83.80%",
    badges: ["Mathematics", "Science (Physics, Chemistry, Biology)", "History", 'Geography', 'Hindi-Sanskrit', 'Marathi', 'English'],
  },
];

export const EDUCATION = education_data.map((item) => ({
  title: item.timeline,
  content: (
    <div>
      <h1 className="font-semibold text-3xl">{item.degree}</h1>
      <h2 className="text-lg text-foreground/80">{item.field}</h2>
      <p className="mb-2 text-sm md:text-base text-muted-foreground">
        {item.institution}
      </p>
      <p className="mb-4 text-sm md:text-base font-light text-muted-foreground">
        {item.score}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {item.badges.map((badge, idx) => (
          <Badge key={idx} variant="outline">
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  ),
}));
