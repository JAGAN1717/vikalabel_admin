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



const isBrowser = typeof window !== "undefined";

export default function Policypolicy() {

  const { t } = useTranslation();

  const [isLoading,setLoading] = useState<any>(false)


  const postPrivacy = () => {
    let body = {
      'description': value
    }
    setLoading(true)
    HttpClient.post('/update-frontend-pages/privacy_policy',body).then(res => {
      // console.log('Success',res)
      setLoading(false)
      toast.success(t('common:successfully-updated'));
    }).catch(err => {
      setLoading(false)
      console.log('err',err.message)})
  }

  const postShiiping = () => {
    let body = {
      'description': value2
    }
    setLoading(true)

    HttpClient.post('/update-frontend-pages/shipping_policy',body).then(res => {
      // console.log('Success',res)
      setLoading(false)
      toast.success(t('common:successfully-updated'));
    }).catch(err => {
      setLoading(false)
      console.log('err',err.message)})
  }

  const postTermsCondition = () => {
    let body = {
      'description': value3
    }
    setLoading(true)

    HttpClient.post('/update-frontend-pages/terms_of_service',body).then(res => {
      // console.log('Success',res)
      setLoading(false)
      toast.success(t('common:successfully-updated'));
    }).catch(err => {
      setLoading(false)
      console.log('err',err.message)})
  } 

  const postAbout = () => {
    let body = {
      'description': value4
    }
    setLoading(true)
    HttpClient.post('/update-frontend-pages/about_us',body).then(res => {
      // console.log('Success',res)
      setLoading(false)
      toast.success(t('common:successfully-updated'));
    }).catch(err => {
      setLoading(false)
      console.log('err',err.message)})
  } 

  const postRefund = () => {
    let body = {
      'description': value5
    }
    setLoading(true)
    HttpClient.post('/update-frontend-pages/refund_policy',body).then(res => {
      // console.log('Success',res)
      setLoading(false)
      toast.success(t('common:successfully-updated'));
    }).catch(err => {
      setLoading(false)
      console.log('err',err.message)})
  } 

  const handleValue = () => {
    HttpClient.get('/get-frontend-pages').then((res:any) => {
      // console.log('val',res?.data)
      const privacy_policy = res?.data?.find((e: { title: string; }) => e.title == "privacy_policy")
      const shipping_policy = res?.data?.find((e: { title: string; }) => e.title == "shipping_policy")
      const terms_of_service = res?.data?.find((e: { title: string; }) => e.title == "terms_of_service")
      const about_us = res?.data?.find((e: { title: string; }) => e.title == "about_us")
      const refund_policy = res?.data?.find((e: { title: string; }) => e.title == "refund_policy")
      if (privacy_policy) {
        let data = JSON.parse(privacy_policy?.value)?.description
        setValue(data)
      }
      if (shipping_policy) {
        let data = JSON.parse(shipping_policy?.value)?.description
        setValue2(data)
      }
      if (terms_of_service) {
        let data = JSON.parse(terms_of_service?.value)?.description
        setValue3(data)
      }
      if (about_us) {
        let data = JSON.parse(about_us?.value)?.description
        setValue4(data)
      } 
      if(refund_policy){
        let data = JSON.parse(refund_policy?.value)?.description
        setValue5(data)
      }
    }).catch(err => {
      console.log('err',err.message)})
  }

  useEffect(()=> {
    handleValue()
  },[])

    if (typeof window  === "undefined") {
        return null;
      }
      


    const [value, setValue] = useState<any>( );
    const [value2, setValue2] = useState<any>( );
    const [value3, setValue3] = useState<any>( );
    const [value4, setValue4] = useState<any>( );
    const [value5, setValue5] = useState<any>( );



    
    return isBrowser ? (
        <>
        <div className='mb-10'>
        <Card className="flex flex-col">
                <div className="flex flex-col items-center justify-between w-full md:flex-row  mb-5">
                    <h1 className="text-xl font-semibold text-heading">
                        {t('Privacy Policy')}
                    </h1>

                    <Button type='button' loading={isLoading} disabled={isLoading} onClick={()=>postPrivacy()} >Upload</Button>
                </div>
            <div className='border'>
            <Editor value={value} onTextChange={(e) => setValue(e.htmlValue)} style={{ height: '320px' }} />
            </div>
            </Card>
        </div>
        <div className='mb-10'>
        <Card className="flex flex-col">
                <div className="flex flex-col items-center justify-between w-full md:flex-row  mb-5">
                    <h1 className="text-xl font-semibold text-heading">
                        {t('Shipping Policy')}
                    </h1>

                    <Button type='button' loading={isLoading} disabled={isLoading} onClick={()=>postShiiping()} >Upload</Button>
                </div>
            <div className='border'>
            <Editor value={value2} onTextChange={(e) => setValue2(e.htmlValue)} style={{ height: '320px' }} />
            </div>
            </Card>
        </div>
        <div className='mb-10'>
        <Card className="flex flex-col ">
                <div className="flex flex-col items-center justify-between w-full md:flex-row mb-5">
                    <h1 className="text-xl font-semibold text-heading">
                        {t('Terms Of Service')}
                    </h1>

                    <Button type='button' loading={isLoading} disabled={isLoading} onClick={()=>postTermsCondition()} >Upload</Button>
                </div>
            <div className='border'>
            <Editor value={value3} onTextChange={(e) => setValue3(e.htmlValue)} style={{ height: '320px' }} />
            </div>
            </Card>
        </div>
        <div className='mb-10'>
        <Card className="flex flex-col">
                <div className="flex flex-col items-center justify-between w-full md:flex-row  mb-5">
                    <h1 className="text-xl font-semibold text-heading">
                        {t('Return Policy')}
                    </h1>

                    <Button type='button' loading={isLoading} disabled={isLoading} onClick={()=>postRefund()} >Upload</Button>
                </div>
            <div className='border'>
            <Editor value={value5} onTextChange={(e) => setValue5(e.htmlValue)} style={{ height: '320px' }} />
            </div>
            </Card>
        </div>
        <div className='mb-10'>
        <Card className="flex flex-col">
                <div className="flex flex-col items-center justify-between w-full md:flex-row  mb-5">
                    <h1 className="text-xl font-semibold text-heading">
                        {t('About us')}
                    </h1>

                    <Button type='button' loading={isLoading} disabled={isLoading} onClick={()=>postAbout()} >Upload</Button>
                </div>
            <div className='border'>
            <Editor value={value4} onTextChange={(e) => setValue4(e.htmlValue)} style={{ height: '320px' }} />
            </div>
            </Card>
        </div>

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
