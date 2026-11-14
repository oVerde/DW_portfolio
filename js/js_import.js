import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { initProjectFilters } from './filter.js';
import { renderProjects } from './add_projects.js';
import { initProjectDetails } from './project_details.js';
import { initCustomCursor } from './custom_cursor.js';
import { fetchProjects } from '../api/api.js';

renderHeader();
renderFooter();
initCustomCursor();

fetchProjects()
    .then((projects) => {
        renderProjects(projects);
        initProjectFilters();
        initProjectDetails(projects);
    })
    .catch((error) => {
        console.error('Unable to load projects:', error);
        const projectList = document.querySelector('[data-project-list]');
        if (projectList) {
            projectList.textContent = 'Projects could not be loaded. Please try again later.';
        }
    });