
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import StepOne from "@/components/insurance-form/StepOne";
import StepTwo from "@/components/insurance-form/StepTwo";
import StepThree from "@/components/insurance-form/StepThree";
import StepFour from "@/components/insurance-form/StepFour";
import SuccessScreen from "@/components/insurance-form/SuccessScreen";
import BankDetailsModal from "@/components/insurance-form/BankDetailsModal";

const InsuranceForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    emailAddress: "",
    phoneNumber: "",
    gardenName: "",
    gardenType: "",
    address: "",
    policyNumber: "",
    childrenCount: 0,
    policyEndDate: "",
    insuranceOptions: {
      contentBuilding: false,
      thirdParty: false,
      deductibleCancellation: false,
      teacherAccidents: false,
      professionalLiability: false,
      employerLiability: false,
      cyberInsurance: false,
      incomeLoss: false,
      afterSchoolProgram: false,
    },
    premium: 0,
    contentBuildingDetails: {},
    thirdPartyDetails: {},
    teacherAccidentsDetails: {},
    employerLiabilityDetails: {},
    incomeLossDetails: {},
    afterSchoolProgramDetails: {},
  });

  const calculatePremium = () => {
    let basePremium = 0;
    
    // Base premium calculation based on garden type
    switch (formData.gardenType) {
      case "private":
        basePremium = 1200;
        break;
      case "public":
        basePremium = 1500;
        break;
      case "special":
        basePremium = 1800;
        break;
      default:
        basePremium = 1000;
    }
    
    // Adjust for number of children
    const childrenCount = parseInt(formData.childrenCount.toString()) || 0;
    if (childrenCount <= 20) {
      // Base price for up to 20 children
    } else if (childrenCount <= 50) {
      basePremium += 200;
    } else if (childrenCount <= 100) {
      basePremium += 400;
    } else {
      basePremium += 600;
    }
    
    // Add premiums for selected insurance options
    if (formData.insuranceOptions.contentBuilding) basePremium += 300;
    if (formData.insuranceOptions.thirdParty) basePremium += 250;
    if (formData.insuranceOptions.deductibleCancellation) basePremium += 150;
    if (formData.insuranceOptions.teacherAccidents) basePremium += 200;
    if (formData.insuranceOptions.professionalLiability) basePremium += 350;
    if (formData.insuranceOptions.employerLiability) basePremium += 400;
    if (formData.insuranceOptions.cyberInsurance) basePremium += 180;
    if (formData.insuranceOptions.incomeLoss) basePremium += 220;
    if (formData.insuranceOptions.afterSchoolProgram) basePremium += 280;
    
    return basePremium;
  };

  const updateFormData = (newData: any) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    
    // Calculate premium on form data update
    const premium = calculatePremium();
    setFormData((prev) => ({ ...prev, premium }));
  };

  const updateInsuranceOptions = (option: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      insuranceOptions: {
        ...prev.insuranceOptions,
        [option]: value,
      },
    }));
  };

  const nextStep = () => {
    // Form validation could be added here
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/c8jk8qsq7mnwtdg5aevxvxhdg8m3yocw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setShowSuccess(true);
        toast.success("הטופס נשלח בהצלחה");
      } else {
        toast.error("אירעה שגיאה בשליחת הטופס");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("אירעה שגיאה בשליחת הטופס");
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      emailAddress: "",
      phoneNumber: "",
      gardenName: "",
      gardenType: "",
      address: "",
      policyNumber: "",
      childrenCount: 0,
      policyEndDate: "",
      insuranceOptions: {
        contentBuilding: false,
        thirdParty: false,
        deductibleCancellation: false,
        teacherAccidents: false,
        professionalLiability: false,
        employerLiability: false,
        cyberInsurance: false,
        incomeLoss: false,
        afterSchoolProgram: false,
      },
      premium: 0,
      contentBuildingDetails: {},
      thirdPartyDetails: {},
      teacherAccidentsDetails: {},
      employerLiabilityDetails: {},
      incomeLossDetails: {},
      afterSchoolProgramDetails: {},
    });
    setCurrentStep(1);
    setShowSuccess(false);
  };

  const navigateToPayment = () => {
    window.open("https://asherlevi.com/payment", "_blank");
  };

  const renderStep = () => {
    if (showSuccess) {
      return (
        <SuccessScreen
          onReset={resetForm}
          onShowBankDetails={() => setShowBankDetails(true)}
          onNavigateToPayment={navigateToPayment}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return <StepOne formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <StepTwo formData={formData} updateFormData={updateFormData} />;
      case 3:
        return (
          <StepThree
            formData={formData}
            updateFormData={updateFormData}
            updateInsuranceOptions={updateInsuranceOptions}
          />
        );
      case 4:
        return (
          <StepFour
            formData={formData}
            premium={formData.premium.toLocaleString()}
          />
        );
      default:
        return <StepOne formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4 flex flex-col items-center justify-center rtl">
      <div className="logo-container mb-6">
        <a href="https://asherlevi.com/" target="_blank" rel="noreferrer">
          <img
            src="https://asherlevi.com/wp-content/uploads/2022/07/לוגו-מחודש-צבעוניות-01-1-768x477.png"
            alt="אשר לוי סוכנות לביטוח"
            className="max-w-xs mx-auto"
          />
        </a>
      </div>

      <Card className="w-full max-w-3xl bg-white bg-opacity-70 backdrop-blur-lg border border-white border-opacity-30 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="steps-indicator mb-8 flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`step-indicator flex flex-col items-center ${
                  currentStep >= step ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm">
                  {step === 1 && "פרטי קשר"}
                  {step === 2 && "פרטי ביטוח"}
                  {step === 3 && "תוספות כיסוי"}
                  {step === 4 && "צפייה בפרמיה"}
                </span>
              </div>
            ))}
          </div>

          <div className="form-content mb-8">{renderStep()}</div>

          {!showSuccess && (
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="text-indigo-600 border-indigo-600"
                >
                  הקודם
                </Button>
              )}
              <div className="flex-1"></div>
              <Button
                onClick={nextStep}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {currentStep < 4 ? "הבא" : "שלח טופס"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {showBankDetails && (
        <BankDetailsModal onClose={() => setShowBankDetails(false)} />
      )}
    </div>
  );
};

export default InsuranceForm;
