
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalType } from '@/types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: AuthModalType;
}

const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
});

const registerSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
  confirmPassword: z.string(),
  displayName: z.string().min(2, '昵称至少需要2个字符'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});

const resetSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
});

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialType = 'login' }) => {
  const [modalType, setModalType] = useState<AuthModalType>(initialType);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register, resetPassword, loading } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', displayName: '' },
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' },
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    const success = await login(data.email, data.password);
    if (success) {
      onClose();
      loginForm.reset();
    }
  };

  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    const success = await register(data.email, data.password, data.displayName);
    if (success) {
      onClose();
      registerForm.reset();
    }
  };

  const handleResetPassword = async (data: z.infer<typeof resetSchema>) => {
    const success = await resetPassword(data.email);
    if (success) {
      setModalType('login');
      resetForm.reset();
    }
  };

  const handleClose = () => {
    onClose();
    setModalType('login');
    loginForm.reset();
    registerForm.reset();
    resetForm.reset();
  };

  const renderLoginForm = () => (
    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="请输入你的邮箱"
            className="pl-10"
            {...loginForm.register('email')}
          />
        </div>
        {loginForm.formState.errors.email && (
          <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="请输入你的密码"
            className="pl-10 pr-10"
            {...loginForm.register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {loginForm.formState.errors.password && (
          <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => setModalType('reset')}
          className="text-primary hover:underline"
        >
          忘记密码？
        </button>
        <button
          type="button"
          onClick={() => setModalType('register')}
          className="text-primary hover:underline"
        >
          创建新账户
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-email">邮箱</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="请输入你的邮箱"
            className="pl-10"
            {...registerForm.register('email')}
          />
        </div>
        {registerForm.formState.errors.email && (
          <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-displayName">昵称</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="register-displayName"
            type="text"
            placeholder="请输入你的昵称"
            className="pl-10"
            {...registerForm.register('displayName')}
          />
        </div>
        {registerForm.formState.errors.displayName && (
          <p className="text-sm text-destructive">{registerForm.formState.errors.displayName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">密码</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="请输入密码（至少6位）"
            className="pl-10 pr-10"
            {...registerForm.register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {registerForm.formState.errors.password && (
          <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-confirmPassword">确认密码</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="register-confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="请再次输入密码"
            className="pl-10 pr-10"
            {...registerForm.register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {registerForm.formState.errors.confirmPassword && (
          <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? '注册中...' : '注册'}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">已有账户？</span>
        <button
          type="button"
          onClick={() => setModalType('login')}
          className="text-primary hover:underline ml-1"
        >
          立即登录
        </button>
      </div>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">邮箱</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="reset-email"
            type="email"
            placeholder="请输入你的邮箱"
            className="pl-10"
            {...resetForm.register('email')}
          />
        </div>
        {resetForm.formState.errors.email && (
          <p className="text-sm text-destructive">{resetForm.formState.errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? '发送中...' : '发送重置邮件'}
      </Button>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => setModalType('login')}
          className="text-primary hover:underline flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          返回登录
        </button>
      </div>
    </form>
  );

  const getModalTitle = () => {
    switch (modalType) {
      case 'login':
        return '登录账户';
      case 'register':
        return '创建账户';
      case 'reset':
        return '重置密码';
      default:
        return '认证';
    }
  };

  const getModalDescription = () => {
    switch (modalType) {
      case 'login':
        return '欢迎回来，请登录你的账户';
      case 'register':
        return '创建你的 AI-Voca-2 账户，开始智能学习之旅';
      case 'reset':
        return '输入你的邮箱地址，我们将发送密码重置链接';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
          <DialogDescription>{getModalDescription()}</DialogDescription>
        </DialogHeader>
        <Separator />
        {modalType === 'login' && renderLoginForm()}
        {modalType === 'register' && renderRegisterForm()}
        {modalType === 'reset' && renderResetForm()}
      </DialogContent>
    </Dialog>
  );
};
