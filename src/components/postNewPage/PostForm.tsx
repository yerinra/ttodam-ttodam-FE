/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { postPostNew, putPostEdit } from '@/apis/post/post';
import { CalendarIcon, Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { Textarea } from '../ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '../ui/select';
import { CATEGORIES } from '@/constants/data';
import DaumPost from '../atoms/DaumPost';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn, formatDate } from '@/lib/utils';
import { useState } from 'react';
import { PostFormSchema, formSchema } from '@/types/post';

type PostFormProps = {
  postId?: number;
  defaultValues?: PostFormSchema;
  isEditing: boolean;
  imageURL?: string[];
};

export default function PostForm({ postId, defaultValues, isEditing, imageURL }: PostFormProps) {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(defaultValues?.products.length || 0);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(imageURL || []);

  const form = useForm<PostFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'products' });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert(`1MB 이하의 사진만 등록할 수 있습니다.`);
        console.error('1MB 미만의 파일만 업로드 가능합니다.');
        return '';
      }

      const imageUrl = URL.createObjectURL(file);
      setImageFiles(prevFiles => [...prevFiles, file]);
      setImagePreview(prevPreviews => [...prevPreviews, imageUrl]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);

    const newPreviews = [...imagePreview];
    const removedPreview = newPreviews.splice(index, 1)[0];
    URL.revokeObjectURL(removedPreview);
    setImagePreview(newPreviews);

    const inputElement = document.getElementById('image-input') as HTMLInputElement | null;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  const handleSubmit = async (values: PostFormSchema) => {
    if (productCount == 0) return;
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('deadline', String(values.deadline));
    formData.append('category', values.category);
    formData.append('participants', String(values.participants));
    formData.append('place', values.place);
    formData.append('content', values.content);

    values.products.forEach((product, index) => {
      formData.append(`products[${index}][productName]`, product.productName);
      formData.append(`products[${index}][purchaseLink]`, product.purchaseLink);
      formData.append(`products[${index}][count]`, String(product.count));
      formData.append(`products[${index}][price]`, String(product.price));
    });

    imageFiles
      .filter(image => image !== null)
      .forEach(image => {
        formData.append(`imageFiles`, image!);
      });

    // for (const key of formData.keys()) {
    //   console.log(key, ':', formData.get(key));
    // }

    try {
      await postPostNew(formData);
      navigate('/posts/all');
    } catch (error) {
      console.error('요청을 보내는 중 오류가 발생하였습니다.', error);
    }
  };

  const handleEdit = async (values: PostFormSchema) => {
    const formData = new FormData();
    imageFiles
      .filter(image => image !== null)
      .forEach(image => {
        formData.append(`imageFiles`, image!);
      });

    try {
      if (postId) {
        await putPostEdit(postId, formData, values);
        navigate('/posts/all');
      }
    } catch (error) {
      console.error('수정 오류', error);
    }
  };

  const onSubmit = (values: PostFormSchema) => {
    if (isEditing) {
      handleEdit(values);
    } else {
      handleSubmit(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <Select value={field.value} onValueChange={value => field.onChange(value)}>
                  <div className="font-bold text-md">카테고리</div>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => {
                      if (category.type === 'ALL') return;
                      else
                        return (
                          <SelectItem key={category.type} value={category.type}>
                            {category.name}
                          </SelectItem>
                        );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="font-bold text-md">제목</div>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => {
            return (
              <FormItem>
                <Select value={String(field.value)} onValueChange={value => field.onChange(value)}>
                  <div className="font-bold text-md">모집인원</div>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => i + 1).map(v => {
                      return (
                        <SelectItem key={v} value={String(v)}>
                          {v}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="font-bold text-md">만남 장소</div>
                <DaumPost forwardedRef={field.ref} {...field} defaultAddress={defaultValues?.place || ''} />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col my-1">
              <div className="mb-1 font-bold text-md">모집기한</div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? formatDate(String(field.value)) : <span>모집기한을 선택해주세요.</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={value => {
                      field.onChange(String(value));
                    }}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="font-bold">함께 살 상품</div>
        {productCount == 0 && <FormDescription>상품을 하나 이상 등록해주세요.</FormDescription>}
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2 border p-4 rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                remove(index);
                setProductCount((prev: number) => prev - 1);
              }}
              className="top-0 right-0 absolute"
            >
              <Cross2Icon />
            </Button>
            <FormField
              control={form.control}
              name={`products.${index}.productName`}
              render={({ field }) => (
                <FormItem>
                  <div>상품 이름</div>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <div>상품 가격</div>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products.${index}.count`}
              render={({ field }) => (
                <FormItem>
                  <div>상품 개수</div>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products.${index}.purchaseLink`}
              render={({ field }) => (
                <FormItem>
                  <div>상품 링크</div>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          className="w-full"
          variant="secondary"
          type="button"
          onClick={() => {
            append({ productName: '', price: 0, count: 0, purchaseLink: '' });
            setProductCount((prev: number) => prev + 1);
          }}
        >
          <PlusIcon />
        </Button>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="font-bold text-md">상세설명</div>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <div className="font-bold text-md">사진 올리기</div>
          <div className="flex gap-2 border rounded-lg p-5">
            {imagePreview.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt="게시글 사진" className="w-20 h-20" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute right-1 top-1">
                  <Cross2Icon />
                </button>
              </div>
            ))}
            <label
              htmlFor="post-image"
              className="w-20 h-20 flex items-center justify-center bg-secondary cursor-pointer"
            >
              <PlusIcon />
              <input
                type="file"
                id="post-image"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                className="hidden"
              />
            </label>
          </div>
        </FormItem>
        <Button type="submit" size="sm" className="absolute right-0 top-0 m-3">
          {isEditing ? '수정완료 ' : '작성완료'}
        </Button>
      </form>
    </Form>
  );
}
