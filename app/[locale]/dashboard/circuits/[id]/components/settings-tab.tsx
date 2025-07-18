import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X } from "lucide-react";
import { PointsStepForm } from "./step-forms/points-step-form";
import { ActionsStepForm } from "./step-forms/actions-step-form";
import { ObjectivesStepForm } from "./step-forms/objectives-step-form";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { Circuit, Step } from "@/lib/types/circuit.types";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

interface SettingsTabProps {
    circuit: Circuit;
}

export function SettingsTab({ circuit }: SettingsTabProps) {
    const { setSteps, addStep, updateStep, deleteStep, renameCircuit, updateStepsOrder } = useCircuits();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(circuit.name);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [stepToDelete, setStepToDelete] = useState<string | null>(null);
    const t = useTranslations('dashboard.circuits.common');

    if (!circuit) {
        return <div>{t('errors.notFound')}</div>;
    }

    const handleRename = async () => {
        if (name.length < 3) {
            toast.error(t('errors.nameTooShort'));
            return;
        }

        try {
            await renameCircuit({ circuitId: circuit.id, name });
            toast.success(t('success.nameUpdated'));
            setIsEditing(false);
        } catch (error) {
            toast.error(t('errors.updateFailed'));
            console.error("Error updating circuit:", error);
        }
    };

    const handleStepUpdate = async (step: Step) => {
        try {
            await updateStep({ 
                circuitId: circuit.id, 
                stepId: step.id, 
                step: step
            });
            toast.success(t('success.stepUpdated'));
        } catch (error) {
            toast.error(t('errors.stepUpdateFailed'));
            console.error("Error updating step:", error);
        }
    };

    const handleStepDeleteRequest = async (stepId: string): Promise<void> => {
        setStepToDelete(stepId);
        setDeleteDialogOpen(true);
    };

    const handleStepDelete = async (stepId: string) => {
        try {
            await deleteStep({ 
                circuitId: circuit.id, 
                stepId: stepId
            });
            toast.success(t('success.stepDeleted'));
        } catch (error) {
            toast.error(t('errors.stepDeleteFailed'));
            console.error("Error deleting step:", error);
        }
        setDeleteDialogOpen(false);
        setStepToDelete(null);
    };

    const handleStepAdd = async (step: Step): Promise<Step | null> => {
        try {
            const addedStep = await addStep({ 
                circuitId: circuit.id, 
                step: step
            });
            toast.success(t('success.stepAdded'));
            return addedStep;
        } catch (error) {
            toast.error(t('errors.stepAddFailed'));
            console.error("Error adding step:", error);
            return null;
        }
    };

    const handleStepsReset = async (steps: Step[]) => {
        try {
            const updatedCircuit = await setSteps({ 
                circuitId: circuit.id, 
                steps: steps
            });
            if (updatedCircuit) {
                circuit.steps = updatedCircuit.steps;
            }
            toast.success(t('success.stepsReset'));
        } catch (error) {
            toast.error(t('errors.stepsResetFailed'));
            console.error("Error resetting steps:", error);
        }
    };

    const handleStepsOrderUpdate = async (steps: Step[]) => {
        try {
            const orderingPayload = steps.map(step => ({
                stepId: step.id,
                stepNumber: step.stepNumber ?? 0
            }));

            await updateStepsOrder({ 
                circuitId: circuit.id, 
                steps: orderingPayload 
            });
            toast.success(t('success.stepsOrderUpdated'));
        } catch (error) {
            toast.error(t('errors.stepsOrderUpdateFailed'));
            console.error("Error updating steps order:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">{t('settings.title')}</h2>
                    <p className="text-foreground/70">
                        {t(`settings.description.${circuit.type}`)}
                    </p>
                </div>

                <div className="grid gap-6 p-6 rounded-xl border border-primary/20 bg-surface-2">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-muted-foreground">{t('settings.name.label')}</Label>
                            {!isEditing && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                                >
                                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                                    {t('settings.name.edit')}
                                </Button>
                            )}
                        </div>
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-9 text-sm border-primary/20 focus:border-primary/40"
                                    placeholder={t('settings.name.label')}
                                />
                                <div className="flex gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setName(circuit.name);
                                            setIsEditing(false);
                                        }}
                                        className="h-9 px-2 text-xs text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <X className="h-3.5 w-3.5 mr-1.5" />
                                        {t('settings.name.cancel')}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRename}
                                        className="h-9 px-2 text-xs text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                    >
                                        <Check className="h-3.5 w-3.5 mr-1.5" />
                                        {t('settings.name.save')}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-base font-medium text-foreground">
                                {name}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">{t('settings.steps.title')}</h3>
                        <p className="text-sm text-foreground/70">
                            {t(`settings.steps.description.${circuit.type}`)}
                        </p>
                    </div>

                    <div className="bg-surface-2 rounded-xl border border-primary/20 p-6">
                        {circuit.type === "points" && (
                            <PointsStepForm
                                circuitName={circuit.name}
                                onStepUpdate={handleStepUpdate}
                                onStepDelete={handleStepDeleteRequest}
                                onStepAdd={handleStepAdd}
                                onStepsReset={handleStepsReset}
                                initialSteps={circuit.steps}
                            />
                        )}
                        {circuit.type === "actions" && (
                            <ActionsStepForm
                                circuitName={circuit.name}
                                onStepUpdate={handleStepUpdate}
                                onStepDelete={handleStepDeleteRequest}
                                onStepAdd={handleStepAdd}
                                onStepsReset={handleStepsReset}
                                initialSteps={circuit.steps}
                            />
                        )}
                        {circuit.type === "objective" && (
                            <ObjectivesStepForm
                                onStepUpdate={handleStepUpdate}
                                onStepDelete={handleStepDeleteRequest}
                                onStepAdd={handleStepAdd}
                                onStepsOrderUpdate={handleStepsOrderUpdate}
                                initialSteps={circuit.steps}
                            />
                        )}
                    </div>
                </div>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('settings.deleteStep.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('settings.deleteStep.description')}<br />
                            <span className="text-sm text-muted-foreground">{t('settings.deleteStep.warning')}</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('buttons.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => stepToDelete && handleStepDelete(stepToDelete)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {t('settings.deleteStep.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 