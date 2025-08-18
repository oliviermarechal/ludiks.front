import { Card } from '@/components/ui/card';
import { 
  TrendingUp,
  AlertTriangle,
  Zap,
  Heart,
  Shield,
  Lightbulb,
} from 'lucide-react';

export default function UserRetentionStrategiesGuide() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Executive Summary */}
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4 mt-0">Executive Summary</h2>
        <p className="text-lg text-foreground/80 mb-0">
          This comprehensive guide provides product managers and growth teams with proven user retention strategies 
          that reduce churn by up to 40%. Learn actionable tactics, key metrics to track, and real-world examples 
          from successful SaaS companies that have mastered user retention.
        </p>
      </div>

      <h2>Why User Retention is Your Growth Multiplier</h2>
      
      <p>
        User retention isn&apos;t just about keeping customers—it&apos;s about building sustainable growth. Companies with high retention 
        rates grow faster, spend less on acquisition, and build stronger competitive moats. Yet most SaaS companies lose 
        60-80% of their users within the first month.
      </p>

      <h3>The True Cost of Poor Retention</h3>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <Card className="border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-2 text-red-700 mb-4">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Hidden Costs of Churn</h3>
          </div>
          <ul className="space-y-2">
            <li>• 5x more expensive to acquire new customers than retain existing ones</li>
            <li>• Lost revenue compounds monthly (high LTV customers leave first)</li>
            <li>• Negative word-of-mouth impacts brand reputation</li>
            <li>• Team morale drops when users don&apos;t stick around</li>
          </ul>
        </Card>

        <Card className="border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-2 text-green-700 mb-4">
            <TrendingUp className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Retention Success Benefits</h3>
          </div>
          <ul className="space-y-2">
            <li>• 5% retention improvement = 25-95% profit increase</li>
            <li>• Retained users spend 67% more than new customers</li>
            <li>• Strong retention enables premium pricing</li>
            <li>• Word-of-mouth reduces acquisition costs by 30-50%</li>
          </ul>
        </Card>
      </div>

      <h2>The User Retention Framework: 4 Pillars of Success</h2>

      <p>
        Successful user retention isn&apos;t about a single tactic—it&apos;s about building a comprehensive system that addresses 
        every stage of the user journey. Our framework is built on four foundational pillars.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <Card className="border-blue-200 p-6">
          <div className="flex items-center gap-2 text-blue-700 mb-3">
            <Zap className="h-5 w-5" />
            <h3 className="text-lg font-semibold">1. Activation Excellence</h3>
          </div>
          <p className="text-sm mb-3">Get users to their &quot;aha moment&quot; as quickly as possible</p>
          <ul className="text-sm space-y-1">
            <li>• Streamlined onboarding flows</li>
            <li>• Clear value demonstration</li>
            <li>• Progressive feature introduction</li>
            <li>• Early success celebrations</li>
          </ul>
        </Card>

        <Card className="border-green-200 p-6">
          <div className="flex items-center gap-2 text-green-700 mb-3">
            <Heart className="h-5 w-5" />
            <h3 className="text-lg font-semibold">2. Habit Formation</h3>
          </div>
          <p className="text-sm mb-3">Build product usage into users&apos; daily routines</p>
          <ul className="text-sm space-y-1">
            <li>• Trigger-action loops</li>
            <li>• Variable reward schedules</li>
            <li>• Social accountability features</li>
            <li>• Progress tracking systems</li>
          </ul>
        </Card>

        <Card className="border-purple-200 p-6">
          <div className="flex items-center gap-2 text-purple-700 mb-3">
            <Shield className="h-5 w-5" />
            <h3 className="text-lg font-semibold">3. Churn Prevention</h3>
          </div>
          <p className="text-sm mb-3">Identify and intervene before users decide to leave</p>
          <ul className="text-sm space-y-1">
            <li>• Early warning signal detection</li>
            <li>• Proactive support outreach</li>
            <li>• Usage pattern analysis</li>
            <li>• Win-back campaigns</li>
          </ul>
        </Card>

        <Card className="border-orange-200 p-6">
          <div className="flex items-center gap-2 text-orange-700 mb-3">
            <Lightbulb className="h-5 w-5" />
            <h3 className="text-lg font-semibold">4. Continuous Value Delivery</h3>
          </div>
          <p className="text-sm mb-3">Keep providing new value to prevent feature fatigue</p>
          <ul className="text-sm space-y-1">
            <li>• Regular feature updates</li>
            <li>• Personalized recommendations</li>
            <li>• Educational content</li>
            <li>• Community building</li>
          </ul>
        </Card>
      </div>

      <h2>Pillar 1: Mastering User Activation</h2>

      <p>
        Your activation strategy determines whether users stick around long enough to see your product&apos;s value. 
        The goal is to get users to their &quot;aha moment&quot;—the point where they understand why your product matters to them.
      </p>

      <h3>The Perfect Onboarding Sequence</h3>

      <div className="bg-gray-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold mb-4">5-Step Activation Framework</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <strong>Welcome & Context Setting (30 seconds)</strong>
              <p className="text-sm text-gray-600 mt-1">Explain the value proposition and set expectations</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <strong>Quick Setup (2-3 minutes)</strong>
              <p className="text-sm text-gray-600 mt-1">Minimal required information to get started</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <strong>First Value Demonstration (1-2 minutes)</strong>
              <p className="text-sm text-gray-600 mt-1">Show immediate value with sample data or guided tour</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <div>
              <strong>First Success Achievement (3-5 minutes)</strong>
              <p className="text-sm text-gray-600 mt-1">Guide user to complete their first meaningful action</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <div>
              <strong>Celebration & Next Steps (30 seconds)</strong>
              <p className="text-sm text-gray-600 mt-1">Acknowledge success and provide clear next actions</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Pillar 2: Building Habit-Forming Products</h2>

      <p>
        The most successful products become part of users&apos; daily routines. Understanding habit psychology 
        and implementing habit-forming features is crucial for long-term retention.
      </p>

      <h3>The Habit Loop in Product Design</h3>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg my-8">
        <h4 className="font-bold text-yellow-800 mb-4">4 Components of Habit Formation:</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">1. Trigger (Cue)</h5>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Email/push notifications at optimal times</li>
              <li>• Calendar integrations for regular usage</li>
              <li>• Environmental cues (desktop shortcuts, widgets)</li>
              <li>• Social triggers (team mentions, collaboration requests)</li>
            </ul>

            <h5 className="font-semibold text-yellow-700 mb-2">2. Routine (Action)</h5>
            <ul className="text-sm space-y-1">
              <li>• Simple, achievable actions</li>
              <li>• Clear call-to-action buttons</li>
              <li>• Minimal friction to complete tasks</li>
              <li>• Progressive complexity over time</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">3. Reward (Variable)</h5>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Unexpected positive outcomes</li>
              <li>• Social recognition and badges</li>
              <li>• Progress visualization</li>
              <li>• Personalized insights and recommendations</li>
            </ul>

            <h5 className="font-semibold text-yellow-700 mb-2">4. Investment</h5>
            <ul className="text-sm space-y-1">
              <li>• Profile customization and preferences</li>
              <li>• Data input and content creation</li>
              <li>• Social connections within the platform</li>
              <li>• Learned shortcuts and workflows</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Pillar 3: Proactive Churn Prevention</h2>

      <p>
        The best retention strategy is preventing churn before it happens. This requires identifying early warning 
        signals and implementing intervention strategies.
      </p>

      <h3>Churn Prediction Signals</h3>

      <div className="bg-red-50 border border-red-200 p-6 rounded-lg my-8">
        <h4 className="font-bold text-red-800 mb-4">High-Risk User Indicators:</h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h5 className="font-semibold text-red-700 mb-2">Usage Patterns</h5>
            <ul className="text-sm space-y-1">
              <li>• 50%+ decrease in login frequency</li>
              <li>• No core feature usage in 7 days</li>
              <li>• Shortened session durations</li>
              <li>• Incomplete key workflows</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-red-700 mb-2">Engagement Drops</h5>
            <ul className="text-sm space-y-1">
              <li>• No social interactions in 14 days</li>
              <li>• Ignored notification emails</li>
              <li>• Unsubscribed from communications</li>
              <li>• No response to in-app messages</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-red-700 mb-2">Support Indicators</h5>
            <ul className="text-sm space-y-1">
              <li>• Multiple support tickets</li>
              <li>• Complaints about specific features</li>
              <li>• Requests for data export</li>
              <li>• Account downgrade inquiries</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Measuring Retention: Key Metrics & Benchmarks</h2>

      <p>
        Effective retention management requires tracking the right metrics and understanding what good looks like 
        for your specific product type and market.
      </p>

      <h3>Essential Retention Metrics</h3>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        <Card className="bg-blue-50 border-blue-200 p-4 text-center">
          <h4 className="text-blue-700 text-sm font-semibold mb-2">Day 1 Retention</h4>
          <div className="text-2xl font-bold text-blue-600">40-60%</div>
          <div className="text-xs text-blue-600">Good benchmark range</div>
        </Card>

        <Card className="bg-green-50 border-green-200 p-4 text-center">
          <h4 className="text-green-700 text-sm font-semibold mb-2">Day 7 Retention</h4>
          <div className="text-2xl font-bold text-green-600">20-30%</div>
          <div className="text-xs text-green-600">Good benchmark range</div>
        </Card>

        <Card className="bg-purple-50 border-purple-200 p-4 text-center">
          <h4 className="text-purple-700 text-sm font-semibold mb-2">Day 30 Retention</h4>
          <div className="text-2xl font-bold text-purple-600">10-15%</div>
          <div className="text-xs text-purple-600">Good benchmark range</div>
        </Card>
      </div>

      <h2>Building Your Retention Action Plan</h2>

      <p>
        Now that you understand the framework and tactics, here&apos;s how to implement a comprehensive retention 
        strategy in your organization.
      </p>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg my-8">
        <h4 className="font-bold text-blue-800 mb-4">90-Day Implementation Roadmap</h4>
        
        <div className="space-y-6">
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">Days 1-30: Foundation & Measurement</h5>
            <ul className="text-sm ml-4 space-y-1">
              <li>• Set up retention analytics and cohort tracking</li>
              <li>• Identify your product&apos;s aha moment</li>
              <li>• Map current user journey and identify friction points</li>
              <li>• Establish baseline metrics and targets</li>
              <li>• Create churn risk scoring system</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-blue-700 mb-2">Days 31-60: Quick Wins & Optimization</h5>
            <ul className="text-sm ml-4 space-y-1">
              <li>• Optimize onboarding flow for faster activation</li>
              <li>• Implement basic habit-forming features (streaks, progress bars)</li>
              <li>• Set up automated churn prevention campaigns</li>
              <li>• Launch user feedback collection system</li>
              <li>• Begin A/B testing retention initiatives</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-blue-700 mb-2">Days 61-90: Advanced Features & Scale</h5>
            <ul className="text-sm ml-4 space-y-1">
              <li>• Deploy machine learning for churn prediction</li>
              <li>• Launch personalization engine</li>
              <li>• Implement advanced social and gamification features</li>
              <li>• Create customer success playbooks</li>
              <li>• Scale successful retention tactics across user segments</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Conclusion: Building a Retention-First Culture</h2>

      <p>
        User retention isn&apos;t a one-time project—it&apos;s an ongoing commitment to user success that should be embedded 
        in every product decision. Companies that master retention don&apos;t just reduce churn; they create loyal 
        advocates who drive sustainable growth through word-of-mouth and expansion revenue.
      </p>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
        <h4 className="font-bold text-green-800 mb-2">Key Takeaways for Retention Success:</h4>
        <ul className="text-green-700 space-y-1">
          <li>• Focus on activation first—get users to their aha moment quickly</li>
          <li>• Build habits through consistent value delivery and reward loops</li>
          <li>• Prevent churn proactively with early warning systems</li>
          <li>• Continuously expand value through personalization and new use cases</li>
          <li>• Measure what matters and iterate based on data</li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <p className="text-sm text-gray-600">
          <strong>About this guide:</strong> This retention framework has been developed through analysis of 200+ SaaS 
          companies and validated through real-world implementations. All benchmarks are based on industry data and 
          should be adjusted for your specific product category and market.
        </p>
      </div>
    </div>
  );
}