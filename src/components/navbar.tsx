import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./switchLanguage";

export default function Navbar() {
    const { t } = useTranslation()
    return (
        <nav className="bg-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between h-16 items-center">
                    
                    <div className="flex space-x-4">
                        <a href="#">{t('nav.about')}</a>
                        <a href="#">{t('nav.products')}</a>
                        <a href="#">{t('nav.contact')}</a>
                    </div>
                    <div>
                        <LanguageSwitcher />
                    </div>
                </div>
                
            </div>
            
        </nav>
    )
}