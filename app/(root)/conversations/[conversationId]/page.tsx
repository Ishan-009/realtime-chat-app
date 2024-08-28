'use client';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import ConversationContainer from '../../../../components/shared/conversations/ConversationContainer';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import Body from './_components/body/Body';
import DeleteGroupDialog from './_components/dialogs/DeleteGroupDialog';
import LeaveGroupDialog from './_components/dialogs/LeaveGroupDialog';
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog';
import Header from './_components/Header';
import ChatInput from './_components/input/ChatInput';
type Props = {
  params: {
    conversationId: Id<'conversations'>;
  };
};

export default function ConversationPage({
  params: { conversationId },
}: Props) {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const [removeFreindDialogOpen, setRemoveFreindDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setleaveGroupDialogOpen] = useState(false);
  // const [callType, setcallType] = useState('audio' | 'video' | null);

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8"></Loader2>
    </div>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFreindDialogOpen}
        setOpen={setRemoveFreindDialogOpen}
      ></RemoveFriendDialog>

      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />

      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setleaveGroupDialogOpen}
      />

      <Header
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ''
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: 'Leave Group',
                  destructive: false,
                  onClick: () => {
                    setleaveGroupDialogOpen(true);
                  },
                },
                {
                  label: 'Delete Group',
                  destructive: true,
                  onClick: () => {
                    setDeleteGroupDialogOpen(true);
                  },
                },
              ]
            : [
                {
                  label: 'Remove Friend',
                  destructive: true,
                  onClick: () => {
                    setRemoveFreindDialogOpen(true);
                  },
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
}
