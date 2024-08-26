import Link from 'next/link';
import { Avatar, AvatarImage } from '../../../../components/ui/avatar';
import { Card } from '../../../../components/ui/card';
import { Id } from '../../../../convex/_generated/dataModel';
type Props = {
  id: Id<'conversations'>;
  imageUrl: string;
  username: string;
  lastMessageContent?: string;
  lastMessageSender?: string;
};

const DMConversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full ">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
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
      </Card>
    </Link>
  );
};

export default DMConversationItem;
