import { Button } from '../ui/button';
import ListItemContainer from '../atoms/ListItemContainer';
import { Keyword } from '@/types/keyword';

type KeywordItemProps = {
  keyword: Keyword;
  editingKeywordId: number | null;
  editedKeyword: string;
  setEditedKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleInputBlur: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function KeywordItem({
  keyword,
  editingKeywordId,
  editedKeyword,
  setEditedKeyword,
  handleInputBlur,
  onEdit,
  onDelete,
}: KeywordItemProps) {
  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Enter 키를 누르면 수정 완료
      handleInputBlur();
    }
  };

  return (
    <ListItemContainer>
      <div className="flex justify-between items-center">
        {editingKeywordId === keyword.id ? (
          <input
            type="text"
            value={editedKeyword}
            onChange={e => setEditedKeyword(e.target.value)}
            onBlur={handleInputBlur}
            onKeyUp={handleInputKeyUp}
            className="focus:border-0 focus:outline-0"
          />
        ) : (
          <span>{keyword.keywordName}</span>
        )}
        <div className="flex gap-2">
          {editingKeywordId !== keyword.id && (
            <Button size="sm" variant="outline" onClick={onEdit}>
              수정
            </Button>
          )}
          <Button size="sm" variant="secondary" onClick={onDelete} disabled={editingKeywordId !== null}>
            삭제
          </Button>
        </div>
      </div>
    </ListItemContainer>
  );
}
