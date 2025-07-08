'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, CreditCard } from "lucide-react";
import SubscriptionForm from './subscription-form';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export default function SubscriptionModal({ isOpen, onClose, onSuccess }: SubscriptionModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => {
          e.preventDefault();
        }}
>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Configuration de l&apos;abonnement Pro
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Votre moyen de paiement a été enregistré avec succès ! 
                Vous pouvez maintenant utiliser toutes les fonctionnalités Pro.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Cette fenêtre se fermera automatiquement...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Comment fonctionne la facturation ?</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Votre carte ne sera pas débitée immédiatement</li>
                <li>• Vous serez facturé mensuellement selon votre utilisation</li>
                <li>• Les factures incluront automatiquement les informations de votre entreprise</li>
                <li>• Vous pouvez annuler à tout moment</li>
              </ul>
            </div>
            
            <SubscriptionForm onSuccess={handleSuccess} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 