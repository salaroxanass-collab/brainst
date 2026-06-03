import { project } from "./project";
import { research } from "./research";
import { publication } from "./publication";
import { service } from "./service";
import { news } from "./news";
import { localeString, localeText } from "./locale";

export const schemaTypes = [
  localeString,
  localeText,
  project,
  research,
  publication,
  service,
  news,
];
