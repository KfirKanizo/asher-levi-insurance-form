
interface StepFourProps {
  formData: any;
  premium: string;
}

const StepFour = ({ formData, premium }: StepFourProps) => {
  return (
    <div className="space-y-6 text-right">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">סיכום ופרמיה</h2>
      
      <div className="summary-section p-4 bg-white bg-opacity-40 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-4">פרטי קשר</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-1">שם מלא:</p>
            <p className="font-semibold">{formData.customerName}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">טלפון:</p>
            <p className="font-semibold">{formData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">דוא"ל:</p>
            <p className="font-semibold">{formData.emailAddress}</p>
          </div>
        </div>
      </div>
      
      <div className="summary-section p-4 bg-white bg-opacity-40 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-4">פרטי הגן</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-1">שם הגן:</p>
            <p className="font-semibold">{formData.gardenName}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">סוג הגן:</p>
            <p className="font-semibold">
              {formData.gardenType === "private" && "גן פרטי"}
              {formData.gardenType === "public" && "גן ציבורי"}
              {formData.gardenType === "special" && "גן לחינוך מיוחד"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">כתובת הגן:</p>
            <p className="font-semibold">{formData.address}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">מספר ילדים:</p>
            <p className="font-semibold">{formData.childrenCount}</p>
          </div>
        </div>
      </div>
      
      <div className="summary-section p-4 bg-white bg-opacity-40 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-4">תוספות שנבחרו</h3>
        <ul className="list-disc pr-6 space-y-1">
          {formData.insuranceOptions.contentBuilding && <li>תכולה ומבנה</li>}
          {formData.insuranceOptions.thirdParty && <li>אחריות צד ג׳</li>}
          {formData.insuranceOptions.deductibleCancellation && <li>ביטול השתתפות עצמית</li>}
          {formData.insuranceOptions.teacherAccidents && <li>ביטוח תאונות אישיות לצוות הגן</li>}
          {formData.insuranceOptions.professionalLiability && <li>אחריות מקצועית</li>}
          {formData.insuranceOptions.employerLiability && <li>חבות מעבידים</li>}
          {formData.insuranceOptions.cyberInsurance && <li>ביטוח סייבר</li>}
          {formData.insuranceOptions.incomeLoss && <li>אובדן הכנסות</li>}
          {formData.insuranceOptions.afterSchoolProgram && <li>צהרון / פעילות אחרי שעות הגן</li>}
          
          {Object.values(formData.insuranceOptions).every(value => !value) && (
            <li className="text-gray-500">לא נבחרו תוספות כיסוי</li>
          )}
        </ul>
      </div>
      
      <div className="premium-display p-5 bg-indigo-100 rounded-lg border-2 border-indigo-500 text-center">
        <h3 className="text-xl font-semibold mb-2">פרמיה שנתית מוערכת</h3>
        <p className="text-3xl font-bold text-indigo-800">
          <span id="premiumAmount">{premium} ₪</span>
        </p>
        <p className="text-gray-500 mt-2 text-sm">* המחיר הסופי עשוי להשתנות בהתאם לבדיקת החיתום</p>
      </div>
    </div>
  );
};

export default StepFour;
