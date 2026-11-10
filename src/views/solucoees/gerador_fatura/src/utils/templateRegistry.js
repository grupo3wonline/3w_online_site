import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import Template4 from '../components/templates/Template4';
import Template5 from '../components/templates/Template5';
import Template6 from '../components/templates/Template6';
import Template7 from '../components/templates/Template7';
import Template8 from '../components/templates/Template8';
import Template9 from '../components/templates/Template9';

export const templates = [
  { name: 'Modelo 1 - Clássico', component: Template1 },
  { name: 'Modelo 2 - Moderno', component: Template2 },
  { name: 'Modelo 3 - Elegante', component: Template3 },
  { name: 'Modelo 4 - Profissional', component: Template4 },
  { name: 'Modelo 5 - Minimalista', component: Template5 },
  { name: 'Modelo 6 - Corporativo', component: Template6 },
  { name: 'Modelo 7 - Premium', component: Template7 },
  { name: 'Modelo 8 - Executivo', component: Template8 },
  { name: 'Modelo 9 - Contemporâneo', component: Template9 },
];

export const getTemplate = (templateNumber) => {
  return templates[templateNumber - 1]?.component || templates[0].component; // Default to Template1 if not found
};
