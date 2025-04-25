import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ApiSetupProps {
  onNext: () => void
  apiKey: string
}

export function ApiSetup({ onNext, apiKey }: ApiSetupProps) {
  const [copied, setCopied] = useState(false)

  const copyApiKey = async () => {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Configuration de l&apos;API</h2>
        <p className="text-foreground/70">
          Voici votre clé API et la documentation pour intégrer la progression
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label className="text-foreground/90">Votre clé API</Label>
          <div className="flex gap-2">
            <Input 
              value={apiKey} 
              readOnly 
              className="font-mono bg-black/40 border-primary/20 focus:border-primary/40"
            />
            <Button
              variant="outline"
              onClick={copyApiKey}
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copier
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4 bg-black/20 backdrop-blur-sm border border-primary/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground">Documentation rapide</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground/90 mb-2">Endpoint de progression</h4>
              <pre className="bg-black/40 border border-primary/20 p-4 rounded-lg overflow-x-auto font-mono text-foreground/90">
                POST https://api.ludiks.io/v1/progress
              </pre>
            </div>
            
            <div>
              <p className="text-sm font-medium text-foreground/90 mb-2">Headers requis :</p>
              <pre className="bg-black/40 border border-primary/20 p-4 rounded-lg overflow-x-auto font-mono text-foreground/90">
{`Authorization: Bearer ${apiKey}
Content-Type: application/json`}
              </pre>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground/90 mb-2">Corps de la requête :</p>
              <pre className="bg-black/40 border border-primary/20 p-4 rounded-lg overflow-x-auto font-mono text-foreground/90">
{`{
  "userId": "string",     // Identifiant unique de l'utilisateur
  "circuitId": "string", // Identifiant du circuit
  "progress": number     // Valeur de progression (0-100)
}`}
              </pre>
            </div>
          </div>
        </div>

        <Button 
          onClick={onNext} 
          className="w-full bg-secondary hover:bg-secondary/90 text-black font-medium"
        >
          Terminer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 