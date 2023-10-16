import Image from 'next/image';
import Link from '@/components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@/settings/site.settings';
import { useSettings } from '@/contexts/settings.context';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { logo, siteTitle } = useSettings();
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn('inline-flex', className)}
      {...props}
    >
      <span
        className="relative overflow-hidden"
        style={{
          width: siteSettings.logo.width,
          height: siteSettings.logo.height,
        }}
      >
        <Image
          src={logo?.original ?? siteSettings.logo.url}
          alt={siteTitle ?? siteSettings.logo.alt}
          fill
          onError={(e) => e.currentTarget.src="/icons/Logo.png"}
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
          loading="eager"
        />
      </span>
    </Link>
  );
};

export default Logo;
