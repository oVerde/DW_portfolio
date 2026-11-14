export function findRelatedProject(project, projects) {
    const projectTags = [project.category, String(project.year)];

    return projects
        .filter((candidate) => candidate !== project)
        .sort((first, second) => {
            const firstScore = [first.category, String(first.year)]
                .filter((tag) => projectTags.includes(tag)).length;
            const secondScore = [second.category, String(second.year)]
                .filter((tag) => projectTags.includes(tag)).length;
            return secondScore - firstScore;
        })[0];
}
