export interface TimelineItem{
  id?: string;
  sequenceNo?: number;

  title: string;
  from: string;
  location?: string;
  role?: string;
  category: 'education'|'profession';

  startYear: number;
  startMonth?: string;
  endYear?: number;
  endMonth?: string;
}