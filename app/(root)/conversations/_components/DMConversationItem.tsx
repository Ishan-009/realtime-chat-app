import Link from 'next/link';
import { Avatar, AvatarImage } from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import { Card } from '../../../../components/ui/card';
import { Id } from '../../../../convex/_generated/dataModel';
type Props = {
  id: Id<'conversations'>;
  imageUrl: string;
  username: string;
  lastMessageContent?: string;
  lastMessageSender?: string;
  unseenCount: number;
};

const DMConversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
  unseenCount,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full ">
      <Card className="p-2 flex flex-row items-center  justify-between">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
          </Avatar>
          <div className="flex flex-col  truncate">
            <h4 className="truncate">{username}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender}
                  {':'}
                  {lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">
                Start the Conversation !
              </p>
            )}
          </div>
        </div>
        {unseenCount ? <Badge>{unseenCount}</Badge> : null}
      </Card>
    </Link>
  );
};

export default DMConversationItem;
