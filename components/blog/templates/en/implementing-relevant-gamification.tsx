import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Users, TrendingUp, Lightbulb, ArrowRight, AlertTriangle, ExternalLink, Zap, Rocket, Shield } from 'lucide-react';
import { Link } from '@/lib/navigation';

export default function ImplementingRelevantGamification() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Introduction */}
      <section className="mb-12" aria-labelledby="introduction">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/20 mb-8">
          <p className="text-lg text-foreground/80 leading-relaxed">
            Gamification has become a buzzword in the digital world, but implementing it effectively requires more than just adding points and badges. 
            The key to success lies in creating meaningful experiences that align with your users&apos; goals and your business objectives.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mb-12" aria-labelledby="core-principles">
        <h2 id="core-principles">Core Principles of Effective Gamification</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8" role="list" aria-label="Core principles of gamification">
          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Clear Objectives</h3>
            </div>
            <p className="text-foreground/70">
              Every gamification element should serve a specific purpose. Whether it&apos;s increasing user engagement, 
              driving specific behaviors, or improving retention, your goals must be crystal clear.
            </p>
          </Card>

          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">User-Centric Design</h3>
            </div>
            <p className="text-foreground/70">
              Understand your users&apos; motivations and design experiences that resonate with their needs. 
              What drives them? What are their pain points? Build around these insights.
            </p>
          </Card>

          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Progressive Complexity</h3>
            </div>
            <p className="text-foreground/70">
              Start simple and gradually introduce more complex elements. This prevents overwhelming users 
              and maintains engagement over time.
            </p>
          </Card>

          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Meaningful Rewards</h3>
            </div>
            <p className="text-foreground/70">
              Rewards should feel valuable and relevant. Intrinsic rewards like skill development often 
              outperform extrinsic rewards like points.
            </p>
          </Card>
        </div>
      </section>

      {/* Implementation Strategy */}
      <section className="mb-12" aria-labelledby="implementation-strategy">
        <h2 id="implementation-strategy">Implementation Strategy</h2>
        
        <div className="bg-muted/50 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold mb-6">Step-by-Step Approach</h3>
          
          <div className="space-y-6" role="list" aria-label="Implementation steps">
            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Step 1">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Audit Your Current State</h4>
                <p className="text-foreground/70">
                  Analyze your existing user journey and identify opportunities for gamification. 
                  Look for moments where users might need motivation or guidance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Step 2">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Define Success Metrics</h4>
                <p className="text-foreground/70">
                  Establish clear KPIs before implementation. This could be engagement rates, 
                  completion rates, or specific user behaviors you want to encourage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Step 3">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Design the Experience</h4>
                <p className="text-foreground/70">
                  Create a cohesive gamification system that feels natural within your application. 
                  Avoid forcing game elements where they don&apos;t belong.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Step 4">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Test and Iterate</h4>
                <p className="text-foreground/70">
                  Launch with a small user group first. Collect feedback and data to refine 
                  your approach before scaling to your entire user base.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section className="mb-12" aria-labelledby="common-pitfalls">
        <h2 id="common-pitfalls">Common Pitfalls to Avoid</h2>
        
        <div className="bg-muted/30 p-6 rounded-lg my-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-destructive">Watch Out For These Common Mistakes</h3>
          </div>
          
          <div className="space-y-4" role="list" aria-label="Common pitfalls to avoid">
            <div className="flex items-start gap-3" role="listitem">
              <div className="flex-shrink-0 w-2 h-2 bg-destructive rounded-full mt-2" aria-hidden="true"></div>
              <div>
                <h4 className="font-semibold text-destructive mb-1">Over-Gamification</h4>
                <p className="text-foreground/70 mb-2">
                  Too many game elements can overwhelm users and dilute your core value proposition. 
                  Keep it simple and focused on what truly matters to your users.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Start with 2-3 core elements and expand based on user feedback.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3" role="listitem">
              <div className="flex-shrink-0 w-2 h-2 bg-destructive rounded-full mt-2" aria-hidden="true"></div>
              <div>
                <h4 className="font-semibold text-destructive mb-1">Ignoring User Feedback</h4>
                <p className="text-foreground/70 mb-2">
                  Regularly collect and act on user feedback about your gamification elements. 
                  What works for one audience might not work for another.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Implement feedback loops and A/B testing to validate assumptions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3" role="listitem">
              <div className="flex-shrink-0 w-2 h-2 bg-destructive rounded-full mt-2" aria-hidden="true"></div>
              <div>
                <h4 className="font-semibold text-destructive mb-1">Static Systems</h4>
                <p className="text-foreground/70 mb-2">
                  Gamification should evolve with your user base and business goals. 
                  Don&apos;t set it and forget it.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Plan for regular updates and seasonal content to maintain engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-12" aria-labelledby="success-stories">
        <h2 id="success-stories">Real-World Success Stories</h2>
        
        <div className="grid md:grid-cols-2 gap-6 my-8" role="list" aria-label="Success stories">
          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">Duolingo Language Learning</h3>
              <Badge variant="outline" className="text-xs">Case Study</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              Duolingo increased user retention by 40% through their streak system, daily goals, and 
              social features that encouraged community engagement and accountability.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>40% retention increase</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source: Duolingo Annual Report 2023</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">Nike Run Club</h3>
              <Badge variant="outline" className="text-xs">Case Study</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              Nike Run Club saw a 60% increase in monthly active users after implementing 
              achievement badges, leaderboards, and personalized challenges.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>60% MAU increase</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source: Nike Digital Report 2023</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">LinkedIn Learning</h3>
              <Badge variant="outline" className="text-xs">Case Study</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              LinkedIn Learning achieved 75% course completion rates through skill assessments, 
              progress tracking, and certification badges that users could share on their profiles.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>75% completion rate</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source: LinkedIn Learning Impact Report</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">Starbucks Rewards</h3>
              <Badge variant="outline" className="text-xs">Case Study</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              Starbucks Rewards program increased customer lifetime value by 25% through tiered 
              membership levels, personalized offers, and exclusive member benefits.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>25% CLV increase</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source: Starbucks Annual Report 2023</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12" aria-labelledby="conclusion">
        <h2 id="conclusion">Conclusion</h2>
        
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/20">
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Effective gamification is not about turning your application into a game—it&apos;s about 
            creating meaningful experiences that motivate and engage your users while driving 
            your business objectives.
          </p>
          
          <p className="text-foreground/80 leading-relaxed">
            The key is to start with a clear understanding of your users&apos; needs and your business goals. 
            Design experiences that feel natural and valuable, then iterate based on real user feedback and data.
          </p>
        </div>
      </section>

      {/* Ludiks Solution */}
      <section className="mb-12" aria-labelledby="ludiks-solution">
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 p-8 rounded-xl border border-primary/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Rocket className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4" id="ludiks-solution">
              Skip the Complexity with Ludiks
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Why spend months building gamification from scratch when you can implement it in days? 
              Ludiks provides everything you need to add engaging gamification to your digital product.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8" role="list" aria-label="Ludiks features">
            <div className="text-center" role="listitem">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Ready-to-Use Components</h3>
              <p className="text-foreground/70 text-sm">
                Pre-built circuits, rewards, and engagement mechanics that you can customize and deploy instantly.
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Enterprise-Grade Analytics</h3>
              <p className="text-foreground/70 text-sm">
                Track user engagement, measure impact, and optimize your gamification strategy with detailed insights.
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Scalable & Flexible</h3>
              <p className="text-foreground/70 text-sm">
                Start simple and scale up. Our platform grows with your needs, from MVP to enterprise solutions.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-background p-6 rounded-lg border max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-3">Start Implementing Gamification Today</h3>
              <p className="text-foreground/70 mb-6">
                Join hundreds of companies that have transformed their user engagement with Ludiks. 
                Get started in minutes, not months.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="/auth/login">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                5,000 events free every month • No credit card required • Pay only for what you use
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 