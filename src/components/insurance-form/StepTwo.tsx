
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  };

  return (
    <div className="space-y-4 text-right">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">פרטי ביטוח</h2>
      
      <div className="form-group">
        <Label htmlFor="gardenName" className="text-lg font-medium text-gray-700 block mb-2">
          שם הגן
        </Label>
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
        <Label htmlFor="gardenType" className="text-lg font-medium text-gray-700 block mb-2">
          סוג הגן
        </Label>
        <Select 
          value={formData.gardenType}
          onValueChange={(value) => handleSelectChange("gardenType", value)}
        >
          <SelectTrigger className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3">
            <SelectValue placeholder="בחר סוג גן" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="private">גן פרטי</SelectItem>
            <SelectItem value="public">גן ציבורי</SelectItem>
            <SelectItem value="special">גן לחינוך מיוחד</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="form-group">
        <Label htmlFor="address" className="text-lg font-medium text-gray-700 block mb-2">
          כתובת הגן
        </Label>
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
        <Label htmlFor="policyNumber" className="text-lg font-medium text-gray-700 block mb-2">
          מספר פוליסה (אם קיים)
        </Label>
        <Input
          id="policyNumber"
          name="policyNumber"
          type="text"
          value={formData.policyNumber}
          onChange={handleChange}
          className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
          placeholder="מספר פוליסה (אופציונלי)"
        />
      </div>
      
      <div className="form-group">
        <Label htmlFor="childrenCount" className="text-lg font-medium text-gray-700 block mb-2">
          מספר ילדים
        </Label>
        <Input
          id="childrenCount"
          name="childrenCount"
          type="number"
          required
          value={formData.childrenCount}
          onChange={handleChange}
          className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
          placeholder="מספר ילדים בגן"
          min="0"
        />
      </div>
      
      <div className="form-group">
        <Label htmlFor="policyEndDate" className="text-lg font-medium text-gray-700 block mb-2">
          תאריך סיום הפוליסה הנוכחית
        </Label>
        <Input
          id="policyEndDate"
          name="policyEndDate"
          type="date"
          value={formData.policyEndDate}
          onChange={handleChange}
          className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-3"
        />
      </div>
    </div>
  );
};

export default StepTwo;
