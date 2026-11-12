import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { initProjectFilters } from './filter.js';
import { renderProjects } from './add_projects.js';
import { initCustomCursor } from './custom_cursor.js';
import '../api/api.js';

renderHeader();
renderFooter();
renderProjects();
initProjectFilters();
initCustomCursor();