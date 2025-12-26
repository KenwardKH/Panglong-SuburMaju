import i18n from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next'

i18n
.use(I18NextHttpBackend) // Mengambil file json dari /public/locales
.use(I18nextBrowserLanguageDetector) // Mendeteksi bahasa otomatis dari browser
.use(initReactI18next) // Menghubungkan dengan react-i18next
.init({
    fallbackLng: 'en',
    debug: true, // Set false jika sudah produksi
    interpolation: {
        escapeValue: false
    },
    backend: {
        // Path menuju file json terjemahan Anda
        loadPath: '/locales/{{lng}}/translation.json'
    }
})

export default i18n;