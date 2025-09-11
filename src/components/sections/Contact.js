import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import Spline from "@splinetool/react-spline";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateContent,
  createRateLimiter,
  prepareSecureFormData,
} from "../../utils/security";
import { submitFormWithFallback } from "../../services/emailService";

const Contact = () => {
  const [,] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: "",
    subject: "",
    message: "",
  });

  // Removed unused focusedField state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [splineError, setSplineError] = useState(false);

  // Rate limiting for form submissions
  const rateLimiter = useRef(createRateLimiter(3, 60000)); // 3 attempts per minute
  const userIdentifier = useRef(`user_${Date.now()}_${Math.random()}`);

  // Handle Spline loading and errors - handled by onError prop in Spline component

  // Enhanced validation using security utilities

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Enhanced validation using security utilities
    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required";
    } else if (!validateName(formData.studentName)) {
      newErrors.studentName =
        "Please enter a valid name (letters, spaces, hyphens only)";
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = "Parent name is required";
    } else if (!validateName(formData.parentName)) {
      newErrors.parentName =
        "Please enter a valid name (letters, spaces, hyphens only)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.grade) {
      newErrors.grade = "Please select a grade";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    // Validate message content if provided
    if (formData.message && !validateContent(formData.message, 500)) {
      newErrors.message = "Message contains invalid content or is too long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Check rate limiting
    if (!rateLimiter.current(userIdentifier.current)) {
      toast.error(
        "Too many submission attempts. Please wait a minute before trying again."
      );
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare secure form data
      const sanitizedData = prepareSecureFormData({
        ...formData,
        email: formData.email.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 200), // Limited user agent for security logging
      });

      // Submit to Google Forms with fallback mechanism
      const submissionResult = await submitFormWithFallback(sanitizedData);

      if (!submissionResult.success) {
        throw new Error(
          submissionResult.error ||
            submissionResult.details ||
            "Failed to submit form"
        );
      }

      // Form submitted successfully

      // Show different success messages based on submission method
      const successMessage =
        submissionResult.method === "google_forms"
          ? "Form submitted successfully! We will contact you soon."
          : "Form submitted successfully via backup system! We will contact you soon.";

      // Reset form on success
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        grade: "",
        subject: "",
        message: "",
      });

      setErrors({});
      toast.success(successMessage);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Basic input sanitization on change
    let sanitizedValue = value;

    // Prevent script injection attempts
    if (
      sanitizedValue.toLowerCase().includes("<script") ||
      // eslint-disable-next-line no-script-url
      sanitizedValue.toLowerCase().includes("javascript:") ||
      sanitizedValue.toLowerCase().includes("data:")
    ) {
      return; // Reject potentially malicious input
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  // Helper function to get input class with error styling
  const getInputClass = (fieldName) => {
    const baseClass =
      "w-full px-3 sm:px-3.5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-[15px] rounded-lg bg-white/15 border text-white focus:outline-none focus:ring-2 placeholder-white/70";
    const errorClass = errors[fieldName]
      ? "border-red-500 focus:ring-red-500"
      : "border-white/20 focus:ring-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  // Helper function to get select class with proper dropdown styling
  const getSelectClass = (fieldName) => {
    const baseClass =
      "w-full px-3 sm:px-3.5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-[15px] rounded-lg bg-white/15 border text-white focus:outline-none focus:ring-2 appearance-none cursor-pointer";
    const errorClass = errors[fieldName]
      ? "border-red-500 focus:ring-red-500"
      : "border-white/20 focus:ring-blue-500";
    const selectSpecific =
      "[&>option]:bg-gray-800 [&>option]:text-white [&>option]:py-2 [&>option]:px-3";
    return `${baseClass} ${errorClass} ${selectSpecific}`;
  };

  // Helper function to render error message
  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-1"
        >
          {errors[fieldName]}
        </motion.p>
      );
    }
    return null;
  };

  return (
    // Spacing: reduce top padding to clear the fixed navbar but remove excess gap
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden bg-black pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10"
    >
      {/* Black Background Zone - from right to form area */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-3/5 h-full bg-black"></div>
      </div>

      {/* Gradient Background - from form area to left */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-2/5 h-full bg-gradient-to-r from-purple-900/20 via-indigo-900/15 to-transparent"></div>
      </div>

      {/* Background Elements - subtle effects only (hidden on mobile to avoid haze over inputs) */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-10 left-5 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-5 w-56 h-56 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-[40vw] max-w-[300px] h-[40vw] max-h-[300px] bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      </div>

      {/* Black Background for Bottom Right Area */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-3/5 h-1/3 bg-black"></div>
      </div>

      {/* 3D Character Background - Show entire design */}
      <div className="absolute inset-0 hidden lg:block z-5">
        <div className="absolute right-0 top-0 w-3/5 h-full overflow-visible flex items-center justify-center">
          {!splineError && (
            <Spline
              scene="https://prod.spline.design/kKyWeZz85xetpdcW/scene.splinecode"
              className="w-full h-full pointer-events-none scale-90"
              style={{
                background: "transparent",
                transform: "translateX(8%) translateY(0%)",
              }}
              onError={() => setSplineError(true)}
            />
          )}
          {splineError && (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-sm opacity-50">3D Background Unavailable</p>
              </div>
            </div>
          )}
          {/* Black overlay to completely hide watermark */}
          <div className="absolute bottom-0 right-0 w-40 h-16 bg-black z-10 pointer-events-none"></div>
        </div>
      </div>

      {/* Mid-section - transparent background */}
      <div className="relative z-20 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Heading - Always Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 md:mb-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              <span className="text-white">Get Your Free </span>
              <span className="brand-gradient">Demo Class</span>
            </h2>
          </motion.div>

          {/* Subtitle - Centered below main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-6 sm:mb-8 md:mb-10"
          >
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Experience our teaching methodology with a complimentary demo
              session
            </p>
          </motion.div>

          {/* Responsive Form Container - Positioned to the left and moved up more */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto lg:max-w-md xl:max-w-lg lg:mr-auto lg:ml-2 xl:ml-4 -mt-2 sm:-mt-4 lg:-mt-6"
          >
            <div className="bg-white/15 md:bg-white/10 md:backdrop-blur-lg rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-6 xl:p-8 shadow-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center justify-center space-x-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 brand-text" />
                <span className="brand-gradient">Book Your Demo</span>
              </h3>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 items-start"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Student's Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={getInputClass("studentName")}
                    placeholder="Enter student's full name"
                    required
                    maxLength="100"
                  />
                  {renderError("studentName")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Parent's Name
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className={getInputClass("parentName")}
                    placeholder="Enter parent's full name"
                    required
                    maxLength="100"
                  />
                  {renderError("parentName")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={getInputClass("phone")}
                    placeholder="Enter phone number"
                    required
                    maxLength="15"
                  />
                  {renderError("phone")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={getInputClass("email")}
                    placeholder="Enter email address"
                    required
                    maxLength="100"
                  />
                  {renderError("email")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Student's Grade
                  </label>
                  <div className="relative">
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={getSelectClass("grade")}
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">
                        Select Grade
                      </option>
                      <option
                        value="Grade 5"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 5
                      </option>
                      <option
                        value="Grade 6"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 6
                      </option>
                      <option
                        value="Grade 7"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 7
                      </option>
                      <option
                        value="Grade 8"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 8
                      </option>
                      <option
                        value="Grade 9"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 9
                      </option>
                      <option
                        value="Grade 10"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 10
                      </option>
                      <option
                        value="Grade 11"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 11
                      </option>
                      <option
                        value="Grade 12"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Grade 12
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {renderError("grade")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Subject of Interest
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={getSelectClass("subject")}
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">
                        Select Subject
                      </option>
                      <option
                        value="Mathematics"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Mathematics
                      </option>
                      <option
                        value="Science"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Science
                      </option>
                      <option
                        value="English"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        English
                      </option>
                      <option
                        value="Coding"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Coding
                      </option>
                      <option
                        value="Multiple Subjects"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        Multiple Subjects
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {renderError("subject")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="col-span-1 md:col-span-2"
                >
                  <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${getInputClass("message")} resize-none`}
                    placeholder="Tell us about your learning goals or any specific requirements..."
                    rows="2"
                    maxLength="500"
                    style={{
                      height: "auto",
                      maxHeight: "180px",
                      overflowY: "auto",
                    }}
                    onInput={(e) => {
                      const max = 180; // px
                      e.target.style.height = "auto";
                      const newHeight = Math.min(e.target.scrollHeight, max);
                      e.target.style.height = newHeight + "px";
                      e.target.style.overflowY =
                        e.target.scrollHeight > max ? "auto" : "hidden";
                    }}
                  />
                  {renderError("message")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="col-span-1 md:col-span-2 text-center"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full md:w-auto btn-compact text-sm sm:text-base font-semibold rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 shadow-2xl mx-auto ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "btn-primary hover:scale-105"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>
                      {isSubmitting ? "Submitting..." : "Book Free Demo Class"}
                    </span>
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
