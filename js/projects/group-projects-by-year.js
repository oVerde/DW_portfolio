export function groupProjectsByYear(projects) {
    return projects.reduce((groups, project) => {
        (groups[project.year] ??= []).push(project);
        return groups;
    }, {});
}
