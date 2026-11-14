export function findRelatedProject(project, projects, excludedProjectIds = []) {
    const excludedIds = new Set([
        String(project.id),
        ...excludedProjectIds.map((projectId) => String(projectId))
    ]);
    const candidates = projects.filter((candidate) => !excludedIds.has(String(candidate.id)));

    if (!candidates.length) {
        return projects.find((candidate) => candidate !== project);
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}
