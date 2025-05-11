
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BankDetailsModalProps {
  onClose: () => void;
}

const BankDetailsModal = ({ onClose }: BankDetailsModalProps) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white bg-opacity-95 backdrop-blur-md border border-white border-opacity-40 shadow-xl max-w-md mx-auto text-right">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-800 text-right">פרטי חשבון בנק להעברה</DialogTitle>
        </DialogHeader>
        
        <div className="bank-details space-y-4 mt-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="detail-row flex justify-between py-2 border-b border-indigo-100">
              <span className="font-semibold">שם הבנק:</span>
              <span>בנק הפועלים</span>
            </div>
            <div className="detail-row flex justify-between py-2 border-b border-indigo-100">
              <span className="font-semibold">סניף:</span>
              <span>123</span>
            </div>
            <div className="detail-row flex justify-between py-2 border-b border-indigo-100">
              <span className="font-semibold">מספר חשבון:</span>
              <span>456789</span>
            </div>
            <div className="detail-row flex justify-between py-2 border-b border-indigo-100">
              <span className="font-semibold">שם המוטב:</span>
              <span>אשר לוי סוכנות לביטוח</span>
            </div>
            <div className="detail-row flex justify-between py-2">
              <span className="font-semibold">IBAN:</span>
              <span className="font-mono">IL12-3456-7890-0000-1234</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            <p>נא לשלוח אסמכתא על ההעברה במייל או בווטסאפ</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button onClick={onClose} className="bg-indigo-600 text-white hover:bg-indigo-700 px-8">
            סגור
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankDetailsModal;
