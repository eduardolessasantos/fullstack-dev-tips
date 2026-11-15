import { StacksLocale } from '../../types.ts';
import { FRONTEND_COMPARISONS } from '../../../data/frontendData.ts';
import { BACKEND_COMPARISONS } from '../../../data/backendData.ts';
import { NOSQL_DATA, RELATIONAL_OPTIMIZATIONS } from '../../../data/databaseData.ts';

const stacksPt: StacksLocale = {
  frontend: FRONTEND_COMPARISONS,
  backend: BACKEND_COMPARISONS,
  nosql: NOSQL_DATA,
  relational: RELATIONAL_OPTIMIZATIONS
};

export default stacksPt;
