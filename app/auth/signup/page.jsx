import Logo from "@/components/publicComponents/Logo";
import { SignUpForm } from "@/components/authComponents/SignUpForm";
import { LoginWithGoogle } from "@/components/authComponents/LoginWithGoogle";


export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="w-full max-w-md border border-white/10 rounded-xl p-4 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">
            Create your account at <Logo size="md" className="inline-block"/> 
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your details to continue
          </p>
        </div>

        {/* SignUp Form */}
        <SignUpForm/>

          {/* Divider */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-white/10" />
          <span className="uppercase tracking-wide text-xs">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Sign Up with Google Button */}
        <LoginWithGoogle />
      </div>
    </div>
  );
}
