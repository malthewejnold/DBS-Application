import FeedhostForm from "@/components/forms/FeedhostForm";
import JointTrainingForm from "@/components/forms/JointTraining";
import OtherExpensesForm from "../components/forms/OtherExpenses";
import OutplacementForm from "../components/forms/Outplacement";
import ReplacementForm from "../components/forms/Replacement";
import TestFormForm from "../components/forms/TestForm";
import TrainingForm from "../components/forms/TrainingForm";

export default {
  export() {
    return [
      {
        path: "feedhost",
        name: "form-feedhost",
        component: FeedhostForm,
        
      },
      {
        path: "jointtraining",
        name: "form-jointtraining",
        component: JointTrainingForm,
        
      },
      {
        path: "otherexpenses",
        name: "form-otherexpenses",
        component: OtherExpensesForm,
        
      },
      {
        path: "outplacement",
        name: "form-outplacement",
        component: OutplacementForm,
        
      },
      {
        path: "replacement",
        name: "form-replacement",
        component: ReplacementForm,
        
      },
      {
        path: "test",
        name: "form-test",
        component: TestFormForm,
        
      },
      {
        path: "training",
        name: "form-training",
        component: TrainingForm,
        
      }
    ];
  }
};
