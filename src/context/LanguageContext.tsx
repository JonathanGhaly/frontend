import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext =
    createContext<LanguageContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
    const getInitialLanguage = (): Language => {
        const saved = localStorage.getItem("language") as Language | null;

        if (saved === "en" || saved === "ar") {
            return saved;
        }

        return navigator.language.startsWith("ar")
            ? "ar"
            : "en";
    };

    const [language, setLanguageState] =
        useState<Language>(getInitialLanguage);

    const value = useMemo(
        () => ({
            language,

            setLanguage(language: Language) {
                localStorage.setItem("language", language);

                document.documentElement.lang = language;
                document.documentElement.dir =
                    language === "ar" ? "rtl" : "ltr";

                setLanguageState(language);
            },

            toggleLanguage() {
                const next =
                    language === "en" ? "ar" : "en";

                localStorage.setItem("language", next);

                document.documentElement.lang = next;
                document.documentElement.dir =
                    next === "ar" ? "rtl" : "ltr";

                setLanguageState(next);
            },
        }),
        [language]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}