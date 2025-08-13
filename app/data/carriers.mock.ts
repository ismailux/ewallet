import { BillCarrier } from '../models/bills';

export const CARRIERS: BillCarrier[] = [
  // Utilities – Water & Electricity
  { id: 'redal', name: 'REDAL', category: 'UTILITIES', fields: [ { key: 'clientId', label: 'Client ID', type: 'text', required: true } ] },
  { id: 'lydec', name: 'LYDEC', category: 'UTILITIES', fields: [ { key: 'clientId', label: 'Client ID', type: 'text', required: true } ] },
  { id: 'radem', name: 'RADEM', category: 'UTILITIES', fields: [ { key: 'clientId', label: 'Client ID', type: 'text', required: true } ] },
  { id: 'srm', name: 'SRM', category: 'UTILITIES', fields: [ { key: 'clientId', label: 'Client ID', type: 'text', required: true } ] },

  // Telecom – with service type selector
  { id: 'iam', name: 'Maroc Telecom', category: 'TELECOM', fields: [
      { key: 'service', label: 'Service', type: 'select', required: true, options: ['Mobile', 'Landline', 'Internet'] },
      { key: 'contract', label: 'Contract / Phone Number', type: 'text', required: true },
    ] },
  { id: 'orange', name: 'Orange', category: 'TELECOM', fields: [
      { key: 'service', label: 'Service', type: 'select', required: true, options: ['Mobile', 'Landline', 'Internet'] },
      { key: 'contract', label: 'Contract / Phone Number', type: 'text', required: true },
    ] },
  { id: 'inwi', name: 'Inwi', category: 'TELECOM', fields: [
      { key: 'service', label: 'Service', type: 'select', required: true, options: ['Mobile', 'Landline', 'Internet'] },
      { key: 'contract', label: 'Contract / Phone Number', type: 'text', required: true },
    ] },

  // Administration
  { id: 'tgr', name: 'TGR - Trésorerie Générale du Royaume', category: 'ADMIN', fields: [ { key: 'reference', label: 'Reference', type: 'text', required: true } ] },
  { id: 'dgi', name: 'DGI - Direction Générale des Impôts', category: 'ADMIN', fields: [ { key: 'reference', label: 'Tax Reference', type: 'text', required: true } ] },

  // Education
  { id: 'aui', name: 'Université Al Akhawayn', category: 'EDU', fields: [ { key: 'studentId', label: 'Student ID', type: 'text', required: true } ] },
  { id: 'lycee-lyautey', name: 'Lycée Lyautey', category: 'EDU', fields: [ { key: 'studentId', label: 'Student ID', type: 'text', required: true } ] },
  { id: 'lycee-descartes', name: 'Lycée Descartes', category: 'EDU', fields: [ { key: 'studentId', label: 'Student ID', type: 'text', required: true } ] },
  { id: 'al-jabr', name: 'Al Jabr', category: 'EDU', fields: [ { key: 'studentId', label: 'Student ID', type: 'text', required: true } ] },
  { id: 'um6p', name: 'UM6P', category: 'EDU', fields: [ { key: 'studentId', label: 'Student ID', type: 'text', required: true } ] },
];