
import { Post } from '@/lib/types';


type ContentSectionProps = {
  data: Post;
};
export default function ContentSection({ data }: ContentSectionProps) {
  return (
    <section className="flex flex-col items-center border-b border-slate-200 py-12 text-slate-800 text-md">
      <div className="">{data?.content}</div>
    </section>
  );
}
