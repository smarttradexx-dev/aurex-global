import './globals.css';
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700', '800'] });

export const metadata = {
  title: 'أورِكس | AUREX Global - التسوق العالمي إلى سوريا',
  description: 'اطلب من أشهر المتاجر العالمية والتركية ويصلك لباب بيتك في سوريا كل يوم خميس',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
