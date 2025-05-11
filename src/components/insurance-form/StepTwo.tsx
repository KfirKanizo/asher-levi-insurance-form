
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface StepTwoProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const StepTwo = ({ formData, updateFormData }: StepTwoProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateFormData({ [name]: value });
    
    // Reset insurance options based on garden type if changed
    if (name === "gardenType") {
      const availableOptions: Record<string, boolean> = {
        contentBuilding: false,
        thirdParty: false,
        deductibleCancellation: false,
        teacherAccidents: false,
        professionalLiability: false,
        employerLiability: false,
        cyberInsurance: false,
        incomeLoss: false,
        afterSchoolProgram: false,
      };
      
      // Set available options based on garden type
      switch (value) {
        case "tamah":
          availableOptions.deductibleCancellation = formData.insuranceOptions.deductibleCancellation;
          availableOptions.teacherAccidents = formData.insuranceOptions.teacherAccidents;
          availableOptions.afterSchoolProgram = formData.insuranceOptions.afterSchoolProgram;
          break;
        case "privateFamily":
          availableOptions.thirdParty = formData.insuranceOptions.thirdParty;
          availableOptions.deductibleCancellation = formData.insuranceOptions.deductibleCancellation;
          availableOptions.teacherAccidents = formData.insuranceOptions.teacherAccidents;
          availableOptions.professionalLiability = formData.insuranceOptions.professionalLiability;
          availableOptions.employerLiability = formData.insuranceOptions.employerLiability;
          availableOptions.cyberInsurance = formData.insuranceOptions.cyberInsurance;
          availableOptions.afterSchoolProgram = formData.insuranceOptions.afterSchoolProgram;
          break;
        case "upTo3":
          availableOptions.contentBuilding = formData.insuranceOptions.contentBuilding;
          availableOptions.thirdParty = formData.insuranceOptions.thirdParty;
          availableOptions.deductibleCancellation = formData.insuranceOptions.deductibleCancellation;
          availableOptions.teacherAccidents = formData.insuranceOptions.teacherAccidents;
          availableOptions.professionalLiability = formData.insuranceOptions.professionalLiability;
          availableOptions.employerLiability = formData.insuranceOptions.employerLiability;
          availableOptions.cyberInsurance = formData.insuranceOptions.cyberInsurance;
          availableOptions.incomeLoss = formData.insuranceOptions.incomeLoss;
          break;
        case "over3":
          availableOptions.contentBuilding = formData.insuranceOptions.contentBuilding;
          availableOptions.thirdParty = formData.insuranceOptions.thirdParty;
          availableOptions.deductibleCancellation = formData.insuranceOptions.deductibleCancellation;
          availableOptions.teacherAccidents = formData.insuranceOptions.teacherAccidents;
          availableOptions.professionalLiability = formData.insuranceOptions.professionalLiability;
          availableOptions.employerLiability = formData.insuranceOptions.employerLiability;
          availableOptions.cyberInsurance = formData.insuranceOptions.cyberInsurance;
          availableOptions.afterSchoolProgram = formData.insuranceOptions.afterSchoolProgram;
          break;
        case "afterSchool":
          availableOptions.thirdParty = formData.insuranceOptions.thirdParty;
          availableOptions.deductibleCancellation = formData.insuranceOptions.deductibleCancellation;
          availableOptions.teacherAccidents = formData.insuranceOptions.teacherAccidents;
          availableOptions.professionalLiability = formData.insuranceOptions.professionalLiability;
          availableOptions.employerLiability = formData.insuranceOptions.employerLiability;
          availableOptions.cyberInsurance = formData.insuranceOptions.cyberInsurance;
          availableOptions.afterSchoolProgram = formData.insuranceOptions.afterSchoolProgram;
          break;
      }
      
      updateFormData({ insuranceOptions: availableOptions });
    }
  };

  return (
    <div className="space-y-4 text-right">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">פרטי ביטוח</h2>
      
      <TooltipProvider>
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="gardenName" className="text-lg font-medium text-gray-700">
              שם הגן
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>הזן את שם הגן המלא</strong><br>שם הגן כפי שמופיע במסמכים הרשמיים" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="gardenName"
            name="gardenName"
            type="text"
            required
            value={formData.gardenName}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="שם הגן"
          />
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="gardenType" className="text-lg font-medium text-gray-700">
              סוג הגן
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>בחר את סוג המסגרת</strong><br>לדוגמה: תמ\"ת, משפחתון פרטי, גן עד גיל 3" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Select 
            value={formData.gardenType}
            onValueChange={(value) => handleSelectChange("gardenType", value)}
          >
            <SelectTrigger className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3">
              <SelectValue placeholder="בחר סוג גן" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="tamah">תמ"ת</SelectItem>
              <SelectItem value="privateFamily">משפחתון פרטי</SelectItem>
              <SelectItem value="upTo3">גן עד גיל 3</SelectItem>
              <SelectItem value="over3">גן מעל גיל 3</SelectItem>
              <SelectItem value="afterSchool">צהרון בלבד</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="address" className="text-lg font-medium text-gray-700">
              כתובת הגן
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>הזן את כתובת הגן המלאה</strong><br>כולל רחוב, מספר, עיר ומיקוד" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="כתובת מלאה"
          />
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="policyNumber" className="text-lg font-medium text-gray-700">
              מספר פוליסה
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>מספר פוליסה קיימת</strong><br>השאר ריק אם מדובר בפוליסה חדשה" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="policyNumber"
            name="policyNumber"
            type="text"
            required
            value={formData.policyNumber}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="מספר פוליסה"
          />
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="childrenCount" className="text-lg font-medium text-gray-700">
              מספר ילדים
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>מספר הילדים הרשומים בגן</strong><br>נתון זה משפיע על חישוב הפרמיה" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="childrenCount"
            name="childrenCount"
            type="number"
            required
            value={formData.childrenCount}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
            placeholder="מספר ילדים בגן"
            min="1"
          />
        </div>
        
        <div className="form-group">
          <div className="flex items-center justify-end mb-2 space-x-2 space-x-reverse">
            <Label htmlFor="policyEndDate" className="text-lg font-medium text-gray-700">
              תאריך סיום הפוליסה
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-indigo-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-white text-right rtl p-3">
                <div dangerouslySetInnerHTML={{ __html: "<strong>תאריך סיום הפוליסה הנוכחית</strong><br>לצורך קביעת תאריך תחילת הפוליסה החדשה" }} />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="policyEndDate"
            name="policyEndDate"
            type="date"
            required
            value={formData.policyEndDate}
            onChange={handleChange}
            className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
          />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default StepTwo;
