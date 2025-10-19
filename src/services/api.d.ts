import { RegisterData } from '../types';
declare const api: import("axios").AxiosInstance;
export declare const authAPI: {
    login: (email: string, password: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    register: (userData: RegisterData) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getProfile: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
export declare const demarchesAPI: {
    getAll: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getById: (id: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
export declare const dossiersAPI: {
    create: (formData: FormData) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getMyDossiers: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getById: (id: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getAll: (params?: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    updateStatus: (id: string, data: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
export default api;
//# sourceMappingURL=api.d.ts.map