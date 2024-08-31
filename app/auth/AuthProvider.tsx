'use client';

import React, { useMemo } from 'react';
import { AuthContext, User } from './AuthContext';

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
