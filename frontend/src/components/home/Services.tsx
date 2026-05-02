import { Briefcase, GraduationCap, TrendingUp, Target, Users, Award } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Briefcase,
      title: 'Recruitment Services',
      description: 'Connect with top employers and find your dream job. We match talented professionals with the right opportunities.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: GraduationCap,
      title: 'Training Programs',
      description: 'Industry-relevant courses designed to enhance your skills and boost your career prospects.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Personalized career counseling and guidance to help you achieve your professional goals.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Comprehensive skill evaluation to identify your strengths and areas for improvement.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Users,
      title: 'Corporate Training',
      description: 'Customized training solutions for organizations to upskill their workforce.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Industry-recognized certifications to validate your expertise and enhance credibility.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions for your career and business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className={service.color} size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
