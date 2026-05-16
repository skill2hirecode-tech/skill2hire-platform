import {
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Target,
  Shield,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Over 10 years of experience in recruitment and training",
    },
    {
      icon: Users,
      title: "Expert Trainers",
      description:
        "Learn from industry professionals with real-world experience",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "95% of our students get placed within 6 months",
    },
    {
      icon: Target,
      title: "Personalized Approach",
      description: "Tailored solutions to meet your unique career goals",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Rigorous quality standards for all our services",
    },
    {
      icon: Shield,
      title: "Trusted Partner",
      description: "Partnered with 15+ leading companies across India",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Why Choose Skill<span className="text-secondary">2</span>Hire?
          </h2>
          <p className="section-subtitle">
            Your success is our mission. Here's what makes us different
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-primary text-white rounded-lg">
            <Target size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-white/90">
              To empower individuals with industry-relevant skills and connect
              them with the right opportunities
            </p>
          </div>
          <div className="text-center p-8 bg-navy text-white rounded-lg">
            <TrendingUp size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-white/90">
              To be a trusted partner in building a skilled workforce and
              transforming careers and businesses
            </p>
          </div>
          <div className="text-center p-8 bg-secondary text-white rounded-lg">
            <Award size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Values</h3>
            <p className="text-white/90">
              Integrity, Excellence, Empowerment, and Commitment to quality in
              everything we do
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
