import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { getIcon } from '@/utils/get-icon';
import Label from '@/components/ui/label';
import * as typeIcons from '@/components/icons/type';
import { AttachmentInput, Type, TypeSettingsInput } from '@/types';
import { typeIconList } from './group-icons';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { typeValidationSchema } from './group-validation-schema';
import SelectInput from '@/components/ui/select-input';
import FileInput from '@/components/ui/file-input';
import Title from '@/components/ui/title';
import Alert from '@/components/ui/alert';
import TextArea from '@/components/ui/text-area';
import RadioCard from '@/components/ui/radio-card/radio-card';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { useCreateTypeMutation, useUpdateTypeMutation } from '@/data/type';
import { EditIcon } from '@/components/icons/edit';
import { Config } from '@/config';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { join, split } from 'lodash';
import { formatSlug } from '@/utils/use-slug';
import { HttpClient } from '@/data/client/http-client';


export const updatedIcons = typeIconList.map((item: any) => { 




  item.label = (
    <div className="flex items-center space-s-5">
      <span className="flex h-5 w-5 items-center justify-center">
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: 'max-h-full max-w-full',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

const layoutTypes = [
  {
    label: 'Classic',
    value: 'classic',
    img: '/image/layout-classic.png',
  },
  // {
  //   label: 'Compact',
  //   value: 'compact',
  //   img: '/image/layout-compact.png',
  // },
  // {
  //   label: 'Minimal',
  //   value: 'minimal',
  //   img: '/image/layout-minimal.png',
  // },
  // {
  //   label: 'Modern',
  //   value: 'modern',
  //   img: '/image/layout-modern.png',
  // },
  // {
  //   label: 'Standard',
  //   value: 'standard',
  //   img: '/image/layout-standard.png',
  // },
];
const productCards = [
  // {
  //   label: 'Helium',
  //   value: 'helium',
  //   img: '/image/card-helium.png',
  // },
  // {
  //   label: 'Neon',
  //   value: 'neon',
  //   img: '/image/card-neon.png',
  // },
  // {
  //   label: 'Argon',
  //   value: 'argon',
  //   img: '/image/card-argon.png',
  // },
  // {
  //   label: 'Krypton',
  //   value: 'krypton',
  //   img: '/image/card-krypton.png',
  // },
  {
    label: 'Xenon',
    value: 'xenon',
    img: '/image/card-xenon.png',
  },
  // {
  //   label: 'Radon',
  //   value: 'radon',
  //   img: '/image/card-radon.png',
  // },
];

type BannerInput = {
  title: string;
  description: string;
  image: AttachmentInput;
};


type Collections = {
  title:string;
  url:string
};


type FormValues = {
  name: string;
  slug?: string | null;
  icon?: any;
  promotional_sliders: AttachmentInput[];
  banners: BannerInput[];
  settings: TypeSettingsInput;

  banner_image: any;
  banner_title: string;
  banner_subtitle: string;
  images:any;
  collect:Collections[];
};

type IProps = {
  initialValues?: Type | null;
};
export default function CreateOrUpdateTypeForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [colectT,setCollecT]= useState<any>(localStorage.getItem('fileLen') ?? 0)
  const [isSlugDisable, setIsSlugDisable] = useState<boolean>(true);
  const isSlugEditable =
    router?.query?.action === 'edit' &&
    router?.locale === Config.defaultLanguage;
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(typeValidationSchema),
    defaultValues: {
      ...initialValues,
      // @ts-ignore
      settings: {
        ...initialValues?.settings,
        layoutType: initialValues?.settings?.layoutType
          ? initialValues?.settings?.layoutType
          : layoutTypes[0].value,
        productCard: initialValues?.settings?.productCard
          ? initialValues?.settings?.productCard
          : productCards[0].value,
      },
      icon: initialValues?.icon
        ? typeIconList.find(
          (singleIcon) => singleIcon.value === initialValues?.icon
        )
        : '',
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'banners',
  });
  const layoutType = watch('settings.layoutType');

  const { mutate: createType, isLoading: creating } = useCreateTypeMutation();
  const { mutate: updateType, isLoading: updating } = useUpdateTypeMutation();
  const slugAutoSuggest = formatSlug(watch('name'));
  const onSubmit = (values: FormValues) => {
    
    const images: any[] = [];
    const titles: string[] = [];
    const urls: string[] = [];
    values.collect?.map((res,i)=>{
      // images[i]= res.images,
      titles[i]= res.title,
      urls[i]= res.url
    })

    let imagPath = ''
    const url = values.banner_image?.original;
    const parts = url?.split('/public/'); // Split the URL by '/public/'
    if (parts?.length === 2) {
      imagPath = '/' + parts[1];
    } else {
      console.log('URL format not as expected');
    }

    const body = {
      banner_image:imagPath,
      banner_title:values.banner_title,
      banner_subtitle:values.banner_subtitle,
      images:values.images?.map((res: { original: any; }) =>  '/'+res?.original?.split('/public/')[1]),
      titles:titles,  
      urls:urls
    }


    // console.log('skdhksgdskds',values.collect)
    // console.log('etefefefef',body)
    if(values.images?.length){
      HttpClient.post('/home-luxe-section',body).then(res => {
        console.log('succ',res)
      }).catch(err => console.log('err',err.message))
    }
 
    const input = {
      language: router.locale,
      name: values.name!,
      slug: values.slug!,
      icon: values.icon?.value,
      settings: {
        isHome: values?.settings?.isHome,
        productCard: values?.settings?.productCard,
        layoutType: values?.settings?.layoutType,
      },
      promotional_sliders: [values.promotional_sliders]?.map(
        ({ thumbnail, original, id }: any) => ({
          thumbnail,
          original,
          id,
        })
      ),
      banners: values?.banners?.map((banner) => ({
        ...banner,
        image: {
          id: banner?.image?.id,
          thumbnail: banner?.image?.thumbnail,
          original: banner?.image?.original,
        },
      })),
    };

    if (
      !initialValues ||
      !initialValues.translated_languages.includes(router.locale!)
    ) {
      createType({
        ...input,
        ...(initialValues?.slug && { slug: initialValues.slug }),
      });
    } else {
      updateType({
        ...input,
        id: initialValues.id!,
      });
    }
  };

  // console.log('etefefefef',control)

  // useEffect(()=> {
  //   if(localStorage.getItem('fileLen')){
  //     setCollecT(JSON.parse(localStorage.getItem('fileLen')))
  //   }
  // },[localStorage.getItem('fileLen')])
  
// console.log('lll',colectT)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-description')}
          details={`${initialValues
              ? t('form:item-description-update')
              : t('form:item-description-add')
            } ${t('form:type-description-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          // disabled={[].includes(Config.defaultLanguage)}
          disabled={true}
          />
          {isSlugEditable ? (
            <div className="relative mb-5">
              <Input
                label={`${t('Slug')}`}
                {...register('slug')}
                error={t(errors.slug?.message!)}
                variant="outline"
                disabled={isSlugDisable}
              />
              <button
                className="absolute top-[27px] right-px z-10 flex h-[46px] w-11 items-center justify-center rounded-tr rounded-br border-l border-solid border-border-base bg-white px-2 text-body transition duration-200 hover:text-heading focus:outline-none"
                type="button"
                title={t('common:text-edit')}
                onClick={() => setIsSlugDisable(false)}
              >
                <EditIcon width={14} />
              </button>
            </div>
          ) : (
            <Input
              label={`${t('Slug')}`}
              {...register('slug')}
              value={slugAutoSuggest}
              variant="outline"
              className="mb-5"
              disabled
            />
          )}

          <div className="mb-5">
            <Label>{t('form:input-label-select-icon')}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
              placeholder="Select Icon"
              disabled={true}
            />
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:group-settings')}
          details={t('form:group-settings-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Checkbox
            {...register('settings.isHome')}
            error={t(errors.settings?.isHome?.message!)}
            label={t('form:input-label-is-home')}
            className="mb-5"
          />
          <div className="mb-10">
            <Label className="mb-5">{t('form:input-label-layout-type')}</Label>

            <div className="grid grid-cols-3 gap-5">
              {layoutTypes?.map((layout, index) => {
                return (
                  <RadioCard
                    key={index}
                    {...register('settings.layoutType')}
                    label={t(layout.label)}
                    value={layout.value}
                    src={layout.img}
                    id={layout?.value}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-5">
            <Label className="mb-5">
              {t('form:input-label-product-card-type')}
            </Label>

            <div className="grid grid-cols-3 gap-5">
              {productCards?.map((productCard, index) => {
                return (
                  <RadioCard
                    key={`product-card-${index}`}
                    {...register('settings.productCard')}
                    label={t(productCard.label)}
                    value={productCard.value}
                    src={productCard.img}
                    id={`product-card-${index}`}
                  />
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {layoutType === 'classic' ? (
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('Promotional Banner')}
            details={t('Upload Promotional Banner')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="promotional_sliders" control={control} multiple={false} />
          </Card>
        </div>
      ) : null}

      {layoutType === 'classic' ? (
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('Collections')}
            details={t('Upload Collections')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className=''>
            <div className="mb-3 w-full">
              <Title>{t('Background Image')}</Title>
              <FileInput name="banner_image" control={control} multiple={false} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Input
                label={t('Main Title')}
                {...register('banner_title')}
                error={t(errors.banner_title?.message!)}
                variant="outline"
                className="mb-5"
              // disabled={[].includes(Config.defaultLanguage)}
              />
              <Input
                label={t('Main Subtitle')}
                {...register('banner_subtitle')}
                error={t(errors.banner_subtitle?.message!)}
                variant="outline"
                className="mb-5"
              // disabled={[].includes(Config.defaultLanguage)}
              />
            </div>
            </div>

            <div className=''>
            <div className="mb-3 w-full">
              <Title>{t('images')}</Title>
              <FileInput name="images" control={control} multiple={true} />
            </div>
            { control?._formValues?.images  ?
              // [...Array(colectT ?? control?._formValues?.images?.length)].map((x,i)=>(
                [...Array(control?._formValues?.images?.length)].map((x,i)=>(
                <div className="grid grid-cols-2 gap-5" key={i}>
                  <Input
                    label={t('Title')}
                    // {...register(`title[${i}]`)}
                    {...register(`collect.${i}.title` as const)}
                    // error={t(errors.title?.message!)}
                    error={t(errors.collect?.[i]?.title?.message!)}
                    variant="outline"
                    className="mb-5"
                  // disabled={[].includes(Config.defaultLanguage)}
                  />
                  <Input
                    label={t('Url')}
                    // {...register('url')}
                    {...register(`collect.${i}.url` as const)}
                    error={t(errors.collect?.[i]?.url?.message!)}
                    variant="outline"
                    className="mb-5"
                  // disabled={[].includes(Config.defaultLanguage)}
                  />
                </div>
              )) : ''
            }
            </div>
          </Card>
        </div>
      ) : null}



      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('common:text-banner')}
          details={t('form:banner-slider-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((item: any & { id: string }, index: number) => (
              <div
                className="border-b border-dashed border-border-200 py-5 first:pt-0 last:border-0 md:py-8"
                key={item.id}
              >
                <div className="mb-5 flex items-center justify-between">
                  <Title className="mb-0">
                    {t('common:text-banner')} {index + 1}
                  </Title>
                  <button
                    onClick={() => {
                      remove(index);
                    }}
                    type="button"
                    className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                  >
                    {t('form:button-label-remove')}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <Input
                    label={t('form:input-title')}
                    variant="outline"
                    {...register(`banners.${index}.title` as const)}
                    defaultValue={item?.title!} // make sure to set up defaultValue
                    error={t(errors.banners?.[index]?.title?.message!)}
                  />
                  <TextArea
                    label={t('form:input-description')}
                    variant="outline"
                    {...register(`banners.${index}.description` as const)}
                    defaultValue={item.description!} // make sure to set up defaultValue
                  />
                </div>

                <div className="mt-5 w-full">
                  <Title>{t('form:input-gallery')}</Title>
                  <FileInput
                    name={`banners.${index}.image`}
                    control={control}
                    multiple={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={() =>
              // @ts-ignore
              append({ title: '', description: '', image: {} })
            }
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-banner')}
          </Button>

          {/* @ts-ignore */}
          {errors?.banners?.message ? (
            <Alert
              message={
                // @ts-ignore
                t(errors?.banners?.message)
              }
              variant="error"
              className="mt-5"
            />
          ) : null}
        </Card>
      </div>

      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues
            ? t('form:button-label-update-group')
            : t('form:button-label-add-group')}
        </Button>
      </div>
    </form>
  );
}
