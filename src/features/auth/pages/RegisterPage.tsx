import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function RegisterPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const { mutate, isPending, error } = useRegister();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: FormErrors = {};
        if (!fullName.trim()) {
            nextErrors.fullName = "Full name is required.";
        }
        if (!email.trim()) {
            nextErrors.email = "Email is required.";
        }
        if (!password.trim()) {
            nextErrors.password = "Password is required.";
        }
        if (!confirmPassword.trim()) {
            nextErrors.confirmPassword = "Please confirm your password.";
        } else if (confirmPassword !== password) {
            nextErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        mutate({
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            confirmPassword,
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-600 selection:text-white">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                
                {/* Visual decoration */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-50 rounded-full mix-blend-multiply opacity-70 blur-xl pointer-events-none" />
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-50 rounded-full mix-blend-multiply opacity-70 blur-xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md mb-4">
                        <span className="text-white font-black text-2xl">D</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                        Create Account
                    </h1>
                    <p className="mt-2 text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">
                        Start shopping at DOTNET<span className="text-indigo-600">STORE</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <User className="h-4 w-4 text-slate-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    setErrors((curr) => ({ ...curr, fullName: undefined }));
                                }}
                                className={`w-full bg-slate-50 border ${
                                    errors.fullName ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                } rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                            />
                        </div>
                        {errors.fullName && (
                            <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-slate-400" />
                            </span>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((curr) => ({ ...curr, email: undefined }));
                                }}
                                className={`w-full bg-slate-50 border ${
                                    errors.email ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                } rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-slate-400" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((curr) => ({ ...curr, password: undefined }));
                                }}
                                className={`w-full bg-slate-50 border ${
                                    errors.password ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                } rounded-2xl pl-10 pr-10 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-slate-400" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrors((curr) => ({ ...curr, confirmPassword: undefined }));
                                }}
                                className={`w-full bg-slate-50 border ${
                                    errors.confirmPassword ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                } rounded-2xl pl-10 pr-10 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-800 text-[11px] font-bold py-2.5 px-4 rounded-xl text-center">
                            Failed to create account. Check connection or user details.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                        {isPending ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500 font-medium relative z-10">
                    Already registered?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 hover:underline font-bold"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
