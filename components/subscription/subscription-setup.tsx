'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import SubscriptionModal from './subscription-modal';

interface SubscriptionSetupProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function SubscriptionSetup({ 
  className, 
  variant = 'default',
  size = 'default'
}: SubscriptionSetupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={className}
        variant={variant}
        size={size}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Activer Pro
      </Button>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 