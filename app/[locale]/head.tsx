import { getContent, isLocale } from "@/content";
import { INTRO_SESSION_KEY } from "@/components/layout/IntroCurtain";
import { generateSiteSchema } from "@/lib/json-ld";
import type { Locale } from "@/types";

export default function Head({ params }: { params: { locale: string } }) {
    const { locale } = params;
    if (!isLocale(locale)) return null;

    const content = getContent(locale as Locale);

    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `try{if(sessionStorage.getItem(${JSON.stringify(
                        INTRO_SESSION_KEY,
                    )})==="1")document.documentElement.classList.add("intro-played")}catch(e){}`,
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateSiteSchema(locale as Locale, content)),
                }}
            />

            <noscript>
                <style>{`#intro-curtain{display:none !important}`}</style>
            </noscript>
        </>
    );
}
