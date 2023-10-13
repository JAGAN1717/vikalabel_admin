import {useState} from 'react'
import Navbar from '@/components/layouts/navigation/top-navbar';
import { Fragment } from 'react';
import MobileNavigation from '@/components/layouts/navigation/mobile-navigation';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import SidebarItem from '@/components/layouts/navigation/sidebar-item';
import { useRouter } from 'next/router';
import { ArrowNext } from '@/components/icons/arrow-next';
import { ArrowPrev } from '@/components/icons/arrow-prev';


const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
  const [classtext,setClassText] = useState<any>()

  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
        <SidebarItem href={href} label={t(label)} icon={icon} key={href} classtext={classtext}  />
      ))}
    </Fragment>
  );

  const handleSildebar = () => {
    document.getElementById('sideAddnavbar')?.classList.add('sideAddnav');
    // let nav = document.getElementById('sideAddnavbar') 
    // nav!.style.width = '93px'
    // document.getElementById('textHidejs')?.classList.add('hidden')
    setClassText('lg:hidden')
    // label!.style.display = 'none'
  }

  const handleSildebar2 = () => {
    // let nav = document.getElementById('sideAddnavbar') 
    // nav!.style.width = '100%'
    document.getElementById('sideAddnavbar')?.classList.remove('sideAddnav');
    setClassText('')
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150"
      dir={dir}
    >
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <div>
        {/* <aside className="xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-white px-4 pt-22 shadow ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block "> */}
        <aside id='sideAddnavbar' className="xl:w-76 bottom-0 hidden h-full w-72 overflow-y-auto bg-white shadow ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block asside_menu">
          <div className="flex flex-col  space-y-6 py-3">
           {classtext ? <a onClick={()=> handleSildebar2()} className='flex justify-center'><ArrowNext/></a> : <a onClick={()=> handleSildebar()} className='flex justify-end pe-5 cursor-pointer'><ArrowPrev/></a> } 
            <SidebarItemMap />
          </div>
         </aside> 
        </div>

        {/* <main className="ltr:xl:pl-76 rtl:xl:pr-76 w-full ltr:lg:pl-72 rtl:lg:pr-72 rtl:lg:pl-0"> */}
        <main className="w-full">
          <div className="h-full p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
