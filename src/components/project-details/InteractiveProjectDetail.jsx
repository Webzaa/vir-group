import React from 'react';
import {
  Opportunity,
  Paradise,
  Enclave,
  GlobalResidency,
  KrishnaKoyna,
  SuryaPrakash,
  Vinayanand,
  VirGrace,
  VirChandrapuri,
  VirSanket,
} from '@/All Section/Projects';

// Mapping project slug to the corresponding self-contained project component
const PROJECTS_COMPONENT_MAP = {
  'opportunity': Opportunity,
  'vir-paradise': Paradise,
  'vir-enclave': Enclave,
  'global-residency': GlobalResidency,
  'globalresidency': GlobalResidency,
  'vir-krishna-koyna': KrishnaKoyna,
  'krishnakoyna': KrishnaKoyna,
  'surya-prakash': SuryaPrakash,
  'suryaprakash': SuryaPrakash,
  'vir-vinayanand': Vinayanand,
  'virvinayanand': Vinayanand,
  'vir-grace': VirGrace,
  'virgrace': VirGrace,
  'vir-chandrapuri': VirChandrapuri,
  'virchandrapuri': VirChandrapuri,
  'vir-sanket': VirSanket,
  'virsanket': VirSanket,
};

export function InteractiveProjectDetail(props) {
  const p = props.p;
  const Component = PROJECTS_COMPONENT_MAP[p?.slug] || Opportunity;
  return <Component {...props} />;
}

export default InteractiveProjectDetail;
