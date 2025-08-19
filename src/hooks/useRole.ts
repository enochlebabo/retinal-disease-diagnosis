import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type UserRole = 'user' | 'clinician' | 'admin';

export const useRole = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // First, try to get the user's role from user_roles table
        const { data: userRoles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user role:', error);
          setRole('user'); // Default to user role
        } else if (userRoles) {
          setRole(userRoles.role as UserRole);
        } else {
          // If no role found, create default user role
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'user'
            });

          if (insertError) {
            console.error('Error creating user role:', insertError);
          }
          
          setRole('user');
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!role) return false;
    
    // Role hierarchy: admin > clinician > user
    const roleHierarchy = { admin: 3, clinician: 2, user: 1 };
    return roleHierarchy[role] >= roleHierarchy[requiredRole];
  };

  const isAdmin = (): boolean => role === 'admin';
  const isClinician = (): boolean => role === 'clinician' || role === 'admin';
  const isUser = (): boolean => role === 'user';

  return {
    role,
    loading,
    hasRole,
    isAdmin,
    isClinician,
    isUser
  };
};