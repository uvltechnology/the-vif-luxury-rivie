import { Globe } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage, SUPPORTED_LANGUAGES } from '@/contexts/LanguageContext'
import { useTranslation } from '@/hooks/useTranslation'

export default function LanguageSwitcher({ useWhiteText = false }) {
  const { currentLanguage, changeLanguage } = useLanguage()
  const { t } = useTranslation()
  
  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={`gap-2 transition-colors duration-300 ${
            useWhiteText 
              ? 'text-white hover:text-white hover:bg-white/20' 
              : 'text-foreground hover:text-primary'
          }`}
          style={{ textShadow: useWhiteText ? '0 1px 3px rgba(0,0,0,0.4)' : 'none' }}
        >
          <Globe size={20} weight="duotone" />
          <span className="hidden md:inline">{currentLang?.flag} {currentLang?.name}</span>
          <span className="md:hidden">{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer gap-3 ${
              currentLanguage === language.code 
                ? 'bg-accent text-accent-foreground font-medium' 
                : ''
            }`}
          >
            <span className="text-xl">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
