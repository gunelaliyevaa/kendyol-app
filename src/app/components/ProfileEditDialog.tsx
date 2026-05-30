import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "../contexts/LanguageContext";

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  phone: string;
  accent?: "green" | "amber" | "blue";
}

export function ProfileEditDialog({ open, onOpenChange, name, phone, accent = "green" }: ProfileEditDialogProps) {
  const { t } = useLanguage();
  const [draftName, setDraftName] = useState(name);
  const [draftPhone, setDraftPhone] = useState(phone);

  const buttonColor = accent === "amber"
    ? "bg-amber-600 hover:bg-amber-700"
    : accent === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700";

  const save = () => {
    localStorage.setItem(`kendyol-profile-${accent}`, JSON.stringify({ name: draftName, phone: draftPhone }));
    toast.success(t('common.saved'));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('common.editProfile')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor={`profile-name-${accent}`}>{t('farmer.profile.name')}</Label>
            <Input id={`profile-name-${accent}`} value={draftName} onChange={(event) => setDraftName(event.target.value)} />
          </div>
          <div>
            <Label htmlFor={`profile-phone-${accent}`}>{t('farmer.profile.phone')}</Label>
            <Input id={`profile-phone-${accent}`} value={draftPhone} onChange={(event) => setDraftPhone(event.target.value)} />
          </div>
          <Button className={`w-full h-11 ${buttonColor}`} onClick={save}>{t('common.save')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
