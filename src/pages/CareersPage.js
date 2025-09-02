import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, User2, Mail, Phone, CheckCircle, XCircle, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { fileToBase64, submitCareerApplication } from '../services/careersService';
import { validateEmail, validatePhone, validateName, validateContent } from '../utils/security';

// Department and role mappings
const DEPARTMENTS = [
  'Student Support & Operations',
  'Technology',
  'Marketing & Outreach',
  'Creative Division',
  'Academic & Teaching',
  'Business & Strategy',
];

const ROLES_BY_DEPARTMENT = {
  'Student Support & Operations': [
    'Student Support Associate',
    'Operations Executive',
    'Academic Coordinator',
    'Academic Counselor',
  ],
  Technology: [
    'AML Research Trainee / Research Assistant',
    'AML Developer',
    'Full Stack Web Developer',
  ],
  'Marketing & Outreach': [
    'Content Creator & Copywriter',
    'Community Manager',
  ],
  'Creative Division': [
    'Video Editor Intern',
    'UI/UX Designer Intern',
    'Animation / Illustration Intern',
  ],
  'Academic & Teaching': [
    'Subject Teacher (Science, Math, English, Commerce, CS, Other)',
    'Test Prep Tutor',
    'Curriculum Designer',
    'Doubt Solving Expert',
  ],
  'Business & Strategy': [
    'Business Analyst Intern',
    'Partnership Manager',
    'Sales Executive',
  ],
};

const CAREER_STAGES = [
  'Student / Entry-level',
  'Associate',
  'Professional',
  'Expert',
];

