export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  telephone?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone?: string;
}

export interface Demarche {
  id: string;
  nom: string;
  description: string;
  dureeEstimee: number;
  frais: number;
  categorie: string;
  documentsRequis: string[];
  isActive: boolean;
}

export interface Dossier {
  id: string;
  numeroDossier: string;
  userId: string;
  demarcheId: string;
  demarche?: Demarche;
  demarcheNom?: string;
  statut: 'en_attente' | 'en_cours' | 'approuve' | 'rejete';
  donnees: Record<string, any>;
  documents: string[];
  dateSoumission: string;
  dateMiseAJour: string;
  frais: number;
  fraisLivraison?: number;
  commentaires?: string;
  paiements?: Paiement[];
}

export interface Paiement {
  id: string;
  dossierId: string;
  montant: number;
  datePaiement: string;
  methode: 'carte' | 'espece' | 'virement' | 'mobile';
  statut: 'en_attente' | 'paye' | 'echec' | 'rembourse';
  reference: string;
  dateCreation: string;
}
