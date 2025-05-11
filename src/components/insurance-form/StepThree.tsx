import { useState, useEffect } from "react";
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
  const [availableOptions, setAvailableOptions] = useState<Record<string, boolean>>({
    contentBuilding: false,
    thirdParty: false,
    deductibleCancellation: false,
    teacherAccidents: false,
    professionalLiability: false,
    employerLiability: false,
    cyberInsurance: false,
    incomeLoss: false,
    afterSchoolProgram: false,
  });

  // Update available options when gardenType changes
  useEffect(() => {
    const newAvailableOptions: Record<string, boolean> = {
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

    switch (formData.gardenType) {
      case "tamah":
        newAvailableOptions.deductibleCancellation = true;
        newAvailableOptions.teacherAccidents = true;
        newAvailableOptions.afterSchoolProgram = true;
        break;
      case "privateFamily":
        newAvailableOptions.thirdParty = true;
        newAvailableOptions.deductibleCancellation = true;
        newAvailableOptions.teacherAccidents = true;
        newAvailableOptions.professionalLiability = true;
        newAvailableOptions.employerLiability = true;
        newAvailableOptions.cyberInsurance = true;
        newAvailableOptions.afterSchoolProgram = true;
        break;
      case "upTo3":
        newAvailableOptions.contentBuilding = true;
        newAvailableOptions.thirdParty = true;
        newAvailableOptions.deductibleCancellation = true;
        newAvailableOptions.teacherAccidents = true;
        newAvailableOptions.professionalLiability = true;
        newAvailableOptions.employerLiability = true;
        newAvailableOptions.cyberInsurance = true;
        newAvailableOptions.incomeLoss = true;
        break;
      case "over3":
        newAvailableOptions.contentBuilding = true;
        newAvailableOptions.thirdParty = true;
        newAvailableOptions.deductibleCancellation = true;
        newAvailableOptions.teacherAccidents = true;
        newAvailableOptions.professionalLiability = true;
        newAvailableOptions.employerLiability = true;
        newAvailableOptions.cyberInsurance = true;
        newAvailableOptions.afterSchoolProgram = true;
        break;
      case "afterSchool":
        newAvailableOptions.thirdParty = true;
        newAvailableOptions.deductibleCancellation = true;
        newAvailableOptions.teacherAccidents = true;
        newAvailableOptions.professionalLiability = true;
        newAvailableOptions.employerLiability = true;
        newAvailableOptions.cyberInsurance = true;
        newAvailableOptions.afterSchoolProgram = true;
        break;
    }

    setAvailableOptions(newAvailableOptions);
    
    // Uncheck options that are no longer available
    const updatedOptions = { ...formData.insuranceOptions };
    
    Object.keys(updatedOptions).forEach((option) => {
      if (!newAvailableOptions[option] && updatedOptions[option]) {
        updatedOptions[option] = false;
        updateInsuranceOptions(option, false);
      }
    });
  }, [formData.gardenType]);

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

  // Get tooltip content based on option name
  const getTooltipContent = (option: string) => {
    const tooltips: Record<string, string> = {
      contentBuilding: "<strong>כיסוי למבנה ותכולה</strong><br>מכסה נזקים למבנה הגן ולתכולה שבתוכו",
      thirdParty: "<strong>מכסה נזק לצד שלישי</strong><br>כולל הורים, עוברי אורח, ספקים",
      deductibleCancellation: "<strong>ביטול השתתפות עצמית</strong><br>אפשרות לביטול תשלום השתתפות עצמית בעת תביעה",
      teacherAccidents: "<strong>ביטוח תאונות לצוות</strong><br>כיסוי לאנשי הצוות במקרה של פציעה במסגרת עבודתם",
      professionalLiability: "<strong>אחריות מקצועית</strong><br>הגנה מפני תביעות בגין רשלנות מקצועית",
      employerLiability: "<strong>חבות מעבידים</strong><br>כיסוי לתביעות של עובדים בגין פציעות במקום העבודה",
      cyberInsurance: "<strong>ביטוח סייבר</strong><br>הגנה מפני התקפות סייבר ואובדן מידע",
      incomeLoss: "<strong>אובדן הכנסות</strong><br>פיצוי על הכנסות שאבדו בעקבות נזק מכוסה שהביא לסגירת הגן",
      afterSchoolProgram: "<strong>פעילות צהרון</strong><br>כיסוי לפעילויות המתקיימות אחרי שעות הלימודים הרגילות"
    };
    
    return tooltips[option] || "";
  };

  return (
    <div className="space-y-6 text-right">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">תוספות כיסוי</h2>

      <TooltipProvider>
        {/* Content Building Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.contentBuilding ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="contentBuilding"
                checked={formData.insuranceOptions.contentBuilding}
                onCheckedChange={handleCheckboxChange("contentBuilding")}
                disabled={!availableOptions.contentBuilding}
              />
              <Label htmlFor="contentBuilding" className="text-lg font-medium text-gray-700">
                תכולה ומבנה
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("contentBuilding") }} />
              </TooltipContent>
            </Tooltip>
          </div>

          {availableOptions.contentBuilding && formData.insuranceOptions.contentBuilding && (
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

        {/* Third Party Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.thirdParty ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="thirdParty"
                checked={formData.insuranceOptions.thirdParty}
                onCheckedChange={handleCheckboxChange("thirdParty")}
                disabled={!availableOptions.thirdParty}
              />
              <Label htmlFor="thirdParty" className="text-lg font-medium text-gray-700">
                אחריות צד ג׳
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("thirdParty") }} />
              </TooltipContent>
            </Tooltip>
          </div>

          {availableOptions.thirdParty && formData.insuranceOptions.thirdParty && (
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

        {/* Deductible Cancellation Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.deductibleCancellation ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="deductibleCancellation"
                checked={formData.insuranceOptions.deductibleCancellation}
                onCheckedChange={handleCheckboxChange("deductibleCancellation")}
                disabled={!availableOptions.deductibleCancellation}
              />
              <Label htmlFor="deductibleCancellation" className="text-lg font-medium text-gray-700">
                ביטול השתתפות עצמית
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("deductibleCancellation") }} />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Teacher Accidents Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.teacherAccidents ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="teacherAccidents"
                checked={formData.insuranceOptions.teacherAccidents}
                onCheckedChange={handleCheckboxChange("teacherAccidents")}
                disabled={!availableOptions.teacherAccidents}
              />
              <Label htmlFor="teacherAccidents" className="text-lg font-medium text-gray-700">
                ביטוח תאונות אישיות לצוות הגן
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("teacherAccidents") }} />
              </TooltipContent>
            </Tooltip>
          </div>

          {availableOptions.teacherAccidents && formData.insuranceOptions.teacherAccidents && (
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

        {/* Professional Liability Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.professionalLiability ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="professionalLiability"
                checked={formData.insuranceOptions.professionalLiability}
                onCheckedChange={handleCheckboxChange("professionalLiability")}
                disabled={!availableOptions.professionalLiability}
              />
              <Label htmlFor="professionalLiability" className="text-lg font-medium text-gray-700">
                אחריות מקצועית
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("professionalLiability") }} />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Employer Liability Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.employerLiability ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="employerLiability"
                checked={formData.insuranceOptions.employerLiability}
                onCheckedChange={handleCheckboxChange("employerLiability")}
                disabled={!availableOptions.employerLiability}
              />
              <Label htmlFor="employerLiability" className="text-lg font-medium text-gray-700">
                חבות מעבידים
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("employerLiability") }} />
              </TooltipContent>
            </Tooltip>
          </div>

          {availableOptions.employerLiability && formData.insuranceOptions.employerLiability && (
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

        {/* Cyber Insurance Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.cyberInsurance ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="cyberInsurance"
                checked={formData.insuranceOptions.cyberInsurance}
                onCheckedChange={handleCheckboxChange("cyberInsurance")}
                disabled={!availableOptions.cyberInsurance}
              />
              <Label htmlFor="cyberInsurance" className="text-lg font-medium text-gray-700">
                ביטוח סייבר
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("cyberInsurance") }} />
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Income Loss Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg mb-4 ${!availableOptions.incomeLoss ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="incomeLoss"
                checked={formData.insuranceOptions.incomeLoss}
                onCheckedChange={handleCheckboxChange("incomeLoss")}
                disabled={!availableOptions.incomeLoss}
              />
              <Label htmlFor="incomeLoss" className="text-lg font-medium text-gray-700">
                אובדן הכנסות
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("incomeLoss") }} />
              </TooltipContent>
            </Tooltip>
          </div>

          {availableOptions.incomeLoss && formData.insuranceOptions.incomeLoss && (
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

        {/* After School Program Option */}
        <div className={`insurance-option-group p-4 bg-white bg-opacity-30 rounded-lg ${!availableOptions.afterSchoolProgram ? "opacity-50" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="afterSchoolProgram"
                checked={formData.insuranceOptions.afterSchoolProgram}
                onCheckedChange={handleCheckboxChange("afterSchoolProgram")}
                disabled={!availableOptions.afterSchoolProgram}
              />
              <Label htmlFor="afterSchoolProgram" className="text-lg font-medium text-gray-700">
                צהרון / פעילות אחרי שעות הגן
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-indigo-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent align="end" side="left" className="bg-white text-right rtl p-3 max-w-xs">
                <div dangerouslySetInnerHTML={{ __html: getTooltipContent("afterSchoolProgram") }} />
              </TooltipContent>
            </Tooltip>
          </div>

          {availableOptions.afterSchoolProgram && formData.insuranceOptions.afterSchoolProgram && (
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
