import React, { useState } from 'react';
import { ShieldCheck, Zap, Clock, CheckCircle, ArrowRight, Check } from 'lucide-react';
import { ROLES_DATA } from '../data/rolesData';

export default function EnquiryForm({ preselectedRole = null, customTech = null }) {
  const allRoles = Object.values(ROLES_DATA);
  const selectedRoleData = preselectedRole ? ROLES_DATA[preselectedRole] : null;

  const defaultTechList = customTech || selectedRoleData?.defaultTech || [
    'React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    role: selectedRoleData ? selectedRoleData.title : (allRoles[0]?.title || 'Full Stack Developers'),
    engagementModel: 'monthly',
    experienceLevel: 'Mid',
    technologies: [],
    techOther: '',
    showOtherTech: false,
    durationHours: '',
    budget: '',
    projectDetails: '',
    privacyConsent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);

  const toggleTech = (tech) => {
    setFormData(prev => {
      const exists = prev.technologies.includes(tech);
      return {
        ...prev,
        technologies: exists 
          ? prev.technologies.filter(t => t !== tech)
          : [...prev.technologies, tech]
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid business email address.';
    }
    if (!formData.phone.trim() || formData.phone.length < 6) {
      errs.phone = 'Please provide your phone number with country code.';
    }
    if (!formData.projectDetails.trim() || formData.projectDetails.length < 10) {
      errs.projectDetails = 'Please provide a brief description of your project (minimum 10 characters).';
    }
    if (!formData.privacyConsent) {
      errs.privacyConsent = 'You must agree to the privacy processing to receive a quote.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API network submission & store in localStorage
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const leadId = 'ATS-' + Math.floor(100000 + Math.random() * 900000);
      const leadRecord = {
        id: leadId,
        date: new Date().toISOString(),
        ...formData,
        technologies: [
          ...formData.technologies,
          ...(formData.techOther ? [formData.techOther] : [])
        ]
      };

      // Save to local storage for backup
      const existing = JSON.parse(localStorage.getItem('arora_leads') || '[]');
      existing.unshift(leadRecord);
      localStorage.setItem('arora_leads', JSON.stringify(existing));

      setSubmissionReceipt(leadRecord);
      setIsSuccess(true);
    } catch (err) {
      setErrors({ form: 'An unexpected error occurred. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      role: selectedRoleData ? selectedRoleData.title : 'Full Stack Developers',
      engagementModel: 'monthly',
      experienceLevel: 'Mid',
      technologies: [],
      techOther: '',
      showOtherTech: false,
      durationHours: '',
      budget: '',
      projectDetails: '',
      privacyConsent: false
    });
    setErrors({});
    setIsSuccess(false);
    setSubmissionReceipt(null);
  };

  return (
    <section className="enquiry-section" id="enquiry-section" aria-labelledby="enquiry-heading">
      <div className="container">
        <div className="enquiry-grid">
          {/* Left Column: Reassurance & Next Steps */}
          <div>
            <div className="reassurance-badge">
              <Zap size={14} />
              <span>Fast-Track Resource Allocation</span>
            </div>
            <h2 id="enquiry-heading" className="reassurance-title">
              Ready to Scale Your Team? Get a Tailored Developer Quote.
            </h2>
            <p className="reassurance-sub">
              Share your project scope, tech stack, and timeline. We match you with rigorously vetted software engineers ready to start within days.
            </p>

            <div className="what-happens-next">
              <h3 className="next-steps-heading">What happens next?</h3>
              <ol className="next-steps-timeline">
                <li className="timeline-step">
                  <div className="step-marker">1</div>
                  <div className="step-content">
                    <h4 className="step-title">Technical Review</h4>
                    <p className="step-desc">
                      Our lead architects evaluate your tech stack, project complexity, and team dynamic to identify optimal candidate profiles.
                    </p>
                  </div>
                </li>
                <li className="timeline-step">
                  <div className="step-marker">2</div>
                  <div className="step-content">
                    <h4 className="step-title">Discovery Call in 24 Hours</h4>
                    <p className="step-desc">
                      We reach out within one business day to clarify scope, confirm working hours, and present transparent quote tiers.
                    </p>
                  </div>
                </li>
                <li className="timeline-step">
                  <div className="step-marker">3</div>
                  <div className="step-content">
                    <h4 className="step-title">Hand-Picked Developer Selection</h4>
                    <p className="step-desc">
                      You interview hand-picked engineers directly. Once confirmed, onboard swiftly with zero bureaucratic drag.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="trust-highlights">
              <div className="trust-item">
                <ShieldCheck size={18} color="#00C896" />
                <span>No freelancer bidding or unverified contractors</span>
              </div>
              <div className="trust-item">
                <Clock size={18} color="#00C896" />
                <span>Flexible hourly, weekly, and monthly commitments</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={18} color="#00C896" />
                <span>Strict non-disclosure (NDA) & IP ownership assigned to you</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="enquiry-form-card">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} noValidate>
                {/* Role Pill or Selector */}
                <div className="form-group">
                  <label className="form-label">Developer Discipline</label>
                  {selectedRoleData ? (
                    <div className="selected-role-pill" style={{ '--pill-accent': selectedRoleData.accent }}>
                      <span>{selectedRoleData.title}</span>
                    </div>
                  ) : (
                    <select 
                      className="form-select"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                      {allRoles.map(r => (
                        <option key={r.slug} value={r.title}>{r.title}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Name & Company */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Your Name <span className="required-star">*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Jane Doe" 
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company / Organization</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Acme Corp" 
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Work Email <span className="required-star">*</span></label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="jane@company.com" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone with Country Code <span className="required-star">*</span></label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Engagement Model Segmented Radios */}
                <div className="form-group">
                  <label className="form-label">Engagement Model <span className="required-star">*</span></label>
                  <div className="engagement-radios-grid">
                    <div 
                      className={`engagement-radio-card ${formData.engagementModel === 'hourly' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, engagementModel: 'hourly' })}
                    >
                      <div className="radio-card-body">
                        <span className="radio-title">Hourly</span>
                        <span className="radio-desc">Ad-hoc bug fixes, audits</span>
                      </div>
                    </div>

                    <div 
                      className={`engagement-radio-card ${formData.engagementModel === 'weekly' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, engagementModel: 'weekly' })}
                    >
                      <div className="radio-card-body">
                        <span className="radio-title">Weekly</span>
                        <span className="radio-desc">Targeted sprint delivery</span>
                      </div>
                    </div>

                    <div 
                      className={`engagement-radio-card ${formData.engagementModel === 'monthly' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, engagementModel: 'monthly' })}
                    >
                      <div className="radio-card-body">
                        <span className="popular-tag">Most Popular</span>
                        <span className="radio-title">Monthly</span>
                        <span className="radio-desc">Full-time dedicated</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desired Seniority */}
                <div className="form-group">
                  <label className="form-label">Desired Seniority</label>
                  <div className="pill-options-grid">
                    {['Junior', 'Mid', 'Senior', 'Not sure'].map(lvl => (
                      <div 
                        key={lvl}
                        className={`pill-option ${formData.experienceLevel === lvl ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                      >
                        <span className="pill-box">{lvl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Chips */}
                <div className="form-group">
                  <label className="form-label">Select Key Technologies</label>
                  <div className="tech-chips-container">
                    {defaultTechList.map(tech => {
                      const isSelected = formData.technologies.includes(tech);
                      return (
                        <div 
                          key={tech} 
                          className={`tech-chip ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleTech(tech)}
                        >
                          <span className="chip-text">{tech}</span>
                        </div>
                      );
                    })}
                    <div 
                      className={`tech-chip ${formData.showOtherTech ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, showOtherTech: !formData.showOtherTech })}
                    >
                      <span className="chip-text">+ Other</span>
                    </div>
                  </div>
                  {formData.showOtherTech && (
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Specify other frameworks, databases, or cloud tools..." 
                      style={{ marginTop: 10 }}
                      value={formData.techOther}
                      onChange={e => setFormData({ ...formData, techOther: e.target.value })}
                    />
                  )}
                </div>

                {/* Duration & Budget */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Estimated Duration or Hours</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 3 months, 40h/week" 
                      value={formData.durationHours}
                      onChange={e => setFormData({ ...formData, durationHours: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Budget (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. $4,000 - $8,000 / month" 
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="form-group">
                  <label className="form-label">Project Details & Goals <span className="required-star">*</span></label>
                  <textarea 
                    className="form-textarea" 
                    rows="3" 
                    placeholder="Briefly describe your product goals, team structure, or required engineering tasks..."
                    value={formData.projectDetails}
                    onChange={e => setFormData({ ...formData, projectDetails: e.target.value })}
                  />
                  {errors.projectDetails && <span className="field-error">{errors.projectDetails}</span>}
                </div>

                {/* Privacy Consent */}
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="form-checkbox" 
                      checked={formData.privacyConsent}
                      onChange={e => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    />
                    <span>I agree to Arora Tech Solutions processing my details to deliver a personalized quote. Strict NDA applied.</span>
                  </label>
                  {errors.privacyConsent && <span className="field-error">{errors.privacyConsent}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block btn-lg">
                  {isSubmitting ? (
                    <span className="btn-spinner"></span>
                  ) : (
                    <>
                      <span>Request Developer Quote</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.75rem', color: '#64748B', marginTop: 12 }}>
                  <ShieldCheck size={14} />
                  <span>Your data is strictly confidential. Zero spam.</span>
                </div>
              </form>
            ) : (
              /* Success State Card */
              <div className="form-success-card">
                <div className="success-icon-wrap">
                  <Check size={36} strokeWidth={2.5} />
                </div>
                <h3 className="success-title">Thank You! Your Request Has Been Received.</h3>
                <p className="success-desc">
                  Our technical recruitment and architectural leads are reviewing your project scope. We will follow up via email and phone within one business day with matched engineer profiles.
                </p>

                {submissionReceipt && (
                  <div className="success-summary">
                    <strong>Enquiry Reference:</strong> #{submissionReceipt.id}<br />
                    <strong>Role Requested:</strong> {submissionReceipt.role}<br />
                    <strong>Engagement Model:</strong> {submissionReceipt.engagementModel.toUpperCase()}<br />
                    <strong>Contact:</strong> {submissionReceipt.fullName} ({submissionReceipt.email})
                  </div>
                )}

                <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
                  Submit Another Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
