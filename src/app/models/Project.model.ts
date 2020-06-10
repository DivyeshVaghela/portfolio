export interface Project{
  id?: string;
  sequenceNo?: number;

  title: string;
  subtitle?: string;
  details: string[];

  type: string[],
  frontTechnologies?: string[];
  backTechnologies?: string[];
  database?: string[];

  logo?: string;
  showcaseImage: string;
  screenshots?: {image: string, caption?: string}[];

  github?: string;
  websiteLink?: string;
  androidAppLink?: string;
}