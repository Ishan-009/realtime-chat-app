import { Id } from '@/convex/_generated/dataModel';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar';

import { ConvexError } from 'convex/values';
import { Check, User, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { api } from '../../../../convex/_generated/api';
import { useMutationState } from '../../../hooks/useMutationState';
type Props = {
  id: Id<'requests'>;
  imageUrl: string;
  username: string;
  email: string;
};
const Request = ({ id, imageUrl, username, email }: Props) => {
  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.deny
  );

  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
    api.request.accept
  );
  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl}></AvatarImage>
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <h4 className="flex flex-col truncate">{username}</h4>
        <p className="text-xs text-muted-foreground truncate">{email}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={denyPending || acceptPending}
          size="icon"
          onClick={() => {
            acceptRequest({ id })
              .then(() => {
                toast.success('Friend Request Accepted');
              })
              .catch((error) => {
                toast.error(
                  error instanceof ConvexError ? error.data : 'Unexpected Error'
                );
              });
          }}
        >
          <Check></Check>
        </Button>
        <Button
          disabled={denyPending}
          size="icon"
          variant="destructive"
          onClick={() => {
            denyRequest({ id })
              .then(() => {
                toast.success('Friend Request Denied');
              })
              .catch((error) => {
                toast.error(
                  error instanceof ConvexError ? error.data : 'Unexpected Error'
                );
              });
          }}
        >
          <X className="h-4 w-4"></X>
        </Button>
      </div>
    </Card>
  );
};

export default Request;
