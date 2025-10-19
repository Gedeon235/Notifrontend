
import type { Demarche } from '../types'

export const mockDemarches: Demarche[] = [
  {
    id: '1',
    nom: 'Carte Nationale d\'Identité',
    description: 'Demande ou renouvellement de carte nationale d\'identité. Pièce d\'identité officielle requise pour toutes les démarches administratives.',
    dureeEstimee: 15,
    frais: 5000,
    categorie: 'identite',
    documentsRequis: ['Photo d\'identité', 'Extrait d\'acte de naissance', 'Ancienne CNI'],
    isActive: true
  },
  {
    id: '2',
    nom: 'Passeport',
    description: 'Obtention d\'un passeport biométrique pour les voyages internationaux. Valable 5 ans pour les majeurs.',
    dureeEstimee: 10,
    frais: 75000,
    categorie: 'voyage',
    documentsRequis: ['CNI', 'Photo biométrique', 'Quittance de timbre fiscal'],
    isActive: true
  },
  {
    id: '3',
    nom: 'Permis de Conduire',
    description: 'Demande de permis de conduire catégorie B. Nécessite un certificat de formation et un examen médical.',
    dureeEstimee: 30,
    frais: 150000,
    categorie: 'transport',
    documentsRequis: ['CNI', 'Photo d\'identité', 'Certificat médical', 'Attestation de formation'],
    isActive: true
  },
  {
    id: '4',
    nom: 'Extrait de Casier Judiciaire',
    description: 'Demande d\'extrait de casier judiciaire pour preuve de moralité. Requis pour certains emplois et visas.',
    dureeEstimee: 5,
    frais: 2000,
    categorie: 'legal',
    documentsRequis: ['CNI', 'Formulaire de demande'],
    isActive: true
  },
  {
    id: '5',
    nom: 'Certificat de Nationalité',
    description: 'Attestation de nationalité tchadienne. Document essentiel pour prouver sa citoyenneté.',
    dureeEstimee: 7,
    frais: 3000,
    categorie: 'identite',
    documentsRequis: ['Extrait d\'acte de naissance', 'CNI des parents'],
    isActive: true
  },
  {
    id: '6',
    nom: 'Licence Commerciale',
    description: 'Obtention d\'une licence pour activité commerciale. Nécessaire pour toute entreprise légale.',
    dureeEstimee: 20,
    frais: 25000,
    categorie: 'commerce',
    documentsRequis: ['CNI', 'Plan d\'affaires', 'Registre de commerce'],
    isActive: true
  }
]