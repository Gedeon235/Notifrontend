import * as React from 'react';
interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'citoyen' | 'agent' | 'admin';
}
declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export default ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.d.ts.map