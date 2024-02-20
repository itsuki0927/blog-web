import { updateCommentState } from "@/app/lib/supabase";
import { Comment } from "@/app/types/comment";
import { Button } from "@/components/ui/button";
import { CommentState } from "@/constants/comment";
import { Row } from "@tanstack/react-table";
import React from "react";

interface SpamButtonProps {
  row: Row<Comment>;
}

const SpamButton = ({ row }: SpamButtonProps) => {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        updateCommentState(row.original.id, CommentState.Spam);
      }}
    >
      标为垃圾
    </Button>
  );
};

export default SpamButton;
