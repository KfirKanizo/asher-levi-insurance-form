
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const handleDetailChange = (category: string, field: string, value: string | number | boolean) => {
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
                <Label htmlFor="contentSum" className="text-sm font-medium text-gray-700 block mb-1">
                  סכום תכולה (בש״ח)
                </Label>
                <Input
                  id="contentSum"
                  type="number"
                  min="0"
                  required
                  onChange={(e) => handleDetailChange("contentBuilding", "contentSum", e.target.value)}
                  value={formData.contentBuildingDetails.contentSum || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן סכום תכולה"
                  dir="ltr"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="buildingSum" className="text-sm font-medium text-gray-700 block mb-1">
                  סכום מבנה (בש״ח)
                </Label>
                <Input
                  id="buildingSum"
                  type="number"
                  min="0"
                  required
                  onChange={(e) => handleDetailChange("contentBuilding", "buildingSum", e.target.value)}
                  value={formData.contentBuildingDetails.buildingSum || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן סכום מבנה"
                  dir="ltr"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="yardContentSum" className="text-sm font-medium text-gray-700 block mb-1">
                  סכום תכולת חצר (בש״ח)
                </Label>
                <Input
                  id="yardContentSum"
                  type="number"
                  min="0"
                  required
                  onChange={(e) => handleDetailChange("contentBuilding", "yardContentSum", e.target.value)}
                  value={formData.contentBuildingDetails.yardContentSum || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן סכום תכולת חצר"
                  dir="ltr"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="buildingType" className="text-sm font-medium text-gray-700 block mb-1">
                  סוג מבנה
                </Label>
                <Input
                  id="buildingType"
                  type="text"
                  required
                  onChange={(e) => handleDetailChange("contentBuilding", "buildingType", e.target.value)}
                  value={formData.contentBuildingDetails.buildingType || ""}
                  className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                  placeholder="הזן סוג מבנה"
                />
              </div>
              <div className="form-group">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="hasLien"
                    checked={formData.contentBuildingDetails.hasLien || false}
                    onCheckedChange={(checked) => 
                      handleDetailChange("contentBuilding", "hasLien", !!checked)
                    }
                  />
                  <Label htmlFor="hasLien" className="text-sm font-medium text-gray-700">
                    האם יש שעבוד?
                  </Label>
                </div>
              </div>
              {formData.contentBuildingDetails.hasLien && (
                <div className="form-group mt-2 pr-8">
                  <Label htmlFor="lienHolder" className="text-sm font-medium text-gray-700 block mb-1">
                    בעל השעבוד
                  </Label>
                  <Input
                    id="lienHolder"
                    type="text"
                    required
                    onChange={(e) => handleDetailChange("contentBuilding", "lienHolder", e.target.value)}
                    value={formData.contentBuildingDetails.lienHolder || ""}
                    className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md p-2"
                    placeholder="הזן שם בעל השעבוד"
                  />
                </div>
              )}
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
                <Label htmlFor="thirdPartyCoverage" className="text-sm font-medium text-gray-700 block mb-1">
                  גבול אחריות
                </Label>
                <Select
                  value={formData.thirdPartyDetails.thirdPartyCoverage || ""}
                  onValueChange={(value) => handleDetailChange("thirdParty", "thirdPartyCoverage", value)}
                >
                  <SelectTrigger className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md">
                    <SelectValue placeholder="בחר גבול אחריות" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5M">5 מיליון ₪</SelectItem>
                    <SelectItem value="8M">8 מיליון ₪</SelectItem>
                    <SelectItem value="10M">10 מיליון ₪</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="teacherAccidentsCoverage" className="text-sm font-medium text-gray-700 block mb-1">
                  רמת כיסוי
                </Label>
                <Select
                  value={formData.teacherAccidentsDetails.teacherAccidentsCoverage || ""}
                  onValueChange={(value) => handleDetailChange("teacherAccidents", "teacherAccidentsCoverage", value)}
                >
                  <SelectTrigger className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md">
                    <SelectValue placeholder="בחר רמת כיסוי" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">רמה A</SelectItem>
                    <SelectItem value="B">רמה B</SelectItem>
                    <SelectItem value="C">רמה C</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="employerLiabilityCoverage" className="text-sm font-medium text-gray-700 block mb-1">
                  רמת כיסוי
                </Label>
                <Select
                  value={formData.employerLiabilityDetails.employerLiabilityCoverage || ""}
                  onValueChange={(value) => handleDetailChange("employerLiability", "employerLiabilityCoverage", value)}
                >
                  <SelectTrigger className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md">
                    <SelectValue placeholder="בחר רמת כיסוי" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">רגיל</SelectItem>
                    <SelectItem value="certified">מורשה</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="incomeLossDuration" className="text-sm font-medium text-gray-700 block mb-1">
                  משך תקופת הכיסוי (בחודשים)
                </Label>
                <Select
                  value={formData.incomeLossDetails.incomeLossDuration || ""}
                  onValueChange={(value) => handleDetailChange("incomeLoss", "incomeLossDuration", value)}
                >
                  <SelectTrigger className="w-full bg-white bg-opacity-50 border border-indigo-200 rounded-md">
                    <SelectValue placeholder="בחר תקופת כיסוי" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 חודשים</SelectItem>
                    <SelectItem value="6">6 חודשים</SelectItem>
                    <SelectItem value="12">12 חודשים</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="afterSchoolChildrenCount" className="text-sm font-medium text-gray-700 block mb-1">
                  מספר ילדים בצהרון
                </Label>
                <Input
                  id="afterSchoolChildrenCount"
                  type="number"
                  min="0"
                  required
                  onChange={(e) => handleDetailChange("afterSchoolProgram", "afterSchoolChildrenCount", e.target.value)}
                  value={formData.afterSchoolProgramDetails.afterSchoolChildrenCount || ""}
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
