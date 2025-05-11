
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface StepOneProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const StepOne = ({ formData, updateFormData }: StepOneProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-4 text-right">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">פרטי קשר</h2>
      
      <TooltipProvider>
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="customerName" className="text-lg font-medium text-gray-700">
              שם מלא
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>הזן את שם הלקוח המלא</strong><br>לצורך זיהוי והתקשרות" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="customerName"
            name="customerName"
            type="text"
            required
            value={formData.customerName}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="שם מלא"
          />
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="emailAddress" className="text-lg font-medium text-gray-700">
              כתובת דוא"ל
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>הכנס כתובת דוא\"ל תקינה</strong><br>לשליחת אישורי פוליסה" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="emailAddress"
            name="emailAddress"
            type="email"
            required
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="דוא״ל"
            dir="ltr"
          />
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="phoneNumber" className="text-lg font-medium text-gray-700">
              מספר טלפון
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>הזן מספר טלפון תקין</strong><br>לתיאום ויצירת קשר בנושאי הפוליסה" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="מספר טלפון"
            dir="ltr"
          />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default StepOne;
