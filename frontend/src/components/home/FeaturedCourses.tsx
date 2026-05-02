'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Star, ArrowRight, Loader2 } from 'lucide-react';
import { coursesApi } from '@/lib/api';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  discountPrice?: number;
  instructor?: string;
  category?: string;
  thumbnail?: string;
  rating?: number;
  studentsEnrolled?: number;
  createdAt: string;
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await coursesApi.getAll({ page: 1, limit: 3 });
        setCourses(response.data.courses);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="section-title">Featured Courses</h2>
            <p className="section-subtitle">Enhance your skills with expert-led training</p>
          </div>
          <Link href="/courses" className="btn btn-outline hidden md:flex">
            View All Courses
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">No courses available at the moment.</p>
            <Link href="/courses" className="btn btn-primary">
              Check Back Later
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const displayPrice = course.discountPrice || course.price;
              const formattedPrice = `₹${(displayPrice / 100).toLocaleString('en-IN')}`;
              const hasDiscount = course.discountPrice && course.discountPrice < course.price;

              return (
                <div key={course.id} className="card group cursor-pointer p-0 overflow-hidden">
                  {/* Course Image */}
                  <div className="h-48 bg-gradient-primary relative overflow-hidden">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-6xl font-bold opacity-20">
                          {course.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white text-navy text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users size={16} className="mr-1" />
                        {course.studentsEnrolled || 0} students
                      </div>
                      {course.rating && (
                        <div className="flex items-center">
                          <Star size={16} className="mr-1 fill-yellow-400 text-yellow-400" />
                          {course.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-primary">{formattedPrice}</span>
                        {hasDiscount && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{(course.price / 100).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="btn btn-primary text-sm"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link href="/courses" className="btn btn-outline">
            View All Courses
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
