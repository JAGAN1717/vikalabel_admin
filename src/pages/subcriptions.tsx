import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { Editor } from "primereact/editor";
import Button from '@/components/ui/button';
import { HttpClient } from '@/data/client/http-client';
import { toast } from 'react-toastify';
import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';


const isBrowser = typeof window !== "undefined";

export default function Policypolicy() {

  const { t } = useTranslation();

  const [isLoading,setLoading] = useState<any>(false)

  const handleValue = () => {
    HttpClient.get('/get_subscribed_emails').then((res:any) => {
      // console.log('val',res?.data)
      setValue(res?.data)
    }).catch(err => {
      console.log('err',err.message)})
  }

  useEffect(()=> {
    handleValue()
  },[])

    if (typeof window  === "undefined") {
        return null;
      }
      


    const [value, setValue] = useState<any>([]);

    const columns = [
        {
          title: t('table:table-item-id'),
          dataIndex: 'id',
          key: 'id',
          align: 'left',
          width: 60,
        },
        {
            title: t('Email'),
            dataIndex: 'email',
            key: 'email',
            align: 'left',
            width: 60, 
        }
      ];


    
    return isBrowser ? (
        <>
        <div className="flex w-full flex-col  items-center md:flex-row mb-5">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold text-heading">
              {t('Subscription')}
            </h1>
          </div>
          </div>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={value}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
        </> 
    ) : null
}

Policypolicy.authenticate = {
    permissions: adminOnly,
};
Policypolicy.Layout = Layout;

export const getStaticProps = async ({ locale }:any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
    },
});
