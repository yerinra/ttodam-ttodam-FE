import { type PostDetail } from '@/types/post';

type ContentSectionProps = {
  data: PostDetail;
};

export default function ContentSection({ data }: ContentSectionProps) {
  return (
    <section className="flex flex-col items-center border-b border-slate-200 py-12 text-slate-800 text-md">
      <div className="">{data.post.content}</div>
    </section>
  );
}
