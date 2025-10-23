import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { EXPERIENCE } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={EXPERIENCE} />
    </div>
  );
};
