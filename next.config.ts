import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  // Autres configurations si nécessaire
};

export default withNextIntl(config);
