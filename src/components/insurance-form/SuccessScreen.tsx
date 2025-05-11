
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  onReset: () => void;
  onShowBankDetails: () => void;
  onNavigateToPayment: () => void;
}

const SuccessScreen = ({ onReset, onShowBankDetails, onNavigateToPayment }: SuccessScreenProps) => {
  return (
    <div className="text-center py-8">
      <div className="success-icon mb-6 inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">הטופס נשלח בהצלחה!</h2>
      <p className="text-lg text-gray-700 mb-8">
        נציג מטעם סוכנות אשר לוי ביטוח יצור איתך קשר בהקדם.
      </p>
      
      <div className="space-y-4">
        <Button
          onClick={onShowBankDetails}
          className="w-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 p-6 text-lg"
        >
          להצגת פרטי חשבון להעברה בנקאית
        </Button>
        
        <Button
          onClick={onNavigateToPayment}
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700 p-6 text-lg"
        >
          למעבר לתשלום באשראי
        </Button>
        
        <Button
          onClick={onReset}
          variant="ghost"
          className="mt-8 text-gray-500 hover:text-gray-700"
        >
          מילוי טופס חדש
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
