
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      
      <div className="form-group">
        <Label htmlFor="customerName" className="text-lg font-medium text-gray-700 block mb-2">
          שם מלא
        </Label>
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
        <Label htmlFor="emailAddress" className="text-lg font-medium text-gray-700 block mb-2">
          כתובת דוא"ל
        </Label>
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
        <Label htmlFor="phoneNumber" className="text-lg font-medium text-gray-700 block mb-2">
          מספר טלפון
        </Label>
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
    </div>
  );
};

export default StepOne;
