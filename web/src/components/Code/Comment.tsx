import { ReactNode } from "react";

export interface CommentProps {
  children?: ReactNode;
}

export default function Comment({ children }: CommentProps) {
  return <code className="text-green-500">{children}</code>;
}
