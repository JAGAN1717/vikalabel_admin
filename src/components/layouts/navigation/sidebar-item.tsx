import Link from '@/components/ui/link';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
import { useRouter } from 'next/router';

const SidebarItem = ({ href, icon, label,classtext }: any) => {
  const { closeSidebar } = useUI();  
  const router = useRouter()
  const active = router.pathname === href || router.pathname.startsWith(`${href}/`)


  return (
    <Link
      href={href}
      className={`text-start p-3 flex w-full items-center text-base hover:text-accent ${classtext && 'lg:justify-center'} focus:text-accent ${active && 'sideBar_active'}`}
    >
      {getIcon({
        iconList: sidebarIcons,
        iconName: icon,
        className: 'w-5 h-5 me-4',
      })}
      <span onClick={() => closeSidebar()} className={classtext}>{label}</span>
    </Link>
  );
};

export default SidebarItem;
