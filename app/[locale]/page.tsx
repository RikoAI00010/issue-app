import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';
import Alert from './alert';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <main className="flex min-h-screen flex-col  p-24">
      <div>
        <Link href="/" locale="en">
        {t('langEng')}
        </Link>
        <br/>
        <Link href="/" locale="pl">
        {t('langPol')}
        </Link>
      </div>
      <h1>{t('title')}</h1>
      <Alert message={t('alert')}/>
    </main>
  )
}
