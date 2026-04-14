/**
 * Digital Marketing Services Data
 * Complete catalog of all available marketing services with tiered pricing
 */

const services = [
  {
    id: 'seo',
    name: 'SEO Optimization',
    category: 'search',
    icon: '🔍',
    color: '#7c3aed',
    shortDescription: 'Boost your search engine rankings and drive organic traffic with data-driven SEO strategies.',
    description: 'Our comprehensive SEO optimization service uses cutting-edge techniques to improve your website\'s visibility in search engine results. From technical audits to content optimization, we cover every aspect of modern SEO to ensure sustainable growth in organic traffic and rankings.',
    features: ['Keyword Research & Analysis', 'Technical SEO Audit', 'On-Page Optimization', 'Link Building', 'Performance Tracking'],
    tiers: [
      {
        id: 'seo-starter',
        name: 'Starter',
        price: 499,
        period: 'month',
        features: ['Up to 10 keywords', 'Monthly SEO audit', 'Basic on-page optimization', 'Google Analytics setup', 'Monthly performance report'],
        deliverables: ['Keyword research report', 'SEO audit document', 'Monthly ranking report'],
        timeline: '2-4 weeks setup',
        popular: false
      },
      {
        id: 'seo-professional',
        name: 'Professional',
        price: 999,
        period: 'month',
        features: ['Up to 30 keywords', 'Weekly SEO monitoring', 'Advanced on-page & off-page SEO', 'Content optimization strategy', 'Competitor analysis', 'Link building (10/month)', 'Bi-weekly performance reports'],
        deliverables: ['Comprehensive keyword strategy', 'Technical audit & fixes', 'Content calendar', 'Bi-weekly reports'],
        timeline: '1-2 weeks setup',
        popular: true
      },
      {
        id: 'seo-enterprise',
        name: 'Enterprise',
        price: 2499,
        period: 'month',
        features: ['Unlimited keywords', 'Daily monitoring & alerts', 'Full technical SEO overhaul', 'Custom content strategy', 'Premium link building (30/month)', 'International SEO support', 'Dedicated SEO manager', 'Weekly strategy calls'],
        deliverables: ['Full SEO roadmap', 'Weekly detailed reports', 'Custom dashboard', 'Priority support'],
        timeline: '1 week setup',
        popular: false
      }
    ]
  },
  {
    id: 'smm',
    name: 'Social Media Marketing',
    category: 'social',
    icon: '📱',
    color: '#3b82f6',
    shortDescription: 'Build your brand presence across all major social media platforms with engaging content.',
    description: 'Transform your social media presence with our expert marketing strategies. We create compelling content, manage your communities, and run targeted campaigns across Instagram, Facebook, Twitter, LinkedIn, and TikTok to grow your audience and drive engagement.',
    features: ['Content Creation', 'Community Management', 'Paid Social Campaigns', 'Influencer Partnerships', 'Analytics & Reporting'],
    tiers: [
      {
        id: 'smm-starter',
        name: 'Starter',
        price: 399,
        period: 'month',
        features: ['2 social platforms', '12 posts per month', 'Basic content calendar', 'Community monitoring', 'Monthly analytics report'],
        deliverables: ['Content calendar', 'Branded post templates', 'Monthly report'],
        timeline: '1-2 weeks setup',
        popular: false
      },
      {
        id: 'smm-professional',
        name: 'Professional',
        price: 899,
        period: 'month',
        features: ['4 social platforms', '24 posts per month', 'Story/Reel creation (8/month)', 'Active community management', 'Social listening', 'Paid ad management ($500 budget)', 'Bi-weekly reports'],
        deliverables: ['Strategy document', 'Content calendar', 'Creative assets', 'Campaign reports'],
        timeline: '1 week setup',
        popular: true
      },
      {
        id: 'smm-enterprise',
        name: 'Enterprise',
        price: 2199,
        period: 'month',
        features: ['All social platforms', 'Daily posting', 'Premium video content', 'Influencer outreach', '24/7 community management', 'Advanced paid campaigns', 'Custom analytics dashboard', 'Dedicated social media manager'],
        deliverables: ['Full strategy playbook', 'Daily content', 'Influencer reports', 'Custom dashboard'],
        timeline: '3-5 days setup',
        popular: false
      }
    ]
  },
  {
    id: 'content',
    name: 'Content Marketing',
    category: 'content',
    icon: '✍️',
    color: '#10b981',
    shortDescription: 'Create compelling content that attracts, engages, and converts your target audience.',
    description: 'Our content marketing service delivers high-quality, strategically crafted content that resonates with your audience. From blog posts and whitepapers to infographics and video scripts, we create content that drives traffic, builds authority, and generates leads.',
    features: ['Content Strategy', 'Blog Writing', 'Copywriting', 'Visual Content', 'Content Distribution'],
    tiers: [
      {
        id: 'content-starter',
        name: 'Starter',
        price: 599,
        period: 'month',
        features: ['4 blog posts per month', 'Basic keyword integration', 'SEO-optimized content', 'Stock image sourcing', 'Content calendar'],
        deliverables: ['4 published blog posts', 'Content calendar', 'Monthly topic plan'],
        timeline: '1-2 weeks setup',
        popular: false
      },
      {
        id: 'content-professional',
        name: 'Professional',
        price: 1299,
        period: 'month',
        features: ['8 blog posts per month', '2 long-form pieces', 'Email newsletter copy', 'Social media copy', 'Custom graphics', 'Content repurposing', 'Performance tracking'],
        deliverables: ['All written content', 'Custom graphics', 'Editorial calendar', 'Performance reports'],
        timeline: '1 week setup',
        popular: true
      },
      {
        id: 'content-enterprise',
        name: 'Enterprise',
        price: 2999,
        period: 'month',
        features: ['Unlimited blog posts', 'Whitepapers & ebooks', 'Case studies', 'Video scripts', 'Podcast content', 'Full content funnel strategy', 'Dedicated content team', 'A/B content testing'],
        deliverables: ['Full content library', 'Lead magnets', 'Video scripts', 'Custom strategy'],
        timeline: '3-5 days setup',
        popular: false
      }
    ]
  },
  {
    id: 'email',
    name: 'Email Marketing',
    category: 'email',
    icon: '📧',
    color: '#f59e0b',
    shortDescription: 'Drive conversions with personalized email campaigns and automated workflows.',
    description: 'Maximize your ROI with our expert email marketing services. We design beautiful email templates, create automated drip campaigns, segment your audience, and optimize every aspect of your email strategy to increase open rates, click-throughs, and conversions.',
    features: ['Campaign Design', 'Automation Workflows', 'List Segmentation', 'A/B Testing', 'Analytics'],
    tiers: [
      {
        id: 'email-starter',
        name: 'Starter',
        price: 299,
        period: 'month',
        features: ['Up to 5,000 subscribers', '4 email campaigns/month', 'Template design (2)', 'Basic segmentation', 'Open/click tracking'],
        deliverables: ['Email templates', 'Campaign reports', 'Subscriber growth report'],
        timeline: '1-2 weeks setup',
        popular: false
      },
      {
        id: 'email-professional',
        name: 'Professional',
        price: 699,
        period: 'month',
        features: ['Up to 25,000 subscribers', '8 email campaigns/month', 'Custom template design', '3 automation workflows', 'Advanced segmentation', 'A/B testing', 'Detailed analytics'],
        deliverables: ['Custom templates', 'Automation setup', 'A/B test results', 'Bi-weekly reports'],
        timeline: '1 week setup',
        popular: true
      },
      {
        id: 'email-enterprise',
        name: 'Enterprise',
        price: 1499,
        period: 'month',
        features: ['Unlimited subscribers', 'Unlimited campaigns', 'Advanced automation suite', 'Dynamic content', 'Predictive analytics', 'Dedicated email specialist', 'Custom integrations', 'Priority deliverability support'],
        deliverables: ['Full email system', 'Advanced automations', 'Custom integrations', 'Weekly reports'],
        timeline: '3-5 days setup',
        popular: false
      }
    ]
  },
  {
    id: 'ppc',
    name: 'PPC Advertising',
    category: 'advertising',
    icon: '🎯',
    color: '#ef4444',
    shortDescription: 'Maximize your ad spend with targeted pay-per-click campaigns across all platforms.',
    description: 'Get immediate results with our expertly managed PPC advertising campaigns. We create, optimize, and manage your ads across Google Ads, Facebook Ads, Instagram, and LinkedIn to deliver maximum ROI. Our data-driven approach ensures every dollar of your ad spend works harder.',
    features: ['Campaign Strategy', 'Ad Creation', 'Bid Management', 'Landing Page Optimization', 'Conversion Tracking'],
    tiers: [
      {
        id: 'ppc-starter',
        name: 'Starter',
        price: 599,
        period: 'month',
        features: ['1 ad platform', 'Up to $2,000 ad spend management', '2 campaign types', 'Basic ad copywriting', 'Monthly optimization', 'Monthly performance report'],
        deliverables: ['Campaign setup', 'Ad creatives', 'Monthly report'],
        timeline: '1-2 weeks setup',
        popular: false
      },
      {
        id: 'ppc-professional',
        name: 'Professional',
        price: 1199,
        period: 'month',
        features: ['3 ad platforms', 'Up to $10,000 ad spend management', 'Multiple campaign types', 'A/B ad testing', 'Landing page recommendations', 'Weekly optimization', 'Retargeting setup', 'Bi-weekly reports'],
        deliverables: ['Multi-platform campaigns', 'A/B test results', 'Landing page audit', 'Bi-weekly reports'],
        timeline: '1 week setup',
        popular: true
      },
      {
        id: 'ppc-enterprise',
        name: 'Enterprise',
        price: 2799,
        period: 'month',
        features: ['All ad platforms', 'Unlimited ad spend management', 'Full-funnel campaigns', 'Custom landing pages', 'Advanced retargeting', 'Dynamic ad creation', 'Dedicated PPC manager', 'Real-time dashboard'],
        deliverables: ['Full-funnel strategy', 'Custom landing pages', 'Real-time dashboard', 'Weekly reports'],
        timeline: '3-5 days setup',
        popular: false
      }
    ]
  },
  {
    id: 'brand',
    name: 'Brand Strategy',
    category: 'branding',
    icon: '🎨',
    color: '#ec4899',
    shortDescription: 'Define and elevate your brand identity with comprehensive branding solutions.',
    description: 'Build a powerful, cohesive brand that stands out in the market. Our brand strategy service covers everything from brand identity development and visual design to messaging frameworks and brand guidelines. We help you create a memorable brand that resonates with your target audience.',
    features: ['Brand Identity', 'Visual Design', 'Brand Messaging', 'Style Guidelines', 'Market Positioning'],
    tiers: [
      {
        id: 'brand-starter',
        name: 'Starter',
        price: 799,
        period: 'one-time',
        features: ['Brand discovery workshop', 'Logo design (3 concepts)', 'Color palette', 'Typography selection', 'Basic brand guidelines'],
        deliverables: ['Logo files (all formats)', 'Color palette', 'Typography guide', 'Mini brand book'],
        timeline: '2-3 weeks',
        popular: false
      },
      {
        id: 'brand-professional',
        name: 'Professional',
        price: 2499,
        period: 'one-time',
        features: ['In-depth brand strategy', 'Logo design (5 concepts)', 'Full visual identity', 'Brand messaging framework', 'Competitor analysis', 'Social media brand kit', 'Comprehensive brand guidelines'],
        deliverables: ['Complete logo package', 'Brand book', 'Social media kit', 'Messaging guide', 'Competitor report'],
        timeline: '3-4 weeks',
        popular: true
      },
      {
        id: 'brand-enterprise',
        name: 'Enterprise',
        price: 5999,
        period: 'one-time',
        features: ['Full brand audit', 'Brand strategy & positioning', 'Complete visual identity system', 'Brand architecture', 'Multi-channel brand kit', 'Brand launch strategy', 'Staff brand training', '3 months of brand support'],
        deliverables: ['Full brand system', 'Brand architecture', 'Launch strategy', 'Training materials', 'Support package'],
        timeline: '4-6 weeks',
        popular: false
      }
    ]
  }
];

module.exports = services;
