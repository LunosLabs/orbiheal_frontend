import { LoginForm } from "@/components/authComponents/LoginForm";
import { LoginWithGoogle } from "@/components/authComponents/LoginWithGoogle";
import Logo from "@/components/publicComponents/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="w-full max-w-md border border-white/10 rounded-xl p-4 sm:p-8 space-y-6">
        
        {/* Form Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-1">
            Login to <Logo size="md" className="inline-block" />
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your details to continue
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-white/10" />
          <span className="uppercase tracking-wide text-xs">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Login with Google Button */}
        <LoginWithGoogle />
      </div>
    </div>
  );
}
