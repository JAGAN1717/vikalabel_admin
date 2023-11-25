import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { Routes } from '@/config/routes';

export const siteSettings = {
  name: 'VikaLabel',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'VikaLabel',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  author: {
    name: 'RedQ, Inc.',
    // websiteUrl: 'https://redq.io',
    websiteUrl: '',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: Routes.dashboard,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      // {
      //   href: Routes.shop.list,
      //   label: 'sidebar-nav-item-shops',
      //   icon: 'ShopIcon',
      // },
      // {
      //   href: Routes.adminMyShops,
      //   label: 'sidebar-nav-item-my-shops',
      //   icon: 'MyShopIcon',
      // },
      // {
      //   href: Routes.product.list,
      //   label: 'sidebar-nav-item-products',
      //   icon: 'ProductsIcon',
      // },
      // {
      //   href: Routes.attribute.list,
      //   label: 'sidebar-nav-item-attributes',
      //   icon: 'AttributeIcon',
      // },
      // {
      //   href:  `${Routes.dashboard}${'clothing-shop'}`,
      //   label: 'sidebar-nav-item-shops',
      //   icon: 'ShopIcon',
      // },
      {
        href:`/${'clothing-shop'}${Routes.attribute.list}`,
        label: 'sidebar-nav-item-attributes',
        icon: 'AttributeIcon',  
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href:`/${'clothing-shop'}${Routes.product.list}`,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        // href: Routes.type.list,
        href: '/groups/clothing/edit',
        // label: 'sidebar-nav-item-groups',
        label: 'Banner',
        icon: 'TypesIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.category.list,
        label: 'sidebar-nav-item-categories',
        icon: 'CategoriesIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.tag.list,
        label: 'sidebar-nav-item-tags',
        icon: 'TagIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      // {
      //   href: Routes.manufacturer.list,
      //   label: 'sidebar-nav-item-manufacturers',
      //   icon: 'DiaryIcon',
      //   permissions: adminOwnerAndStaffOnly,
      // },
      // {
      //   href: Routes.author.list,
      //   label: 'sidebar-nav-item-authors',
      //   icon: 'FountainPenIcon',
      // },
      {
        href: Routes.order.list,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.order.create,
        label: 'sidebar-nav-item-create-order',
        icon: 'CalendarScheduleIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.user.list,
        label: 'sidebar-nav-item-users',
        icon: 'UsersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.coupon.list,
        label: 'sidebar-nav-item-coupons',
        icon: 'CouponsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.tax.list,
        label: 'sidebar-nav-item-taxes',
        icon: 'TaxesIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.shipping.list,
        label: 'sidebar-nav-item-shippings',
        icon: 'ShippingsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      // {
      //   href: Routes.withdraw.list,
      //   label: 'sidebar-nav-item-withdraws',
      //   icon: 'WithdrawIcon',
      //   permissions: adminOwnerAndStaffOnly,
      // },
      // {
      //   href: Routes.message.list,
      //   label: 'sidebar-nav-item-message',
      //   icon: 'ChatIcon',
      //   permissions: adminOwnerAndStaffOnly,
      // },
      {
        href: Routes.refund.list,
        label: 'sidebar-nav-item-refunds',
        icon: 'RefundsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      // {
      //   href: Routes.question.list,
      //   label: 'sidebar-nav-item-questions',
      //   icon: 'QuestionIcon',
      //   permissions: adminOwnerAndStaffOnly,
      // },
      // {
      //   href: Routes.storeNotice.list,
      //   label: 'sidebar-nav-item-store-notice',
      //   icon: 'StoreNoticeIcon',
      //   permissions: adminOwnerAndStaffOnly,
      // },
      {
        href: Routes.reviews.list,
        label: 'sidebar-nav-item-reviews',
        icon: 'ReviewIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: '/subcriptions',
        label: 'Subscription',
        icon: 'QuestionIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.policy,
        label: 'Pages',
        icon: 'FountainPenIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.settings,
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon',
        permissions: adminOwnerAndStaffOnly,
      },

    ],
    // shop: [
    //   {
    //     href: (shop: string) => `${Routes.dashboard}${'clothing-shop'}`,
    //     label: 'sidebar-nav-item-dashboard',
    //     icon: 'DashboardIcon',
    //     permissions: adminOwnerAndStaffOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${'clothing-shop'}${Routes.attribute.list}`,
    //     label: 'sidebar-nav-item-attributes',
    //     icon: 'AttributeIcon',  
    //     permissions: adminOwnerAndStaffOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${'clothing-shop'}${Routes.product.list}`,
    //     label: 'sidebar-nav-item-products',
    //     icon: 'ProductsIcon',
    //     permissions: adminOwnerAndStaffOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.author.list}`,
    //     label: 'sidebar-nav-item-authors',
    //     icon: 'FountainPenIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.manufacturer.list}`,
    //     label: 'sidebar-nav-item-manufacturers',
    //     icon: 'DiaryIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.order.list}`,
    //     label: 'sidebar-nav-item-orders',
    //     icon: 'OrdersIcon',
    //     permissions: adminOwnerAndStaffOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.refund.list}`,
    //     label: 'sidebar-nav-item-refunds',
    //     icon: 'RefundsIcon',
    //     permissions: adminOwnerAndStaffOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.staff.list}`,
    //     label: 'sidebar-nav-item-staffs',
    //     icon: 'UsersIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.withdraw.list}`,
    //     label: 'sidebar-nav-item-withdraws',
    //     icon: 'AttributeIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.reviews.list}`,
    //     label: 'sidebar-nav-item-reviews',
    //     icon: 'ReviewIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.question.list}`,
    //     label: 'sidebar-nav-item-questions',
    //     icon: 'QuestionIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    //   {
    //     href: (shop: string) => `/${shop}${Routes.storeNotice.list}`,
    //     label: 'sidebar-nav-item-store-notice',
    //     icon: 'StoreNoticeIcon',
    //     permissions: adminAndOwnerOnly,
    //   },
    // ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};
