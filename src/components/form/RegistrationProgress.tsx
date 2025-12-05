interface Step {
  number: number;
  title: string;
}

interface RegistrationProgressProps {
  currentStep: number;
  steps: Step[];
}

export const RegistrationProgress = ({ currentStep, steps }: RegistrationProgressProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1 relative">
            {/* Connector Line */}
            {index > 0 && (
              <div className={`absolute h-0.5 top-4 w-full -translate-x-1/2 -z-10 ${
                step.number <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}

            {/* Step Circle */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center mb-3
              ${step.number < currentStep 
                ? 'bg-blue-600 text-white shadow-lg' 
                : step.number === currentStep 
                ? 'bg-white border-2 border-blue-600 text-blue-600 shadow-lg ring-4 ring-blue-100' 
                : 'bg-gray-100 border-2 border-gray-300 text-gray-400'
              }
            `}>
              {step.number < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="font-semibold">{step.number}</span>
              )}
            </div>

            {/* Step Title */}
            <span className={`text-sm font-medium whitespace-nowrap ${step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};