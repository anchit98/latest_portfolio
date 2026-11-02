import Chapter from "./story/Chapter";
import ProjectGrid from "./Projects";

export default function Work() {
  return (
    <Chapter id="work" index={7} title="Proof of work" meta="Projects & case studies" hook="Real problems. Real impact." layout="stacked">
      <ProjectGrid />
    </Chapter>
  );
}
