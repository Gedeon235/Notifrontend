export interface User {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: 'citoyen' | 'agent' | 'admin';
    adresse?: string;
    dateNaissance?: string;
}
export interface Demarche {
    id: string;
    nom: string;
    description: string;
    dureeEstimee: number;
    frais: number;
    documentsRequis: string[];
    isActive: boolean;
    categorie: string;
}
export interface Dossier {
    id: string;
    numeroDossier: string;
    statut: 'soumis' | 'en_cours' | 'en_attente' | 'approuve' | 'rejete' | 'termine';
    donnees: Record<string, any>;
    documents: Array<{
        nom: string;
        chemin: string;
        type: string;
    }>;
    dateSoumission: string;
    dateTraitement?: string;
    dateFinalisation?: string;
    commentaires?: string;
    fraisLivraison: number;
    adresseLivraison?: string;
    userId: string;
    demarcheId: string;
    Demarche?: Demarche;
    User?: User;
    Paiements?: Paiement[];
}
export interface Paiement {
    id: string;
    montant: number;
    methode: 'carte' | 'mobile_money' | 'especes';
    statut: 'en_attente' | 'paye' | 'echec' | 'rembourse';
    reference?: string;
    datePaiement?: string;
    dossierId: string;
}
export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}
export interface RegisterData {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string;
    adresse?: string;
    dateNaissance?: string;
}
//# sourceMappingURL=index.d.ts.map