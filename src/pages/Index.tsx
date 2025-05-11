
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
    contentBuildingDetails: {
      contentSum: 0,
      buildingSum: 0,
      yardContentSum: 0,
      buildingType: "",
      hasLien: false,
      lienHolder: "",
    },
    thirdPartyDetails: {
      thirdPartyCoverage: "",
    },
    teacherAccidentsDetails: {
      teacherAccidentsCoverage: "",
    },
    employerLiabilityDetails: {
      employerLiabilityCoverage: "",
    },
    incomeLossDetails: {
      incomeLossDuration: "",
    },
    afterSchoolProgramDetails: {
      afterSchoolChildrenCount: 0,
    },
  });

  const calculatePremium = () => {
    // If gardenType or childrenCount are not set, return 0
    if (!formData.gardenType || !formData.childrenCount) {
      return 0;
    }
    
    const childrenCount = parseInt(formData.childrenCount.toString()) || 0;
    let basePremium = 0;
    
    // Calculate base premium based on garden type and children count
    switch (formData.gardenType) {
      case "tamah": // תמ"ת
        if (childrenCount <= 6) {
          basePremium = 500;
        } else if (childrenCount <= 10) {
          basePremium = 1000;
        } else {
          basePremium = 1000 + (100 * (childrenCount - 10));
        }
        break;
        
      case "privateFamily": // משפחתון פרטי
        if (childrenCount <= 6) {
          basePremium = 650;
        } else if (childrenCount <= 8) {
          basePremium = 900;
        } else if (childrenCount === 9) {
          basePremium = 900 + 105;
        } else { // 10 children or more
          let calculatedPremium = 1100 + (110 * (childrenCount - 10));
          const discount = 10 * childrenCount;
          basePremium = Math.max(1100, calculatedPremium - discount);
        }
        break;
        
      case "upTo3": // גן עד גיל 3
        let calculatedPremium = 1400;
        if (childrenCount > 12) {
          calculatedPremium += 120 * (childrenCount - 12);
        }
        const discount = 10 * childrenCount;
        basePremium = Math.max(1400, calculatedPremium - discount);
        break;
        
      case "over3": // גן מעל גיל 3
      case "afterSchool": // צהרון בלבד
        if (formData.insuranceOptions.contentBuilding) {
          // מסלול 6
          let calculatedPremium = 1400;
          if (childrenCount > 17) {
            calculatedPremium += 80 * (childrenCount - 17);
          }
          const discount = 5 * childrenCount;
          basePremium = Math.max(1400, calculatedPremium - discount);
        } else {
          // מסלול 5
          let calculatedPremium = 1100;
          if (childrenCount > 20) {
            calculatedPremium += 55 * (childrenCount - 20);
          }
          const discount = 5 * childrenCount;
          basePremium = Math.max(1100, calculatedPremium - discount);
        }
        break;
        
      default:
        basePremium = 0;
    }
    
    // Add premium for selected insurance options
    let additionalPremium = 0;
    
    // Content Building
    if (formData.insuranceOptions.contentBuilding) {
      const contentSum = parseInt(formData.contentBuildingDetails.contentSum?.toString() || "0");
      if (contentSum > 200000) {
        additionalPremium += (contentSum - 200000) * 0.001;
      }
    }
    
    // Third Party
    if (formData.insuranceOptions.thirdParty) {
      switch (formData.thirdPartyDetails.thirdPartyCoverage) {
        case "5M":
          additionalPremium += childrenCount <= 20 ? 200 : 300;
          break;
        case "8M":
          additionalPremium += 1000;
          break;
        case "10M":
          additionalPremium += 2000;
          break;
      }
    }
    
    // Deductible Cancellation
    if (formData.insuranceOptions.deductibleCancellation) {
      additionalPremium += childrenCount <= 20 ? 200 : 300;
    }
    
    // Teacher Accidents
    if (formData.insuranceOptions.teacherAccidents) {
      switch (formData.teacherAccidentsDetails.teacherAccidentsCoverage) {
        case "A":
          additionalPremium += 200;
          break;
        case "B":
          additionalPremium += 600;
          break;
        case "C":
          additionalPremium += 800;
          break;
      }
    }
    
    // Professional Liability
    if (formData.insuranceOptions.professionalLiability) {
      additionalPremium += 250;
    }
    
    // Employer Liability
    if (formData.insuranceOptions.employerLiability) {
      additionalPremium += formData.employerLiabilityDetails.employerLiabilityCoverage === "regular" ? 105 : 500;
    }
    
    // Cyber Insurance
    if (formData.insuranceOptions.cyberInsurance) {
      additionalPremium += 450;
    }
    
    // Income Loss
    if (formData.insuranceOptions.incomeLoss) {
      switch (formData.incomeLossDetails.incomeLossDuration) {
        case "3":
          additionalPremium += 500;
          break;
        case "6":
          additionalPremium += 900;
          break;
        case "12":
          additionalPremium += 1500;
          break;
      }
    }
    
    // After School Program
    if (formData.insuranceOptions.afterSchoolProgram) {
      const afterSchoolChildrenCount = parseInt(formData.afterSchoolProgramDetails.afterSchoolChildrenCount?.toString() || "0");
      
      if (afterSchoolChildrenCount <= 20) {
        additionalPremium += 500;
      } else {
        additionalPremium += 500 + (25 * (afterSchoolChildrenCount - 20));
      }
    }
    
    return Math.round(basePremium + additionalPremium);
  };

  const updateFormData = (newData: any) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    
    // Calculate premium on form data update
    const premium = calculatePremium();
    setFormData((prev) => ({ ...prev, premium }));
  };

  const updateInsuranceOptions = (option: string, value: boolean) => {
    setFormData((prev) => {
      const updatedOptions = {
        ...prev.insuranceOptions,
        [option]: value,
      };
      
      // Reset the associated details object if the option is disabled
      let updatedData: any = {
        ...prev,
        insuranceOptions: updatedOptions
      };
      
      // If disabling an option, reset its details
      if (!value) {
        switch(option) {
          case 'contentBuilding':
            updatedData.contentBuildingDetails = {
              contentSum: 0,
              buildingSum: 0,
              yardContentSum: 0,
              buildingType: "",
              hasLien: false,
              lienHolder: "",
            };
            break;
          case 'thirdParty':
            updatedData.thirdPartyDetails = { thirdPartyCoverage: "" };
            break;
          case 'teacherAccidents':
            updatedData.teacherAccidentsDetails = { teacherAccidentsCoverage: "" };
            break;
          case 'employerLiability':
            updatedData.employerLiabilityDetails = { employerLiabilityCoverage: "" };
            break;
          case 'incomeLoss':
            updatedData.incomeLossDetails = { incomeLossDuration: "" };
            break;
          case 'afterSchoolProgram':
            updatedData.afterSchoolProgramDetails = { afterSchoolChildrenCount: 0 };
            break;
        }
      }
      
      // Calculate premium after updating options
      const premium = calculatePremium();
      
      return { 
        ...updatedData, 
        premium 
      };
    });
  };

  const nextStep = () => {
    // Basic form validation for required fields
    let canProceed = true;
    
    if (currentStep === 1) {
      if (!formData.customerName || !formData.emailAddress || !formData.phoneNumber) {
        toast.error("נא למלא את כל שדות החובה");
        canProceed = false;
      }
    } else if (currentStep === 2) {
      if (!formData.gardenName || !formData.gardenType || !formData.address || 
          !formData.policyNumber || !formData.childrenCount || !formData.policyEndDate) {
        toast.error("נא למלא את כל שדות החובה");
        canProceed = false;
      }
    }
    
    if (canProceed) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
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
