
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MockUser, AuthState } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ai-voca-auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  // 初始化时从localStorage加载用户状态
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const userData = JSON.parse(stored);
          setAuthState({
            isAuthenticated: true,
            user: userData,
            loading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟登录验证（简单的邮箱格式检查）
    if (email.includes('@') && password.length >= 6) {
      const user: MockUser = {
        id: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=6366f1&color=fff`,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });
      
      toast({
        title: '登录成功',
        description: `欢迎回来，${user.displayName}！`,
      });
      
      return true;
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
      toast({
        title: '登录失败',
        description: '请检查邮箱格式和密码长度（至少6位）',
        variant: 'destructive',
      });
      return false;
    }
  };

  const register = async (email: string, password: string, displayName: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟注册验证
    if (email.includes('@') && password.length >= 6 && displayName.trim()) {
      const user: MockUser = {
        id: `user_${Date.now()}`,
        email,
        displayName: displayName.trim(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName.trim())}&background=6366f1&color=fff`,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });
      
      toast({
        title: '注册成功',
        description: `欢迎加入 AI-Voca-2，${user.displayName}！`,
      });
      
      return true;
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
      toast({
        title: '注册失败',
        description: '请检查邮箱格式、密码长度（至少6位）和昵称',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    
    toast({
      title: '已安全登出',
      description: '感谢使用 AI-Voca-2！',
    });
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email.includes('@')) {
      toast({
        title: '重置邮件已发送',
        description: `密码重置邮件已发送至 ${email}`,
      });
      return true;
    } else {
      toast({
        title: '邮箱格式错误',
        description: '请输入有效的邮箱地址',
        variant: 'destructive',
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
