// "use client";

// import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { useDeleteTenant } from "@/features/accounts/api/use-delete-tenant ";
// import { UseOpenTenant } from "@/features/accounts/hooks/use-open-tenant";
// import { useConfirm } from "@/hooks/use-confirm";
// import { Edit, MoreHorizontal, Trash } from "lucide-react";

// type Props = {
//     id: string;
// };

// export const Actions = ( { id }: Props) => {
//     const [ConfirmDialog, confirm] = useConfirm(
//         "Are you sure?",
//         "You are about to delete this tenant."
//     );
//     const deleteMutation =useDeleteTenant(id);
//     const { onOpen } = UseOpenTenant();

//     const handleDelete = async () => {
//         const ok = await confirm();

//         if (ok) {
//             deleteMutation.mutate();
//         }
//     };
//     return (
//         <>
//         <ConfirmDialog/>
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="size-8 p-0">
//                     <MoreHorizontal className="size-4"/>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//                 <DropdownMenuItem
//                 disabled={deleteMutation.isPending}
//                 onClick={() => onOpen(id)}
//                 >
//                     <Edit className="size-4 mr-2" />
//                     Edit

//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                 disabled={deleteMutation.isPending}
//                 onClick={handleDelete}
//                 >
//                     <Trash className="size-4 mr-2" />
//                     Delete

//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//         </>
//     )
// }\

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTenant } from "@/features/accounts/api/use-delete-tenant ";
import { UseOpenTenant } from "@/features/accounts/hooks/use-open-tenant";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this tenant."
  );

  const deleteMutation = useDeleteTenant(id); // Ensure the hook returns the correct `mutate` function
  const { onOpen } = UseOpenTenant(); // Ensure this hook is correctly implemented

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending} // Use `isLoading` if your hook uses React Query
            onClick={() => onOpen(id)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
