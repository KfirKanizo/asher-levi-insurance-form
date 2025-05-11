
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StepThreeProps {
  formData: any;
  updateFormData: (data: any) => void;
  updateInsuranceOptions: (option: string, value: boolean) => void;
}

const StepThree = ({ formData, updateFormData, updateInsuranceOptions }: StepThreeProps) => {
  const handleCheckboxChange = (option: string) => (checked: boolean) => {
    updateInsuranceOptions(option, checked);
  };

  const handleDetailChange = (category: string, field: string, value: string) => {
    updateFormData({
      [`${category}Details`]: {
        ...formData[`${category}Details`],
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6 text-right">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">תוספות כיסוי</h2>

      <TooltipProvider>
        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="contentBuilding"
                checked={formData.insuranceOptions.contentBuilding}
                onCheckedChange={handleCheckboxChange("contentBuilding")}
              />
              <Label htmlFor="contentBuilding" className="text-lg font-medium text-gray-700">
                תכולה ומבנה
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לנזקים לתכולה ולמבנה הגן כתוצאה מאירועים כגון שריפה, הצפה, פריצה ונזקי טבע.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {formData.insuranceOptions.contentBuilding && (
            <div className="conditional-fields mt-4 pr-8 space-y-4">
              <div className="form-group">
                <Label htmlFor="buildingValue" className="text-sm font-medium text-gray-700 block mb-1">
                  ערך המבנה (בש״ח)
                </Label>
                <Input
                  id="buildingValue"
                  type="number"
                  min="0"
                  onChange={(e) => handleDetailChange("contentBuilding", "buildingValue", e.target.value)}
                  value={formData.contentBuildingDetails.buildingValue || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן ערך משוער של המבנה"
                  dir="ltr"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="contentValue" className="text-sm font-medium text-gray-700 block mb-1">
                  ערך התכולה (בש״ח)
                </Label>
                <Input
                  id="contentValue"
                  type="number"
                  min="0"
                  onChange={(e) => handleDetailChange("contentBuilding", "contentValue", e.target.value)}
                  value={formData.contentBuildingDetails.contentValue || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן ערך משוער של התכולה"
                  dir="ltr"
                />
              </div>
            </div>
          )}
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="thirdParty"
                checked={formData.insuranceOptions.thirdParty}
                onCheckedChange={handleCheckboxChange("thirdParty")}
              />
              <Label htmlFor="thirdParty" className="text-lg font-medium text-gray-700">
                אחריות צד ג׳
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לנזקים שעלולים להיגרם לצד שלישי כתוצאה מפעילות הגן.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {formData.insuranceOptions.thirdParty && (
            <div className="conditional-fields mt-4 pr-8">
              <div className="form-group">
                <Label htmlFor="coverageLimit" className="text-sm font-medium text-gray-700 block mb-1">
                  גבול אחריות מבוקש
                </Label>
                <Input
                  id="coverageLimit"
                  type="number"
                  min="0"
                  onChange={(e) => handleDetailChange("thirdParty", "coverageLimit", e.target.value)}
                  value={formData.thirdPartyDetails.coverageLimit || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן גבול אחריות מבוקש"
                  dir="ltr"
                />
              </div>
            </div>
          )}
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="deductibleCancellation"
                checked={formData.insuranceOptions.deductibleCancellation}
                onCheckedChange={handleCheckboxChange("deductibleCancellation")}
              />
              <Label htmlFor="deductibleCancellation" className="text-lg font-medium text-gray-700">
                ביטול השתתפות עצמית
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>אפשרות לביטול ההשתתפות העצמית במקרה של תביעה, תמורת תוספת לפרמיה.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="teacherAccidents"
                checked={formData.insuranceOptions.teacherAccidents}
                onCheckedChange={handleCheckboxChange("teacherAccidents")}
              />
              <Label htmlFor="teacherAccidents" className="text-lg font-medium text-gray-700">
                ביטוח תאונות אישיות לצוות הגן
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לתאונות אישיות לצוות הגן במהלך שעות העבודה.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {formData.insuranceOptions.teacherAccidents && (
            <div className="conditional-fields mt-4 pr-8">
              <div className="form-group">
                <Label htmlFor="teacherCount" className="text-sm font-medium text-gray-700 block mb-1">
                  מספר אנשי צוות
                </Label>
                <Input
                  id="teacherCount"
                  type="number"
                  min="1"
                  onChange={(e) => handleDetailChange("teacherAccidents", "teacherCount", e.target.value)}
                  value={formData.teacherAccidentsDetails.teacherCount || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן מספר אנשי צוות"
                />
              </div>
            </div>
          )}
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="professionalLiability"
                checked={formData.insuranceOptions.professionalLiability}
                onCheckedChange={handleCheckboxChange("professionalLiability")}
              />
              <Label htmlFor="professionalLiability" className="text-lg font-medium text-gray-700">
                אחריות מקצועית
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לתביעות בגין רשלנות מקצועית או טעות מקצועית של הגננת או הצוות.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="employerLiability"
                checked={formData.insuranceOptions.employerLiability}
                onCheckedChange={handleCheckboxChange("employerLiability")}
              />
              <Label htmlFor="employerLiability" className="text-lg font-medium text-gray-700">
                חבות מעבידים
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לתביעות עובדים בגין נזקים שנגרמו להם במסגרת עבודתם בגן.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {formData.insuranceOptions.employerLiability && (
            <div className="conditional-fields mt-4 pr-8">
              <div className="form-group">
                <Label htmlFor="employeeCount" className="text-sm font-medium text-gray-700 block mb-1">
                  מספר עובדים
                </Label>
                <Input
                  id="employeeCount"
                  type="number"
                  min="0"
                  onChange={(e) => handleDetailChange("employerLiability", "employeeCount", e.target.value)}
                  value={formData.employerLiabilityDetails.employeeCount || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן מספר עובדים"
                />
              </div>
            </div>
          )}
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="cyberInsurance"
                checked={formData.insuranceOptions.cyberInsurance}
                onCheckedChange={handleCheckboxChange("cyberInsurance")}
              />
              <Label htmlFor="cyberInsurance" className="text-lg font-medium text-gray-700">
                ביטוח סייבר
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לנזקים שנגרמים כתוצאה מהתקפות סייבר, דליפת מידע או פגיעה במערכות המחשוב של הגן.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="incomeLoss"
                checked={formData.insuranceOptions.incomeLoss}
                onCheckedChange={handleCheckboxChange("incomeLoss")}
              />
              <Label htmlFor="incomeLoss" className="text-lg font-medium text-gray-700">
                אובדן הכנסות
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>כיסוי לאובדן הכנסות במקרה של סגירת הגן בעקבות נזק מכוסה.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {formData.insuranceOptions.incomeLoss && (
            <div className="conditional-fields mt-4 pr-8">
              <div className="form-group">
                <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700 block mb-1">
                  הכנסה חודשית ממוצעת (בש״ח)
                </Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  min="0"
                  onChange={(e) => handleDetailChange("incomeLoss", "monthlyIncome", e.target.value)}
                  value={formData.incomeLossDetails.monthlyIncome || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן הכנסה חודשית ממוצעת"
                  dir="ltr"
                />
              </div>
            </div>
          )}
        </div>

        <div className="insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="afterSchoolProgram"
                checked={formData.insuranceOptions.afterSchoolProgram}
                onCheckedChange={handleCheckboxChange("afterSchoolProgram")}
              />
              <Label htmlFor="afterSchoolProgram" className="text-lg font-medium text-gray-700">
                צהרון / פעילות אחרי שעות הגן
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500" />
              </TooltipTrigger>
              <TooltipContent align="end" className="w-80 p-4 bg-white">
                <p>הרחבת הכיסוי הביטוחי לפעילות צהרון או פעילויות אחרות אחרי שעות הפעילות הרגילות של הגן.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {formData.insuranceOptions.afterSchoolProgram && (
            <div className="conditional-fields mt-4 pr-8">
              <div className="form-group">
                <Label htmlFor="afterSchoolHours" className="text-sm font-medium text-gray-700 block mb-1">
                  שעות פעילות הצהרון
                </Label>
                <Input
                  id="afterSchoolHours"
                  type="text"
                  onChange={(e) => handleDetailChange("afterSchoolProgram", "afterSchoolHours", e.target.value)}
                  value={formData.afterSchoolProgramDetails.afterSchoolHours || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="לדוגמה: 13:00-16:00"
                />
              </div>
              <div className="form-group mt-4">
                <Label htmlFor="afterSchoolChildren" className="text-sm font-medium text-gray-700 block mb-1">
                  מספר ילדים בצהרון
                </Label>
                <Input
                  id="afterSchoolChildren"
                  type="number"
                  min="0"
                  onChange={(e) => handleDetailChange("afterSchoolProgram", "afterSchoolChildren", e.target.value)}
                  value={formData.afterSchoolProgramDetails.afterSchoolChildren || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן מספר ילדים בצהרון"
                />
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default StepThree;
