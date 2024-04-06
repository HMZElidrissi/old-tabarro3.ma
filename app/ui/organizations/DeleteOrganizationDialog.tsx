"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/app/ui/components/dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Organization } from "@/app/lib/definitions";
import { deleteOrganization } from "@/app/lib/data";
import { useRouter } from "next/navigation";

const DeleteOrganizationDialog = ({
                                    organization
                                  }: {
  organization: Organization;
}) => {
  const router = useRouter();
  const handleClick = async () => {
    await deleteOrganization(organization.id);
    router.refresh();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="delete-button">
          <TrashIcon className="w-5 h-5 mr-2" />
          Delete
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className="save-button" onClick={() => {
              handleClick();
            }}>Delete
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrganizationDialog;
