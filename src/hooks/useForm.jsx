import { useState } from "react";

export function useForm(steps) {
    const [currentStep, setCurrentStep] = useState(0)
    
    function nextStep() {
        if (currentStep == steps.length-1) return
        setCurrentStep(currentStep+1)
    }

    function prevStep () {
        if(currentStep == 0) return
        setCurrentStep(currentStep-1)
    }
    

    return {
        currentStep,
        currentComponent: steps[currentStep],
        nextStep,
        prevStep,
        isLastStep: currentStep == steps.length -1,
        isFirstStep: currentStep == 0
    }
}