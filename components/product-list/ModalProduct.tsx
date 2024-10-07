import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Payment } from "./ProductTable";
import Step1 from "../WizardStep/Step1";
import StepWizard, { StepWizardChildProps } from "react-step-wizard";
import Step2 from "../WizardStep/Step2";
import { useRef } from "react";

type ModalProductProps = {
  id: Payment;
};

export function ModalProduct({ id }: ModalProductProps) {
  const wizardInstance = useRef<StepWizardChildProps | null>(null);
  console.log(wizardInstance);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogDescription>
          <StepWizard>
            <Step1
              id={id}
              nextStep={() => wizardInstance.current?.nextStep()}
              previousStep={() => wizardInstance.current?.previousStep()}
              goToStep={(stepNumber) =>
                wizardInstance.current?.goToStep(stepNumber)
              }
            />
            <Step2 />
          </StepWizard>
        </AlertDialogDescription>
      </AlertDialogHeader>
      {/* <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter> */}
    </AlertDialogContent>
  );
}
