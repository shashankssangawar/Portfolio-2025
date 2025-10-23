import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { EDUCATION } from "@/data/education";

export default function EducationSection() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={EDUCATION} />
    </div>
  );
};
