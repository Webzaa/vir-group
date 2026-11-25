import { opportunity } from './opportunity';
import { virParadise } from './vir-paradise';
import {
  globalResidency,
  suryaPrakash,
  virEnclave,
  virKrishnaKoyna,
  virVinayanand,
  virGrace,
  virChandrapuri,
  virSanket,
} from './others';

export {
  opportunity,
  virParadise,
  globalResidency,
  suryaPrakash,
  virEnclave,
  virKrishnaKoyna,
  virVinayanand,
  virGrace,
  virChandrapuri,
  virSanket,
};

/** Directory order (matches the brief). One file per project; swap for a CMS/API via lib/content. */
export const projects = [
  opportunity,
  virParadise,
  virVinayanand,
  virGrace,
  virChandrapuri,
  virSanket,
  virEnclave,
  globalResidency,
  virKrishnaKoyna,
  suryaPrakash,
];