const CareersPage = () => {
  const [form, setForm] = useState({ firstName: '', middleName: '', lastName: '', phone: '', email: '', department: '', role: '', careerStage: '', experienceYears: '', experienceMonths: '', priorExperience: '', resume: null });
  const [submitting, setSubmitting] = useState(false);
  const [fileValidation, setFileValidation] = useState({ isValid: null, message: '' });

  // Handle preloader animation when navigated from footer
  useEffect(() => {
    try {
      if (sessionStorage.getItem('footerSupportPreloader') === '1') {
        // Trigger loading animation
        const event = new CustomEvent('app:trigger-loader', {
          detail: { duration: 1500 }
        });
        window.dispatchEvent(event);
        sessionStorage.removeItem('footerSupportPreloader');
      }
    } catch (_) {
      // ignore storage errors
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      // Only update form state, validation will be handled by useEffect
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle drag-and-drop for resume upload
  const handleResumeDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      const file = files[0];
      // Only update form state, validation will be handled by useEffect
      setForm((prev) => ({ ...prev, resume: file }));
    }
  };

  // Use useEffect to validate file when form.resume changes
  useEffect(() => {
    const validateFile = (file) => {
      if (!file) {
        setFileValidation({ isValid: null, message: '' });
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const maxSize = 5 * 1024 * 1024; // 5 MB
      
      const isTypeAllowed = allowedTypes.includes(file.type) || /(\.(pdf|doc|docx))$/i.test(file.name);
      const isSizeValid = file.size <= maxSize;
      
      if (!isTypeAllowed) {
        setFileValidation({ isValid: false, message: 'Only PDF, DOC, and DOCX files are allowed' });
      } else if (!isSizeValid) {
        setFileValidation({ isValid: false, message: 'File size must be 5 MB or less' });
      } else {
        setFileValidation({ isValid: true, message: 'File is valid and ready to upload' });
      }
    };

    validateFile(form.resume);
  }, [form.resume]);

  const validateBeforeSubmit = async () => {
    const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ').trim();
    if (!validateName(fullName)) {
      throw new Error('Please enter a valid full name');
    }
    if (!validateEmail(form.email)) {
      throw new Error('Please enter a valid email address');
    }
    if (!validatePhone(form.phone)) {
      throw new Error('Please enter a valid phone number');
    }
    if (!form.department) {
      throw new Error('Please select a department');
    }
    if (!form.role) {
      throw new Error('Please select a role');
    }
    if (!form.resume) {
      throw new Error('Please upload your resume (PDF/DOC/DOCX)');
    }
    // Validate resume file type and size (<= 5 MB)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const file = form.resume;
    const isTypeAllowed = allowedTypes.includes(file.type) || /(\.pdf|\.doc|\.docx)$/i.test(file.name);
    if (!isTypeAllowed) {
      throw new Error('Resume must be a PDF, DOC, or DOCX file');
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      throw new Error('Resume file size must be 5 MB or less');
    }

    if (form.priorExperience && !validateContent(form.priorExperience, 1000)) {
      throw new Error('Prior experience contains disallowed content or is too long');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validateBeforeSubmit();
    } catch (err) {
      toast.error(err.message);
      return;
    }

    setSubmitting(true);
    try {
      const resume = await fileToBase64(form.resume);
      const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ').trim();
      const messageSummary = `Career Stage: ${form.careerStage || 'N/A'}; Experience: ${form.experienceYears || 0} years ${form.experienceMonths || 0} months; Prior Experience: ${form.priorExperience || 'N/A'}`;

      const result = await submitCareerApplication({
        name: fullName,
        email: form.email,
        phone: form.phone,
        departments: form.department ? [form.department] : [],
        vacancies: form.role ? [form.role] : [],
        message: messageSummary,
        resume,
      });

      if (result.success) {
        toast.success('Application received! Thank you for applying.');
        setForm({ firstName: '', middleName: '', lastName: '', phone: '', email: '', department: '', role: '', careerStage: '', experienceYears: '', experienceMonths: '', priorExperience: '', resume: null });
        setFileValidation({ isValid: null, message: '' });
        const resInput = document.getElementById('resume');
        if (resInput) resInput.value = '';
      } else {
        toast.error(result.error || 'Failed to submit application');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80"
            >
              <Briefcase className="w-4 h-4" /> We're hiring across multiple roles
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Join Our Team to <span className="text-[#FF6A00]">Transform Learning</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-white/70 max-w-2xl mx-auto"
            >
              Submit your application with your resume. We'll get back to you if there's a good match.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-14 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Highlights */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                <h3 className="text-white text-xl font-semibold mb-3">Why Join Us?</h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• Impact global learners</li>
                  <li>• Flexible online and hybrid work</li>
                  <li>• Work with a passionate core team</li>
                  <li>• Growth-focused roles: Tutors, Operations, Tech, Business</li>
                </ul>
              </div>
              <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                <h4 className="text-white text-base font-semibold mb-2">Current Openings</h4>
                <p className="text-white/70 text-sm">
                  We continuously hire Tutors (Grades 5–12, all boards), and accept applications for Operations,
                  Technology, and Business roles. Apply below — we’ll review every application.
                </p>
              </div>
            </div>

            {/* Right: New Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-white/80 text-sm flex items-center gap-2 mb-1">
                      <User2 className="w-4 h-4" /> First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={form.middleName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/80 text-sm flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4" /> Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"

                      title="10-15 digits, plus + - ( ) and spaces allowed"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4" /> Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="text-white/90 text-sm font-semibold">Department *</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={(e) => {
                      // Update department and reset role in a single state update
                      setForm((prev) => ({ ...prev, department: e.target.value, role: '' }));
                    }}
                    required
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept} className="bg-gray-800 text-white">{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Role (conditional) */}
                {form.department && (
                  <div>
                    <label className="text-white/90 text-sm font-semibold">Role *</label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="" className="bg-gray-800 text-white">Select Role</option>
                      {ROLES_BY_DEPARTMENT[form.department].map((role) => (
                        <option key={role} value={role} className="bg-gray-800 text-white">{role}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Career Stage */}
                <div>
                  <label className="text-white/90 text-sm font-semibold">Career Stage *</label>
                  <select
                    name="careerStage"
                    value={form.careerStage}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Stage</option>
                    {CAREER_STAGES.map((stage) => (
                      <option key={stage} value={stage} className="bg-gray-800 text-white">{stage}</option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/90 text-sm font-semibold">Years of Experience</label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={form.experienceYears}
                      onChange={handleChange}
                      className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="text-white/90 text-sm font-semibold">Months of Experience</label>
                    <input
                      type="number"
                      name="experienceMonths"
                      value={form.experienceMonths}
                      onChange={handleChange}
                      className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                      max="11"
                    />
                  </div>
                </div>

                {/* Prior Industry Experience */}
                <div>
                  <label className="text-white/80 text-sm">Prior Industry Experience (if any)</label>
                  <textarea
                    name="priorExperience"
                    value={form.priorExperience}
                    onChange={handleChange}
                    rows="3"
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Resume Upload - Enhanced with Visual Feedback */}
                <div>
                  <label htmlFor="resume" className="block text-white/80 text-sm mb-2">Upload Resume (PDF/DOC/DOCX) *</label>
                  <label
                    htmlFor="resume"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleResumeDrop}
                    className={`group w-full cursor-pointer rounded-[40px] border-2 border-dashed bg-white/5 px-16 py-10 flex items-center justify-center shadow-[0_0_200px_-50px_rgba(0,0,0,0.7)] transition-all duration-300 ${
                      fileValidation.isValid === true
                        ? 'border-green-400 bg-green-500/10 hover:bg-green-500/20'
                        : fileValidation.isValid === false
                        ? 'border-red-400 bg-red-500/10 hover:bg-red-500/20'
                        : 'border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                      {fileValidation.isValid === true ? (
                        <CheckCircle className="h-12 w-12 text-green-400 mb-2" />
                      ) : fileValidation.isValid === false ? (
                        <XCircle className="h-12 w-12 text-red-400 mb-2" />
                      ) : (
                        <Upload className="h-12 w-12 text-white/70 mb-2" />
                      )}
                      <p className="text-white/80">Drag and Drop</p>
                      <p className="text-white/60">or</p>
                      <span className="mt-1 inline-block rounded-xl bg-white/80 text-black px-4 py-1 text-sm font-medium group-hover:bg-white">Browse file</span>
                    </div>
                    <input
                      id="resume"
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleChange}
                      required
                      className="hidden"
                    />
                  </label>
                  
                  {/* Enhanced File Status Display */}
                  {form.resume && (
                    <div className={`mt-3 p-3 rounded-lg border ${
                      fileValidation.isValid === true
                        ? 'border-green-400/30 bg-green-500/10'
                        : fileValidation.isValid === false
                        ? 'border-red-400/30 bg-red-500/10'
                        : 'border-white/20 bg-white/5'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {fileValidation.isValid === true ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : fileValidation.isValid === false ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                          ) : (
                            <Upload className="w-5 h-5 text-white/50" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-white/90">{form.resume.name}</p>
                            <p className="text-xs text-white/60">{(form.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setForm(prev => ({ ...prev, resume: null }));
                            setFileValidation({ isValid: null, message: '' });
                            const resInput = document.getElementById('resume');
                            if (resInput) resInput.value = '';
                          }}
                          className="text-white/50 hover:text-white/80 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                      {fileValidation.message && (
                        <p className={`text-xs mt-2 ${
                          fileValidation.isValid === true
                            ? 'text-green-400'
                            : fileValidation.isValid === false
                            ? 'text-red-400'
                            : 'text-white/60'
                        }`}>
                          {fileValidation.message}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {!form.resume && (
                    <p className="text-xs text-white/50 mt-2">Max 5 MB. Only PDF, DOC, or DOCX files allowed.</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold brand-bg-gradient brand-border border text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;