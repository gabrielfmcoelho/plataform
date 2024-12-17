import {
  Microscope,
  TestTubes,
  Brain,
  LineChart,
  Stethoscope,
  Pill,
  Activity,
  HeartPulse,
  Syringe,
  Thermometer,
  Dna,
  Radiation,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const serviceIcons: Record<string, LucideIcon> = {
  'Clinical': Stethoscope,
  'Laboratory': TestTubes,
  'Analytics': LineChart,
  'Pharmacy': Pill,
  'Monitoring': Activity,
  'Cardiology': HeartPulse,
  'Vaccination': Syringe,
  'Temperature': Thermometer,
  'Genetics': Dna,
  'Microbiology': Radiation,
  'Research': Microscope,
  'AI': Brain,
};